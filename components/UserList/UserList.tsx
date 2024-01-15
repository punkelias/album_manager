import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import UserItem from '../UserItem';
import {User} from '../../types';
import {fetchUsers} from '../../store/usersSlice';
import {AppDispatch, RootState} from '../../store/store';

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {users, loading} = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={users}
      renderItem={({item}) => <UserItem user={item} />}
      keyExtractor={(item: User) => item.id.toString()}
    />
  );
};

export default UserList;
