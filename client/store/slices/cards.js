import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";
import { getStatsByCard } from "./stats";

export const getCards = createAsyncThunk("cards/getCards", async () => {
  return await $api.get("/cards/").then((res) =>
    res.data.map((item) => ({
      ...item.card_info,
      id: item.id
    }))
  );
});

export const createCard = createAsyncThunk(
  "cards/createCard",
  async (body, { dispatch }) => {
    await $api.post(`/cards/`, body).then((res) => res.data);
    dispatch(getCards());
  }
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (body, { dispatch }) => {
    await $api
      .put(`/cards/`, body)
      .then((res) => res.data)
      .then(() => dispatch(getCards()))
      .then(() => dispatch(getStatsByCard()));
  }
);

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (cardId, { dispatch }) => {
    await $api.delete(`/cards/${cardId}`).then((res) => res.data);
    dispatch(getCards());
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [],
    error: null,
    loading: false
  },
  reducers: {},
  extraReducers: {
    [getCards.pending]: (state, action) => {
      state.loading = true;
    },
    [getCards.fulfilled]: (state, action) => {
      state.cards = action.payload;
      state.loading = false;
    },
    [getCards.rejected]: (state, action) => {
      state.cards = action.payload;
      state.loading = false;
    },
    [createCard.pending]: (state, action) => {
      state.loading = true;
    },
    [createCard.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateCard.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCard.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [deleteCard.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCard.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    }
  }
});

export const cardsReducer = cardsSlice.reducer;

export const selectCardById = (state, cardId) =>
  state.cards.find((card) => card.id === cardId);
