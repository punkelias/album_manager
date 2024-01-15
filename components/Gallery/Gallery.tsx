import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AlbumImage} from '../../types';
import {RootState} from '../../store/store';

type Props = {
  route: {
    params: {
      albumId?: number;
    };
  };
};

const imageSize = Dimensions.get('window').width / 3;

const Gallery = ({route}: Props) => {
  const {params} = route;
  const {showAllPhotos} = useSelector((state: RootState) => state.gallery);
  const [images, setImages] = useState<AlbumImage[]>([]);

  const fetchImages = useCallback(async () => {
    let imagesResponse: AlbumImage[] = [];
    if (showAllPhotos) {
      imagesResponse = await fetch(
        'https://jsonplaceholder.typicode.com/photos',
      ).then(response => response.json());
    } else {
      imagesResponse = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${params.albumId}`,
      ).then(response => response.json());
    }
    setImages(imagesResponse);
  }, [params.albumId, showAllPhotos]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <View style={styles.galleryContainer}>
      <FlatList
        data={images}
        keyExtractor={item => {
          return item.id.toString();
        }}
        numColumns={3}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Image style={styles.image} source={{uri: item.thumbnailUrl}} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    flex: 3,
    marginHorizontal: 'auto',
  },
  item: {
    flex: 1,
    width: imageSize,
    height: imageSize,
    alignItems: 'center',
  },
  image: {width: imageSize, height: imageSize},
});

export default Gallery;
