import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  // ======================= USE OF SET COOKIE =======================
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  // ==================================================================
  const [currentUser, setCurrentUser] = useState({});
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const register = (first_name, email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              first_name,
            }),
          }
        );
        const data = await response.json();
        if (response.status === 200) {
          return resolve(data.message);
        }
        reject(data.message);
      } catch (e) {
        reject(e);
      }
    });
  };

  const login = async (email, password) => {
    const body = { email: email, password: password };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/login`,
        body
      );
      const { data } = response;
      console.log(data);
      setCookie("auth_token", data.token, {
        expires: new Date(2147483647 * 1000),
      });
      setCurrentUser(data.data[0]);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      setCurrentUser({});
      setLoggedIn(false);
      removeCookie("auth_token");
      resolve();
    });
  };

  useEffect(() => {
    const getUserInfo = async () => {
      if (
        Object.entries(currentUser).length === 0 &&
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
          setLoggedIn(true);
          setCurrentUser(data.data[0]);
        } catch (error) {
          console.log(error);
        }
      }
      setLoadingUserInfo(false);
    };
    getUserInfo();
    console.log(`${isLoggedIn} desde el context`);
  }, []);

  const authContext = {
    currentUser,
    isLoggedIn,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {!loadingUserInfo && props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
