import React from 'react';
import HomePage from './Components/HomePage';
import Header from './Components/Header';
import Filter from './Components/Filter';
import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Filter />
        <HomePage />
      </div>
    </>
  );
};

export default App;
