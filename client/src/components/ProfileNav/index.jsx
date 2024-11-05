import React from 'react';
import { connect } from 'react-redux';
import styles from './ProfileNav.module.sass';
import { Link } from 'react-router-dom';
import { logOut } from '../../store/slices/authSlice';

function ProfileNav ({ user, logOut }) {
  return (
    <div className={styles.profileNav}>
      {user ? (
        <>
          <span className={styles.userName}>{user.username}</span>
          <button className={styles.logoutBtn} onClick={() => logOut()}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className={styles.navLink} to='/login'>
            Login
          </Link>
          <Link className={styles.navLink} to='/registration'>
            Registration
          </Link>
        </>
      )}
    </div>
  );
}

const mapStateToProps = ({ authData }) => ({
  user: authData.user,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNav);
