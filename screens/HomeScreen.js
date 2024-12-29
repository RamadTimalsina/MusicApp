import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [playlists, setPlaylists] = useState({});
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [playStatus, setPlayStatus] = useState({}); // Manage play status for each song
  const [likeStatus, setLikeStatus] = useState({}); // Manage like status for each song
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategoriesAndPlaylists = async () => {
      try {
        const categoriesResponse = await axios.get(
          'http://10.0.2.2:4000/api/category/all',
        );
        setCategories(categoriesResponse.data.categories);

        const playlistsData = {};
        for (const category of categoriesResponse.data.categories) {
          const response = await axios.get(
            `http://10.0.2.2:4000/api/playlists/all?categoryId=${category._id}`,
          );
          playlistsData[category.name] = response.data.playlists || [];
        }
        setPlaylists(playlistsData);
      } catch (error) {
        console.error(
          'Failed to fetch categories and playlists:',
          error.response?.data || error,
        );
      }
    };

    const fetchRecommendedSongs = async () => {
      try {
        const response = await axios.get(
          'http://10.0.2.2:4000/api/songs/recommendedsongs', // Ensure this API returns songs with artist info
        );
        // console.log(response.data);
        setRecommendedSongs(response.data); // Make sure response contains song with artist data
      } catch (error) {
        console.error(
          'Failed to fetch recommended songs:',
          error.response?.data || error,
        );
      }
    };

    fetchCategoriesAndPlaylists();
    fetchRecommendedSongs();
  }, []);

  const handlePlaylistPress = playlist => {
    navigation.navigate('PlaylistDetail', {
      playlistId: playlist._id,
      playlistName: playlist.name, // Passing the playlist name
    });
  };
  const handleSongPress = (song, index) => {
    if (song && song._id && song.title && song.artist.name && song.url) {
      navigation.navigate('PlaySongScreen', {
        songId: song._id,
        songTitle: song.title,
        songArtist: song.artist.name, // Correctly reference the artist name
        songUrl: song.url,
        songThumbnail: song.thumbnail,
        songIndex: index, // Pass the index for correct playback handling
        playlist: recommendedSongs,
      });
    } else {
      console.error('Invalid song data:', song);
    }
  };
  const handleLikePress = index => {
    setLikeStatus(prevStatus => ({
      ...prevStatus,
      [index]: !prevStatus[index], // Toggle the like status of the specific song
    }));
  };

  const handleLikePressPlaylist = playlistId => {
    setLikeStatus(prevStatus => ({
      ...prevStatus,
      [playlistId]: !prevStatus[playlistId], // Toggle the like status of the specific playlist
    }));
  };

  const handlePlayIconPress = index => {
    setPlayStatus(prevStatus => ({
      ...prevStatus,
      [index]: !prevStatus[index], // Toggle the play status of the specific song
    }));
  };
  return (
    <LinearGradient
      // colors={['#8A2BE2', '#FF7F7F']}
      // colors={['#8A2BE2', '#FF7F7F']}
      colors={['#c455b0', '#FF7F7F']}
      style={styles.gradient}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}>
      {/* colors={['#00C9FF', '#e0ffff']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}> */}
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Dynamic Categories */}
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <View key={category._id} style={styles.categorySection}>
                <View style={styles.headerContainer}>
                  <Text
                    style={
                      index === 0
                        ? styles.categoryHeaderfirst
                        : styles.categoryHeadersecond
                    }>
                    {category.name}
                  </Text>
                  {index === 0 && ( // Only for the first category
                    <Text style={styles.welcomeText}>
                      Welcome to PlayMusic!
                    </Text>
                  )}
                  {index !== 0 && (
                    <TouchableOpacity style={styles.backButton}>
                      <AntDesign name="rightcircle" size={30} color="#000" />
                    </TouchableOpacity>
                  )}
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {playlists[category.name]?.map(playlist => (
                    <View
                      key={playlist._id}
                      style={
                        index === 0 ? styles.homeTile : styles.popularTile
                      }>
                      <Pressable onPress={() => handlePlaylistPress(playlist)}>
                        <Image
                          source={{
                            uri:
                              playlist?.thumbnail?.url ||
                              'https://via.placeholder.com/80',
                          }}
                          style={
                            index === 0 ? styles.homeImage : styles.popularImage
                          }
                          resizeMode="cover"
                        />
                      </Pressable>
                      <View style={styles.playlistInfo}>
                        <View>
                          <Text
                            style={
                              index === 0
                                ? styles.firstSectionTitle
                                : styles.secondSectionTile
                            }>
                            {playlist.name}
                          </Text>
                          <Text style={styles.playlistDescription}>
                            {playlist.description}
                          </Text>
                        </View>
                        {index === 0 && (
                          <Pressable
                            onPress={() =>
                              handleLikePressPlaylist(playlist._id)
                            } // Pass playlist ID to handleLikePress
                            style={styles.likebutton}>
                            <Ionicons
                              name={
                                likeStatus[playlist._id]
                                  ? 'heart-sharp'
                                  : 'heart-outline' // Use playlist._id to check likeStatus
                              }
                              size={35}
                              color="#FF7F7F"
                            />
                          </Pressable>
                        )}
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ))
          ) : (
            <Text style={styles.loadingText}>Loading categories...</Text>
          )}

          {/* Recommended Songs Section */}
          <View style={styles.categorySection}>
            <ScrollView vertical showsVerticalScrollIndicator={false}>
              {recommendedSongs.length >= 0 ? (
                recommendedSongs.map((song, index) => (
                  <LinearGradient
                    key={song._id}
                    colors={['#00C9FF', '#92FE9D']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.songItem}>
                    <Pressable
                      onPress={() =>
                        handleSongPress(song, index, playlists?.thumbnail?.url)
                      }
                      style={styles.songPressable}>
                      <Image
                        style={styles.songThumbnail}
                        source={{
                          uri:
                            song.thumbnail?.url ||
                            'https://via.placeholder.com/80',
                        }}
                      />
                      <View style={styles.songDetails}>
                        <Text style={styles.songName}>{song.title}</Text>
                        <Text style={styles.songArtist}>
                          {song.artist?.name || 'Unknown Artist'}{' '}
                          {/* Display artist name */}
                        </Text>
                      </View>
                      <View style={styles.cardPlayButton}>
                        <Pressable onPress={() => handleLikePress(index)}>
                          <Ionicons
                            name={
                              likeStatus[index]
                                ? 'heart-sharp'
                                : 'heart-outline'
                            }
                            size={40}
                            color="#FF7F7F"
                          />
                        </Pressable>
                        <Pressable onPress={() => handlePlayIconPress(index)}>
                          <FontAwesome
                            name={
                              playStatus[index]
                                ? 'pause-circle-o'
                                : 'play-circle-o'
                            }
                            size={40}
                            color="#FF6347"
                          />
                        </Pressable>
                      </View>
                    </Pressable>
                  </LinearGradient>
                ))
              ) : (
                <Text style={styles.noSongsText}>
                  No recommended songs available
                </Text>
              )}
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
    flex: 0.92,
    padding: 5,
  },

  categorySection: {
    marginVertical: 15,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFF',
    marginLeft: 10, // Adds space between category name and welcome text
  },
  cardPlayButton: {
    flexDirection: 'row',
    gap: 10,
  },

  songArtist: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  categoryHeaderfirst: {
    color: '#000',
    fontFamily: 'RobotoMedium',
    fontSize: 35,
    fontWeight: 'bold',
  },
  categoryHeadersecond: {
    color: '#000',
    fontFamily: 'RobotoMedium',
    fontSize: 22,
    marginBottom: 12,
  },
  homeTile: {
    borderRadius: 10,
    overflow: 'hidden',
    height: 270,
    width: 280,
    margin: 10,
    backgroundColor: '#F0F0F0',
    elevation: 4,
  },
  homeImage: {
    height: 200,
    width: '100%',
  },
  popularTile: {
    borderRadius: 10,
    overflow: 'hidden',
    height: 180,
    width: 170,
    marginHorizontal: 8,
    marginVertical: 5,
    backgroundColor: '#F0F0F0',
    elevation: 4,
  },
  popularImage: {
    height: 120,
    width: '100%',
  },
  playlistInfo: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'RobotoBlack',
  },
  secondSectionTile: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'RobotoBlack',
  },
  playlistDescription: {
    fontSize: 14,
    color: '#36454F',
    fontWeight: '500',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  songItem: {
    marginBottom: 15,
    marginHorizontal: 10,
    borderRadius: 15,
    padding: 10,
    elevation: 5,
  },
  songPressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songThumbnail: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  songDetails: {
    flex: 1,
    marginLeft: 15,
  },
  songName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
