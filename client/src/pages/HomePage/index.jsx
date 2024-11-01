import { useEffect, useLayoutEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import styles from './HomePage.module.sass';
import GroupsComponent from '../../components/GroupsComponent';
import ChatComponent from '../../components/ChatComponent';
// import { getMessagesThunk } from '../store/slices/messagesSlice';
// import { ws } from '../api';

function HomePage () {
  // useEffect(() => {
  //   get(limit);
  // }, [limit]);

  // useLayoutEffect(() => {
  //   // window.scrollTo(0, document.body.scrollHeight);
  //   window.scrollTo({
  //     top: document.body.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // }, [messages.length]);

  // const addMessage = (values, formikBag) => {
  //   // create(values);
  //   ws.createMessage(values);
  //   formikBag.resetForm();
  // };

  return (
    <div className={`container ${styles.pageWrapper}`}>
      <div className={styles.pageContainer}>
        {/* {error && <div style={{ color: 'red' }}>ERROR!!!</div>}
      {isFetching && <div>Messages is loading. Please, wait...</div>}
      {!isFetching && !error && (
        <ol>
          {messages.map(m => (
            <li key={m._id}>{JSON.stringify(m)}</li>
          ))}
        </ol>
      )}
      <hr />
      <Formik initialValues={{ body: '' }} onSubmit={addMessage}>
        {formikProps => (
          <Form>
            <Field name='body'></Field>
            <button type='submit'>Send</button>
          </Form>
        )}
      </Formik> */}
        <GroupsComponent />
        <ChatComponent />
      </div>
    </div>
  );
}

export default HomePage;
