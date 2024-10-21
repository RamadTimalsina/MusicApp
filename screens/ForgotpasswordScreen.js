import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios'; // Import axios for making API calls
import {useNavigation} from '@react-navigation/native';

const ForgotpasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); // State to manage email input

  const handleCancel = () => {
    navigation.navigate('SigupScreen');
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Please enter your email.');
      return;
    }

    try {
      // Send a POST request to the backend API to request a password reset code
      const response = await axios.post(
        'http://10.0.2.2:4000/api/users/forgot-password',
        {
          // Adjust the URL if needed
          email: email,
        },
      );

      if (response.status === 200) {
        Alert.alert('Success', response.data.message);
        navigation.navigate('ResetCodeScreen'); // Navigate to ResetCodeScreen if the request is successful
      }
    } catch (error) {
      console.error('Error sending reset code:', error);
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
        <Image source={require('../assets/fimage.jpeg')} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Forgot Password</Text>
        <Text style={styles.label2}>
          Enter your email address below to reset your password
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            autoFocus={true}
            value={email} // Set the value of the TextInput
            onChangeText={setEmail} // Update the state when the user types
            placeholderTextColor={'#000000'}
            placeholder="Enter your Email"
            style={styles.input}
            keyboardType="email-address"
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.signinbutton}
          onPress={handleResetPassword}>
          <Text style={styles.lable3}>Continue</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.cancelbutton} onPress={handleCancel}>
          <Text style={styles.lable4}>Back to login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotpasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', //FFFBF2
    flex: 1,
    padding: 22,
  },
  imageContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: '1%',
  },
  logo: {
    height: 160,
    width: 180,
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
  lable4: {
    color: '#FFFFFF',
    fontFamily: 'RobotoMedium',
    fontSize: 20,
    textAlign: 'center',
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
  input: {
    fontFamily: 'RobotoLight',
    width: '100%',
    color: '#000000',
    fontSize: 18,
  },
  signinbutton: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelbutton: {
    height: 50,
    backgroundColor: '#FF5763',
    borderRadius: 50,
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lable3: {
    color: '#000000',
    fontFamily: 'RobotoMedium',
    fontSize: 20,
    textAlign: 'center',
  },
});
