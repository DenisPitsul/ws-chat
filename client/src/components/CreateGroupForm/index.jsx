import { Field, Form, Formik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import styles from './CreateGroupForm.module.sass';
import { ws } from '../../api';
import { clearCreateGroupError } from '../../store/slices/groupsSlice';

function CreateGroupForm ({ user, setIsFormOpened }) {
  const initialValues = {
    name: '',
  };

  const handleSubmit = (values, formikBag) => {
    ws.createGroup({ ...values, userId: user._id });
    setIsFormOpened(false);
  };

  return (
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
  );
}

const mapStateToProps = ({ groupsData, authData }) => ({
  createGroupError: groupsData.createGroupError,
  user: authData.user,
});

const mapDispatchToProps = dispatch => ({
  clearCreateGroupErrorFromStore: () => dispatch(clearCreateGroupError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupForm);
