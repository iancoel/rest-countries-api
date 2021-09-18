import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CountryCard.module.css';

const CountryCard = ({ imgSrc, name, population, region, capital }) => {
  const flag = {
    background: `url(${imgSrc})`,
  };

  return (
    <Link to={'country/' + name} className={styles.card}>
      <div style={flag} className={styles.flag}></div>
      <div className={styles.info}>
        <h3>{name}</h3>
        <span>
          <b>Population:</b> {population}
        </span>
        <span>
          <b>Continent:</b> {region}
        </span>
        <span>
          <b>Capital: </b>
          {capital}
        </span>
      </div>
    </Link>
  );
};

export default CountryCard;
