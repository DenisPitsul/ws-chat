import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./CreateGroup.module.sass";
import CreateGroupForm from "../CreateGroupForm";
import { notify } from "../../utils/notification";
import CONSTANTS from "../../constants";
import { clearCreateGroupError } from "../../store/slices/groupsSlice";

function CreateGroup({ createGroupError, clearCreateGroupErrorFromStore }) {
  const [isFormOpened, setIsFormOpened] = useState(false);

  useEffect(() => {
    if (createGroupError) {
      notify(createGroupError.error, CONSTANTS.STATUS.ERROR);
      clearCreateGroupErrorFromStore();
    }
  }, [clearCreateGroupErrorFromStore, createGroupError]);

  return (
    <div className={styles.createGroup}>
      {isFormOpened ? (
        <CreateGroupForm setIsFormOpened={setIsFormOpened} />
      ) : (
        <button
          type="button"
          className={styles.createGroupBtn}
          onClick={() => setIsFormOpened(true)}
        >
          Create Group
        </button>
      )}
    </div>
  );
}

const mapStateToProps = ({ groupsData }) => ({
  createGroupError: groupsData.createGroupError,
});

const mapDispatchToProps = (dispatch) => ({
  clearCreateGroupErrorFromStore: () => dispatch(clearCreateGroupError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
