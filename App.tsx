import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './store/store';
import HomeScreen from './components/HomeScreen';
import Gallery from './components/Gallery';
import {StackParamList} from './types';
import {navigationRef} from './components/utils/rootNavigation';
import HeaderButton from './components/HeaderButton';

const Stack = createNativeStackNavigator<StackParamList>();

function App(): React.JSX.Element {
  const headerButtonRender = () => {
    return <HeaderButton />;
  };

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Users" component={HomeScreen} />
          <Stack.Screen
            name="Gallery"
            component={Gallery}
            options={({route}) => ({
              title: route.params.albumTitle || 'All photos',
              headerRight: headerButtonRender,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
