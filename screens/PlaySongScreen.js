import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  State,
  useProgress,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';

const PlaySongScreen = ({route, navigation}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const progress = useProgress();

  const {playlist, songIndex} = route.params || {};

  const trackPlayerInit = async () => {
    try {
      if (!playlist || playlist.length === 0)
        throw new Error('Playlist is empty or missing.');

      await TrackPlayer.reset();

      const tracks = playlist.map(song => ({
        id: song._id, // Keep the original _id as id
        url: song.url,
        title: song.title || 'Unknown Title',
        artist: song.artist?.name || 'Unknown Artist',
        subtitle: song.subtitle || 'Unknown Subtitle',
        artwork: song.thumbnail?.url || 'https://via.placeholder.com/300',
        originalId: song._id, // Store the original _id separately if needed
      }));

      await TrackPlayer.add(tracks);
      await TrackPlayer.skip(songIndex);
      await TrackPlayer.play();

      setIsPlaying(true);
      setCurrentSong(tracks[songIndex]);

      // Log play history with the original _id
      if (playlist[songIndex]._id) {
        logPlayHistory(playlist[songIndex]._id);
      }
    } catch (error) {
      console.error('Error initializing TrackPlayer:', error.message);
      ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    trackPlayerInit();

    return () => {
      TrackPlayer.stop();
    };
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged) {
      const currentTrackId = await TrackPlayer.getCurrentTrack();
      if (currentTrackId !== null) {
        const trackDetails = await TrackPlayer.getTrack(currentTrackId);
        if (trackDetails) {
          setCurrentSong({
            id: trackDetails.id,
            title: trackDetails.title,
            artist: trackDetails.artist,
            subtitle: trackDetails.subtitle,
            artwork: trackDetails.artwork,
          });

          // Find the original song in the playlist to get its _id
          const originalSong = playlist.find(
            song => song._id === trackDetails.id,
          );
          if (originalSong && originalSong._id) {
            logPlayHistory(originalSong._id);
          }
        }
      }
    }
  });

  const logPlayHistory = async songId => {
    if (!songId) {
      console.error('No song ID provided to logPlayHistory');
      return;
    }

    console.log('1. Received songId:', songId);
    const requestBody = {song: songId};
    console.log('2. Sending request body:', requestBody);

    try {
      const response = await axios.post(
        'http://10.0.2.2:4000/api/playHistory/log',
        requestBody,
      );
      console.log('3. Response from server:', response.data);
      return response.data;
    } catch (error) {
      console.error('4. Error details:', {
        message: error.message,
        requestData: requestBody,
        responseData: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  };

  // Rest of your component code remains the same...

  const togglePlayPause = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const playNextSong = () => {
    const nextIndex = songIndex + 1;
    if (nextIndex < playlist.length) {
      navigation.replace('PlaySongScreen', {
        playlist,
        songIndex: nextIndex,
      });
    }
  };

  const playPreviousSong = () => {
    const prevIndex = songIndex - 1;
    if (prevIndex >= 0) {
      navigation.replace('PlaySongScreen', {
        playlist,
        songIndex: prevIndex,
      });
    }
  };

  const toggleLoop = () => {
    setIsLoop(!isLoop);
    ToastAndroid.show(
      isLoop ? 'Loop disabled' : 'Loop enabled',
      ToastAndroid.SHORT,
    );
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    ToastAndroid.show(
      isLiked ? 'Song unliked' : 'Song liked',
      ToastAndroid.SHORT,
    );
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={styles.gradient} colors={['#00C9FF', '#e0ffff']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.playingNow}>Playing Now</Text>
          <TouchableOpacity>
            <Entypo name="dots-three-horizontal" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: currentSong?.artwork || 'https://via.placeholder.com/300',
            }}
            style={styles.imagebox}
          />
        </View>

        <View style={styles.songDetails}>
          <Text style={styles.title}>
            {currentSong?.title || 'Unknown Title'}
          </Text>
          <Text style={styles.artist}>
            {currentSong?.artist || 'Unknown Artist'}
          </Text>
          <Text style={styles.subtitle}>
            {currentSong?.subtitle || 'Unknown Subtitle'}
          </Text>
        </View>

        <Slider
          style={styles.slider}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          onSlidingComplete={value => TrackPlayer.seekTo(value)}
        />

        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
          <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={toggleLoop}>
            <MaterialIcons
              name={isLoop ? 'repeat-one' : 'repeat'}
              size={30}
              color="#000"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={playPreviousSong}>
            <AntDesign name="banckward" size={35} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause}>
            <AntDesign
              name={isPlaying ? 'pausecircle' : 'playcircleo'}
              size={60}
              color="#000"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={playNextSong}>
            <AntDesign name="forward" size={35} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleLike}>
            <MaterialCommunityIcons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={30}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 5,
    fontFamily: 'RobotoBlack',
  },
  playingNow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  imagebox: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  songDetails: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    fontFamily: 'RobotoBold',
  },
  artist: {
    fontSize: 18,
    color: '#2C3E50',
    fontFamily: 'RobotoMedium',
  },
  slider: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default PlaySongScreen;
