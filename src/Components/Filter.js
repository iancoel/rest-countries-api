import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Filter.module.css';
import { GlobalContext } from './GlobalContext';

const Filter = () => {
  const [textAreaData, settextAreaData] = React.useState(
    'Search for a country...',
  );
  const [selectData, setSelectData] = React.useState('');

  const global = React.useContext(GlobalContext);

  //Textarea functions
  function handleClick() {
    if (textAreaData === 'Search for a country...') {
      settextAreaData('');
    }
  }

  function handleChangeTextArea({ target }) {
    settextAreaData(target.value);
    setSelectData('');
    global.setPreferencesName(target.value);
    global.setPreferencesRegion(null);
  }

  function handleBlur() {
    if (textAreaData === '') {
      settextAreaData('Search for a country...');
    }
  }

  //Button function
  function handleButtonClick({ target }) {
    global.setPreferencesRegion(null);
    global.setPreferencesName(null);
    settextAreaData('Search for a country...');
    setSelectData('');
    global.setPreferencesRegion(null);
    global.setPreferencesName(null);
  }

  //Select functions
  function handleChangeSelect({ target }) {
    settextAreaData('Search for a country...');
    setSelectData(target.value);
    global.setPreferencesRegion(target.value);
    global.setPreferencesName(null);
  }

  return (
    <div className={styles.filter}>
      <textarea
        value={textAreaData}
        type="text"
        onClick={handleClick}
        onChange={handleChangeTextArea}
        onBlur={handleBlur}
      />

      <Link to="/" className={styles.button} onClick={handleButtonClick}>
        All
      </Link>

      <select value={selectData} onChange={handleChangeSelect}>
        <option value="" disabled>
          Filter by Region
        </option>
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </div>
  );
};

export default Filter;
