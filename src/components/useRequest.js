import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser, logoutUser } from "../store/slices/auth/authSlice";
import {
  setAllAccounts,
  setSelectedAccount,
  updateAccounts,
  setIncomesSummary,
  setExpenseSummary,
  clearSums,
} from "../store/slices/bankaccount/bankaccountSlice";
import { setAllCurrencies } from "../store/slices/currency/currencySlice";

const useRequest = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { accounts, incomesSummary, expensesSummary } = useSelector(
    (state) => state.bankaccount
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [incomesList, setIncomesList] = useState([]);

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

  const getIncomeSummary = async (bankaccount) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/trasaction/incomeSummary/${bankaccount}`,
        config
      );
      const result = await response.data.data;
      console.log(result);
      dispatch(setIncomesSummary(result));
    } catch (error) {
      console.log(error);
    }
  };

  const getExpenseSummary = async (bankaccount) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/trasaction/expenseSummary/${bankaccount}`,
        config
      );
      const result = await response.data.data;
      //dispatch(setExpenseSummary(result));
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  /*const setSummaries = async () => {
    dispatch(clearSums());
    if (Object.entries(accounts).length !== 0) {
      accounts.map((account) => {
        setIncomesList([...incomesList, getIncomeSummary(account.bankaccount)]);
        console.log(incomesList);
        //getExpenseSummary(account.bankaccount);
      });
      accounts.map((account) => {
        //getIncomeSummary(account.bankaccount);
        //getExpenseSummary(account.bankaccount);
      });
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
          const config = {
            headers: { Authorization: `Bearer ${cookies.auth_token}` },
          };
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
    setIncomesList([]);
    getPersonAccounts();
    getUserInfo();
    getCurrencies();
    //setSummaries();
  }, []);

  return {
    register,
    login,
    logout,
    getPersonAccounts,
    getCurrencies,
    getIncomeSummary,
    getExpenseSummary,
    //setSummaries,
  };
};

export default useRequest;