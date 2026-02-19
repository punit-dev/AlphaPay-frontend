import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      return thunkAPI.rejectWithValue(err.response?.message || err.message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    loading: false,
    error: null,
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
      });
  },
});

export default userSlice.reducer;
export { updateUpiPin };
