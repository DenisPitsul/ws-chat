import React, { useEffect } from 'react';
import styles from './GroupsList.module.sass';
import { getGroupsThunk } from '../../store/slices/groupsSlice';
import { connect } from 'react-redux';
import { ws } from '../../api';
import classNames from 'classnames';

function GroupsList ({
  token,
  groups,
  getError,
  isFetching,
  getGroups,
  groupNameFilter,
  openedGroup,
}) {
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getGroups({ token, groupName: groupNameFilter });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [groupNameFilter]);

  const chooseGroup = groupId => {
    ws.getGroupMessages(groupId);
  };

  const groupItemClassNames = groupId => {
    return classNames(styles.groupItem, {
      [styles.activeGroupItem]: openedGroup?._id === groupId,
    });
  };

  return (
    <>
      {groups.length === 0 && (
        <div className={styles.noGroupsMessage}>No groups found</div>
      )}
      {getError && <div className={styles.error}>{getError.message}</div>}
      {!isFetching && !getError && groups.length !== 0 && (
        <ul className={styles.groupsList}>
          {groups.map(({ _id, name }) => (
            <li
              onClick={() => chooseGroup(_id)}
              key={_id}
              className={groupItemClassNames(_id)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

const mapStateToProps = ({ groupsData, authData, messagesData }) => ({
  token: authData.token,
  groups: groupsData.groups,
  getError: groupsData.getError,
  isFetching: groupsData.isFetching,
  groupNameFilter: groupsData.groupNameFilter,
  openedGroup: messagesData.openedGroup,
});

const mapDispatchToProps = dispatch => ({
  getGroups: data => dispatch(getGroupsThunk(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList);