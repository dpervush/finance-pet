import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (dispatch, getState) => {
    return await axios.get("/categories/").then((res) => res.data);
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (body, dispatch) => {
    await axios.post(`/categories/`, body).then((res) => res.data);
    dispatch(getCategories());
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (body, dispatch) => {
    await axios.put(`/categories/`, body).then((res) => res.data);
    dispatch(getCategories());
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, dispatch) => {
    await axios.delete(`/categories/${categoryId}`).then((res) => res.data);
    dispatch(getCategories());
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategoryById = (state, categoryId) =>
  state.categories.find((category) => category.id === categoryId);
