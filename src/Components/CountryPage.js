import React from 'react';
import styles from './CountryPage.module.css';
import { useParams } from 'react-router';

const CountryPage = () => {
  const [error, setError] = React.useState(null);
  const params = useParams();
  const url = `https://restcountries.eu/rest/v2/name/${params.name}`;

  async function nameFetch(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      setError(null);
    } catch {
      setError('A mistake was made ): ');
    }
  }

  React.useEffect(() => {
    nameFetch(url);
  }, [url]);

  console.log(url);

  return <div className={styles.country}>teste</div>;
};

export default CountryPage;
