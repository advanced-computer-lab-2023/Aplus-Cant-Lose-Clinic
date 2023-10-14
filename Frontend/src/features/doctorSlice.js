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
    const response = await axios.post(`${API_URL}/doctor/addDoctor`,{
      ...data
    });
    return response;
  }
);

export const editDoctorCredentials = createAsyncThunk(
  "doctor/editDoctorCredentials",
  async (data) => {
    // TODO: Add proper API call here
    // const response = await axios.post(`${API_URL}/doctor/addDoctor`,{
    //   ...data
    // });
    return null;
  }
);

export const fetchPatientList = createAsyncThunk(
  "doctor/fetchPatientList",
  async () => {
    // TODO: Add proper API call here
    // const response = await axios.post(`${API_URL}/doctor/addDoctor`,{
    //   ...data
    // });

    // For now will use dummy data
    const dummy_data = [
      {name: 'First Patient',
       appointmentDate: '2021-10-18',
       status: 'Follow Up',
      },
      {
        name: 'Second Patient',
        appointmentDate: '2024-10-18',
        status: 'Appointment',
      }
    ]

    return dummy_data;
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
    .addCase(fetchPatientList.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchPatientList.fulfilled, (state, action) => {
      state.patientsList = action.payload;

      state.loading = false;
    })
    .addCase(fetchPatientList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  },
});

export default doctor.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =
  doctor.actions;
