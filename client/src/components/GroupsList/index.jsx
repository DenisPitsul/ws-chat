import React, { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './GroupsList.module.sass';
import {
  clearGetGroupsError,
  getGroupsThunk,
} from '../../store/slices/groupsSlice';
import { connect } from 'react-redux';
import { ws } from '../../api';
import CONSTANTS from '../../constants';
import { notify } from '../../utils/notification';

function GroupsList ({
  token,
  groups,
  page,
  totalPages,
  getGroupsError,
  isFetching,
  getGroups,
  groupNameFilter,
  openedGroup,
  clearGetGroupsErrorFromStore,
}) {
  const observer = useRef();
  const listRef = useRef(null);

  useEffect(() => {
    if (getGroupsError) {
      notify(getGroupsError.error, CONSTANTS.STATUS.ERROR);
      clearGetGroupsErrorFromStore();
    }
  }, [getGroupsError]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getGroups({ token, groupName: groupNameFilter, page: 1 });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [groupNameFilter]);

  const loadMoreGroups = useCallback(() => {
    if (page < totalPages) {
      const scrollPosition = listRef.current?.scrollTop;

      getGroups({ token, groupName: groupNameFilter, page: page + 1 }).then(
        () => {
          if (listRef.current) {
            listRef.current.scrollTop = scrollPosition;
          }
        }
      );
    }
  }, [groups]);

  const lastGroupRef = useCallback(
    node => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMoreGroups();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loadMoreGroups]
  );

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
      {!isFetching && !getGroupsError && groups.length !== 0 && (
        <ul className={styles.groupsList} ref={listRef}>
          {groups.map(({ _id, name }, index) => (
            <li
              onClick={() => chooseGroup(_id)}
              key={_id}
              className={groupItemClassNames(_id)}
              ref={index === groups.length - 1 ? lastGroupRef : null}
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
  getGroupsError: groupsData.getGroupsError,
  isFetching: groupsData.isFetching,
  page: groupsData.page,
  totalPages: groupsData.totalPages,
  groupNameFilter: groupsData.groupNameFilter,
  openedGroup: messagesData.openedGroup,
});

const mapDispatchToProps = dispatch => ({
  getGroups: data => dispatch(getGroupsThunk(data)),
  clearGetGroupsErrorFromStore: () => dispatch(clearGetGroupsError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList);
