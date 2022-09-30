import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: {},
};

export const trasactionSlice = createSlice({
  name: "bankaccount",
  initialState,
  reducers: {
    setAllTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const { setAllTransactions } = trasactionSlice.actions;

export default trasactionSlice.reducer;
