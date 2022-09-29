import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: {},
  bankIdList: [],
  selectedAccount: {},
  incomesSummary: {},
  expensesSummary: [],
};

export const bankaccountSlice = createSlice({
  name: "bankaccount",
  initialState,
  reducers: {
    setAllAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setBankIdList: (state, action) => {
      state.bankIdList = [...state.bankIdList, action.payload];
    },
    clearBankIdList: (state) => {
      state.bankIdList = [];
    },
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
    updateAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setIncomesSummary: (state, action) => {
      state.incomesSummary = action.payload;
      console.log(action.payload);
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
  setBankIdList,
  clearBankIdList,
  setSelectedAccount,
  updateAccounts,
  setIncomesSummary,
  setExpenseSummary,
  clearSums,
} = bankaccountSlice.actions;

export default bankaccountSlice.reducer;
