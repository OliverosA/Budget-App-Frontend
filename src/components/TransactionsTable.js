import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const TransactionsTable = (props) => {
  const getAllTransactions = () => {
    return props?.transactions?.map((item) => (
      <tbody>
        <tr key={item.id}>
          <td key={`${item.id}-${item.date}`}>{item.date}</td>
          <td key={`${item.id}-${item.name}`}>
            <div className="tableItem">
              {item.name} <Button variant={"primary"}>Look</Button>
            </div>
          </td>
          <td key={`${item.id}-${item.amount}`}>{`$${item.amount}`}</td>
        </tr>
      </tbody>
    ));
  };

  return (
    <div className="tableLayout">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr key={"headers"}>
            <th key={"date"}>Date</th>
            <th key={"name"}>Name</th>
            <th key={"amount"}>Amount</th>
          </tr>
        </thead>
        {getAllTransactions()}
      </Table>
    </div>
  );
};

export default TransactionsTable;
