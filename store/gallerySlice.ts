import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    showAllPhotos: false,
  },
  reducers: {
    toggleShowAllPhotos(state, _action: PayloadAction) {
      state.showAllPhotos = !state.showAllPhotos;
    },
  },
});

export const {toggleShowAllPhotos} = gallerySlice.actions;

export default gallerySlice.reducer;
