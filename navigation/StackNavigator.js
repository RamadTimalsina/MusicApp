// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import SignupScreen from '../screens/SigupScreen';
// import LoginScreen from '../screens/LoginScreen';
// import ForgotpasswordScreen from '../screens/ForgotpasswordScreen';
// import {NavigationContainer} from '@react-navigation/native';
// import ResetCodeScreen from '../screens/ResetCodeScreen';
// import ResetPasswordScreen from '../screens/ResetPasswordScreen';
// import LoginorSignupScreen from '../screens/LoginorSignupScreen';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import HomeScreen from '../screens/HomeScreen';
// import LibraryScreen from '../screens/LibraryScreen';
// import SearchScreen from '../screens/SearchScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
// const StackNavigator = () => {
//   function BottomTabs() {
//     return (
//       <Tab.Navigator
//         screenOptions={() => ({
//           tabBarShowLabel: false,
//         })}>
//         <Tab.Screen
//           name="HomeScreen"
//           component={HomeScreen}
//           options={{
//             tabBarStyle: {backgroundColor: '#101010'},
//             tabBarLabelStyle: {color: '#008E97'},
//             headerShown: false,
//             tabBarIcon: ({focused}) =>
//               focused ? (
//                 <MaterialCommunityIcons name="alpha" size={35} color="white" />
//               ) : (
//                 <MaterialCommunityIcons
//                   name="alpha"
//                   size={35}
//                   color="#989898"
//                 />
//               ),
//           }}
//         />

//         <Tab.Screen
//           name="LibraryScreen"
//           component={LibraryScreen}
//           options={{
//             tabBarStyle: {backgroundColor: '#101010'},
//             tabBarLabelStyle: {color: '#008E97'},
//             headerShown: false,
//             tabBarIcon: ({focused}) =>
//               focused ? (
//                 <Entypo name="heart" size={30} color="white" />
//               ) : (
//                 <Entypo name="heart" size={30} color="#989898" />
//               ),
//           }}
//         />
//         <Tab.Screen
//           name="SearchScreen"
//           component={SearchScreen}
//           options={{
//             tabBarStyle: {backgroundColor: '#101010'},
//             tabBarLabelStyle: {color: '#008E97'},
//             headerShown: false,
//             tabBarIcon: ({focused}) =>
//               focused ? (
//                 <MaterialIcons
//                   name="chat-bubble-outline"
//                   size={30}
//                   color="white"
//                 />
//               ) : (
//                 <MaterialIcons
//                   name="chat-bubble-outline"
//                   size={30}
//                   color="#989898"
//                 />
//               ),
//           }}
//         />

//         <Tab.Screen
//           name="ProfileScreen"
//           component={ProfileScreen}
//           options={{
//             tabBarStyle: {backgroundColor: '#101010'},
//             tabBarLabelStyle: {color: '#008E97'},
//             headerShown: false,
//             tabBarIcon: ({focused}) =>
//               focused ? (
//                 <Ionicons
//                   name="person-circle-outline"
//                   size={30}
//                   color="white"
//                 />
//               ) : (
//                 <Ionicons
//                   name="person-circle-outline"
//                   size={30}
//                   color="#989898"
//                 />
//               ),
//           }}
//         />
//       </Tab.Navigator>
//     );
//   }
//   const AuthStack = () => {
//     return (
//       <Stack.Navigator initialRouteName="LoginorSignupScreen">
//         <Stack.Screen
//           name="LoginorSignupScreen"
//           component={LoginorSignupScreen}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="SigupScreen"
//           component={SignupScreen}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="LoginScreen"
//           component={LoginScreen}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="ForgotpasswordScreen"
//           component={ForgotpasswordScreen}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="ResetCodeScreen"
//           component={ResetCodeScreen}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="ResetPasswordScreen"
//           component={ResetPasswordScreen}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     );
//   };
//   // function MainStack() {
//   //   return (
//   //     <Stack.Navigator>
//   //       <Stack.Screen
//   //         name="Main"
//   //         component={BottomTabs}
//   //         options={{headerShown: false}}
//   //       />
//   //     </Stack.Navigator>
//   //   );
//   }
//   return (
//     <NavigationContainer>
//       {token === null || token === '' ? <AuthStack /> : <BottomTabs />}
//     </NavigationContainer>
//   );
// };

// export default StackNavigator;

// const styles = StyleSheet.create({});
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StackNavigator = () => {
  return (
    <View>
      <Text>StackNavigator</Text>
    </View>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
