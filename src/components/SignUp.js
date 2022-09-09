import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const currencies = [
  { id: 1, symbol: '$', name: 'Dolar', acronym: 'USD' },
  { id: 2, symbol: 'Q', name: 'Quetzal', acronym: 'GTQ' },
  { id: 3, symbol: '€', name: 'Euro', acronym: 'EUR' },
];

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [balance, setBalance] = useState(0);

  const handleSubmit = () => {};

  return (
    <div className='SignUpContainer'>
      <Form className='SigunUpFormItems'>
        <h2>SignUp</h2>
        <Form.Group className='my-4'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Write your email...'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Write your username...'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Set your password...'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Form.Label>Bank Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Write your Bank name...'
            value={bankName}
            onChange={(event) => setBankName(event.target.value)}
          />
          <Form.Label>Bank Account</Form.Label>
          <Form.Control
            type='text'
            placeholder='Write your Bank account...'
            value={bankAccount}
            onChange={(event) => setBankAccount(event.target.value)}
          />
          <Form.Label>Currency</Form.Label>
          <Form.Select
            className='mb-3'
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            <option value={currency}>Select a currency...</option>
            {currencies.map((option) => (
              <option
                value={option.acronym}
                key={option.id}
              >{`${option.acronym} (${option.symbol})`}</option>
            ))}
          </Form.Select>
          <Form.Label>Initial Balance</Form.Label>
          <Form.Control
            type='number'
            value={balance}
            onChange={(event) => setBalance(event.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit' onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
