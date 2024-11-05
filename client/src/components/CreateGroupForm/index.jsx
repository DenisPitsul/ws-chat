import { Field, Form, Formik } from 'formik';
import React from 'react';
import styles from './CreateGroupForm.module.sass';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { ws } from '../../api';

function CreateGroupForm ({ user, createError, setIsFormOpened }) {
  const initialValues = {
    name: '',
  };

  const handleSubmit = (values, formikBag) => {
    ws.createGroup({ ...values, userId: user._id });
    setIsFormOpened(false);
  };

  const errorMessageClassNames = classNames(styles.errorMessage, {
    [styles.isErrorMessageVisible]: !!createError,
  });

  return (
    <>
      {createError && (
        <span className={errorMessageClassNames}>{createError.error}</span>
      )}
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {formikProps => (
          <Form className={styles.createGroupForm}>
            <Field
              className={styles.input}
              type='text'
              name='name'
              placeholder='Group name'
            />
            <div className={styles.buttonsContainer}>
              <button
                type='submit'
                className={styles.submitBtn}
                disabled={!formikProps.values.name.trim()}
              >
                Create
              </button>
              <button
                className={styles.cancelBtn}
                type='button'
                onClick={() => setIsFormOpened(false)}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ groupsData, authData }) => ({
  createError: groupsData.createError,
  user: authData.user,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupForm);
