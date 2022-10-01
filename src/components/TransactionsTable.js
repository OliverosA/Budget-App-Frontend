import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const TransactionsTable = ({ transactions }) => {
  const { accounts } = useSelector((state) => state.bankaccount);
  const { categories } = useSelector((state) => state.category);

  const getAccountNumber = (bankaccount) => {
    if (Object.entries(accounts).length !== 0) {
      const result = accounts?.find((item) => item.bankaccount === bankaccount);
      return result.account_number;
    }
    return "";
  };

  const getCategoryName = (category) => {
    if (Object.entries(categories).length !== 0) {
      const result = categories?.find((item) => item.category === category);
      return result.name;
    }
    return "";
  };

  const getAllTransactions = () => {
    return (
      <tbody>
        {transactions?.map((transaction, index) => (
          <tr key={`${transaction.transaction}-${index}`}>
            <td>{transaction.add_date}</td>
            <td>{getAccountNumber(transaction.bankaccount)}</td>
            <td>{getCategoryName(transaction.category)}</td>
            <td
              style={
                transaction.trtype === 1
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "red" }
              }
            >
              {transaction.trtype === 1 ? "Income" : "Expense"}
            </td>
            <td>{Number(transaction.amount).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="centerItemsLayout">
      <Table bordered variant="dark">
        <thead>
          <tr key={"headers"}>
            <th key={"date"}>Date</th>
            <th key={"Account-Number"}>Account Number</th>
            <th key={"category-transac"}>Category</th>
            <th key={"category-trtype"}>Type</th>
            <th key={"Amount"}>Amount</th>
          </tr>
        </thead>
        {getAllTransactions()}
      </Table>
    </div>
  );
};

export default TransactionsTable;
