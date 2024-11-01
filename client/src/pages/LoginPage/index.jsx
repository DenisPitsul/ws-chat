import React from 'react';
import styles from './LoginPage.module.sass';
import LoginForm from '../../components/LoginForm';

function LoginPage () {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
