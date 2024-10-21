import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

const PlaylistDetails = () => {
  const [play, setPlay] = useState({}); // To track play/pause state for each song
  const navigation = useNavigation();
  const route = useRoute();
  const {playlistId} = route.params;
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');

  const handlePlayButtonPress = songId => {
    setPlay(prevPlay => ({
      ...prevPlay,
      [songId]: !prevPlay[songId], // Toggle play/pause for the specific song
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
        songIndex: index, // Send the song index
        playlist: songs, // Send the whole playlist
      });
    } else {
      console.error('Invalid song data:', song);
    }
  };
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:4000/api/playlists/${playlistId}/songs`,
        );
        setPlaylistName(response.data.name);
        setSongs(response.data.songs);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Failed to fetch songs', error);
      }
    };

    if (playlistId) {
      fetchSongs();
    }
  }, [playlistId]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.header}
        colors={['#8A2BE2', '#FF7F7F']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{playlistName}</Text>
      </LinearGradient>

      <LinearGradient
        style={styles.footer}
        colors={['#00C9FF', '#92FE9D']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.songContainer}>
          {/* Display songs dynamically */}
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <LinearGradient
                key={song._id}
                colors={['#00C9FF', '#92FE9D']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.songItem}>
                <Pressable
                  onPress={() => handleEachSong(song, index)} // Pass the index
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
                    <Text style={styles.songArtist}>{song.artist.name}</Text>
                    <Text
                      style={styles.songSubtitle}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {song.subtitle}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handlePlayButtonPress(song._id)}
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
    paddingBottom: 20,
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
    fontSize: 22,
    fontWeight: '800',
    color: '#2C3E50',
  },
  songArtist: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E90FF',
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
