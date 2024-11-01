import React from 'react';
import styles from './ChatComponent.module.sass';
import ChatTopBar from '../ChatTopBar';
import ChatMessages from '../ChatMessages';
import ChatFormComponent from '../ChatFormComponent';
import { connect } from 'react-redux';

function ChatComponent ({ openedGroup }) {
  return (
    <div className={styles.chatComponent}>
      <div className={styles.chatWrapper}>
        {!openedGroup ? (
          <div className={styles.noSelectedGroupWrapper}>
            <span className={styles.noSelectedGroupMessage}>Choose group</span>
          </div>
        ) : (
          <>
            <ChatTopBar />
            <ChatMessages />
            <ChatFormComponent />
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ messagesData }) => ({
  openedGroup: messagesData.openedGroup,
});

export default connect(mapStateToProps)(ChatComponent);
