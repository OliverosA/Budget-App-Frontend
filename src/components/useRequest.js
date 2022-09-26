import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { loginUser, logoutUser } from "../store/slices/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useRequest = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  const { currentUser, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (username, email, password) => {
    try {
      const body = { username: username, email: email, password: password };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/register`,
        body
      );
      if (response.status === 200) return response;
    } catch (error) {
      return error;
    }
  };

  const login = async (email, password) => {
    try {
      const body = { email: email, password: password };
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
    getUserInfo();
  }, []);

  return {
    register,
    login,
    logout,
  };
};

export default useRequest;
