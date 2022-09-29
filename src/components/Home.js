import React, { useEffect, useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import useRequest from "./useRequest";
import { useSelector, useDispatch } from "react-redux";
import {
  setBankIdList,
  clearBankIdList,
  clearSums,
} from "../store/slices/bankaccount/bankaccountSlice";

const Home = () => {
  const {
    getPersonAccounts,
    getAccountCurrencySymbol,
    getAccountCurrencyAcronym,
    getIncomeSummary,
    setSummaries,
  } = useRequest();
  const { accounts, incomesSummary, bankIdList } = useSelector(
    (state) => state.bankaccount
  );

  const { currencies } = useSelector((state) => state.currency);
  const dispatch = useDispatch();

  return (
    <div className="centerItemsLayout">
      {Object.entries(accounts).length === 0 ? (
        <Alert variant="success">
          <Alert.Heading>Welcome To The Budget Management App!</Alert.Heading>
          <h4>
            It's seems that you don't have an account yet. Lets get started to
            manage your incomes, expenses and also your transfers beetwen other
            users accounts! So, Click on the button and create your first
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
                <Card.Text as={"h3"}>{`Balance: ${getAccountCurrencySymbol(
                  item.currency
                )}${item.balance}`}</Card.Text>
                <Card.Text as={"h3"}>{`Currency: ${getAccountCurrencyAcronym(
                  item.currency
                )}`}</Card.Text>
                <Card.Text
                  as={"h3"}
                >{`Total Incomes Summary: ${getAccountCurrencySymbol(
                  item.currency
                )} ${incomesSummary[index]}`}</Card.Text>
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
