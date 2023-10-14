// frontend/src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import user from "./features/userSlice.js";
import patient from "./features/patientSlice.js";
import doctor from "./features/doctorSlice.js";
import admin from "./features/adminSlice.js";

const store = configureStore({
  reducer: {
    user,
    patient,
    admin,
    doctor
  },
});

export default store;
