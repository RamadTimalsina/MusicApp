import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();

  const signin = () => {
    navigation.navigate('SignupScreen');
  };

  // State for the inputs
  const [UserName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle registration
  const handleRegister = async () => {
    try {
      const emailExists = await axios.get(
        `http://10.0.2.2:4000/api/users/check-email?email=${email}`,
      );
      if (emailExists.data.exists) {
        Alert.alert('Registration Failed', 'Email already in use');
        return;
      }
      const response = await axios.post(
        'http://10.0.2.2:4000/api/users/register',
        {
          UserName,
          email,
          password,
        },
      );

      //Assuming the response contains a token
      const {token} = response.data;
      if (token) {
        //store the token in AsyncStorage
        await AsyncStorage.setItem('userToken', token);
      } else {
        console.log('Token is not defined');
      }
      //Reset the navigation stack to prevent going back to Loginscreen
      navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabs'}],
      });
      // Navigate to BottomTabs and then to HomeScreen
      navigation.navigate('BottomTabs', {screen: 'Homescreen'});
      setUserName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(
        'Registration error:',
        error.response ? error.response.data : error.message,
      );
      Alert.alert(
        'Registration Failed',
        error.response ? error.response.data.message : 'An error occurred',
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/image2.png')} style={styles.logo} />
          <Text style={styles.title}>Welcome to VII Music</Text>
          <Text style={styles.subtitle}>Create your Account</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={UserName}
              onChangeText={setUserName}
              autoFocus={true}
              placeholderTextColor={'#B0BEC5'}
              placeholder="Enter your name"
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email address</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={email}
              onChangeText={setEmail}
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
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={'#B0BEC5'}
              placeholder="Enter your Password"
              style={styles.input}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity style={styles.signinbutton} onPress={handleRegister}>
          <Text style={styles.label4}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.bottom}>
          <Text style={styles.bottomtext}>_______________</Text>
          <Text style={styles.middleText}>Or continue with</Text>
          <Text style={styles.bottomtext}>_____________</Text>
        </View>

        <TouchableOpacity style={styles.googlebutton}>
          <View style={styles.googlesignin}>
            <Fontisto name="google" size={26} color="#5F9AFC" />
            <Text style={styles.label5}>Sign up with Google</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.googlesignin}>
          <Text style={styles.label2}>Already have an account?</Text>
          <View>
            <TouchableOpacity onPress={signin}>
              <Text style={styles.label2}>Sign in</Text>
            </TouchableOpacity>
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
    backgroundColor: '#2C2C2C',
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
    color: '#FF5733',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 27,
    marginTop: '2%',
    color: '#B0BEC5',
    fontWeight: '800',
  },
  inputContainer: {
    marginTop: '2%',
  },
  label: {
    color: '#C0C0C0',
    fontSize: 15,
    fontWeight: '700',
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
    color: '#FFFFFF',
    fontSize: 18,
  },
  signinbutton: {
    height: 50,
    backgroundColor: '#FF5733',
    borderRadius: 7,
    marginTop: '10%',
  },
  googlebutton: {
    marginTop: '4%',
    height: 50,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },
  label4: {
    color: '#FFFFFF',
    fontFamily: 'RobotoMedium',
    fontSize: 25,
    textAlign: 'center',
    top: 5,
  },
  label5: {
    color: '#000000',
    fontFamily: 'RobotoMedium',
    fontSize: 20,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '2%',
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
    gap: 10,
    justifyContent: 'center',
    top: 10,
  },
  label2: {
    marginTop: 3,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
  },
});

export default LoginScreen;
