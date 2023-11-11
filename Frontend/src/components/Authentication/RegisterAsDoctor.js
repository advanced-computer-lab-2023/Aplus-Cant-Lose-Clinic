import React, { useState, useContext } from "react";
import "./styleRegister.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Consts.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerDoctor } from "../../features/doctorSlice";
import { SnackbarContext } from "../../App";
function RegisterAsDoctor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const snackbarMessage = useContext(SnackbarContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: dispatch this, the problem is the backend api
    // is still expecting docs and doesnt take into account
    // speciality.
    const sampleData = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      username: event.target.elements.username.value,
      dBirth: event.target.elements.dBirth.value,
      gender: event.target.elements.gender.value,
      password: event.target.elements.password.value,
      rate: event.target.elements.rate.value,
      affilation: event.target.elements.affilation.value,
      background: event.target.elements.background.value,
      speciality: event.target.elements.speciality.value,
    };
    //  name,

    const response = dispatch(registerDoctor(sampleData));
    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload=== undefined) {
        snackbarMessage(`error: ${responseData} has occurred`, "error");

      } else {
        snackbarMessage("You have successfully registered but needed to upload more documents", "success");
        navigate("/upload");
      }
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-body">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username here..."
          required
        />

        <label for="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your full name here..."
          required
        />

        <label for="email">Email</label>
        <input
          style={{ width: "92%" }}
          type="email"
          id="email"
          placeholder="Enter your email address here..."
          required
        />

        <label className="form__label" for="password">
          Password
        </label>
        <input
          style={{ width: "92%" }}
          type="password"
          id="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          placeholder="Enter your password here..."
          required
        />

        <label for="gender">Gender</label>
        <select style={{ width: "92%" }} id="gender" name="Gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="none">None</option>
        </select>

        <label className="form__label" for="dBirth">
          Date of Birth
        </label>
        <input type="date" id="dBirth" max="2002-10-15" required />

        <label for="rate">Hourly Rate</label>
        <input
          style={{ width: "92%" }}
          type="number"
          id="rate"
          placeholder="10.00$ "
          required
        />

        <label for="affilation">Affiliation(Hospital)</label>
        <input
          style={{ width: "92%" }}
          type="text"
          id="affilation"
          placeholder="Affiliation "
          required
        />

        <label for="background">Educational Background</label>
        <input
          style={{ width: "92%" }}
          type="text"
          id="background"
          placeholder="Educational Background"
          required
        />

        <label for="specialty">Speciality</label>
        <input
          style={{ width: "92%" }}
          type="text"
          id="speciality"
          placeholder="Enter your speciality here..."
          required
        />
      </div>
      <div className="footer">
        <button type="submit" class="btn">
          Register
        </button>
      </div>
    </form>
  );
}
export default RegisterAsDoctor;
