import React, { useContext } from "react";
import { Nav, Dropdown, Stack, ButtonGroup } from "react-bootstrap";
import Btn from "./Btn";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

const NavigationItem = ({ isLoggedIn, username, email }) => {
  const authCtx = useContext(AuthContext);

  const HandleLogout = async (e) => {
    e.preventDefault();
    try {
      authCtx.logout();
      isLoggedIn = !isLoggedIn;
      return <Navigate to={"/login"} replace />;
    } catch {
      console.log("error to logout");
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/history">
              History
            </Nav.Link>
            <Nav.Link as={Link} to="/summary">
              Summary
            </Nav.Link>
            <Nav.Link as={Link} to="/addtransaction">
              Exp/Inc
            </Nav.Link>
          </Nav>
          <Nav className="me-right">
            {/* Dropdown For User Info */}
            <Dropdown as={ButtonGroup}>
              <Btn
                variant="success"
                size="sm"
                text={`${username} - ${email}` /*props.userName */}
              />
              <Dropdown.Toggle
                split
                variant="success"
                id="dropdown-split-basic"
              />
              <Dropdown.Menu>
                <Dropdown.Item onClick={HandleLogout}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </>
      ) : (
        <>
          <Nav className="me-right">
            <Stack direction="horizontal" gap={2}>
              <Btn
                variant={"info"}
                text={"Log In"}
                size={"sm"}
                as={Link}
                to="/login"
              />
              <Btn
                variant={"warning"}
                text={"Sign Up"}
                size={"sm"}
                as={Link}
                to="/signup"
              />
            </Stack>
          </Nav>
        </>
      )}
    </>
  );
};

export default NavigationItem;
