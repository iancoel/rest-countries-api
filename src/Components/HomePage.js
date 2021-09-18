import React from 'react';
import CountryCard from './CountryCard';
import styles from './HomePage.module.css';
import { GlobalContext } from './GlobalContext';
import Loading from './Loading';

const HomePage = () => {
  const url = 'https://restcountries.eu/rest/v2/';
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const global = React.useContext(GlobalContext);

  async function preferencesFetch(url) {
    let response;
    try {
      setLoading(true);
      setData(null);
      response = await fetch(url);
      console.log(response.status);
      const json = await response.json();
      setData(json);
      setError(null);
    } catch {
      setError('Something went wrong');
    } finally {
      if (response.status === 404) {
        setError('Could not find any countries ):');
      }
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
    return <Loading />;
  } else if (error) {
    return <p>{error}</p>;
  } else if (data && !error) {
    return (
      <main className={styles.main}>
        {data.map(({ name, flag, population, capital, region }) => {
          return (
            <div key={name}>
              <CountryCard
                imgSrc={flag}
                name={name}
                population={population}
                region={region}
                capital={capital}
              />
            </div>
          );
        })}
      </main>
    );
  } else {
    return null;
  }
};

export default HomePage;
