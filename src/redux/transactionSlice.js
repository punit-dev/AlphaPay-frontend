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
        err?.response?.data?.message || err.message,
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
        err?.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const userToUserTransfer = createAsyncThunk(
  "transactions/userToUserTransfer",
  async (transferData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/transactions/user-to-user`,
        transferData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        },
      );
      if (transferData.method == "wallet") {
        const user = JSON.parse(localStorage.getItem("user"));
        const currentBalance = user.walletBalance - transferData.amount;
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, walletBalance: currentBalance }),
        );
      }
      return res.data.transaction;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message,
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
    expenses: 0,
    status: "Processing",
    loading: false,
    error: null,
  },
  reducers: {
    appendTransaction: (state, action) => {
      state.transactions.unshift(action.payload);
    },
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
        const user = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, walletBalance: state.balance }),
        );
        state.expenses = action.payload.expenses;
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
      })
      .addCase(userToUserTransfer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "Processing";
      })
      .addCase(userToUserTransfer.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "Successful";
        state.txn = action.payload;
      })
      .addCase(userToUserTransfer.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.status = "Failed";
      });
  },
});

export { fetchTransactions, fetchTxn, userToUserTransfer };
export const { appendTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
