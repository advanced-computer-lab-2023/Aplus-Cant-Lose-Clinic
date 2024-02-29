import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userInitial = {
  status: "",
  loading: false,
  username: "",
  password: "",
  role: "doctor",
  error: "",
  response: "",
};

const user = createSlice({
  name: "user",
  initialState: userInitial,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.role = action.payload;
    },
  },
});

export default user.reducer;
export const { login } = user.actions;
