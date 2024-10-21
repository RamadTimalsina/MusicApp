import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Playlist from '../backend/models/playlistSchema';
import axios from 'axios';

const HomeScreen = () => {
  const [playlists, setPlaylists] = useState([]); // Initialize with an empty array
  const [play, setPlay] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          'http://10.0.2.2:4000/api/playlists/all',
        );
        setPlaylists(response.data); // Use response.data to set playlists
      } catch (error) {
        console.error('Failed to fetch playlists', error);
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlaylistPress = playlist => {
    navigation.navigate('PlaylistDetail', {playlistId: playlist._id});
  };

  const handlePlay = () => {
    setPlay(!play);
  };
  return (
    <LinearGradient
      // colors={['#8A2BE2', '#FF7F7F']}
      colors={['#00C9FF', '#92FE9D']}
      style={styles.gradient}
      start={{x: 0, y: 0}} // Start from the left
      end={{x: 1, y: 0}} // End at the right
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header and Welcome Section */}
          <View style={styles.homeContainer}>
            <Text style={styles.header}>Home</Text>
            <View style={styles.welcomebox}>
              <Text style={styles.welcomeText}>Welcome back!</Text>
              <Text style={styles.subtitle}>
                Best place to listen to music.
              </Text>
            </View>
          </View>
          {/* Horizontal Scroll for Playlists */}

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {/* Dynamic Playlist Tiles */}
            {playlists.length > 0 ? (
              playlists.map(playlist => (
                <View key={playlist._id} style={styles.tile}>
                  <Pressable onPress={() => handlePlaylistPress(playlist)}>
                    <Image
                      source={require('../assets/images.png')} // Replace with your default image if needed
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </Pressable>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View style={styles.playlistContainer}>
                      <Text style={styles.songTitle1}>{playlist.name}</Text>
                      <Text style={{fontWeight: '600'}}>
                        {playlist.description}
                      </Text>
                    </View>
                    <Pressable onPress={handlePlay} style={{top: 4}}>
                      <FontAwesome
                        name={play ? 'pause-circle-o' : 'play-circle-o'}
                        size={45}
                        color="#FF6347"
                      />
                    </Pressable>
                  </View>
                </View>
              ))
            ) : (
              <Text>No playlists available</Text>
            )}
          </ScrollView>

          <View style={styles.popularSection}>
            <Text style={styles.popularHeader}>Popular Playlist</Text>
            {/* Single Horizontal ScrollView for Popular Playlists */}
            <ScrollView
              horizontal={true}
              style={styles.scrollContainer}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder}></View>
                <View style={styles.playlistContainer1}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                  <Text style={styles.songSubtitle}>Daily songs</Text>
                </View>
              </View>

              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder}></View>
                <View style={styles.playlistContainer1}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                  <Text style={styles.songSubtitle}>Daily songs</Text>
                </View>
              </View>

              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder}></View>
                <View style={styles.playlistContainer1}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                  <Text style={styles.songSubtitle}>Daily songs</Text>
                </View>
              </View>

              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder}></View>
                <View style={styles.playlistContainer1}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                  <Text style={styles.songSubtitle}>Daily songs</Text>
                </View>
              </View>
              {/* Repeat for other popular tiles */}
              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder}></View>
                <View style={styles.playlistContainer1}>
                  <Text style={styles.songTitle}>Chill Vibes</Text>
                  <Text style={styles.songSubtitle}>
                    Relax with these tracks!
                  </Text>
                </View>
              </View>
              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder}></View>
                <View style={styles.playlistContainer1}>
                  <Text style={styles.songTitle}>Party Mix</Text>
                  <Text style={styles.songSubtitle}>
                    Get the party started!
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.popularSection}>
            <Text style={styles.recentHeader}>Recently played</Text>
            {/* Single Horizontal ScrollView for Popular Playlists */}
            <ScrollView
              horizontal={true}
              style={styles.scrollContainer}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder}></View>
                <View style={styles.playlistContainer1}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                  <Text style={styles.songSubtitle}>Daily songs</Text>
                </View>
              </View>

              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder}></View>
                <View style={styles.playlistContainer1}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                  <Text style={styles.songSubtitle}>Daily songs</Text>
                </View>
              </View>
              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder}></View>
                <View style={styles.playlistContainer1}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                  <Text style={styles.songSubtitle}>Daily songs</Text>
                </View>
              </View>
              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder}></View>
                <View style={styles.playlistContainer1}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                  <Text style={styles.songSubtitle}>Daily songs</Text>
                </View>
              </View>
              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder}></View>
                <View style={styles.playlistContainer1}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                  <Text style={styles.songSubtitle}>Daily songs</Text>
                </View>
              </View>
              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder}></View>
                <View style={styles.playlistContainer1}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                  <Text style={styles.songSubtitle}>Daily songs</Text>
                </View>
              </View>

              {/* Repeat for other popular tiles */}
            </ScrollView>
          </View>

          <View style={styles.recommendedSection}>
            <Text style={styles.recommendedHeader}>Recommended for you</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.recommendationList}>
                {/* Recommendation Tile */}
                <View style={styles.recommendedTile}>
                  <View style={styles.recommendedSong}></View>
                  <View style={styles.nameAndTitle}>
                    <Text style={styles.songName}>Song Name</Text>
                    <Text style={styles.songTitle1}>Song title</Text>
                  </View>
                </View>

                {/* Duplicate tiles for other recommendations */}
                <View style={styles.recommendedTile}>
                  <View style={styles.recommendedSong}></View>
                  <View style={styles.nameAndTitle}>
                    <Text style={styles.songName}>Song Name</Text>
                    <Text style={styles.songTitle1}>Song title</Text>
                  </View>
                </View>

                <View style={styles.recommendedTile}>
                  <View style={styles.recommendedSong}></View>
                  <View style={styles.nameAndTitle}>
                    <Text style={styles.songName}>Song Name</Text>
                    <Text style={styles.songTitle1}>Song title</Text>
                  </View>
                </View>

                <View style={styles.recommendedTile}>
                  <View style={styles.recommendedSong}></View>
                  <View style={styles.nameAndTitle}>
                    <Text style={styles.songName}>Song Name</Text>
                    <Text style={styles.songTitle1}>Song title</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 5,
  },
  homeContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'RobotoMedium',
    fontWeight: '500',
    color: '#000000',
    fontSize: 38,
  },
  welcomebox: {
    marginTop: -15,
    right: -20,
    padding: 10,
  },
  welcomeText: {
    //color: '#F8F8FF',
    // fontFamily: 'RobotoBlack',
    color: '#FF6F61',
    fontSize: 20,
    right: -20,
    fontWeight: 'bold',
  },
  subtitle: {
    top: -4,
    color: '#000',
    fontWeight: 'bold',
  },
  scrollContainer: {
    // marginTop: 10,
  },
  tile: {
    borderRadius: 10,
    overflow: 'hidden',
    height: 270,
    width: 280,
    margin: 10,
    backgroundColor: '#F0F0F0',
    elevation: 4,
  },
  image: {
    height: 200,
    width: '100%',
  },
  playlistContainer: {
    paddingLeft: 10,
    top: 8,
  },
  playlistContainer1: {
    paddingLeft: 10,
  },
  songTitle: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'RobotoBlack',
    color: '#FFFFFF',
  },
  songTitle1: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'RobotoBlack',
    color: '#000000',
  },
  songSubtitle: {
    fontWeight: '600',
    color: '#FFF',
  },
  popularSection: {
    marginTop: -10,
    marginHorizontal: 5,
  },
  popularHeader: {
    color: '#000',
    fontFamily: 'RobotoBlack',
    fontSize: 25,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  recentHeader: {
    color: '#000',
    fontFamily: 'RobotoBlack',
    fontSize: 25,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 30,
  },
  popularTile: {
    // backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,

    // top: 10,
    // padding: 10,
  },
  imagePlaceholder: {
    height: 150,
    width: 150,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  recommendedSection: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 60,
  },
  recommendedHeader: {
    color: '#000',
    fontFamily: 'RobotoBlack',
    fontSize: 25,
    marginBottom: 10,
  },
  recommendationList: {
    flexDirection: 'column',
    gap: 20, // Adjust gap between tiles
  },
  recommendedTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 2, // Add shadow for elevation effect
  },
  recommendedSong: {
    height: 100,
    width: 100,
    backgroundColor: '#8A2BE2', // A blueish color for better visibility
    borderRadius: 10,
  },
  nameAndTitle: {
    marginLeft: 20,
    flex: 1, // Allows the text container to take up the remaining space
  },
  songName: {
    fontSize: 20,
    fontFamily: 'RobotoBlack',
    fontWeight: '800',
    color: '#000',
    marginBottom: 5,
  },
  // songTitle: {
  //   fontSize: 16,
  //   color: '#FFFFFF',
  //   fontFamily: 'RobotoMedium',
  // },

  nameandtitle: {
    top: 15,
  },
});
