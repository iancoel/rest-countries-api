import React from 'react';
import CountryCard from './CountryCard';
import styles from './HomePage.module.css';
import Loading from './Loading';
import Error404 from './Error404';
import { GlobalContext } from './GlobalContext';

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
      response = await fetch(url);
      const json = await response.json();
      if (response.status === 200) {
        setData(json);
        setError(null);
      } else {
        setError('Could not find any countries ):');
        setData(null);
      }
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
    return <Loading />;
  } else if (error) {
    return <Error404 />;
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
