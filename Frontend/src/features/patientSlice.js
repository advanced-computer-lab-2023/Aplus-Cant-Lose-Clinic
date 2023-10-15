import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "../Consts";

export const viewFamilyMembers = createAsyncThunk(
  "patient/viewFamilyMembers",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/patient/viewFamilyMembers/${data.patientId}`
    );
    console.log(data.patientId);

    console.log(response);
    return response;
  }
);
export const viewPrescriptions = createAsyncThunk(
  "patient/viewPrescriptions",
  async (patientId) => {
    const response = await axios.get(
      `${API_URL}/patient/viewPrescriptions/${patientId}`
    );
    console.log(patientId);

    console.log(response);
    return response;
  }
);
//<------------------------------------------------------------------------------------------------
export const viewPrescription = createAsyncThunk(
  "patient/viewSpecificPrescription/",
  async (prescriptionId) => {
    const response = await axios.get(
      `${API_URL}/patient/viewSpecificPrescription/${prescriptionId}`
    );
    console.log(prescriptionId);

    console.log(response);
    return response;
  }
);
//<------------------------------------------------------------------------------------------------

export const viewAppoints = createAsyncThunk(
  "patient/viewAppoints",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/patient/viewAppoints/${data}`
    );

    console.log(response);
    return response;
  }
);

export const addPatient = createAsyncThunk(
  "patient/addPatient",
  async (data) => {
    const response = await axios.post(`${API_URL}/patient/addPatient/`, {
      name: data.name,
      email: data.email,
      username: data.username,
      dBirth: data.dBirth,
      mobile: data.mobile,
      gender: data.gender,
      emergencyContact: data.emergencyContact,

      password: data.password,
    });

    return response;
  }
);
export const addFamilyMember = createAsyncThunk(
  "patient/addFamilyMember",

  async (data) => {
    console.log(data.id);
    const response = await axios.post(
      `${API_URL}/patient/addFamilyMember/${data.id}`,
      {
       
        fullName: data.guest.fullName,
        NID: data.guest.NID,
        age: data.guest.age,
        
        
        gender: data.guest.gender,
        relation: data.guest.relation,
      }
    );

    return response;
  }
);

const patientInitial = {
  // status: "unfilled",
  loading: false,
  username: "none",
  password: "none",
  // role: "none",
  error: "",
  response: "",
  fMembers: [],
  presc: [],
  appoints:[]
};
const patient = createSlice({
  name: "patient",
  initialState: patientInitial,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(viewFamilyMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.fMembers = action.payload.data.familyMembers;
      })
      .addCase(viewFamilyMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder

      .addCase(addFamilyMember.fulfilled, (state, action) => {
        state.loading = false;
        state.fMembers.push(action.payload.data.familyMembers);
      })
      .addCase(addFamilyMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder

      .addCase(viewPrescriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.presc = action.payload.data.prescriptions;
      })
      .addCase(viewPrescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      builder

      .addCase(viewPrescription.fulfilled, (state, action) => {
        state.loading = false;
        state.presc = action.payload.data.prescription;
      })
      .addCase(viewPrescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      builder

      .addCase(viewAppoints.fulfilled, (state, action) => {
        state.loading = false;
        state.appoints = action.payload.data.Appointments;
        console.log(state.appoints);
      })
      .addCase(viewAppoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default patient.reducer;
export const { login } = patient.actions;
