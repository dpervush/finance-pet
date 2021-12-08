import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";
import { TRANSACTIONS_PER_PAGE } from "../../utils/constants";
import { getCards } from "./cards";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (body, { dispatch, getState }) => {
    const bodyToSend = body || { page: 1, size: TRANSACTIONS_PER_PAGE };

    return await $api
      .get("/transactions/", {
        params: { ...bodyToSend }
      })
      .then((res) => {
        return {
          count: res.data.count,
          items: [
            ...res.data.rows.map((item) => ({
              id: item.id,
              ...item.transaction_info,
              card: {
                id: item.account_card.id,
                ...item.account_card.card_info
              },
              category: {
                id: item.account_category.id,
                ...item.account_category.category_info
              }
            }))
          ]
        };
      });
  }
);

export const getRecentTransactions = createAsyncThunk(
  "transactions/getRecentTransactions",
  async () => {
    return await $api.get("/transactions/recent").then((res) =>
      res.data.map((item) => ({
        id: item.id,
        ...item.transaction_info,
        card: {
          id: item.account_card.id,
          ...item.account_card.card_info
        },
        category: {
          id: item.account_category.id,
          ...item.account_category.category_info
        }
      }))
    );
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (body, { dispatch }) => {
    await $api.post(`/transactions/`, body).then((res) => res.data);
    dispatch(getTransactions());
    dispatch(getCards());
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (body, { dispatch }) => {
    await $api.put(`/transactions/`, body).then((res) => res.data);
    dispatch(getTransactions());
    dispatch(getCards());
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, { dispatch }) => {
    await $api.delete(`/transactions/${transactionId}`).then((res) => res.data);
    dispatch(getTransactions());
    dispatch(getCards());
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    recentTransactions: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [getTransactions.pending]: (state, action) => {
      state.loading = true;
    },
    [getTransactions.fulfilled]: (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
    },
    [getTransactions.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [getRecentTransactions.pending]: (state, action) => {
      state.loading = true;
    },
    [getRecentTransactions.fulfilled]: (state, action) => {
      state.recentTransactions = action.payload;
      state.loading = false;
    },
    [getRecentTransactions.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [createTransaction.pending]: (state, action) => {
      state.loading = true;
    },
    [createTransaction.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateTransaction.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTransaction.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteTransaction.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTransaction.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    }
  }
});

export const transactionsReducer = transactionsSlice.reducer;

export const selectTransactionById = (state, transactionId) =>
  state.categories.find((transaction) => transaction.id === transactionId);
