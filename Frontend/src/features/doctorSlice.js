import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../Consts";


const doctorState = {
  status: true,
  loading: false,
  username: "none",
  password: "none",
  role: "none",
  patientsList: [],
  error: "",
  response: "",
  appointments:[]

};

// router.post("/addPrescription", addPrescription);
// router.post("/getUser", getUser);
// router.post("/addDoctor", addDoctor);
// router.get("/getPatients/:id", getPatients);
// router.get("/searchPatientByName", searchPatientByName);
// router.get("/patientsInUpcomingApointments/:doctorId", patientsInUpcomingApointments);
// router.put("/editDoctor/:id", editDoctor);
// router.get("/doctorFilterAppointments/:doctorId", doctorFilterAppointments);



export const registerDoctor = createAsyncThunk(
  "doctor/registerDoctor",
  async (data) => {
    const response = await axios.post(`${API_URL}/doctor/addDoctor`, {
      ...data
    });
    return response;
  }
);

export const editDoctorCredentials = createAsyncThunk(
  "doctor/editDoctorCredentials",
  async (data) => {
    try {
      const response = await axios.put(`${API_URL}/doctor/editDoctor/${data.id}`, data);
      return response; // Return the response data
    } catch (error) {
      throw error; // Rethrow any errors for handling in your component
    }
  }
);

//
//  const { id } = req.params; // Get the ID from the request parameters



export const getPatients = createAsyncThunk(
  "doctor/getPatients",
  async (id) => {

  

    const response = await axios.get(`${API_URL}/doctor/getPatients/${id}`);

    return response;
  }
);

export const appointmentPatients = createAsyncThunk(
  "doctor/appointmentPatients",
  async (id) => {

    const response = await axios.get(`${API_URL}/doctor/appointmentPatients/${id}`);

    return response;
  }
);




export const doctor = createSlice({
  name: "doctor",
  initialState: doctorState,
  reducers: {
    changeStateTrue: (state) => {
      state.updateState = true;
    },
    changeStateFalse: (state) => {
      state.updateState = false;
    },
    clearResponse: (state) => {
      state.response = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerDoctor.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
    builder
      .addCase(getPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.patientsList = action.payload.data.patients;

        state.loading = false;
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      builder
      .addCase(appointmentPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(appointmentPatients.fulfilled, (state, action) => {
        state.appointments = action.payload.data.appointments;
        state.loading = false;
      })
      .addCase(appointmentPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      

  },
});

export default doctor.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =
  doctor.actions;