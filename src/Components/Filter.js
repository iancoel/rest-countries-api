import React from 'react';
import styles from './Filter.module.css';

const Filter = () => {
  const [textAreaData, settextAreaData] = React.useState(
    'Search for a country...',
  );
  const [selectData, setSelectData] = React.useState('');

  function handleClick() {
    if (textAreaData === 'Search for a country...') {
      settextAreaData('');
    }
  }

  function handleChange({ target }) {
    settextAreaData(target.value);
  }

  function handleBlur() {
    settextAreaData('Search for a country...');
  }

  return (
    <div className={styles.filter}>
      <textarea
        value={textAreaData}
        type="text"
        onClick={handleClick}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <select
        value={selectData}
        onChange={({ target }) => setSelectData(target.value)}
      >
        <option value="" disabled>
          Filter by Region
        </option>
        <option value="africa">Africa</option>
        <option value="america">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </div>
  );
};

export default Filter;
