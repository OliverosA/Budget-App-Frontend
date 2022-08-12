import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/budgetLogo.png';

const Navigationbar = (props) => {
  if (props.isLoggedIn) {
    return (
      <>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <Navbar.Brand href='#home'>
              <img
                alt=''
                src={logo}
                width='30'
                height='30'
                className='d-inline-block align-top'
              />{' '}
              Budget
            </Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link href='#AddAccount'>Add Account</Nav.Link>
              <Nav.Link href='#Movements'>Exp/Inc</Nav.Link>
              <Nav.Link href='#Transfer'>Transfer</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }

  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>
            <img
              alt=''
              src={logo}
              width='30'
              height='30'
              className='d-inline-block align-top'
            />{' '}
            Budget
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;
