import React, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedCategory,
  setSelectedCategory,
} from "../store/slices/category/categorySlice";

const Category = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const category = categories.find(
      (item) => item.category === Number(event.target.value)
    );
    if (category !== undefined) return dispatch(setSelectedCategory(category));
    return dispatch(clearSelectedCategory());
  };

  return (
    <>
      <input
        type={"text"}
        id="account_number"
        name="account_number"
        placeholder="Search category..."
        onChange={handleChange}
        list="categoriesList"
      />
      <datalist id="categoriesList">
        {Object.entries(categories).length !== 0
          ? categories.map((category) => (
              <option key={category.category} value={category.category}>
                {category.name}
              </option>
            ))
          : ""}
      </datalist>
    </>
  );
};

export default Category;
