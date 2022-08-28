import React, { useEffect, useState } from 'react';
import Btn from './Btn';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SideBar = () => {
  // states para modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (args) => setShow(false || args);

  const [account, setAccount] = useState([]);

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
        eventKey={item.id}
        className='sideMenuItem'
        key={item.id}
        onClick={() => {
          showModal(item.name);
          handleShow(true);
        }}
      >
        {item.name}
      </Dropdown.Item>
    ));
  };

  const showModal = (name) => {
    if (name) {
      return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{name}</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };

  return (
    <div className='sideMenuContainer'>
      <Dropdown.Menu show className='sideMenuHeader'>
        <Dropdown.Item eventKey='1'>
          <Btn variant='primary' />
          <label className='sideMenuContainer'>Accounts</label>
        </Dropdown.Item>
        <Dropdown.Divider />
        {showAccounts()}
      </Dropdown.Menu>
    </div>
  );
};

export default SideBar;
