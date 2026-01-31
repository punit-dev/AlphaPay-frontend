import { createSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";

const loginUser = asyncThunkCreator(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/auth/login`,
        userData,
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const signupUser = asyncThunkCreator(
  "auth/signupUser",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/auth/register`,
        userData,
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const verifyOtp = asyncThunkCreator(
  "auth/verifyOtp",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/auth/verify-otp`,
        userData,
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const resendOtp = asyncThunkCreator(
  "auth/resendOtp",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/auth/resend-otp`,
        userData,
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const logoutUser = asyncThunkCreator("auth/logoutUser", async (_, thunkAPI) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/auth/logout`,
    );
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const initialState = {
  isAuthenticated: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  otp: null,
  message: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearOtp: (state) => {
      state.otp = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.otp = action.payload.otp;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.message = "Signup successful!";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.otp = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otp = action.payload.otp;
        state.message = action.payload.message;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { clearError, clearMessage, clearOtp } = authSlice.actions;
export { loginUser, signupUser, verifyOtp, resendOtp, logoutUser };
