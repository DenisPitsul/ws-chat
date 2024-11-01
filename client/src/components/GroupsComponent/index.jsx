import React from 'react';
import styles from './GroupsComponent.module.sass';
import GroupsList from '../GroupsList';
import CreateGroup from '../CreateGroup';
import GroupsFilter from '../GroupsFilter';

function GroupsComponent () {
  return (
    <div className={styles.groupsComponent}>
      <div className={styles.groupsWrapper}>
        <GroupsFilter />
        <GroupsList />
        <CreateGroup />
      </div>
    </div>
  );
}

export default GroupsComponent;
