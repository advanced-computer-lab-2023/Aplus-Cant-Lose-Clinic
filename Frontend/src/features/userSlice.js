import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../Consts";
const userInitial = {
  logged: false,
  loading: false,
  username: "",
  password: "",
  role: "",
  error: "",
  response: "",
  id: "652854c4fdc81066580f578e",
  error:""
};
export const loginGuest = createAsyncThunk("user/loginGuest", async (data,thunkAPI) => {

  const response = await axios.post(`${API_URL}/login`, {
    username: data.username,

    // docs: data.docs,
    password: data.password,
  });


  return response;
});

const user = createSlice({
  name: "user",
  initialState: userInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginGuest.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginGuest.fulfilled, (state, action) => {
        state.loading = false;
        state.logged = true;

        state.role = action.payload.data.role;
        state.username = action.payload.data.userData.fUser.username;
        state.id = action.payload.data.userData.fUser._id;
        console.log(action.payload.data.userData.fUser._id);
      })
      .addCase(loginGuest.rejected, (state, action) => {
        state.logged = false;
        state.username = "";
        state.id = 0;
        state.role = "none";
      state.error=action.payload
       console.log(state.error);
      });
  },
});

export default user.reducer;
