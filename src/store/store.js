import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth/authSlice";
import bankaccount from "./slices/bankaccount/bankaccountSlice";
import currency from "./slices/currency/currencySlice";
import modal from "./slices/modal/modalSlice";

export const store = configureStore({
  reducer: {
    auth,
    bankaccount,
    currency,
    modal,
  },
});
