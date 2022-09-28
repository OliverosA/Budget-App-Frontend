import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShow, setHide } from "../store/slices/modal/modalSlice";

const Modal = () => {
  const [accountValues, setAccountValues] = useState({
    account_number: "",
    balance: 0,
    currency: 0,
  });
  const { show } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  return (
    <div>
      <Modal show={show} onHide={dispatch(setHide())}>
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
              <Form.Label>Currency</Form.Label>
              <Form.Select
                className="mb-3"
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
                type="number"
                value={balance}
                onChange={(event) => setBalance(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={set}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modal;
