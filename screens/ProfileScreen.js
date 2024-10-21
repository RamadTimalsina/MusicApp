import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {logout, token} = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      navigation.navigate('AuthStack', {screen: 'LoginScreen'});
    }
  }, [token, navigation]);

  const handleLogout = () => {
    logout();
    Alert.alert('Logged Out', 'You have been logged out successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              style={styles.appLogo}
              source={require('../assets/image1.png')}
            />
            <Text style={styles.appName}>VII Music</Text>
          </View>
          <View style={styles.headerIcons}>
            <AntDesign name="infocirlce" size={24} color="#FF6347" />
            <AntDesign name="setting" size={24} color="#FF6347" />
            <MaterialCommunityIcons
              name="logout"
              size={24}
              color="#FF6347"
              onPress={handleLogout}
            />
          </View>
        </View>
        <View style={styles.profileContainer}>
          <Pressable>
            <Image
              style={styles.profileImage}
              source={require('../assets/OIP.jpeg')}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Raman Timalsina</Text>
              <MaterialIcons name="verified" size={22} color="#FF6347" />
            </View>
          </Pressable>
        </View>
        <View style={styles.popularSection}>
          <Text style={styles.featuredHeader}>Subscription</Text>
        </View>
        <View
          style={{
            // marginTop: 6,
            // marginLeft: 10,
            marginBottom: 12,
            backgroundColor: '#E1E1E1',
            borderRadius: 30,
            width: '80%',
            height: 45,
            elevation: 10,
          }}>
          <View style={{left: 18}}>
            <Text style={styles.SubscriptionName}>Premium Subscription</Text>
          </View>
          <Text style={{left: 20, color: '#FF6347'}}>$9.99/month</Text>
        </View>
        <View
          style={{
            // marginTop: 6,
            marginBottom: 12,
            backgroundColor: '#E1E1E1',
            borderRadius: 30,
            width: '80%',
            height: 45,
            elevation: 10,
          }}>
          <View style={{left: 18}}>
            <Text style={styles.SubscriptionName}>Family Plan</Text>
          </View>
          <Text style={{left: 20, color: '#FF6347'}}>
            $14.99/month for upto 6 famlily members
          </Text>
        </View>
        <TouchableOpacity style={styles.signinbutton}>
          <Text style={styles.label4}>Manage Subscription</Text>
        </TouchableOpacity>

        <View>
          <View style={styles.popularSection1}>
            <Text style={styles.featuredHeader1}>Recent played Songs</Text>
          </View>
          <ScrollView
            horizontal={true}
            style={styles.scrollContainer}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.popularTile}>
              <View style={styles.imagePlaceholder}></View>
              <View style={styles.playlistContainer}>
                <Text style={styles.songTitle}>Top Hits of Year</Text>
                <Text style={styles.songSubtitle}>Daily songs</Text>
              </View>
            </View>
            <View style={styles.popularTile}>
              <View style={styles.imagePlaceholder}></View>
              <View style={styles.playlistContainer}>
                <Text style={styles.songTitle}>Top Hits of Year</Text>
                <Text style={styles.songSubtitle}>Daily songs</Text>
              </View>
            </View>
            <View style={styles.popularTile}>
              <View style={styles.imagePlaceholder}></View>
              <View style={styles.playlistContainer}>
                <Text style={styles.songTitle}>Top Hits of Year</Text>
                <Text style={styles.songSubtitle}>Daily songs</Text>
              </View>
            </View>
            <View style={styles.popularTile}>
              <View style={styles.imagePlaceholder}></View>
              <View style={styles.playlistContainer}>
                <Text style={styles.songTitle}>Top Hits of Year</Text>
                <Text style={styles.songSubtitle}>Daily songs</Text>
              </View>
            </View>

            <View style={styles.popularTile}>
              <View style={styles.imagePlaceholder}></View>
              <View style={styles.playlistContainer}>
                <Text style={styles.songTitle}>Chill Vibes</Text>
                <Text style={styles.songSubtitle}>
                  Relax with these tracks!
                </Text>
              </View>
            </View>
            <View style={styles.popularTile}>
              <View style={styles.imagePlaceholder}></View>
              <View style={styles.playlistContainer}>
                <Text style={styles.songTitle}>Party Mix</Text>
                <Text style={styles.songSubtitle}>Get the party started!</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  header: {
    // paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appLogo: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  appName: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  profileContainer: {
    // marginTop: 5,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileImage: {
    left: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: '#FF6347',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
  },
  SubscriptionName: {
    // left: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
  },
  popularSection1: {
    justifyContent: 'space-between',
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center', // Ensure alignment of text and icon
  },
  featuredHeader1: {
    color: '#181A18',
    fontFamily: 'RobotoMedium',
    fontSize: 25,
    // marginLeft: 20,
    marginBottom: 10,
    marginTop: 12,
  },
  signinbutton: {
    height: 50,
    // marginHorizontal: 20,
    top: 20,
    backgroundColor: '#FF5763',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label4: {
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'RobotoMedium',
  },
  popularSection: {
    // marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 5,
  },
  featuredHeader: {
    color: '#181A18',
    fontFamily: 'RobotoMedium',
    fontSize: 25,
    marginLeft: 5,
    marginBottom: 10,
    marginTop: 12,
  },
  popularTile: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
    // paddingLeft: 10,
  },
  imagePlaceholder: {
    height: 150,
    width: 150,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  playlistContainer: {
    paddingLeft: 10,
    alignItems: 'center',
  },
  songTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'RobotoMedium',
    color: '#000',
  },
  songSubtitle: {
    fontWeight: '600',
  },
});
