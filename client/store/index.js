import { configureStore } from "@reduxjs/toolkit";
import { transactionsReducer } from "./slices/transactions";
import { newTransactionReducer } from "./slices/newTransactionSlice";
import { categoriesReducer } from "./slices/categories";
import { cardsReducer } from "./slices/cards";

export const store = configureStore({
  reducer: {
    newTransactionForm: newTransactionReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
    cards: cardsReducer,
  },
});
