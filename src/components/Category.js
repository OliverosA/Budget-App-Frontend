import React, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../store/slices/category/categorySlice";

const Category = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const showCategories = () => {
    return categories?.map((category) => (
      <Dropdown.Item
        key={category.category}
        onClick={() => dispatch(setSelectedCategory(category))}
      >
        {category.name}
      </Dropdown.Item>
    ));
  };

  return (
    <DropdownButton
      as={ButtonGroup}
      key={"variant"}
      variant={"secondary"}
      title={"Category"}
    >
      {showCategories()}
    </DropdownButton>
  );
};

export default Category;
