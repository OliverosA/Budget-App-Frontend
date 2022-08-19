import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/budgetLogo.png';
import NavigationItem from './NavigationItem';

const Navigationbar = ({ isLoggedIn, userName }) => {
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
          <NavigationItem isLoggedIn={isLoggedIn} />
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;
