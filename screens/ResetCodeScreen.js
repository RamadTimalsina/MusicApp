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

const ResetCodeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [otp, setOtp] = useState(''); // State to manage OTP input

  const email = route.params?.email; // Retrieve the email passed from ForgotPasswordScreen

  const handleOTP = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP.');
      return;
    }

    try {
      // Send a POST request to verify the OTP code
      const response = await axios.post(
        'http://10.0.2.2:4000/api/users/verify-reset-code',
        {
          email, // Email is taken from route params
          resetCode: otp,
        },
      );

      if (response.status === 200) {
        Alert.alert('Success', response.data.message);
        navigation.navigate('ResetPasswordScreen', {email, resetCode: otp}); // Pass email to the next screen
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message ||
          'Invalid or expired reset code. Please try again.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/resetcode.jpg')}
          style={styles.Image}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter OTP</Text>
        <Text style={styles.label2}>
          Enter the OTP code sent to your email address
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            value={otp}
            onChangeText={setOtp}
            autoFocus={true}
            placeholderTextColor={'#000000'}
            placeholder="Enter your OTP"
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.continuebutton} onPress={handleOTP}>
        <Text style={styles.lable4}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResetCodeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 22,
  },
  imageContainer: {
    alignItems: 'center',
  },
  Image: {
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
  inputWrapper: {
    elevation: 5,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginTop: 10,
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
  input: {
    fontFamily: 'RobotoLight',
    flex: 1,
    color: '#000000',
    fontSize: 18,
  },
});
