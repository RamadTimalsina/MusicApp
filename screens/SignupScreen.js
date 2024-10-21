import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {AuthContext} from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = () => {
  const navigation = useNavigation();
  const {setToken} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);

  const signin = () => {
    navigation.navigate('LoginScreen');
  };

  const forgetPassword = () => {
    navigation.navigate('ForgotpasswordScreen');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:4000/api/users/login',
        {
          email,
          password,
        },
      );
      const {token} = response.data;
      await AsyncStorage.setItem('token', token);
      setToken(token);
      // Clear input fields
      setEmail('');
      setPassword('');

      // Navigate to the next screen or protected route
      navigation.navigate('Main', {screen: 'HomeScreen'});
      // Corrected to navigate to HomeScreen after login
    } catch (error) {
      console.log(
        'Login error:',
        error.response
          ? error.response.data
          : error.message ||
              Alert.alert('Login Failed', 'Invalid email or password'),
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/image2.png')} style={styles.logo} />
          <Text style={styles.title}>VII Music</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email address</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              onChangeText={setEmail}
              autoFocus={true}
              placeholderTextColor={'#B0BEC5'}
              placeholder="Enter your Email"
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              onChangeText={setPassword}
              placeholderTextColor={'#B0BEC5'}
              placeholder="Enter your Password"
              style={styles.input}
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.checkboxandRememberme}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              tintColors={{true: '#FFFFFF', false: '#FFFFFF'}}
            />
            <Text style={styles.label2}>Remember Me</Text>
          </View>
          <Pressable onPress={forgetPassword}>
            <Text style={styles.label3}>Forgot your password?</Text>
          </Pressable>
        </View>

        <TouchableOpacity style={styles.signinbutton} onPress={handleLogin}>
          <Text style={styles.lable4}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.bottom}>
          <Text style={styles.bottomtext}>_______________</Text>
          <Text style={styles.middleText}>Or continue with</Text>
          <Text style={styles.bottomtext}>_____________</Text>
        </View>

        <TouchableOpacity style={styles.googlebutton}>
          <View style={styles.googlesignin}>
            <Fontisto name="google" size={26} color="#5F9AFC" />
            <Text style={styles.lable5}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.googlesignin}>
          <Text style={styles.label2}>Don't have an account?</Text>
          <View>
            <Pressable onPress={signin}>
              <Text style={styles.label2}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 22,
    justifyContent: 'center',
    backgroundColor: '#2A2A2E',
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 27,
    marginTop: '2%',
    color: '#B0BEC5',
    fontWeight: '800',
  },
  inputContainer: {
    marginTop: '6%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label2: {
    marginTop: 3,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
  },
  label: {
    color: '#C0C0C0',
    fontSize: 15,
    fontWeight: '700',
  },
  label3: {
    color: '#FFFFFF',
    fontSize: 17,
    marginTop: 3,
  },
  lable4: {
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
  },
  inputWrapper: {
    elevation: 5,
    flexDirection: 'row',
    backgroundColor: '#BB86FC',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 7,
    borderRadius: 7,
    height: 50,
    borderColor: '#03DAC6',
  },
  input: {
    width: '100%',
    fontSize: 18,
    color: '#FFFFFF',
  },
  checkboxandRememberme: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '4%',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '2%',
  },
  signinbutton: {
    height: 50,
    backgroundColor: '#FF5763',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googlebutton: {
    marginTop: '4%',
    height: 50,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  lable5: {
    color: '#000000',
    fontSize: 20,
    marginLeft: 10,
  },
  bottomtext: {
    color: '#FFFBF2',
  },
  middleText: {
    color: '#FFFBF2',
    marginTop: 7,
  },
  googlesignin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignupScreen;
