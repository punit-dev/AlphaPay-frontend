import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/transactions`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        },
      );
      console.log(res.data);

      return res.data.allTransactions;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export { fetchTransactions };
export default transactionSlice.reducer;
