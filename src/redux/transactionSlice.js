import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (limit, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/transactions?limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        },
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

const fetchTxn = createAsyncThunk(
  "transactions/fetchTxn",
  async (txnId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/transactions/get-transaction-by-id?query=${txnId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      return res.data.transaction;
    } catch (err) {
      if (axios.isCancel(err)) return;
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    txn: null,
    balance: 0,
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
        state.transactions = action.payload.allTransactions;
        state.balance = action.payload.currentBalance;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchTxn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTxn.fulfilled, (state, action) => {
        state.txn = action.payload;
        state.loading = false;
      })
      .addCase(fetchTxn.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export { fetchTransactions, fetchTxn };
export default transactionSlice.reducer;
