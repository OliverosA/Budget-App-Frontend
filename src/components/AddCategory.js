import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useRequest from "./useRequest";

const AddCategory = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });
  const { createCategory } = useRequest();

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formValues.name !== "" && formValues.description !== "") {
      try {
        await createCategory(formValues);
        setFormValues({ name: "", description: "" });
        return window.alert("Bank Account Created!");
      } catch (error) {
        console.log(error);
      }
    }
    return window.alert("All fields must be filled");
  };

  return (
    <div className="SignUpContainer">
      <Form onSubmit={handleSubmit} className="SigunUpFormItems">
        <h2>Create Category</h2>
        <Form.Group className="my-2">
          <Form.Label as={"h4"}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Write The Name..."
            value={formValues.name}
            name="name"
            onChange={handleFormChange}
          />
          <Form.Label as={"h4"}>Description </Form.Label>
          <Form.Control
            type="text"
            as="textArea"
            placeholder="Write a description (optional) ..."
            value={formValues.description}
            name="description"
            onChange={handleFormChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="buttonSubmit">
          Create Category
        </Button>
      </Form>
    </div>
  );
};

export default AddCategory;
