import React, {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

//gets the isloading and token from the authContext screen
const AppNav = () => {
  const {isLoading, token} = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
