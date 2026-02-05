import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import transactionSlice from "./transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionSlice,
  },
});
