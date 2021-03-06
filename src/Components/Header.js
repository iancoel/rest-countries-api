import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  const headerWrapper = React.useRef();

  // Applying opacity to header
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    function handleScroll(event) {
      if (window.pageYOffset > 60) {
        headerWrapper.current.className = `${styles.wrapper} ${styles.scroll}`;
      } else {
        headerWrapper.current.className = `${styles.wrapper}`;
      }
    }
  }, []);

  return (
    <header ref={headerWrapper} className={`${styles.wrapper}`}>
      <div className={styles.container}>
        <p>
          Rest Countries API by Ian Coelho |{' '}
          <a href="https://www.linkedin.com/in/ian-coel/">Linkedin</a> |
          <a href="github.com/iancoel"> Github</a>
        </p>
      </div>
    </header>
  );
};

export default Header;
