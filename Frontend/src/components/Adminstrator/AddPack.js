import React, { useState } from "react";
import "./AddAdmin.css";
import { createAdmin } from "../../features/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { addHpackages } from "../../features/adminSlice";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "../../App";
import { AutoFixNormal } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import AccountAvatar from "../Authentication/AccountAvatar";
import { Link } from "react-router-dom";

//<------------------------------------------------------------------------------------
const AddPack =({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const snackbarMessage = useContext(SnackbarContext);
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role);
  const [packData, setPackData] = useState({
    type: "",
    rate: 0,
    doctorDisc: 0,
    medicineDisc: 0,
    familyDisc: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackData({ ...packData, [name]: value });
  };

  const handleSave = (event) => {
    event.preventDefault();

    const sampleData = {
      type: event.target.elements.type.value,
      rate: event.target.elements.rate.value,
      doctorDisc: event.target.elements.doctorDisc.value,
      medicineDisc: event.target.elements.medicineDisc.value,
      familyDisc: event.target.elements.familyDisc.value,
    };

    console.log(sampleData);

    const response = dispatch(addHpackages(sampleData));
    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload === undefined) {
        snackbarMessage(
          `error: Healthpackage already exist has occurred`,
          "error"
        );
      } else {
        snackbarMessage("You have successfully added", "success");
        navigate("/Home");
      }
    });
  };

  //<------------------------------------------------------------------------------------

  //   type,
  //   rate,
  //   doctorDisc,
  //   medicineDisc,
  //   familyDisc,

  const handleGoBack = () => {
    onClose(); // Go back one step in history
  };

  return role === "admin" ? (
   <Dialog open={isOpen} onClose={onClose}  >
      <DialogContent>
      <div className="admin-form" >
        <h2>Add Health Package</h2>
        <form onSubmit={handleSave} style={{marginRight:"10px",}} >
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              style={{ marginLeft: "38%",width:"40%" }}
              type="text"
              id="type"
              name="type"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rate">Rate</label>
            <input
              style={{ marginLeft: "38%",width:"40%" }}
              type="number"
              id="rate"
              name="rate"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorDisc">Doctor Discount</label>
            <input
              style={{ marginLeft:"20%" ,width:"40%"}}
              type="number"
              id="doctorDisc"
              name="doctorDisc"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="medicineDisc">Medicine Discount</label>
            <input
              style={{marginLeft: "17%" ,width:"40%" }}
              type="number"
              id="medicineDisc"
              name="medicineDisc"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="familyDisc">Family Discount</label>
            <input
              style={{ marginLeft: "20%" ,width:"40%"}}
              type="number"
              id="familyDisc"
              name="familyDisc"
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" style={{width:"40%",marginRight:"20px"}}>Save</button>
            <button type="button" style={{width:"40%",marginRight:"30px"}}onClick={handleGoBack}>
              Cancel
            </button>
          </div>
        </form>
      </div>{" "}
   </DialogContent>
    </Dialog>
  ) : (
    <>
      <Link to="/Login" sx={{ left: "100%" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "flex" },
            fontSize: "20px",
            maragin: "auto",
          }}
        >
          Login
        </Typography>
      </Link>
    </>
  );
};

export default AddPack;
