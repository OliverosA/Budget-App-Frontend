import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser, logoutUser } from "../store/slices/auth/authSlice";
import {
  setAllAccounts,
  setBankIdList,
  clearBankIdList,
  setSelectedAccount,
  updateAccounts,
  setIncomesSummary,
  setExpenseSummary,
  clearSums,
} from "../store/slices/bankaccount/bankaccountSlice";
import { setAllCurrencies } from "../store/slices/currency/currencySlice";
import { setAllTrasanctions } from "../store/slices/transaction/transaction";

const useRequest = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);
  const { currencies } = useSelector((state) => state.currency);
  const { accounts, bankIdList, incomesSummary, expensesSummary } = useSelector(
    (state) => state.bankaccount
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [requestBody, setRequestBody] = useState({});

  const config = {
    headers: { Authorization: `Bearer ${cookies?.auth_token}` },
  };

  const register = async ({ username, email, password }) => {
    try {
      const body = { username, email, password };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/register`,
        body
      );
      if (response.status === 200) return response;
    } catch (error) {
      return error;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const body = { email, password };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/login`,
        body
      );
      const { data } = response;
      setCookie("auth_token", data.token, {
        expires: new Date(2147483647 * 1000),
      });
      dispatch(loginUser(data.data[0]));
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      dispatch(logoutUser());
      removeCookie("auth_token");
      resolve();
    });
  };

  const getPersonAccounts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/bankaccount`,
        config
      );
      const { data } = response;
      dispatch(setAllAccounts(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrencies = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/currency`,
        config
      );
      const { data } = response;
      dispatch(setAllCurrencies(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getIncomeSummary = async () => {
    if (Object.entries(bankIdList).length !== 0) {
      try {
        const body = { accounts: bankIdList };
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/trasaction/incomeSummary`,
          body,
          config
        );
        const result = await response.data.data;
        dispatch(setIncomesSummary(result));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getExpenseSummary = async () => {
    if (Object.entries(bankIdList).length !== 0) {
      try {
        const body = { accounts: bankIdList };
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/trasaction/expenseSummary`,
          body,
          config
        );
        const result = await response.data.data;
        dispatch(setExpenseSummary(result));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAccountCurrencySymbol = (id_currency) => {
    if (Object.entries(currencies).length !== 0) {
      try {
        const result = currencies?.find(
          (item) => item.currency === id_currency
        );
        return result.symbol;
      } catch (error) {
        console.log(error);
      }
    }
    return "";
  };

  const getAccountCurrencyAcronym = (id_currency) => {
    if (Object.entries(currencies).length !== 0) {
      try {
        const result = currencies?.find(
          (item) => item.currency === id_currency
        );
        return result.acronym;
      } catch (error) {
        console.log(error);
      }
    }
    return "";
  };

  /*const getTransactions = ({ bankaccount }) => {
    try {
      const result = axios.
    } catch (error) {
      
    }
  };*/

  useEffect(() => {
    const getUserInfo = async () => {
      if (
        !isLoggedIn &&
        cookies.auth_token &&
        cookies.auth_token !== "undefined"
      ) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/person`,
            config
          );
          const { data } = response;
          dispatch(loginUser(data.data[0]));
          navigate("/", { replace: true });
        } catch (error) {
          console.log(error);
        }
      }
    };
    getPersonAccounts();
    getUserInfo();
    getCurrencies();
  }, []);

  useEffect(() => {
    const initList = () => {
      if (Object.entries(accounts).length !== 0) {
        dispatch(clearBankIdList());
        accounts.map((account) => {
          dispatch(setBankIdList(account.bankaccount));
        });
      }
    };
    initList();
  }, []);

  useEffect(() => {
    getIncomeSummary();
    getExpenseSummary();
  }, [bankIdList]);

  return {
    register,
    login,
    logout,
    getPersonAccounts,
    getCurrencies,
    getIncomeSummary,
    getExpenseSummary,
    getAccountCurrencySymbol,
    getAccountCurrencyAcronym,
    //setSummaries,
  };
};

export default useRequest;
