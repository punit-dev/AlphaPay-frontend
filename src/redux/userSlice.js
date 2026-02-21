import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchProfile = createAsyncThunk(
  "/user/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      return res.data.user;
    } catch (err) {
      console.log(err?.response);
      return thunkAPI.rejectWithValue(err?.response?.data?.message);
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
    user: localStorage.getItem("user"),
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
      });
  },
});

export default userSlice.reducer;
export { updateUpiPin, fetchProfile };
