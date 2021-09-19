import React from 'react';
import styles from './CountryPage.module.css';
import Loading from './Loading';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const CountryPage = () => {
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [borderData, setBorderData] = React.useState([]);
  const [borderFlag, setBorderFlag] = React.useState([]);
  const params = useParams();
  const borderUrl = 'https://restcountries.eu/rest/v2/alpha/';
  const urlName =
    params.name.length > 3
      ? `https://restcountries.eu/rest/v2/name/${params.name}`
      : `${borderUrl}${params.name}`;

  async function nameFetch(urlName) {
    try {
      setLoading(true);
      const response = await fetch(urlName);
      const json = await response.json();
      if (json[0]) {
        setData(json[0]);
        setBorderData(json[0].borders);
      } else {
        setData(json);
        setBorderData(json.borders);
      }
      setError(null);
    } catch {
      setError('Error at nameFetch');
    } finally {
      setLoading(false);
    }
  }

  async function bordersFetch(border) {
    try {
      const response = await fetch(`${borderUrl}${border}`);
      const json = await response.json();
      const flag = await json.flag;
      if (border.toLowerCase() === params.name) {
      } else {
        setBorderFlag((prev) =>
          prev.includes(flag) ? [...prev] : [...prev, flag],
        );
      }

      setError(null);
    } catch {
      setError('Error at bordersFetch');
    }
  }

  React.useEffect(() => {
    nameFetch(urlName);
    setBorderFlag([]);
  }, [params]);

  React.useEffect(() => {
    if (data) {
      borderData.forEach((border) => bordersFetch(border));
    }
  }, [borderData, data]);

  if (data && borderFlag) {
    const backgroundFlag = {
      background: `url(${data.flag})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
    };
    return (
      <div className={`${styles.country} ${styles.container}`}>
        <div>
          <div style={backgroundFlag} className={styles.flag}></div>
          <ul className={styles.borders}>
            {borderFlag.map((flag) => (
              <Link
                key={flag}
                to={`/country/${flag
                  .replace('https://restcountries.eu/data/', '')
                  .slice(0, 3)}`}
                style={{
                  background: `url(${flag})`,
                  backgroundSize: '100% 100%',
                }}
              ></Link>
            ))}
          </ul>
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
                <li key={item.name}>{item.name}</li>
              ))}
            </ul>
          </li>
          <li>
            <span>Languagues: </span>
            <ul className={styles.innerList}>
              {data.languages.map((item) => (
                <li key={item.name}>{item.name}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    );
  } else if (loading) {
    return <Loading />;
  } else if (error) {
    return <p>{error}</p>;
  } else {
    return null;
  }
};

export default CountryPage;
