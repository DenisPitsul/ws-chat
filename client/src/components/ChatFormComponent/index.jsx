import React from 'react';
import styles from './ChatFormComponent.module.sass';
import ChatForm from '../ChatForm';

function ChatFormComponent () {
  return (
    <div className={styles.chatFormComponent}>
      <ChatForm />
    </div>
  );
}

export default ChatFormComponent;
