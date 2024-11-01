import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import styles from './ChatMessages.module.sass';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { formattedDate } from '../../utils/date';
import CONSTANTS from '../../constants';
import {
  clearDeleteMessageError,
  setIsUpdateForm,
  setUpdateMessage,
} from '../../store/slices/messagesSlice';
import { ws } from '../../api';
import { notify } from '../../utils/notification';

function ChatMessages ({
  messages,
  authUserId,
  openedGroup,
  deleteMessageError,
  updateMessage,
  clearDeleteMessageErrorFromStore,
  setUpdateForm,
  setUpdateMessageInStore,
}) {
  const chatWrapperRef = useRef();

  useEffect(() => {
    if (deleteMessageError) {
      notify(deleteMessageError.error, CONSTANTS.STATUS.ERROR);
      clearDeleteMessageErrorFromStore();
    }
  }, [deleteMessageError]);

  useLayoutEffect(() => {
    chatWrapperRef.current.scrollTo({
      top: document.body.scrollHeight,
    });
  }, [messages.length]);

  const groupCreatorClassNames = classNames(styles.createdGroupMessage, {
    [styles.youCreatedGroupMessage]: authUserId === openedGroup.user._id,
    [styles.anotherCreatedGroupMessage]: authUserId !== openedGroup.user._id,
  });

  const messageItemClassNames = userSentId => {
    return classNames(styles.messageItem, {
      [styles.yourMessageItem]: userSentId === authUserId,
      [styles.anotherMessageItem]: userSentId !== authUserId,
    });
  };

  const messageSenderClassNames = userSentId => {
    return classNames(styles.messageSender, {
      [styles.messageSenderYou]: userSentId === authUserId,
      [styles.messageSenderAnother]: userSentId !== authUserId,
    });
  };

  const messageTextClassNames = userSentId => {
    return classNames(styles.messageItemText, {
      [styles.yourMessageItemText]: userSentId === authUserId,
      [styles.anotherMessageItemText]: userSentId !== authUserId,
    });
  };

  const messageDateClassNames = userSentId => {
    return classNames(styles.sentDateMessage, {
      [styles.yourMessageDate]: userSentId === authUserId,
      [styles.anotherMessageDate]: userSentId !== authUserId,
    });
  };

  const updateMessageBtnClicked = message => {
    setUpdateForm(true);
    setUpdateMessageInStore(message);
  };

  const deleteMessageBtnClicked = message => {
    if (updateMessage?._id === message.messageId) {
      setUpdateForm(false);
      setUpdateMessageInStore(null);
    }
    ws.deleteMessage(message);
  };

  return (
    <div ref={chatWrapperRef} className={styles.chatWrapper}>
      <div className={styles.groupCreatedWrapper}>
        <span className={groupCreatorClassNames}>
          {authUserId === openedGroup.user._id
            ? 'You'
            : openedGroup.user.username}{' '}
          created group at {formattedDate(openedGroup.createdAt)}
        </span>
      </div>
      {messages.length === 0 ? (
        <div className={styles.noMessagesWrapper}>
          <span className={styles.noMessagesMessage}>
            There is no messages in this group
          </span>
        </div>
      ) : (
        <ul className={styles.messagesList}>
          {messages.map(
            ({
              _id,
              user: { _id: userSentId, username },
              body,
              createdAt,
              updatedAt,
            }) => (
              <li key={_id} className={messageItemClassNames(userSentId)}>
                <span className={messageSenderClassNames(userSentId)}>
                  {userSentId === authUserId ? 'You' : username}
                </span>
                <div className={styles.messageItemTextWrapper}>
                  {userSentId === authUserId && (
                    <>
                      <button
                        type='button'
                        className={styles.updateMessageButton}
                        onClick={() =>
                          updateMessageBtnClicked({
                            groupId: openedGroup._id,
                            _id,
                            body,
                          })
                        }
                      >
                        <FaEdit className={styles.updateIcon} />
                      </button>
                      <button
                        type='button'
                        className={styles.deleteMessageButton}
                        onClick={() =>
                          deleteMessageBtnClicked({
                            groupId: openedGroup._id,
                            messageId: _id,
                          })
                        }
                      >
                        <MdDelete className={styles.deleteIcon} />
                      </button>
                    </>
                  )}
                  <span className={messageTextClassNames(userSentId)}>
                    {body}
                  </span>
                </div>
                <span className={messageDateClassNames(userSentId)}>
                  {createdAt !== updatedAt && (
                    <span className={styles.editedText}>edited </span>
                  )}
                  {formattedDate(createdAt)}
                </span>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = ({ authData, messagesData }) => ({
  authUserId: authData.user._id,
  openedGroup: messagesData.openedGroup,
  messages: messagesData.messages,
  deleteMessageError: messagesData.deleteMessageError,
  isUpdateForm: messagesData.isUpdateForm,
  updateMessage: messagesData.updateMessage,
});

const mapDispatchToProps = dispatch => ({
  clearDeleteMessageErrorFromStore: () => dispatch(clearDeleteMessageError()),
  setUpdateForm: flag => dispatch(setIsUpdateForm(flag)),
  setUpdateMessageInStore: message => dispatch(setUpdateMessage(message)),
  clearUpdateMessage: () => dispatch(setUpdateMessage(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages);
