import React, { useState } from "react";
import "./AddAdmin.css";
import { createAdmin } from "../../features/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext } from "react";
import { SnackbarContext } from "../../App";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
const AddAdmin = ({ onSave, onCancel }) => {
  const dispatch = useDispatch();
  const snackbarMessage = useContext(SnackbarContext);
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  //<-----------------------------------to add-------------------------------------------------
  const handleSave = (event) => {
    event.preventDefault();

    const sampleData = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value,
    };

    console.log(sampleData);

    const response = dispatch(createAdmin(sampleData));
    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload === undefined) {
        snackbarMessage(`error: username already exist has occurred`, "error");
      } else {
        snackbarMessage("You have successfully added", "success");
        window.location.reload();      }
    });
  };
  //<------------------------------------------------------------------------------------
  const handleCancel = () => {
    console.log("cancel");
    onCancel("Nothing");
  };

  return (
    <div className="admin-form">
      <span style={{marginLeft:"25%",display:"flex",gap:"3px"}}>
        <ManageAccountsIcon /> <h3>Add Administrator</h3>
      </span>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={adminData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={adminData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button style={{ marginLeft: "24%" }} type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
