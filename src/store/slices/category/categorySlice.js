import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: {},
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setAllCategories: (state, action) => {
      state.categories = action.payload;
    },
    clearCategories: (state) => {
      state.categories = {};
    },
  },
});

export const { setAllCategories, clearCategories } = categorySlice.actions;

export default categorySlice.reducer;
