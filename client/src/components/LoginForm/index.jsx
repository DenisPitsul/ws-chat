import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { clearAuthError, loginThunk } from '../../store/slices/authSlice';
import { connect } from 'react-redux';
import styles from './LoginForm.module.sass';

function LoginForm ({ authError, login, clearAuthError }) {
  useEffect(() => {
    return () => {
      clearAuthError();
    };
  }, []);

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values, formikBag) => {
    login(values);
    formikBag.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={styles.form}>
        <label className={styles.inputLabel}>
          <span className={styles.inputCaption}>Username:</span>
          <Field
            className={styles.input}
            type='text'
            name='username'
            placeholder='Username'
            autoFocus
          />
          <ErrorMessage
            className={styles.error}
            name='username'
            component='span'
          />
        </label>
        <label className={styles.inputLabel}>
          <span className={styles.inputCaption}>Password:</span>
          <Field
            className={styles.input}
            type='password'
            name='password'
            placeholder='Password'
          />
          <ErrorMessage
            className={styles.error}
            name='password'
            component='span'
          />
        </label>
        {authError && (
          <span className={styles.httpError}>{authError.errors[0].title}</span>
        )}
        <button className={styles.submitBtn} type='submit'>
          Login
        </button>
      </Form>
    </Formik>
  );
}

const mapStateToProps = ({ authData }) => ({
  authError: authData.authError,
});

const mapDispatchToProps = dispatch => ({
  login: values => dispatch(loginThunk(values)),
  clearAuthError: () => dispatch(clearAuthError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
