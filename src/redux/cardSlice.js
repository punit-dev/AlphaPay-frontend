import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const saveCard = createAsyncThunk(
  "card/saveCard",
  async (cardData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/cards/register-card`,
        cardData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      return res.data.card;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message,
      );
    }
  },
);

const fetchCards = createAsyncThunk("card/fetchCards", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/cards`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res.data.cards;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err?.response?.data?.message || err?.message,
    );
  }
});

const deleteCard = createAsyncThunk(
  "card/deleteCard",
  async (cardId, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/cards/delete-card`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            query: cardId,
          },
        },
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err?.message,
      );
    }
  },
);

const cardSlice = createSlice({
  name: "card",
  initialState: {
    cards: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards.unshift(action.payload);
      })
      .addCase(saveCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cardSlice.reducer;

export { saveCard, fetchCards, deleteCard };
