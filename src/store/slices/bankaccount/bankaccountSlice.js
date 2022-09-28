import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: {},
  selectedAccount: {},
  incomesSummary: [],
  expensesSummary: [],
};

export const bankaccountSlice = createSlice({
  name: "bankaccount",
  initialState,
  reducers: {
    setAllAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
    updateAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setIncomesSummary: (state, action) => {
      state.incomesSummary = [...state.incomesSummary, action.payload];
    },
    setExpenseSummary: (state, action) => {
      state.expensesSummary = [...state.expensesSummary, action.payload];
    },
    clearSums: (state) => {
      state.incomesSummary = [];
      state.expensesSummary = [];
    },
  },
});

export const {
  setAllAccounts,
  setSelectedAccount,
  updateAccounts,
  setIncomesSummary,
  setExpenseSummary,
  clearSums,
} = bankaccountSlice.actions;

export default bankaccountSlice.reducer;
