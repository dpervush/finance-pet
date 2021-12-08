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
    cardStatLoading: false,
    categoryStatLoading: false,
    periodStatLoading: false
  },
  reducers: {},
  extraReducers: {
    [getStatsByPeriod.pending]: (state, action) => {
      state.periodStatLoading = true;
    },
    [getStatsByCategory.pending]: (state, action) => {
      state.categoryStatLoading = true;
    },
    [getStatsByCard.pending]: (state, action) => {
      state.cardStatLoading = true;
    },

    [getStatsByPeriod.fulfilled]: (state, action) => {
      state.statsByPeriod = action.payload;
      state.periodStatLoading = false;
    },
    [getStatsByCategory.fulfilled]: (state, action) => {
      state.statsByCategory = action.payload;
      state.categoryStatLoading = false;
    },
    [getStatsByCard.fulfilled]: (state, action) => {
      state.statsByCard = action.payload;
      state.cardStatLoading = false;
    },

    [getStatsByPeriod.rejected]: (state, action) => {
      state.error = action.payload;
      state.periodStatLoading = false;
    },
    [getStatsByCategory.rejected]: (state, action) => {
      state.error = action.payload;
      state.categoryStatLoading = false;
    },
    [getStatsByCard.rejected]: (state, action) => {
      state.error = action.payload;
      state.cardStatLoading = false;
    }
  }
});

export const statsReducer = statsSlice.reducer;
