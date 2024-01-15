import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Album, User} from '../types';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as User[],
    loading: false,
  },
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setUserAlbums(state, action: PayloadAction<{user: User; albums: Album[]}>) {
      const index = state.users.findIndex(u => u.id === action.payload.user.id);
      const updatedUser = {
        ...action.payload.user,
        albums: action.payload.albums,
      };
      state.users = [
        ...state.users.slice(0, index),
        updatedUser,
        ...state.users.slice(index + 1),
      ];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.loading = false;
    });
  },
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return (await response.json()) as User[];
});

export const {setUsers, setUserAlbums} = usersSlice.actions;

export default usersSlice.reducer;
