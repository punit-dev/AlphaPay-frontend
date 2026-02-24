import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchProfile } from "./authSlice";

const fetchProfilePicOption = createAsyncThunk(
  "/user/fetchProfilePicOption",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/avatar-options`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      return res.data.options;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message,
      );
    }
  },
);

const updateProfilePic = createAsyncThunk(
  "/user/updateProfilePic",
  async (profilePic, thunkAPI) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/update-profile-pic`,
        {
          profileURL: profilePic,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      thunkAPI.dispatch(fetchProfile());
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message,
      );
    }
  },
);

const updateUpiPin = createAsyncThunk(
  "/user/updateUpiPin",
  async (upiPin, thunkAPI) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/update-pin`,
        {
          newPin: upiPin,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message,
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    options: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUpiPin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUpiPin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUpiPin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfilePicOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfilePicOption.fulfilled, (state, action) => {
        state.loading = false;
        state.options = action.payload;
      })
      .addCase(fetchProfilePicOption.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateProfilePic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfilePic.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProfilePic.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
export { updateUpiPin, fetchProfile, updateProfilePic, fetchProfilePicOption };
