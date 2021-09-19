import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CountryCard.module.css';

const CountryCard = ({
  imgSrc,
  name,
  population,
  region,
  capital,
  timeOut,
}) => {
  const [anime, setAnime] = React.useState(false);

  const flag = {
    background: `url(${imgSrc})`,
  };

  setTimeout(() => {
    setAnime(true);
  }, 100 * timeOut);

  if (anime)
    return (
      <Link to={'country/' + name} className={`${styles.card} animeLeft`}>
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
  if (!anime) return null;
};

export default CountryCard;
