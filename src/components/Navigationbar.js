import React, { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/budgetLogo.png";
import NavigationItem from "./NavigationItem";
import SideBar from "./SideBar";
import AuthContext from "../context/auth-context";

const Navigationbar = () => {
  const authCtx = useContext(AuthContext);

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
          <NavigationItem
            isLoggedIn={authCtx.isLoggedIn}
            username={authCtx.currentUser.username}
            email={authCtx.currentUser.email}
          />
        </Container>
      </Navbar>
      {authCtx.isLoggedIn ? <SideBar /> : ""}
    </>
  );
};

export default Navigationbar;
