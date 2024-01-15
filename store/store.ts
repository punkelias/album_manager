import {configureStore} from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import gallerySlice from './gallerySlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    gallery: gallerySlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
