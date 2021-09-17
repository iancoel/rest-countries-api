import React from 'react';
import styles from './CountryCard.module.css';

const CountryCard = ({ imgSrc, name, population, region, capital }) => {
  const flag = {
    background: `url(${imgSrc})`,
  };

  return (
    <div className={styles.card}>
      <div style={flag} className={styles.flag}></div>
      <div className={styles.info}>
        <h3>{name}</h3>
        <span>
          <b>Population:</b> {population}
        </span>
        <span>
          <b>Region:</b> {region}
        </span>
        <span>
          <b>Capital: </b>
          {capital}
        </span>
      </div>
    </div>
  );
};

export default CountryCard;
