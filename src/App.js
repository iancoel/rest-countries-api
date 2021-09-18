import React from 'react';
import HomePage from './Components/HomePage';
import Header from './Components/Header';
import Filter from './Components/Filter';
import Error404 from './Components/Error404';
import CountryPage from './Components/CountryPage';
import { GlobalStorage } from './Components/GlobalContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container">
          <GlobalStorage>
            <Filter />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="country/:name/*" element={<CountryPage />} />
              <Route path="teste" element={<Error404 />} />
            </Routes>
          </GlobalStorage>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
