import React from 'react';
import HomePage from './Components/HomePage';
import Header from './Components/Header';
import Filter from './Components/Filter';
import { GlobalStorage } from './Components/GlobalContext';
import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <GlobalStorage>
          <Filter />
          <HomePage />
        </GlobalStorage>
      </div>
    </>
  );
};

export default App;
