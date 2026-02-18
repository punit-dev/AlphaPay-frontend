import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const makeReq = createAsyncThunk("request/makeReq", async (data, thunkAPI) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/requests/create`,
      data,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );

    return res.data.request;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.message);
  }
});

const fetchReq = createAsyncThunk("request/fetchReq", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/requests`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.data.requests;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.message);
  }
});

const fetchReqById = createAsyncThunk(
  "request/fetchReqById",
  async (reqId, thunkAPI) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/requests`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: {
          reqId: reqId,
        },
      });

      return res.data.request;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.message);
    }
  },
);

const acceptReq = createAsyncThunk(
  "request/acceptReq",
  async (reqId, thunkAPI) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/requests/accept`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            reqId: reqId,
          },
        },
      );
      return res.data.request;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.message);
    }
  },
);

const deniedReq = createAsyncThunk(
  "request/deniedReq",
  async (reqId, thunkAPI) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/requests/denied`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            reqId,
          },
        },
      );

      return res.data.request;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.message);
    }
  },
);

const deleteReq = createAsyncThunk(
  "request/deleteReq",
  async (reqId, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/requests/delete`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            reqId,
          },
        },
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.message);
    }
  },
);

const requestSlice = createSlice({
  name: "request",
  initialState: {
    requests: [],
    request: null,
    isLoading: false,
    err: null,
  },
  reducers: {
    appendRequest: (state, action) => {
      state.requests.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeReq.pending, (state) => {
        state.isLoading = true;
        state.err = null;
      })
      .addCase(makeReq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.request = action.payload;
        state.requests.unshift(action.payload);
      })
      .addCase(makeReq.rejected, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      })
      .addCase(fetchReq.pending, (state) => {
        state.isLoading = true;
        state.err = null;
      })
      .addCase(fetchReq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requests = action.payload;
      })
      .addCase(fetchReq.rejected, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      })
      .addCase(fetchReqById.pending, (state) => {
        state.isLoading = true;
        state.err = null;
      })
      .addCase(fetchReqById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.request = action.payload;
      })
      .addCase(fetchReqById.rejected, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      })
      .addCase(acceptReq.pending, (state) => {
        state.isLoading = true;
        state.err = null;
      })
      .addCase(acceptReq.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(acceptReq.rejected, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      })
      .addCase(deniedReq.pending, (state) => {
        state.isLoading = true;
        state.err = null;
      })
      .addCase(deniedReq.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deniedReq.rejected, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      })
      .addCase(deleteReq.pending, (state) => {
        state.isLoading = true;
        state.err = null;
      })
      .addCase(deleteReq.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteReq.rejected, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      });
  },
});

export const { appendRequest } = requestSlice.actions;
export default requestSlice.reducer;
export { makeReq, fetchReq, fetchReqById, acceptReq, deniedReq, deleteReq };
