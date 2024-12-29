import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import axios from 'axios'; // Import axios for API calls
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [showTrending, setShowTrending] = useState(false);
  const [recommendedSongs, setRecommendedSongs] = useState([]); // State for recommended songs
  const [playlists, setPlaylists] = useState({});
  const [playStatus, setPlayStatus] = useState({}); // Manage play status for each song
  const [likeStatus, setLikeStatus] = useState({});
  const navigation = useNavigation();
  useEffect(() => {
    // Fetch recommended songs when the component mounts
    const fetchRecommendedSongs = async () => {
      try {
        const response = await axios.get(
          'http://10.0.2.2:4000/api/songs/recommendedsongs',
        ); // Replace with your API endpoint
        setRecommendedSongs(response.data); // Set the fetched songs to the state
      } catch (error) {
        console.error(
          'Failed to fetch recommended songs:',
          error.response?.data || error,
        );
      }
    };

    fetchRecommendedSongs();
  }, []);

  const handleDownCirclePress = () => {
    setShowTrending(!showTrending);
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

  const handlePlayIconPress = index => {
    setPlayStatus(prevStatus => ({
      ...prevStatus,
      [index]: !prevStatus[index], // Toggle the play status of the specific song
    }));
  };
  return (
    <LinearGradient
      colors={['#8A2BE2', '#FF7F7F']}
      style={styles.gradient}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.homeContainer}>
              <Text style={styles.header}>Search</Text>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons
                name="search-sharp"
                size={20}
                color="#666"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={search}
                onChangeText={setSearch}
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.popularSection}>
              <Text style={styles.featuredHeader}>Trending Searches</Text>
              <TouchableOpacity onPress={handleDownCirclePress}>
                <AntDesign
                  name={showTrending ? 'upcircle' : 'downcircle'}
                  size={30}
                  color="#FFF"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.trendingSection}>
              <Text style={styles.trending}>#Trending song 1</Text>
              <Text style={styles.trending}>#Trending song 2</Text>
              <Text style={styles.trending}>#Trending song 3</Text>
              {showTrending && (
                <>
                  <Text style={styles.trending}>#Trending song 4</Text>
                  <Text style={styles.trending}>#Trending song 5</Text>
                  <Text style={styles.trending}>#Trending song 6</Text>
                  <Text style={styles.trending}>#Trending song 7</Text>
                  <Text style={styles.trending}>#Trending song 8</Text>
                  <Text style={styles.trending}>#Trending song 9</Text>
                  <Text style={styles.trending}>#Trending song 10</Text>
                </>
              )}
            </View>

            {/* Recommended Songs Section */}
            <View style={styles.recommendedSection}>
              <Text style={styles.recommendedHeader}>Recommended for you</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {recommendedSongs.length > 0 ? (
                  recommendedSongs.map((song, index) => (
                    <LinearGradient
                      key={song._id}
                      colors={['#00C9FF', '#92FE9D']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 1}}
                      style={styles.songItem}>
                      <Pressable
                        onPress={() =>
                          handleSongPress(
                            song,
                            index,
                            playlists?.thumbnail?.url,
                          )
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
                            {song.artist?.name || 'Unknown Artist'}
                          </Text>
                        </View>
                        <View style={styles.cardPlayButton}>
                          <Pressable onPress={() => handleLikePress(index)}>
                            {/* <Ionicons
                              name="heart-outline"
                              size={40}
                              color="#FF7F7F"
                            /> */}

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
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  homeContainer: {
    marginHorizontal: 20,
  },
  header: {
    fontFamily: 'RobotoMedium',
    fontWeight: '500',
    color: '#FFF',
    fontSize: 38,
  },
  searchContainer: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
  searchIcon: {
    marginRight: 10,
  },
  popularSection: {
    justifyContent: 'space-between',
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  featuredHeader: {
    color: '#FFF',
    fontFamily: 'RobotoMedium',
    fontSize: 25,
  },
  trendingSection: {
    marginTop: 15,
    paddingLeft: 15,
  },
  trending: {
    fontFamily: 'RobotoLight',
    fontSize: 18,
    color: '#FFF',
    fontWeight: '700',
    marginVertical: 5,
  },
  recommendedSection: {
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 70,
  },
  recommendedHeader: {
    color: '#FFF',
    fontFamily: 'RobotoMedium',
    fontSize: 25,
    marginBottom: 10,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  songArtist: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  cardPlayButton: {
    flexDirection: 'row',
    gap: 10,
  },
  noSongsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#FFF',
  },
});

export default SearchScreen;
