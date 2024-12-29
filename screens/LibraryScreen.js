import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native'; // Import navigation hook

const LibraryScreen = () => {
  const navigation = useNavigation(); // Get navigation object
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Fetch genres
    axios
      .get('http://10.0.2.2:4000/api/genres/all')
      .then(response => setGenres(response.data))
      .catch(error => console.error('Error fetching genres:', error));

    // Fetch artists
    axios
      .get('http://10.0.2.2:4000/api/artists/all')
      .then(response => setArtists(response.data))
      .catch(error => console.error('Error fetching artists:', error));
  }, []);

  // Navigate to PlaylistDetails for the selected genre
  // const handleGenrePress = (genreId, index) => {
  //   navigation.navigate('PlaylistDetail', {genreId: genreId, songIndex: index});
  //   console.log(genres);
  // };

  const handleGenrePress = (genreId, genreName) => {
    navigation.navigate('PlaylistDetail', {
      genreId: genreId,
      genreName: genreName, // Pass the genre name here
    });
  };

  const handleArtistPress = (artistId, artistName) => {
    navigation.navigate('PlaylistDetail', {
      artistId: artistId,
      artistName: artistName, // Pass the artist name here
    });
  };

  return (
    <LinearGradient
      colors={['#c455b0', '#FF7F7F']}
      style={styles.gradient}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.homeContainer}>
            <Text style={styles.header}>Library</Text>
          </View>

          {/* Genres Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Explore Genres</Text>
            <View style={styles.genresContainer}>
              {genres.map((genre, index) => (
                <TouchableOpacity
                  key={genre._id} // Use genre ID for unique keys
                  style={styles.genreItem}
                  onPress={() => handleGenrePress(genre._id, genre.name)} // Pass genre name here
                >
                  <MaterialCommunityIcons
                    name="music"
                    size={30}
                    color="#795548"
                  />
                  <Text style={styles.genreText}>{genre.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Artists Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Artists</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {artists.map((artist, index) => (
                <TouchableOpacity
                  key={artist._id} // Use artist ID for unique keys
                  style={styles.artistItem}
                  onPress={() => handleArtistPress(artist._id, artist.name)} // Pass artist name here
                >
                  <Image
                    source={{
                      uri:
                        artist.image?.url || 'https://via.placeholder.com/150',
                    }}
                    style={styles.artistImage}
                  />
                  <Text style={styles.artistText}>{artist.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  homeContainer: {
    marginHorizontal: 20,
  },
  header: {
    fontSize: 38,
    fontWeight: '500',
    color: '#000',
  },
  sectionContainer: {
    borderRadius: 17,
    padding: 10,
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 25,
    fontWeight: '600',
    color: '#181A18',
    marginBottom: 10,
    fontFamily: 'RobotoBlack',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  genreItem: {
    width: '48%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginBottom: 10,
  },
  genreText: {
    fontSize: 18,
    color: '#242124',
    marginTop: 5,
  },
  artistItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  artistImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#DCDCDC',
  },
  artistText: {
    lineHeight: 20,
    fontSize: 16,
    //  marginTop: 5,
    fontFamily: 'RobotoBlack',
  },
});
