import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Loader from './components/Loader';
import BasePage from './pages/BasePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import {
  getTokenFromSessionStorage,
  getUserThunk,
  setTokenToSessionStorage,
} from './store/slices/authSlice';

function App ({
  isAuthFetching,
  isGroupsFetching,
  user,
  token,
  getTokenFromStorage,
  setTokenToStorage,
  getUser,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    getTokenFromStorage();
  }, []);

  useEffect(() => {
    if (token) {
      setTokenToStorage(token);
      getUser(token);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [user]);

  return (
    <>
      <ToastContainer className='notification' />
      {(isAuthFetching || isGroupsFetching) && <Loader />}
      <Routes>
        {user ? (
          <Route path='/' element={<BasePage />}>
            <Route index element={<HomePage />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Route>
        ) : (
          <Route path='/' element={<BasePage />}>
            <Route index element={<Navigate to='/login' />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

const mapStateToProps = ({ authData, groupsData }) => ({
  isAuthFetching: authData.isFetching,
  isGroupsFetching: groupsData.isFetching,
  user: authData.user,
  token: authData.token,
});

const mapDispatchToProps = dispatch => ({
  getTokenFromStorage: () => dispatch(getTokenFromSessionStorage()),
  setTokenToStorage: token => dispatch(setTokenToSessionStorage(token)),
  getUser: token => dispatch(getUserThunk(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
