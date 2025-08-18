import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { USER_VALIDATION_SCHEMA } from "../../utils/validationSchemas";
import {
  clearAuthError,
  registrationThunk,
} from "../../store/slices/authSlice";
import styles from "./RegistrationForm.module.sass";

function RegistrationForm({ authError, register, clearAuthError }) {
  useEffect(() => {
    return () => {
      clearAuthError();
    };
  }, [clearAuthError]);

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values, formikBag) => {
    register(values);
    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={USER_VALIDATION_SCHEMA}
    >
      {(formikProps) => {
        const getInputClassNames = (field) => {
          return classNames(styles.input, {
            [styles.valid]:
              !formikProps.errors[field] && formikProps.touched[field],
            [styles.invalid]:
              formikProps.errors[field] && formikProps.touched[field],
          });
        };

        const usernameClassNames = getInputClassNames("username");
        const passwordClassNames = getInputClassNames("password");

        return (
          <Form className={styles.form}>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Username:</span>
              <Field
                className={usernameClassNames}
                type="text"
                name="username"
                placeholder="Username"
                autoFocus
              />
              <ErrorMessage
                className={styles.error}
                name="username"
                component="span"
              />
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Password:</span>
              <Field
                className={passwordClassNames}
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                className={styles.error}
                name="password"
                component="span"
              />
            </label>
            {authError && (
              <span className={styles.httpError}>
                {authError.errors[0].title}
              </span>
            )}
            <button className={styles.submitBtn} type="submit">
              Register
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

const mapStateToProps = ({ authData }) => ({
  authError: authData.authError,
});

const mapDispatchToProps = (dispatch) => ({
  register: (values) => dispatch(registrationThunk(values)),
  clearAuthError: () => dispatch(clearAuthError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
