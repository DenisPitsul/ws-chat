import React, { useState } from 'react';
import styles from './CreateGroup.module.sass';
import CreateGroupForm from '../CreateGroupForm';

function CreateGroup () {
  const [isFormOpened, setIsFormOpened] = useState(false);

  return (
    <div className={styles.createGroup}>
      {isFormOpened ? (
        <CreateGroupForm setIsFormOpened={setIsFormOpened} />
      ) : (
        <button
          type='button'
          className={styles.createGroupBtn}
          onClick={() => setIsFormOpened(true)}
        >
          Create Group
        </button>
      )}
    </div>
  );
}

export default CreateGroup;
