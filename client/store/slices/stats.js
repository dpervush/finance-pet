import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";

export const getStatsByPeriod = createAsyncThunk(
  "stats/getStatsByPeriod",
  async ({ period }) => {
    return await $api
      .get("/stats/", { params: { period } })
      .then((res) => res.data);
  }
);
export const getStatsByCategory = createAsyncThunk(
  "stats/getStatsByCategory",
  async () => {
    return await $api.get("/stats/categories").then((res) => res.data);
  }
);
export const getStatsByCard = createAsyncThunk(
  "stats/getStatsByCard",
  async () => {
    return await $api.get("/stats/cards").then((res) => res.data);
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    statsByPeriod: [],
    statsByCategory: [],
    statsByCard: [],
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getStatsByPeriod.fulfilled]: (state, action) => {
      state.statsByPeriod = action.payload;
    },
    [getStatsByCategory.fulfilled]: (state, action) => {
      state.statsByCategory = action.payload;
    },
    [getStatsByCard.fulfilled]: (state, action) => {
      state.statsByCard = action.payload;
    },
  },
});

export const statsReducer = statsSlice.reducer;
