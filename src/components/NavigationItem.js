import React from "react";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import Stack from "react-bootstrap/Stack";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Btn from "./Btn";
import { Link } from "react-router-dom";

const NavigationItem = ({ isLoggedIn, userName }) => {
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
                text={"USERNAME" /*props.userName */}
              />
              <Dropdown.Toggle
                split
                variant="success"
                id="dropdown-split-basic"
              />
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-3">Log Out</Dropdown.Item>
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
