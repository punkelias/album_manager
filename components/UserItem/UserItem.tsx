import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Album, User} from '../../types';
import AlbumItem from '../AlbumItem';
import {RootState} from '../../store/store';
import {setUserAlbums} from '../../store/usersSlice';
import {createSelector} from '@reduxjs/toolkit';

type Props = {
  user: User;
};

const UserItem = ({user}: Props) => {
  const [showList, setShowList] = useState(false);
  const dispatch = useDispatch();
  const selectUserAlbums = createSelector(
    (state: RootState) => state.users,
    users => users.users.find(u => u.id === user.id)?.albums || [],
  );
  const albums = useSelector(selectUserAlbums);

  const fetchAlbums = useCallback(async () => {
    const albumsResponse: Album[] = await fetch(
      `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
    ).then(response => response.json());

    dispatch(setUserAlbums({user, albums: albumsResponse}));
  }, [dispatch, user]);

  useEffect(() => {
    if (!user.albums) {
      fetchAlbums();
    }
  }, [fetchAlbums, user]);

  const handleAlbumDelete = (albumId: number) => {
    const filteredAlbums = user.albums.filter(album => album.id !== albumId);
    dispatch(setUserAlbums({user, albums: filteredAlbums}));
  };

  const onUserPress = () => setShowList(!showList);

  return (
    <View>
      <TouchableHighlight onPress={onUserPress}>
        <Text style={styles.name}>{user.name}</Text>
      </TouchableHighlight>
      {showList && (
        <FlatList
          data={albums}
          renderItem={({item}) => (
            <AlbumItem album={item} onAlbumDelete={handleAlbumDelete} />
          )}
          keyExtractor={(item: Album) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    height: 75,
    fontSize: 28,
    padding: 15,
    backgroundColor: '#E8F4FF',
    borderBottomWidth: 0.5,
    color: '#212121',
    borderColor: '#6E6E6E',
  },
});

export default UserItem;
