import React from 'react';
import Table from 'react-bootstrap/Table';
import Btn from './Btn';

const TransactionsTable = (props) => {
  const getAllTransactions = () => {
    return props?.transactions?.map((item) => (
      <tbody>
        <tr key={item.id}>
          <td>{item.date}</td>
          <td>{item.name}</td>
          <td>{`$${item.amount}`}</td>
          <td>
            <Btn text={'Delete'} variant={'danger'} />
          </td>
        </tr>
      </tbody>
    ));
  };

  return (
    <div className='tableLayout'>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr key={'table-headers'}>
            <th>Date</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Options</th>
          </tr>
        </thead>
        {getAllTransactions()}
      </Table>
    </div>
  );
};

export default TransactionsTable;
