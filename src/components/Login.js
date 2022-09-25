import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import userImage from "../assets/user.png";
import { useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  if (authCtx.isLoggedIn) return <Navigate to={"/"} replace />;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values.email !== "" && values.password !== "") {
      try {
        authCtx.login(values.email, values.password);
        return navigate("/", { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
    return window.alert("All the inputs must be full");
  };

  return (
    <div className="LoginFormContainer">
      <Form className="FormItems" onSubmit={handleSubmit}>
        <img src={userImage} className="userImage" alt="UserImage" />
        <Form.Group className="my-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Write your email..."
            value={values.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Set your password..."
            value={values.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
