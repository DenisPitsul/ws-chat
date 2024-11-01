import React from 'react';
import styles from './Header.module.sass';
import { Link } from 'react-router-dom';
import ProfileNav from '../ProfileNav';

function Header () {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link className={styles.logoLink} to='/'>
          Chat App
        </Link>
        <ProfileNav />
      </div>
    </header>
  );
}

export default Header;
