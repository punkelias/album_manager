import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {toggleShowAllPhotos} from '../../store/gallerySlice';
import {AppDispatch, RootState} from '../../store/store';

const HeaderButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {showAllPhotos} = useSelector((state: RootState) => state.gallery);

  const handleToggleGallery = () => {
    dispatch(toggleShowAllPhotos());
  };
  return (
    <Icon
      name="star"
      size={20}
      color={`${showAllPhotos ? '#bebebe' : '#A41051'}`}
      onPress={handleToggleGallery}
    />
  );
};

export default HeaderButton;
