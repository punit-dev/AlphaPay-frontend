import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const callSearchApi = createAsyncThunk(
  "users/callSearchApi",
  async (searchVal, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/search?query=${searchVal}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Not Found",
      );
    } finally {
      setLoading(false);
    }
  },
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(callSearchApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(callSearchApi.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(callSearchApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
export { callSearchApi };
