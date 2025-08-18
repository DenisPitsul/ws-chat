import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { MdDelete, MdCancel } from "react-icons/md";
import { connect } from "react-redux";
import { Field, Form, Formik } from "formik";
import styles from "./ChatTopBar.module.sass";
import { notify } from "../../utils/notification";
import CONSTANTS from "../../constants";
import {
  clearDeleteGroupError,
  clearUpdateGroupError,
} from "../../store/slices/messagesSlice";
import { ws } from "../../api";
import { updateOpenedGroupInList } from "../../store/slices/groupsSlice";

function ChatTopBar({
  openedGroup,
  userId,
  updateGroupError,
  deleteGroupError,
  clearUpdateGroupErrorFromStore,
  clearDeleteGroupErrorFromStore,
  updateOpenedGroupInListInStore,
}) {
  const [isUpdateGroupOpened, setIsUpdateGroupOpened] = useState(false);

  useEffect(() => {
    if (updateGroupError) {
      notify(updateGroupError.error, CONSTANTS.STATUS.ERROR);
      clearUpdateGroupErrorFromStore();
    }
  }, [updateGroupError]);

  useEffect(() => {
    if (deleteGroupError) {
      notify(deleteGroupError.error, CONSTANTS.STATUS.ERROR);
      clearDeleteGroupErrorFromStore();
    }
  }, [updateGroupError]);

  useEffect(() => {
    setIsUpdateGroupOpened(false);
    updateOpenedGroupInListInStore({
      groupId: openedGroup._id,
      groupName: openedGroup.name,
    });
  }, [openedGroup, updateOpenedGroupInListInStore]);

  const initialValues = {
    name: openedGroup.name,
  };

  const handleSubmit = (values, formikBag) => {
    ws.updateGroup({ groupId: openedGroup._id, groupName: values.name });
    formikBag.resetForm();
  };

  return (
    <div className={styles.chatTopBar}>
      {isUpdateGroupOpened ? (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formikProps) => {
            return (
              <Form className={styles.updateGroupForm}>
                <Field
                  className={styles.groupNameInput}
                  type="text"
                  name="name"
                  placeholder="Group name"
                />
                <button
                  type="submit"
                  className={styles.submitUpdateGroupBtn}
                  disabled={!formikProps.values.name.trim()}
                >
                  <FaCheck className={styles.submitIcon} />
                </button>
                <button
                  type="submit"
                  className={styles.cancelUpdateGroupBtn}
                  onClick={() => setIsUpdateGroupOpened(false)}
                >
                  <MdCancel className={styles.cancelIcon} />
                </button>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <>
          <span className={styles.groupName}>{openedGroup.name}</span>
          {userId === openedGroup.user._id && (
            <div className={styles.buttonsWrapper}>
              <button
                type="button"
                className={styles.updateGroupButton}
                onClick={() => setIsUpdateGroupOpened(true)}
              >
                <FaEdit className={styles.updateIcon} />
              </button>
              <button
                type="button"
                className={styles.deleteGroupButton}
                onClick={() => ws.deleteGroup(openedGroup._id)}
              >
                <MdDelete className={styles.deleteIcon} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const mapStateToProps = ({ messagesData, authData }) => ({
  openedGroup: messagesData.openedGroup,
  userId: authData.user._id,
  updateGroupError: messagesData.updateGroupError,
  deleteGroupError: messagesData.deleteGroupError,
});

const mapDispatchToProps = (dispatch) => ({
  clearUpdateGroupErrorFromStore: () => dispatch(clearUpdateGroupError()),
  clearDeleteGroupErrorFromStore: () => dispatch(clearDeleteGroupError()),
  updateOpenedGroupInListInStore: (data) =>
    dispatch(updateOpenedGroupInList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatTopBar);
