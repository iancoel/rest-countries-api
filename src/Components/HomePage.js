import React from 'react';
import CountryCard from './CountryCard';
import styles from './HomePage.module.css';
import { GlobalContext } from './GlobalContext';

const HomePage = () => {
  const url = 'https://restcountries.eu/rest/v2/';
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const global = React.useContext(GlobalContext);

  async function preferencesFetch(url) {
    try {
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setError(null);
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    preferencesFetch(`${url}all`);
  }, []);

  React.useEffect(() => {
    if (global.preferencesRegion) {
      preferencesFetch(`${url}region/${global.preferencesRegion}`);
    } else {
      preferencesFetch(`${url}all`);
    }
  }, [global.preferencesRegion]);

  React.useEffect(() => {
    if (global.preferencesName) {
      preferencesFetch(`${url}name/${global.preferencesName}`);
    } else {
      preferencesFetch(`${url}all`);
    }
  }, [global.preferencesName]);

  // Return
  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loading}></div>
      </div>
    );
  } else if (data) {
    return (
      <main className={styles.main}>
        {data.map((country) => {
          return (
            <div key={country.name}>
              <CountryCard
                imgSrc={country.flag}
                name={country.name}
                population={country.population}
                region={country.capital}
                capital={country.capital}
              />
            </div>
          );
        })}
      </main>
    );
  } else {
    return <p>{error}</p>;
  }
};

export default HomePage;
