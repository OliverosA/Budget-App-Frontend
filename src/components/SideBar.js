import React, { useEffect, useState } from "react";
import { Dropdown, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRequest from "./useRequest";
import { setSelectedAccount } from "../store/slices/bankaccount/bankaccountSlice";

const SideBar = () => {
  // states para modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  //states for information
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [balance, setBalance] = useState(0);
  const { accounts } = useSelector((state) => state.bankaccount);
  const { getPersonAccounts, getAccountCurrencySymbol } = useRequest();
  const navigate = useNavigate();

  useEffect(() => {
    getPersonAccounts();
  }, []);

  const showAccountsInfo = () => {
    return Object.entries(accounts).length === 0 ? (
      "No accounts registered with this user"
    ) : (
      <>
        {accounts?.map((account) => (
          <Dropdown.Item
            className="sideMenuItem"
            as="button"
            key={account.account_number}
            onClick={() => {
              dispatch(setSelectedAccount(account));
              navigate("/history", { replace: true });
            }}
          >
            <div>
              <h5>
                Account: {account.account_number} <br />
                Balance:{" "}
                {`${getAccountCurrencySymbol(account.currency)} ${
                  account.balance
                }`}
              </h5>
            </div>
          </Dropdown.Item>
        ))}
      </>
    );
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
                type="text"
                placeholder="Write your Bank name..."
                value={bankName}
                onChange={(event) => setBankName(event.target.value)}
              />
              <Form.Label>Bank Account</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write your Bank account..."
                value={bankAccount}
                onChange={(event) => setBankAccount(event.target.value)}
              />

              <Form.Label>Initial Balance</Form.Label>
              <Form.Control
                type="number"
                value={balance}
                onChange={(event) => setBalance(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="sideMenuContainer">
      <Dropdown.Menu show className="sideMenuHeader">
        <Dropdown.ItemText>
          <h3>Accounts List</h3>
        </Dropdown.ItemText>
        <Dropdown.Divider />
        {showAccountsInfo()}
        <Dropdown.Divider />
        <Dropdown.Item as="button" onClick={handleShow}>
          <h5>Add Bank Account</h5>
        </Dropdown.Item>
      </Dropdown.Menu>
      {showModal()}
    </div>
  );
};

export default SideBar;
