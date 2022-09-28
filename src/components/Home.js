import React, { useEffect, useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import useRequest from "./useRequest";
import { useSelector } from "react-redux";

const Home = () => {
  const { getPersonAccounts, getIncomeSummary } = useRequest();
  const { accounts, incomesSummary } = useSelector(
    (state) => state.bankaccount
  );
  const { currencies } = useSelector((state) => state.currency);
  const [incomesList, setIncomesList] = useState([]);
  useEffect(() => {
    getPersonAccounts();
    if (Object.entries(accounts).length !== 0) {
      accounts?.map((account, index) => {
        getIncomeSummary(account.bankaccount);
        setIncomesList([...incomesList, incomesSummary]);
      });
    }
  }, []);

  const getCurrency = (id_currency) => {
    const result = currencies.find((item) => item.currency === id_currency);
    return [result.symbol, result.acronym];
  };

  return (
    <div className="centerItemsLayout">
      {Object.entries(accounts).length === 0 ? (
        <Alert variant="success">
          <Alert.Heading>Welcome To The Budget Management App!</Alert.Heading>
          <h4>
            It's seems that you don't have an account yet. Lets get started to
            manage your incomesList, expenses and also your transfers beetwen
            other users accounts! So, Click on the button and create your first
            account!
          </h4>
          <Button variant="outline-success">Create Account</Button>
        </Alert>
      ) : (
        accounts.map((item, index) => (
          <div key={item.bankaccount}>
            <Card className="text-center">
              <Card.Header
                as={"h3"}
              >{`Account Number: ${item.account_number}`}</Card.Header>
              <Card.Body>
                <Card.Text as={"h3"}>{`Balance: ${
                  getCurrency(item.currency)[0]
                }${item.balance}`}</Card.Text>
                <Card.Text as={"h3"}>{`Currency: ${
                  getCurrency(item.currency)[1]
                }`}</Card.Text>
                <Card.Text as={"h3"}>{`Total Incomes Summary: ${
                  getCurrency(item.currency)[0]
                } ${incomesSummary[index]}`}</Card.Text>
                <Button variant="primary">Create Income</Button>{" "}
                <Button variant="primary">Create Expense</Button>{" "}
                <Button variant="primary">Create Transfer</Button>
              </Card.Body>
              <Card.Footer
                className="text-muted"
                as="h5"
              >{`Created Date: ${item.add_date}`}</Card.Footer>
            </Card>
            <br />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
