import React, { useEffect, useState } from "react";
import { Dropdown, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRequest from "./useRequest";
import { setSelectedAccount } from "../store/slices/bankaccount/bankaccountSlice";

const SideBar = () => {
  // states for modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //states for information
  const [formValues, setFormValues] = useState({
    account_number: "",
    balance: 0,
    currency: 0,
  });
  const { accounts } = useSelector((state) => state.bankaccount);
  const { currencies } = useSelector((state) => state.currency);
  const { getPersonAccounts, createAccount, getAccountCurrencySymbol } =
    useRequest();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getPersonAccounts();
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formValues.balance !== 0 &&
      formValues.account_number !== "" &&
      formValues.currency !== 0
    ) {
      try {
        await createAccount(formValues);
        setFormValues({ account_number: "", balance: 0, currency: 0 });
        return window.alert("Bank Account Created!");
      } catch (error) {
        console.log(error);
      }
    }
    return window.alert("All fields must be filled");
  };

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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Bank Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Bank Account</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write your Bank account..."
                value={formValues.account_number}
                name="account_number"
                onChange={handleFormChange}
              />
              <Form.Label>Initial Balance</Form.Label>
              <Form.Control
                type="number"
                value={formValues.balance}
                name="balance"
                onChange={handleFormChange}
              />
              <Form.Label>Currency</Form.Label>
              <Form.Select
                className="mb-3"
                name="currency"
                onChange={handleFormChange}
              >
                <option>Select a currency...</option>
                {Object.entries(currencies).length !== 0
                  ? currencies.map((option) => (
                      <option
                        key={`${option.currency}-${option.symbol}`}
                        value={option.currency}
                      >{`${option.acronym} (${option.symbol})`}</option>
                    ))
                  : ""}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
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
