import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const login = async userToken => {
    setToken(userToken);
    await AsyncStorage.setItem('token', userToken);
    setIsLoading(false);
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('token');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userToken = await AsyncStorage.getItem('token');
      if (userToken) {
        setToken(userToken);
      }
    } catch (error) {
      console.log('Error retrieving token from storage', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, token, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
