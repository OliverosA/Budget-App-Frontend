import React from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/budgetLogo.png";
import { useUserDataContext } from "../context/userContext";
import NavigationItem from "./NavigationItem";
import SideBar from "./SideBar";

const Navigationbar = () => {
  const { isLoggedIn } = useUserDataContext();
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Budget
          </Navbar.Brand>
          <NavigationItem isLoggedIn={isLoggedIn} />
        </Container>
      </Navbar>
      {isLoggedIn ? <SideBar /> : ""}
    </>
  );
};

export default Navigationbar;
