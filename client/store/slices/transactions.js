import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (dispatch, getState) => {
    return await axios.get("/transactions/").then((res) => res.data);
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (body, dispatch) => {
    await axios.post(`/transactions/`, body).then((res) => res.data);
    dispatch(getTransactions());
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (body, dispatch) => {
    await axios.put(`/transactions/`, body).then((res) => res.data);
    dispatch(getTransactions());
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, dispatch) => {
    await axios
      .delete(`/transactions/${transactionId}`)
      .then((res) => res.data);
    dispatch(getTransactions());
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});

export const transactionsReducer = transactionsSlice.reducer;

export const selectTransactionById = (state, transactionId) =>
  state.categories.find((transaction) => transaction.id === transactionId);
