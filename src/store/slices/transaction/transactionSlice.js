import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: {},
  bankAccountTransactions: {},
};

export const trasactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setAllTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setBankAccountTransactions: (state, action) => {
      state.bankAccountTransactions = action.payload;
    },
  },
});

export const { setAllTransactions, setBankAccountTransactions } =
  trasactionSlice.actions;

export default trasactionSlice.reducer;
