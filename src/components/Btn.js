import React from 'react';
import Button from 'react-bootstrap/Button';

const Btn = (props) => {
  return (
    <>
      <Button {...props}>{props.text}</Button>{' '}
    </>
  );
};

export default Btn;
