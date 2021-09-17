import React from 'react';
import CountryCard from './CountryCard';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  console.log(error);

  React.useEffect(() => {
    async function firstFetch(url) {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch {
        setError('Something went wrong');
      }
    }

    firstFetch('https://restcountries.eu/rest/v2/all');
  }, []);

  return (
    <main>
      {data &&
        data.map((country) => {
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
};

export default HomePage;
