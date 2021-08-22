import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCards = createAsyncThunk(
  "cards/getCards",
  async (dispatch, getState) => {
    return await axios.get("/cards/").then((res) => res.data);
  }
);

export const createCard = createAsyncThunk(
  "cards/createCard",
  async (body, dispatch) => {
    await axios.post(`/cards/`, body).then((res) => res.data);
    dispatch(getCards());
  }
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (body, dispatch) => {
    await axios.put(`/cards/`, body).then((res) => res.data);
    dispatch(getCards());
  }
);

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (cardId, dispatch) => {
    await axios.delete(`/cards/${cardId}`).then((res) => res.data);
    dispatch(getCards());
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [],
  },
  reducers: {},
  extraReducers: {
    [getCards.fulfilled]: (state, action) => {
      state.cards = action.payload;
    },
  },
});

export const cardsReducer = cardsSlice.reducer;

export const selectCardById = (state, cardId) =>
  state.cards.find((card) => card.id === cardId);
