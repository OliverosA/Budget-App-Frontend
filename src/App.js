import React from 'react';
import './App.css';
import History from './components/History';
import Navigationbar from './components/Navigationbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navigationbar />
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path='history'
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
