import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Album} from '../../types';
import * as RootNavigation from '../utils/rootNavigation';

type Props = {
  album: Album;
  onAlbumDelete: (id: number) => void;
};

const AlbumItem = ({album, onAlbumDelete}: Props) => {
  const handleDeletePress = () => {
    onAlbumDelete(album.id);
  };

  const handleNavigatePress = () => {
    RootNavigation.navigate('Gallery', {
      albumId: album.id,
      albumTitle: album.title,
    });
  };

  return (
    <TouchableHighlight style={styles.album} onPress={handleNavigatePress}>
      <View style={styles.container}>
        <Text style={styles.text}>{album.title}</Text>
        <Icon
          style={styles.icon}
          name="trash"
          size={20}
          color={'#A41051'}
          onPress={handleDeletePress}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  album: {
    backgroundColor: '#D9D2E9',
    borderWidth: 0.5,
    marginLeft: 50,
    minHeight: 50,
    padding: 10,
    color: '#212121',
    borderRadius: 10,
  },
  text: {
    width: '90%',
    color: '#212121',
  },
  icon: {
    width: '10%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AlbumItem;
