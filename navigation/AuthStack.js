import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ResetCodeScreen from '../screens/ResetCodeScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ForgotpasswordScreen from '../screens/ForgotpasswordScreen';
import LoginorSignupScreen from '../screens/LoginorSignupScreen';
import SignupScreen from '../screens/SignupScreen';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();
//TODO: This navigtion helps in navigating user between various screen used for the authentication
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginorSignupScreen">
      <Stack.Screen
        name="LoginorSignupScreen"
        component={LoginorSignupScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotpasswordScreen"
        component={ForgotpasswordScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ResetCodeScreen"
        component={ResetCodeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
