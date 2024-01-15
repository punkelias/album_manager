export type User = {
  id: number;
  name: string;
  username: string;
  albums: Album[];
};

export type Album = {
  userId: number;
  id: number;
  title: string;
};

export type AlbumImage = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type StackParamList = {
  Users: undefined;
  Gallery: {albumId: number; albumTitle: string};
};
