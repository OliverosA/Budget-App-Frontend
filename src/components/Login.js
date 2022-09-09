import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import userImage from '../assets/user.png';
import { Navigate } from 'react-router-dom';
import { useUserDataContext } from '../context/userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoggedIn } = useUserDataContext();

  if (isLoggedIn) return <Navigate to={'/'} />;

  return (
    <div className='LoginFormContainer'>
      <Form className='FormItems'>
        <img src={userImage} className='userImage' />
        <Form.Group className='my-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group className='my-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant='primary'>Submit</Button>
      </Form>
    </div>
  );
};

export default Login;
