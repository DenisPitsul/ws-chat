import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../api';

const AUTH_SLICE_NAME = 'auth';

export const registrationThunk = createAsyncThunk(
  `${AUTH_SLICE_NAME}/registration`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { token },
      } = await http.register(payload);
      return token;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginThunk = createAsyncThunk(
  `${AUTH_SLICE_NAME}/login`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { token },
      } = await http.login(payload);
      return token;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserThunk = createAsyncThunk(
  `${AUTH_SLICE_NAME}/getUser`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await http.getUser(payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  token: null,
  user: null,
  isFetching: false,
  userError: null,
  authError: null,
};

const authSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState,
  reducers: {
    changeStatus: (state, { payload }) => {
      state.status = payload;
    },
    clearAuthError: state => {
      state.authError = null;
    },
    getTokenFromSessionStorage: state => {
      state.token = sessionStorage.getItem('token');
    },
    setTokenToSessionStorage: (state, { payload }) => {
      sessionStorage.setItem('token', payload);
    },
    logOut: state => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem('token');
    },
  },
  extraReducers: builder => {
    builder.addCase(registrationThunk.pending, state => {
      state.isFetching = true;
      state.authError = null;
    });
    builder.addCase(registrationThunk.fulfilled, (state, { payload }) => {
      state.token = payload;
      sessionStorage.setItem('token', payload);
      state.isFetching = false;
    });
    builder.addCase(registrationThunk.rejected, (state, { payload }) => {
      state.authError = payload;
      state.isFetching = false;
    });

    builder.addCase(loginThunk.pending, state => {
      state.isFetching = true;
      state.authError = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.token = payload;
      sessionStorage.setItem('token', payload);
      state.isFetching = false;
    });
    builder.addCase(loginThunk.rejected, (state, { payload }) => {
      state.authError = payload;
      state.isFetching = false;
    });

    builder.addCase(getUserThunk.pending, state => {
      state.isFetching = true;
      state.userError = null;
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isFetching = false;
    });
    builder.addCase(getUserThunk.rejected, (state, { payload }) => {
      state.userError = payload;
      state.isFetching = false;
    });
  },
});

const { reducer, actions } = authSlice;

export const {
  changeStatus,
  getTokenFromSessionStorage,
  setTokenToSessionStorage,
  clearAuthError,
  logOut,
} = actions;

export default reducer;
