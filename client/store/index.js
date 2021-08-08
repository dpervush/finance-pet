import { configureStore } from "@reduxjs/toolkit";
import { newTransactionReducer } from "./slices/newTransactionSlice";

export const store = configureStore({
  reducer: { newTransactionForm: newTransactionReducer },
});
