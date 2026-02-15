import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchNotification = createAsyncThunk(
  "notification/fetchNotification",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/notifications`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      return res.data?.notifications;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.message || err.message);
    }
  },
);

const markAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (notificationId, thunkAPI) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/notifications/mark-as-read?notificationId=${notificationId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.message || err.message);
    }
  },
);

const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (notificationId, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/notifications/delete-notification?notificationId=${notificationId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.message || err.message);
    }
  },
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    count: localStorage.getItem("notifyCount") || 0,
    loading: false,
    error: null,
  },
  reducers: {
    appendNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.count += 1;
      localStorage.setItem("notifyCount", state.count);
    },
    clearCount: (state) => {
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsRead.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
export const { appendNotification, clearCount } = notificationSlice.actions;
export { fetchNotification, markAsRead, deleteNotification };
