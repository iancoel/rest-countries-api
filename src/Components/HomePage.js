import React from 'react';
import CountryCard from './CountryCard';
import styles from './HomePage.module.css';
import { GlobalContext } from './GlobalContext';

const HomePage = () => {
  const url = 'https://restcountries.eu/rest/v2/';
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const global = React.useContext(GlobalContext);

  async function preferencesFetch(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setError(null);
    } catch {
      setError('Something went wrong');
    }
  }

  React.useEffect(() => {
    preferencesFetch(`${url}all`);
  }, []);

  React.useEffect(() => {
    if (global.preferencesRegion) {
      preferencesFetch(`${url}region/${global.preferencesRegion}`);
    }
  }, [global.preferencesRegion]);

  // Return
  if (data) {
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
  }
  return null;
};

export default HomePage;
