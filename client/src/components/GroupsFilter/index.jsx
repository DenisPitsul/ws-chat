import React from 'react';
import { connect } from 'react-redux';
import styles from './GroupsFilter.module.sass';
import { setGroupNameFilter } from '../../store/slices/groupsSlice';

function GroupsFilter ({ groupNameFilter, updateGroupNameFilter }) {
  return (
    <div className={styles.groupsFilter}>
      <input
        type='text'
        placeholder='Group name filter'
        className={styles.groupsFilterInput}
        value={groupNameFilter}
        onChange={e => updateGroupNameFilter(e.target.value)}
      />
    </div>
  );
}

const mapStateToProps = ({ groupsData }) => ({
  groupNameFilter: groupsData.groupNameFilter,
});

const mapDispatchToProps = dispatch => ({
  updateGroupNameFilter: value => dispatch(setGroupNameFilter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsFilter);
