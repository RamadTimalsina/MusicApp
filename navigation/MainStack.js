import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs'; // TODO: importing the bottom tabs from the bottom tabs screen
import SongsListScreen from '../screens/SongsListScreen';
import NewSongScreen from '../screens/NewSongScreen';
import PlaylistDetail from '../screens/playlist/PlaylistDetail';
import PlaySongScreen from '../screens/PlaySongScreen';

const Stack = createNativeStackNavigator();
// TODO:This help in containing the screen of the bottom tabs in the main component and other aditional screen that will be used
const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SongsListScreen"
        component={SongsListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewSongScreen"
        component={NewSongScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlaylistDetail"
        component={PlaylistDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlaySongScreen"
        component={PlaySongScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
