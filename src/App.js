import React from 'react';
import HomePage from './Components/HomePage';
import Header from './Components/Header';
import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <HomePage />
      </div>
    </>
  );
};

export default App;
