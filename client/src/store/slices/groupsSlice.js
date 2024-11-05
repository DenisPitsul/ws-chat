import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../api';

const GROUPS_SLICE_NAME = 'groups';

const initialState = {
  isFetching: false,
  groups: [],
  page: 1,
  totalPages: 0,
  groupNameFilter: '',
  getGroupsError: null,
  createGroupError: null,
};

export const getGroupsThunk = createAsyncThunk(
  `${GROUPS_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await http.getGroups(payload);
      return data;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

const authSlice = createSlice({
  name: GROUPS_SLICE_NAME,
  initialState,
  reducers: {
    clearGetGroupsError: state => {
      state.getGroupsError = null;
    },
    createGroupSuccess: (state, { payload }) => {
      state.createError = null;
      state.groups.push(payload);
    },
    createGroupError: (state, { payload }) => {
      state.createGroupError = payload;
    },
    clearCreateGroupError: state => {
      state.createGroupError = null;
    },
    setGroupNameFilter: (state, { payload }) => {
      state.groupNameFilter = payload;
    },
    updateOpenedGroupInList: (state, { payload }) => {
      const updatedGroupIndex = state.groups.findIndex(
        group => group._id === payload.groupId
      );
      if (updatedGroupIndex !== -1) {
        state.groups[updatedGroupIndex].name = payload.groupName;
      }
    },
    deleteGroupFromList: (state, { payload }) => {
      const deletedGroupIndex = state.groups.findIndex(
        group => group._id === payload
      );
      if (deletedGroupIndex !== -1) {
        state.groups.splice(deletedGroupIndex, 1);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getGroupsThunk.pending, state => {
      state.isFetching = true;
      state.getError = null;
    });
    builder.addCase(getGroupsThunk.fulfilled, (state, { payload }) => {
      if (payload.page === 1) {
        state.groups = payload.data;
      } else {
        state.groups.push(...payload.data);
      }
      state.totalPages = payload.totalPages;
      state.page = payload.page;
      state.isFetching = false;
    });
    builder.addCase(getGroupsThunk.rejected, (state, { payload }) => {
      state.getError = payload;
      state.isFetching = false;
    });
  },
});

const { reducer, actions } = authSlice;

export const {
  clearGetGroupsError,
  createGroupSuccess,
  createGroupError,
  clearCreateGroupError,
  setGroupNameFilter,
  updateOpenedGroupInList,
  deleteGroupFromList,
} = actions;

export default reducer;
