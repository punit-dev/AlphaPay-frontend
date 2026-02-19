import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import transactionReducer from "./transactionSlice";
import notificationReducer from "./notificationSlice";
import requestReducer from "./requestSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    notification: notificationReducer,
    request: requestReducer,
    user: userReducer,
  },
});
