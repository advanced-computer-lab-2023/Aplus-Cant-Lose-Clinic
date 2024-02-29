import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const adminInitial = {
  loading: false,
  username: "",
  role: "admin",
  error: "",
  password: "",
  patients: [],
  phJoined: [],
  phpending: [],
  response:"",
  admins:[]

};

export const viewPatients = createAsyncThunk("admin/viewPatients", async () => {
  const response = await axios.get(
    "http://localhost:8000/api/admin/viewPatients"
  );
  return response.data.response;
});
export const viewPendPh = createAsyncThunk("admin/viewPendPh", async () => {
  const response = await axios.get(
    "http://localhost:8000/api/admin/viewPendPh"
  );
  return response.data.response;
});

export const viewJoinedPh = createAsyncThunk("admin/viewJoinedPh", async () => {
  const response = await axios.get(
    "http://localhost:8000/api/admin/viewJoinedPh"
  );
  return response.data.response;
});

export const viewMedicine = createAsyncThunk("admin/viewMedicine", async () => {
  const response = await axios.get(
    "http://localhost:8000/api/user/viewMedicine"
  );
  return response.data.response;
});

// export const searchMedicineByName = createAsyncThunk(
//   "admin/searchMedicineByName",
//   async (name) => {
//     try {
//       // Send a request to the backend to search for medicine by name
//       const response = await axios.get(
//         `http://localhost:8000/api/user/searchMedicineByName?name=${name}`
//       );

//       return response.data; // Assuming the response contains the medicine data
//     } catch (error) {
//       throw error; // Let Redux Toolkit handle error state
//     }
//   }
// );

// export const filterMedicineByUse = createAsyncThunk(
//   "admin/filterMedicineByUse",
//   async (use) => {
//     try {
//       // Send a request to the backend API endpoint with the 'use' parameter
//       const response = await axios.get(
//         `http://localhost:8000/api/user/filterMedicineByUse?use=${use}`
//       );

//       return response.data; // Assuming the response contains the medicine data
//     } catch (error) {
//       throw error; // Let Redux Toolkit handle error state
//     }
//   }
// );

export const createAdmin = createAsyncThunk(
  "admin/createAdmin",
  async (data) => {
    const response = await axios.post(
      "http://localhost:8000/api/admin/createAdmin",
      {
        username: data.username,
        password: data.password,
      }
    );
    return response.data.response;
  }
);

export const deletePatient = createAsyncThunk(
  "employee/deletePatient",
  async (data) => {
    const response = await axios.delete(
      `http://localhost:8000/api/admin/deletePatient/${data}`
    );
    return response.data.response;
  }
);
export const deletePharmacist = createAsyncThunk(
  "employee/deletePharmacist",
  async (data) => {
    const response = await axios.delete(
      `http://localhost:8000/api/admin/deletePharmacist/${data}`
    );
    return response.data.response;
  }
);
export const deleteAdmin = createAsyncThunk(
  "employee/deleteAdmin",
  async (data) => {
    const response = await axios.delete(
      `http://localhost:8000/api/admin/deleteAdmin/${data}`
    );
    return response.data.response;
  }
);

const admin = createSlice({
  name: "admin",
  initialState: adminInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients.push(action.payload);
        state.response = "viewPatients";
      })
      .addCase(viewPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
///////////////////////////
    builder
      .addCase(viewPendPh.fulfilled, (state, action) => {
        state.phpend = action.payload;
        state.response = "viewPendPh";
      })
      .addCase(viewPendPh.rejected, (state, action) => {
        state.error = action.error.message;

      });

    builder.addCase(viewJoinedPh.fulfilled, (state, action) => {
      state.phJoined = action.payload;
      state.response = "viewJoinedPh";
    });
///////////////
    builder.addCase(viewMedicine.fulfilled, (state, action) => {
      state.medicine = action.payload;
      state.response = "view medicine";
    });
///////////////////
    builder
    .addCase(createAdmin.pending, (state) => {
      state.loading = true;
    })
    .addCase(createAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.admins.push(action.payload);
      state.response = "add admin";
    })
    .addCase(createAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

///////////////////
    builder
    .addCase(deletePatient.pending, (state) => {
      state.loading = true;
    })
    .addCase(deletePatient.fulfilled, (state, action) => {
      state.loading = false;
    state.patients = state.patients.filter(
        (item) => item._id !== action.payload
      );
      state.response = "delete patient";
    })
    .addCase(deletePatient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
///////////////////////

    builder
    .addCase(deletePharmacist.pending, (state) => {
      state.loading = true;
    })
    .addCase(deletePharmacist.fulfilled, (state, action) => {
      state.loading = false;
      state.pharmacist = state.pharmacist.filter(
        (item) => item._id !== action.payload
      );
      state.response = "delete";
    })
    .addCase(deletePharmacist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
//////////////
    builder
    .addCase(deleteAdmin.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.admins = state.admins.filter(
        (item) => item._id !== action.payload
      );
      state.response = "delete";
  
    })
    .addCase(deleteAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    
    
  },



});

export default admin.reducer;
export const { login } = admin.actions;
