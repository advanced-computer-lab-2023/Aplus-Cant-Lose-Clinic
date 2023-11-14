import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { addFamilyMember } from "../../features/patientSlice";
const NewFamilyMemberForm = () => {
  const snackbarMessage = useContext(SnackbarContext);
  const role = useSelector((state) => state.user.role);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formStyle = {
    maxWidth: "300px",
    margin: "0 auto",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  };

  const selectStyle = {
    width: "100%",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
  const id = useSelector((state) => state.user.id);
  const handleSubmit = (event) => {
    event.preventDefault();

    const guest = {
      fullName: event.target.elements.fullName.value,
      age: parseInt(event.target.elements.age.value, 10),
      relation: event.target.elements.relation.value,
      gender: event.target.elements.gender.value,
      NID: parseInt(event.target.elements.NID.value, 10),
    };
    console.log(guest);
    const response = dispatch(addFamilyMember({ id, guest }));

    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload === undefined) {
        snackbarMessage(`error: error`, "error");
      } else {
        snackbarMessage("You have successfully added family member", "success");
        navigate(-1);
      }
    });
  };
  return (
    role==="patient"?
    <form onSubmit={handleSubmit} method="post" style={formStyle}>
      <h3
        style={{ textAlign: "center", fontSize: "20px", marginBottom: "10px" }}
      >
        Add a Family Member
      </h3>
      <div>
        <label htmlFor="fullName" style={labelStyle}>
          Full Name:
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          placeholder="Full Name"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="NID" style={labelStyle}>
          National ID:
        </label>
        <input
          type="number"
          id="NID"
          placeholder="National ID"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="age" style={labelStyle}>
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Age"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="gender" style={labelStyle}>
          Gender:
        </label>
        <select id="gender" name="gender" style={selectStyle}>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="none">none</option>
        </select>
      </div>
      <div>
        <label htmlFor="relation" style={labelStyle}>
          Relation:
        </label>
        <select id="relation" name="relation" style={selectStyle}>
          <option>spouse</option>
          <option>child</option>
        </select>
      </div>
      <input type="submit" value="Add Family Member" style={buttonStyle} />
    </form>:navigate("/Login")
  );
};

export default NewFamilyMemberForm;
