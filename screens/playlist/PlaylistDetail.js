import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

const PlaylistDetails = () => {
  const [play, setPlay] = useState({});
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New error state
  const navigation = useNavigation();
  const route = useRoute();

  // Get playlist details from route.params
  const {
    playlistId,
    genreId,
    artistId,
    genreName,
    artistName,
    playlistName: passedPlaylistName,
  } = route.params;

  const handlePlayButtonPress = songId => {
    setPlay(prevPlay => ({
      ...prevPlay,
      [songId]: !prevPlay[songId],
    }));
  };

  const handleEachSong = (song, index) => {
    if (song && song._id && song.title && song.artist && song.url) {
      navigation.navigate('PlaySongScreen', {
        songId: song._id,
        songTitle: song.title,
        songArtist: song.artist,
        songSubtitle: song.subtitle,
        songThumbnail: song.thumbnail,
        songUrl: song.url,
        songIndex: index,
        playlist: songs,
      });
    } else {
      console.error('Invalid song data:', song);
    }
  };

  useEffect(() => {
    const fetchSongs = async () => {
      let url = '';

      if (playlistId) {
        //   url = `http://10.0.2.2:4000/api/playlists/${playlistId}/songs`; // Fetch songs for the playlist
        url = `http://10.0.2.2:4000/api/songs/playlist/${playlistId}`;
      } else if (genreId) {
        url = `http://10.0.2.2:4000/api/genres/${genreId}/songs`; // Fetch songs for the genre
      } else if (artistId) {
        url = `http://10.0.2.2:4000/api/artists/${artistId}/songs`; // Fetch songs for the artist
      }

      try {
        const response = await axios.get(url);

        if (playlistId) {
          setPlaylistName(passedPlaylistName || ''); // Name of the playlist
          setSongs(response.data || []); // Songs in the playlist
          //setDescription(response.data.description || ''); // Playlist description
        } else if (artistId) {
          // If artistId is present, use artist name from params if available
          setPlaylistName(artistName || 'Unknown Artist'); // Use artistName passed from LibraryScreen
          setSongs(response.data || []); // Set songs for the artist
        } else if (genreId) {
          // If genreId is present, use genre name from params if available
          setPlaylistName(genreName || 'Unknown Genre'); // Use genreName passed from LibraryScreen
          setSongs(response.data || []); // Set songs for the genre
        }
      } catch (error) {
        setErrorMessage('No songs found in this playlist');
      }
    };

    fetchSongs();
  }, [
    playlistId,
    genreId,
    artistId,
    genreName,
    artistName,
    passedPlaylistName,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.header}
        colors={['#c455b0', '#FF7F7F']}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{playlistName}</Text>
      </LinearGradient>

      <LinearGradient
        style={styles.footer}
        colors={['#00C9FF', '#e0ffff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.songContainer}>
          {errorMessage ? (
            <Text style={styles.noSongsText}>{errorMessage}</Text>
          ) : songs.length > 0 ? (
            songs.map((song, index) => (
              <LinearGradient
                key={song._id}
                colors={['#00C9FF', '#92FE9D']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.songItem}>
                <Pressable
                  onPress={() => handleEachSong(song, index)}
                  style={styles.songPressable}>
                  <Image
                    style={styles.songThumbnail}
                    source={{
                      uri:
                        song.thumbnail && song.thumbnail.url
                          ? song.thumbnail.url
                          : 'https://via.placeholder.com/80',
                    }}
                  />
                  <View style={styles.songDetails}>
                    <Text style={styles.songName}>{song.title}</Text>
                    <Text style={styles.songArtist}>
                      {typeof song.artist === 'string'
                        ? song.artist
                        : song.artist?.name || 'Unknown Artist'}
                    </Text>
                    <Text
                      style={styles.songSubtitle}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {song.subtitle}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handlePlayButtonPress(song._id)}
                    accessibilityLabel="Play/Pause"
                    style={styles.cardPlayButton}>
                    <FontAwesome
                      name={play[song._id] ? 'pause-circle-o' : 'play-circle-o'}
                      size={55}
                      color="#FF6347"
                    />
                  </TouchableOpacity>
                </Pressable>
              </LinearGradient>
            ))
          ) : (
            <Text style={styles.noSongsText}>No songs available</Text>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PlaylistDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 30,
    color: '#FFFFFF',
    position: 'absolute',
    top: 70,
    fontFamily: 'RobotoBlack',
  },
  footer: {
    position: 'absolute',
    top: 130,
    left: 0,
    right: 0,
    backgroundColor: '#8A2387',
    borderTopLeftRadius: 46,
    borderTopRightRadius: 46,
    paddingVertical: 15,
    paddingHorizontal: 25,
    height: '100%',
  },
  songContainer: {
    paddingBottom: 180,
  },
  songItem: {
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
    elevation: 5,
  },
  songPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  songThumbnail: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  songDetails: {
    flex: 1,
  },
  songName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  songArtist: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  songSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  noSongsText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#7F8C8D',
    marginVertical: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  cardPlayButton: {
    marginLeft: 20,
  },
});
