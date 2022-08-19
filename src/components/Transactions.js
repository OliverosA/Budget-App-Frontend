import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Chart from './Chart';

const Transactions = (props) => {
  const [transaction, setTransaction] = useState([]);

  // options to fetch the api
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer <TOKEN>',
    },
  };

  useEffect(() => {
    // get the transaction from the example API
    const getTransactions = async () => {
      const url = `https://dev.lunchmoney.app/v1/transactions`;
      const response = await fetch(url, options);
      const jsonData = await response.json();
      setTransaction(jsonData?.transactions);
    };

    getTransactions();
  }, []);

  const getAllTransactions = () => {
    return transaction?.map((item) => (
      <tbody>
        <tr key={item.id}>
          <td>{item.date}</td>
          <td>{item.payee}</td>
          <td>{`$${item.amount}`}</td>
        </tr>
      </tbody>
    ));
  };

  return (
    <>
      <Chart />
      <Container className='my-5'>
        <Row>
          <Col xs={8}>
            <Table striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              {getAllTransactions()}
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Transactions;
