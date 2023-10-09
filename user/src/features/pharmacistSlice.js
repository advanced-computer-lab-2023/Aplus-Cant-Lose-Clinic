import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const pharmacistInitial = {
  status: true,
  loading: false,
  username: "none",
  password: "none",
  role: "none",
  error: "",
  response: "",
};
const pharmacist = createSlice({
  name: "pharmacist",
  initialState: pharmacistInitial,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.role = action.payload;
    },
  },
});

export default pharmacist.reducer;
export const { login } = pharmacist.actions;
