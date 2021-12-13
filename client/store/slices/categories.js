import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";
import { clearError } from "./auth";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (dispatch, getState) => {
    return await $api.get("/categories/").then((res) =>
      res.data.map((item) => ({
        ...item.category_info,
        id: item.id
      }))
    );
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (body, { dispatch }) => {
    await $api.post(`/categories/`, body).then((res) => res.data);
    dispatch(getCategories());
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (body, { dispatch }) => {
    await $api.put(`/categories/`, body).then((res) => res.data);
    dispatch(getCategories());
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { dispatch }) => {
    await $api.delete(`/categories/${categoryId}`).then((res) => res.data);
    dispatch(getCategories());
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(clearError, (state, action) => {
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.error;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
        }
      );
  }
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategoryById = (state, categoryId) =>
  state.categories.find((category) => category.id === categoryId);
