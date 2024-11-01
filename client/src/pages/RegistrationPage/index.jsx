import React from 'react';
import styles from './RegistrationPage.module.sass';
import RegistrationForm from '../../components/RegistrationForm';

function RegistrationPage () {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Registration</h1>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegistrationPage;
