import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styles from './ChatForm.module.sass';
import { ws } from '../../api';
import {
  clearUpdateMessageError,
  setIsUpdateForm,
  setUpdateMessage,
} from '../../store/slices/messagesSlice';
import { notify } from '../../utils/notification';
import CONSTANTS from '../../constants';

function ChatForm ({
  user,
  openedGroup,
  updateMessageError,
  isUpdateForm,
  updateMessage,
  clearUpdateMessageErrorFromStore,
  closeUpdateForm,
  clearUpdateMessage,
}) {
  const formikRef = useRef();

  useEffect(() => {
    if (updateMessageError) {
      notify(updateMessageError.error, CONSTANTS.STATUS.ERROR);
      clearUpdateMessageErrorFromStore();
    }
  }, [updateMessageError]);

  const initialValues = {
    body: '',
  };

  const cancelUpdateForm = () => {
    closeUpdateForm();
    clearUpdateMessage();
    formikRef.current.setFieldValue('body', '');
  };

  const handleSubmit = (values, formikBag) => {
    if (isUpdateForm) {
      ws.updateMessage({
        groupId: openedGroup._id,
        messageId: updateMessage._id,
        body: values.body,
      });
      cancelUpdateForm();
    } else {
      ws.sendMessage({
        groupId: openedGroup._id,
        userId: user._id,
        body: values.body,
      });
    }
    formikBag.resetForm();
  };

  useEffect(() => {
    if (formikRef.current) {
      if (updateMessage) {
        formikRef.current.setFieldValue('body', updateMessage.body);
      } else {
        formikRef.current.setFieldValue('body', '');
      }
    }
  }, [updateMessage]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {formikProps => (
        <Form className={styles.chatForm}>
          <Field className={styles.chatInput} name='body' />
          <button
            className={styles.chatSubmitBtn}
            type='submit'
            disabled={!formikProps.values.body.trim()}
          >
            {isUpdateForm ? 'Update' : 'Send'}
          </button>
          {isUpdateForm && (
            <button
              className={styles.cancelBtn}
              type='button'
              onClick={cancelUpdateForm}
            >
              Cancel
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
}

const mapStateToProps = ({ authData, messagesData }) => ({
  user: authData.user,
  openedGroup: messagesData.openedGroup,
  updateMessageError: messagesData.updateMessageError,
  isUpdateForm: messagesData.isUpdateForm,
  updateMessage: messagesData.updateMessage,
});

const mapDispatchToProps = dispatch => ({
  clearUpdateMessageErrorFromStore: () => dispatch(clearUpdateMessageError()),
  closeUpdateForm: () => dispatch(setIsUpdateForm(false)),
  clearUpdateMessage: () => dispatch(setUpdateMessage(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
