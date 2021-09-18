import React from 'react';
import styles from './CountryPage.module.css';
import { useParams } from 'react-router';

const CountryPage = () => {
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);
  const params = useParams();
  const url = `https://restcountries.eu/rest/v2/name/${params.name}`;

  async function nameFetch(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json[0]);
      setError(null);
    } catch {
      setError('A mistake was made ): ');
    }
  }

  React.useEffect(() => {
    nameFetch(url);
  }, []);

  if (data) {
    const backgroundFlag = {
      background: `url(${data.flag})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    };
    console.log(data.flag);
    return (
      <div className={`${styles.country} ${styles.container}`}>
        <div>
          <div style={backgroundFlag} className={styles.flag}></div>
        </div>
        <ul className={styles.info}>
          <li>
            <span>Name:</span> {data.name}
          </li>
          <li>
            <span>Top Level Domain: </span>
            {data.topLevelDomain[0]}
          </li>
          <li>
            <span>Alpha 2 Code: </span>
            {data.alpha2Code}
          </li>
          <li>
            <span>Alpha 3 Code: </span>
            {data.alpha3Code}
          </li>
          <li>
            <span>Calling code: </span>
            {data.callingCodes}
          </li>
          <li>
            <span>Capital: </span>
            {data.capital}
          </li>
          <li>
            <span>Alternative spellings: </span>
            <ul className={styles.innerList}>
              {data.altSpellings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
          <li>
            <span>Region: </span>
            {data.region}
          </li>
          <li>
            <span>SubRegion: </span>
            {data.subregion}
          </li>
          <li>
            <span>Population: </span>
            {data.population}
          </li>
          <li>
            <span>Demonym: </span>
            {data.demonym}
          </li>
          <li>
            <span>Area: </span>
            {data.area}km²
          </li>
          <li>
            <span>Timezones: </span>
            <ul className={styles.innerList}>
              {data.timezones.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
          <li>
            <span>Currencies: </span>
            <ul className={styles.innerList}>
              {data.currencies.map((item) => (
                <li>{item.name}</li>
              ))}
            </ul>
          </li>
          <li>
            <span>Languagues: </span>
            <ul className={styles.innerList}>
              {data.languages.map((item) => (
                <li>{item.name}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default CountryPage;
