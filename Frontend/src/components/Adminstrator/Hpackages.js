import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { viewHealthP, deleteHpackages, editPackFront, updatePack } from '../../features/adminSlice';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Button, Typography } from "@mui/material";
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import { SnackbarContext } from "../../App";
import Dialog from "@mui/material/Dialog";

export default function Hpackages() {
  const snackbarMessage = useContext(SnackbarContext);
  const [editRow, setEditRow] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(-1);
  const [idx, setIdx] = useState(-1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewHealthP())
  }, [dispatch]);

  const dummyData = useSelector((state) => state.admin.hpackages);
  console.log(dummyData);
  const handleDelete = (id) => {
    dispatch(deleteHpackages(id));
  };
  const handleEditClick = (row, idx) => {
    setIsOpen(true);
    setEditRow(row);
    setId(row._id);
    console.log(id);
    setIdx(idx);
  };
  // useEffect(() => {
  //   console.log(id); // This will log the updated id value
  // }, [handleEditClick]);
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
    dispatch(editPackFront({ idx: idx, newData: sampleData }));
    
   const response = dispatch(updatePack({ id: id, newData: sampleData }));

   

    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload === undefined) {
        snackbarMessage(`error: ${responseData} has occurred`, "error");
      } else {
        snackbarMessage("You have successfully edited", "success");
       
      }
    });
    setIsOpen(false);
  };

  const tableStyle = {
    width: "80%",
    marginLeft: "50px",
    boxShadow: "5px 5px 5px 5px #8585854a",
    marginTop: "30px",
    marginBottom: "20px",
  };

  const cellStyle = {
    fontSize: "14px",
  };
  return (
    <>

      <Dialog open={isOpen}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              id="type"
              name="type"
              defaultValue={editRow.type}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rate"
            >Rate</label>
            <input
              type="number"
              id="rate"
              name="rate"
              defaultValue={editRow.rate}

              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorDisc">DoctorDisc</label>
            <input
              type="number"
              id="doctorDisc"
              name="doctorDisc"
              defaultValue={editRow.doctorDisc}

              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="medicineDisc">MedicineDisc</label>
            <input
              type="number"
              id="medicineDisc"
              name="medicineDisc"
              defaultValue={editRow.medicineDisc}

              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="familyDisc">FamilyDisc</label>
            <input
              type="number"
              id="familyDisc"
              name="familyDisc"
              defaultValue={editRow.familyDisc}

              required
            />
          </div>


          <div className="button-group">
            <button type="submit" >Save</button>

          </div>
        </form>

      </Dialog>
      <TableContainer component={Paper} style={tableStyle}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={cellStyle}>
                type
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                rate
              </TableCell>
              <TableCell style={cellStyle}>doctorDisc</TableCell>
              <TableCell align="left" style={cellStyle}>
                medicineDisc
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                familyDisc
              </TableCell>
              <TableCell align="left" style={cellStyle}>

              </TableCell>
              <TableCell align="left" style={cellStyle}>

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="left" style={cellStyle}>
                  {row.rate}
                </TableCell>
                <TableCell align="left" style={cellStyle}>
                  {row.doctorDisc}
                </TableCell>
                <TableCell align="left" style={cellStyle}>
                  {row.medicineDisc}
                </TableCell>
                <TableCell align="left" style={cellStyle}>
                  {row.familyDisc}
                </TableCell>
                <TableCell align="left" style={cellStyle}>
                  <Button sx={{ backgroundColor: '#004E98', color: 'white', marginRight: '10px' }} onClick={() =>  {console.log(row); handleEditClick(row, index)}}>
                    <Typography>
                      Edit
                    </Typography>
                  </Button>
                </TableCell>
                <TableCell align="left" style={cellStyle}>
                  <Button sx={{ backgroundColor: '#a80b0b', color: 'white', marginRight: '10px' }} onClick={() => handleDelete(row._id)}>
                    <Typography>
                      Delete
                    </Typography>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NavLink to="/AddHealthPackages">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </NavLink>
    </>
  );
}


