import React, { useEffect, useState } from 'react';
import Btn from './Btn';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const currencies = [
  { id: 1, symbol: '$', name: 'Dolar', acronym: 'USD' },
  { id: 2, symbol: 'Q', name: 'Quetzal', acronym: 'GTQ' },
  { id: 3, symbol: '€', name: 'Euro', acronym: 'EUR' },
];

const SideBar = () => {
  // states para modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //states for information
  const [account, setAccount] = useState([]);
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [balance, setBalance] = useState(0);

  const getAccounts = async () => {
    const response = await fetch('accounts.json');
    const jsonData = await response.json();
    setAccount(jsonData?.accounts);
  };

  useEffect(() => {
    getAccounts();
  }, []);

  const showAccounts = () => {
    return account?.map((item) => (
      <Dropdown.Item
        as='button'
        eventKey={item.id}
        className='sideMenuItem'
        key={item.id}
      >
        {item.name}
      </Dropdown.Item>
    ));
  };

  const showModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Bank Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <Dropdown.Menu show className='sideMenuHeader'>
        <Dropdown.ItemText>
          <h3>Accounts List</h3>
        </Dropdown.ItemText>
        <Dropdown.Divider />
        {showAccounts()}
        <Dropdown.Divider />
        <Dropdown.Item as='button' onClick={handleShow}>
          Add Bank Account
        </Dropdown.Item>
      </Dropdown.Menu>
      {showModal()}
    </>
  );
};

export default SideBar;
