import { useEffect, useLayoutEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import styles from './HomePage.module.sass';
import GroupsComponent from '../../components/GroupsComponent';
import ChatComponent from '../../components/ChatComponent';
function HomePage () {
  return (
    <div className={`container ${styles.pageWrapper}`}>
      <div className={styles.pageContainer}>
        <GroupsComponent />
        <ChatComponent />
      </div>
    </div>
  );
}

export default HomePage;
