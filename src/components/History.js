import React, { useEffect, useState } from 'react';
import Transactions from './Transactions';
import Category from './Category';
import Button from 'react-bootstrap/esm/Button';

const History = () => {
  const [transaction, setTransaction] = useState([]); // tiene todos
  const [buscar, setBuscar] = useState([]); // tiene los filtrados
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(/*new Date()*/ '');

  const getTransactions = async () => {
    const response = await fetch('transactions.json');
    const jsonData = await response.json();
    setTransaction(jsonData?.transactions);
  };

  // buscar en el state general
  const searchItems = async (bankName = '', date = '') => {
    if (bankName !== '') {
      const filteredTransactions = transaction.filter(
        (item) => item.name === bankName
      );
      return setBuscar(filteredTransactions); //filtered transactions
    }

    if (date !== '') {
      const filteredTransactions = transaction.filter(
        (item) => item.date === date
      );
      return setBuscar(filteredTransactions); //filtered transactions
    }

    return setBuscar(transaction); //all transactions;
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
    setStartDate('');
    setName('');
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
      searchItems('', startDate);
    }, 1500);
    return () => clearTimeout(id);
  }, [startDate]);

  return (
    <>
      <div className='filters'>
        <input
          className='dateInput'
          type='date'
          id='date'
          value={startDate}
          onChange={handleDateChange}
        />
        <Button variant='warning' onClick={handleClearValues}>
          Clear Values
        </Button>
        <input
          id='nameInput'
          placeholder='Search by name'
          value={name}
          onChange={handleNameChange}
        />
        <Category />
      </div>
      {buscar.length === 0 ? (
        <Transactions transactions={transaction /*tiene todos*/} />
      ) : (
        <Transactions transactions={buscar /*tiene los filtrados*/} />
      )}
    </>
  );
};

export default History;
