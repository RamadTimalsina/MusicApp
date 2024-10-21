import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {email, resetCode} = route.params; // Receive resetCode from route params

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please enter both new password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(
        'http://10.0.2.2:4000/api/users/reset-password',
        {
          resetCode, // Use resetCode here
          email,
          newPassword,
        },
      );

      if (response.status === 200) {
        Alert.alert('Success', response.data.message);
        navigation.navigate('SigupScreen'); // Navigate to login or another screen after success
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message ||
          'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/resetP.png')} style={styles.logo} />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Enter New Password</Text>
        <Text style={styles.label2}>
          Your new password must be different from the previous used passwords.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label5}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholderTextColor={'#000000'}
            placeholder="Enter your Password"
            style={styles.input}
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label5}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor={'#000000'}
            placeholder="Confirm New Password"
            style={styles.input}
            secureTextEntry
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.continuebutton}
        onPress={handleResetPassword}>
        <Text style={styles.lable4}>Reset Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 22,
  },
  headerContainer: {
    marginTop: '1%',
  },
  imageContainer: {
    alignItems: 'center',
  },
  logo: {
    height: 160,
    width: 180,
  },
  inputContainer: {
    marginTop: '5%',
  },
  label: {
    fontFamily: 'RobotoMedium',
    color: '#000000',
    fontSize: 35,
    fontWeight: '700',
    textAlign: 'center',
  },
  label2: {
    fontFamily: 'RobotoLight',
    color: '#26282A',
    fontSize: 17,
    marginTop: 3,
    textAlign: 'center',
  },
  input: {
    fontFamily: 'RobotoLight',
    width: '100%',
    color: '#000000',
    fontSize: 18,
  },
  label5: {
    fontFamily: 'RobotoMedium',
    color: '#000000',
    fontSize: 15,
  },
  inputWrapper: {
    elevation: 5,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 7,
    borderRadius: 7,
    height: 50,
  },
  continuebutton: {
    height: 50,
    backgroundColor: '#FF5763',
    borderRadius: 50,
    marginTop: '5%',
  },
  lable4: {
    color: '#FFFFFF',
    fontFamily: 'RobotoMedium',
    fontSize: 20,
    textAlign: 'center',
    top: 9,
  },
});
