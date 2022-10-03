import React, { useEffect, useState } from "react";
import Category from "./Category";
import TransactionsTable from "./TransactionsTable";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import useRequest from "./useRequest";
import {
  clearAllTransactions,
  clearBankAccountTransactions,
} from "../store/slices/transaction/transactionSlice";

const History = () => {
  const [filterValues, setFilterValues] = useState({
    account_number: "",
    date: "",
    category: "",
  });
  const [transaction, setTransaction] = useState([]); // all the transactions
  const [search, setsearch] = useState([]); // filtered transactions
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const { transactions, bankAccountTransactions } = useSelector(
    (state) => state.transaction
  );
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { getTransactions } = useRequest();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { replace: true });
  }, []);

  // search en el state general
  const searchItems = async (bankName = "") => {
    if (filterValues.account_number !== "") {
      const filteredTransactions = transactions.filter(
        (item) => item.name === bankName
      );
      return setsearch(filteredTransactions); //filtered transactions
    }

    if (filterValues.date !== "") {
      const filteredTransactions = transaction.filter(
        (item) => item.add_date === filterValues.date
      );
      return setsearch(filteredTransactions); //filtered transactions
    }

    return setsearch(transaction); //all transactions;
  };

  const handleClearValues = () => {
    setStartDate("");
    setName("");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      searchItems(name);
    }, 1500);
    return () => clearTimeout(id);
  }, [name]);

  useEffect(() => {
    const id = setTimeout(() => {
      searchItems("", startDate);
    }, 1500);
    return () => clearTimeout(id);
  }, [startDate]);

  return transactions === {} ? (
    <div className="centerItemsLayout">
      <Alert variant="danger">
        <Alert.Heading>Select An Account!</Alert.Heading>
        <h4>
          Please Select an account from the side menu, if you don't have an
          account yet, create one doing click on the button below
        </h4>
        <Button
          variant="outline-success"
          onClick={() => {
            navigate("/addAccount", { replace: true });
          }}
        >
          Create Account
        </Button>
      </Alert>
    </div>
  ) : (
    <>
      <div className="filters">
        <input
          className="dateInput"
          type="date"
          id="date"
          placeholder="Search date..."
          name="date"
          value={filterValues.date}
          onChange={handleFormChange}
        />
        <input
          type={"text"}
          id="account_number"
          name="account_number"
          placeholder="Search account number..."
          value={filterValues.account_number}
          onChange={handleFormChange}
          list="optionList"
        />
        <datalist id="optionList">
          <option value={"apple"}></option>
          <option value={"banana"}></option>
          <option value={"orange"}></option>
        </datalist>
        <Category />
        <Button variant="warning" onClick={handleClearValues}>
          Clear Values
        </Button>
      </div>
      <div className="transactionsButtons">
        <Button variant="success" onClick={() => getTransactions()}>
          Show All Transactions
        </Button>
        <Button
          variant="danger"
          onClick={() => dispatch(clearAllTransactions())}
        >
          Clear All Transactions
        </Button>
        <Button
          variant="danger"
          onClick={() => dispatch(clearBankAccountTransactions())}
        >
          Clear Account Transactions
        </Button>
      </div>
      {search.length === 0 && Object.entries(transactions).length !== 0 ? (
        <TransactionsTable transactions={transactions} />
      ) : (
        <TransactionsTable transactions={search} />
      )}
    </>
  );
};

export default History;
