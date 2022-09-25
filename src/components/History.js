import React, { useEffect, useState } from "react";
import Category from "./Category";
import Button from "react-bootstrap/esm/Button";
import TransactionsTable from "./TransactionsTable";

const History = () => {
  const [transaction, setTransaction] = useState([]); // tiene todos
  const [search, setsearch] = useState([]); // tiene los filtrados
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(/*new Date()*/ "");

  const getTransactions = async () => {
    const response = await fetch("transactions.json");
    const jsonData = await response.json();
    setTransaction(jsonData?.transactions);
  };

  // search en el state general
  const searchItems = async (bankName = "", date = "") => {
    if (bankName !== "") {
      const filteredTransactions = transaction.filter(
        (item) => item.name === bankName
      );
      return setsearch(filteredTransactions); //filtered transactions
    }

    if (date !== "") {
      const filteredTransactions = transaction.filter(
        (item) => item.date === date
      );
      return setsearch(filteredTransactions); //filtered transactions
    }

    return setsearch(transaction); //all transactions;
  };

  const handleNameChange = (event) => {
    const bankName = event.target.value;
    setName(bankName);
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setStartDate(date);
  };

  const handleClearValues = () => {
    setStartDate("");
    setName("");
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

  return (
    <>
      <div className="filters">
        <input
          className="dateInput"
          type="date"
          id="date"
          value={startDate}
          onChange={handleDateChange}
        />
        <input
          id="nameInput"
          placeholder="Search by name"
          value={name}
          onChange={handleNameChange}
        />
        <Category />
        <Button variant="warning" onClick={handleClearValues}>
          Clear Values
        </Button>
      </div>
      {search.length === 0 ? (
        <TransactionsTable transactions={transaction /*tiene todos*/} />
      ) : (
        <TransactionsTable transactions={search /*tiene los filtrados*/} />
      )}
    </>
  );
};

export default History;
