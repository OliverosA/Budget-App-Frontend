import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleShowValues = () => {
    console.log(`El usuario Es: ${username}
    su password es: ${password}`);
  };

  const handleChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
    <div className='FormContainer'>
      <Form className='FormItems'>
        <Form.Group className='my-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Username'
            value={username}
            onChange={handleChangeUsername}
          />
        </Form.Group>
        <Form.Group className='my-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={handleChangePassword}
          />
        </Form.Group>
        <Button variant='primary' onClick={handleShowValues}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
