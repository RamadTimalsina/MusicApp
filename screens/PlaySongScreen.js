import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {SafeAreaView} from 'react-native-safe-area-context';

const PlaySongScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null); // Initialize as null
  const route = useRoute();
  const navigation = useNavigation();
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const {
    songId,
    songTitle,
    songSubtitle,
    songArtist,
    songThumbnail,
    songUrl,
    playlist,
    songIndex,
  } = route.params;

  // Initialize the TrackPlayer and add the playlist
  const trackPlayerInit = async () => {
    await TrackPlayer.reset(); // Reset player to start fresh

    // Add the playlist to the TrackPlayer queue
    const trackList = playlist.map(song => ({
      id: song._id,
      url: song.url,
      title: song.title,

      artist: song.artist.name || 'Unknown Artist',
      artwork: song.thumbnail?.url || 'https://via.placeholder.com/80',
    }));

    await TrackPlayer.add(trackList); // Add all songs to the queue
    await TrackPlayer.skip(songIndex); // Skip to the songIndex to start playing the selected song
    await TrackPlayer.play(); // Start playback
    setIsPlaying(true);

    // Set the current song details
    setCurrentSong({
      id: songId,
      title: songTitle,
      subtitle: songSubtitle,
      artist: songArtist.name,
      thumbnail: songThumbnail.url,
      url: songUrl,
    });
  };

  useEffect(() => {
    // Initialize player and set current song on component mount
    trackPlayerInit();

    // Cleanup TrackPlayer on unmount
    return () => {
      TrackPlayer.stop();
      setCurrentSong(null); // Reset current song
    };
  }, []); // Run only once when the component mounts

  // Effect to update song details when route params change
  useEffect(() => {
    if (currentSong?.id !== songId) {
      trackPlayerInit(); // Re-initialize the player with new song

      // Update currentSong with new details
      setCurrentSong({
        id: songId,
        title: songTitle,
        subtitle: songSubtitle,
        artist: songArtist.name,
        thumbnail: songThumbnail.url,
        url: songUrl,
      });
    }
  }, [songId, songTitle, songSubtitle, songArtist, songThumbnail, songUrl]); // Dependencies array

  // Listen to TrackPlayer events
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged) {
      const currentTrackId = await TrackPlayer.getCurrentTrack();
      if (currentTrackId) {
        const trackDetails = await TrackPlayer.getTrack(currentTrackId);
        if (trackDetails) {
          setCurrentSong({
            id: trackDetails.id,
            title: trackDetails.title,
            subtitle: trackDetails.subtitle,
            artist: trackDetails.artist,
            thumbnail: trackDetails.artwork,
            url: trackDetails.url,
          });
        }
      }
    }
  });

  // Toggle play/pause functionality
  const togglePlayPause = async () => {
    const playerState = await TrackPlayer.getState();
    if (playerState === State.Playing) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  // Play the next song in the playlist
  const playNextSong = () => {
    const nextIndex = songIndex + 1;
    if (nextIndex < playlist.length) {
      const nextSong = playlist[nextIndex];
      navigation.replace('PlaySongScreen', {
        songId: nextSong._id,
        songTitle: nextSong.title,
        songSubtitle: nextSong.subtitle,
        songArtist: nextSong.artist,
        songThumbnail: nextSong.thumbnail,
        songUrl: nextSong.url,
        songIndex: nextIndex, // Increment the song index
        playlist: playlist, // Pass the updated playlist
      });
    }
  };

  // Play the previous song in the playlist
  const playPreviousSong = () => {
    const prevIndex = songIndex - 1;
    if (prevIndex >= 0) {
      const prevSong = playlist[prevIndex];
      navigation.replace('PlaySongScreen', {
        songId: prevSong._id,
        songTitle: prevSong.title,
        songSubtitle: prevSong.subtitle,
        songArtist: prevSong.artist,
        songThumbnail: prevSong.thumbnail,
        songUrl: prevSong.url,
        songIndex: prevIndex, // Decrement the song index
        playlist: playlist, // Pass the updated playlist
      });
    }
  };

  // Format time in mm:ss
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={['#8A2BE2', '#FF7F7F']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={30} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.playingNow}>Playing Now</Text>
          <TouchableOpacity>
            <Entypo name="dots-three-horizontal" size={30} color="#000000" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: currentSong?.thumbnail || 'https://via.placeholder.com/80',
            }}
            style={styles.imagebox}
            onError={error => console.log('Error loading image:', error)}
          />
        </View>
        {/* <View style={styles.songDetails}>
          <Text style={styles.title}>{currentSong?.title || 'Loading...'}</Text>
          <Text style={styles.artist}>
            {currentSong?.artist || 'Unknown Artist'}
          </Text>
        </View> */}

        <View style={styles.songDetails}>
          <Text style={styles.title}>{songTitle}</Text>
          <View style={styles.artistRow}>
            <Text style={styles.artist}>{songArtist.name}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.artist}>{songSubtitle}</Text>
          </View>
        </View>

        {/* Slider to show song progress */}
        <Slider
          style={styles.slider}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          onSlidingComplete={value => TrackPlayer.seekTo(value)}
        />

        {/* Time display */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
          <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
        </View>

        <View style={styles.controls}>
          {/* <TouchableOpacity onPress={handleLoop}>
        <AntDesign
              name={isPlaying ? 'pausecircle' : 'playcircleo'}
              size={60}
              color="#000"
            />
        </TouchableOpacity> */}
          <TouchableOpacity onPress={playPreviousSong}>
            <AntDesign name="banckward" size={45} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause}>
            <AntDesign
              name={isPlaying ? 'pausecircle' : 'playcircleo'}
              size={60}
              color="#000"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={playNextSong}>
            <AntDesign name="forward" size={45} color="#000" />
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
    paddingHorizontal: 20,
    marginTop: 10,
  },
  playingNow: {
    fontWeight: '600',
    fontSize: 20,
    color: '#000000',
  },
  imageContainer: {
    marginTop: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10, // Android shadow
  },
  imagebox: {
    height: 300,
    width: 300,
    borderRadius: 10,
  },
  songDetails: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C3E50',
  },
  artist: {
    fontSize: 17,
    color: '#2C3E50',
    fontWeight: '700',
  },
  dot: {
    fontSize: 25,
    color: '#000000',
    fontWeight: '700',
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 10,
  },

  slider: {
    width: '90%',
    height: 40,
    alignSelf: 'center',
    marginTop: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: -10,
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
