import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/*const currencies = [
  { id: 1, symbol: "$", name: "Dolar", acronym: "USD" },
  { id: 2, symbol: "Q", name: "Quetzal", acronym: "GTQ" },
  { id: 3, symbol: "€", name: "Euro", acronym: "EUR" },
];*/

const SignUp = () => {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <div className="SignUpContainer">
      <Form className="SigunUpFormItems" onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        <Form.Group className="my-4">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Write your email..."
            value={values.email}
            onChange={handleInputChange}
          />
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Write your username..."
            value={values.username}
            onChange={handleInputChange}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Set your password..."
            value={values.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="buttonSubmit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
