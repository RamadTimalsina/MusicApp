import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient'; // Make sure you have this library installed
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#1E1E1E',
          margin: 4,
          height: 60,
          borderRadius: 30,
          borderTopWidth: 0,
          // shadowColor: '#000',
          // shadowOpacity: 0.06,
          // shadowOffset: {width: 0, height: 2},
          shadowRadius: 10,
          elevation: 10,
          paddingHorizontal: 7,
          // paddingBottom: 10,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <LinearGradient
                colors={['#8A2BE2', '#FF7F7F']}
                style={{
                  height: 40,
                  width: 100,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                }}>
                <MaterialCommunityIcons name="home" size={28} color="#FFFFFF" />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                    color: '#FFFFFF',
                    marginLeft: 8,
                  }}>
                  Home
                </Text>
              </LinearGradient>
            ) : (
              <MaterialCommunityIcons
                name="home-outline"
                size={28}
                color="#8E8E8F"
              />
            ),
        }}
      />
      <Tab.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <LinearGradient
                colors={['#8A2BE2', '#FF7F7F']}
                style={{
                  height: 40,
                  width: 100,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                }}>
                <MaterialIcons name="library-music" size={28} color="#FFFFFF" />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                    color: '#FFFFFF',
                    marginLeft: 8,
                  }}>
                  Library
                </Text>
              </LinearGradient>
            ) : (
              <MaterialIcons name="library-music" size={28} color="#8E8E8F" />
            ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <LinearGradient
                colors={['#8A2BE2', '#FF7F7F']}
                style={{
                  height: 40,
                  width: 100,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                }}>
                <AntDesign name="search1" size={28} color="#FFFFFF" />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                    color: '#FFFFFF',
                    marginLeft: 8,
                  }}>
                  Search
                </Text>
              </LinearGradient>
            ) : (
              <AntDesign name="search1" size={28} color="#8E8E8F" />
            ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <LinearGradient
                colors={['#8A2BE2', '#FF7F7F']}
                style={{
                  height: 40,
                  width: 100,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                }}>
                <Ionicons
                  name="person-circle-outline"
                  size={28}
                  color="#FFFFFF"
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                    color: '#FFFFFF',
                    marginLeft: 8,
                  }}>
                  Profile
                </Text>
              </LinearGradient>
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={28}
                color="#8E8E8F"
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
