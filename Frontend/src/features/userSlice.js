import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../Consts";
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const userInitial = {
  logged: false,
  loading: false,
  username: "",
  password: "",
  role: "",
  error: "",
  response: "",
  id: "",
  error: "",
  token: userToken,
};
export const loginGuest = createAsyncThunk(
  "user/loginGuest",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: data.username,
        password: data.password,
      });

      console.log(response.token);

      return response;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const sendResetEmail = createAsyncThunk(
  "user/sendResetEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/sendResetEmail`, {
        email: data,
      });

      console.log(response.token);

      return response;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const id = data.id;
      const token = data.token;
      const response = await axios.post(
        `${API_URL}/changePassword/${id}/${token}`,
        {
          password: data.password,
        }
      );

      console.log(response.token);

      return response;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const logout = createAsyncThunk(
  "user/logout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/logout`);

      console.log(response.token);

      return response;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

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
        state.token = action.payload.data.token;
        localStorage.setItem("userToken", state.token);

        console.log(state.token);
      })
      .addCase(loginGuest.rejected, (state, action) => {
        state.logged = false;
        state.username = "";
        state.id = 0;
        state.role = "none";
        state.error = action.payload;
        console.log(state.error);
      });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.token = null;
      state.logged = false;
      state.username = "";
      state.password = "";
      state.role = "";
      state.id = "";
      localStorage.removeItem("userToken"); // Remove the user token

      console.log(action.payload);
      console.log(state);
    });
    builder.addCase(sendResetEmail.fulfilled, (state, action) => {});
    builder.addCase(changePassword.fulfilled, (state, action) => {});
  },
});

export default user.reducer;
