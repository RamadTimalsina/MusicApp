import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const LoginOrSignupScreen = () => {
  const navigation = useNavigation();
  //navigate to the login screen
  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };
  //navigate to the signup screen
  const navigateToSignup = () => {
    navigation.navigate('SigupScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to VII Music</Text>
      <Text style={styles.subtitle}>Please choose an option</Text>

      <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
        <Text style={styles.buttonText}>Create New Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navigateToSignup}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2C', // Background color matching the color scheme
  },
  title: {
    fontSize: 24,
    color: '#FF5733', // Primary color
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF', // Text color
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FF5733', // Button color matching primary color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 7,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF', // Button text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginOrSignupScreen;
