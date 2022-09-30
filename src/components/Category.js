import React, { useEffect, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Category = () => {
  const [category, setCategory] = useState([]);

  const getCategories = async () => {
    const response = await fetch('category.json');
    const jsonData = await response.json();
    setCategory(jsonData);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const showCategories = () => {
    return category?.category?.map((item) => (
      <Dropdown.Item key={item.id}>{item.description}</Dropdown.Item>
    ));
  };

  return (
    <>
      <DropdownButton
        as={ButtonGroup}
        key={'variant'}
        variant={'secondary'}
        title={'Category'}
      >
        {showCategories()}
      </DropdownButton>
    </>
  );
};

export default Category;
