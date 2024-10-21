import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [showTrending, setShowTrending] = useState(false);

  const handleDownCirclePress = () => {
    setShowTrending(!showTrending);
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

            <View style={styles.recommendedSection}>
              <Text style={styles.recommendedHeader}>Recommended for you</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.recommendedItem}>
                  <View style={styles.recommendedSong}></View>
                  <View style={styles.nameAndTitle}>
                    <Text style={styles.songName}>Song Name</Text>
                    <Text style={styles.songTitle}>Song title</Text>
                  </View>
                </View>
                <View style={styles.recommendedItem}>
                  <View style={styles.recommendedSong}></View>
                  <View style={styles.nameAndTitle}>
                    <Text style={styles.songName}>Song Name</Text>
                    <Text style={styles.songTitle}>Song title</Text>
                  </View>
                </View>
                <View style={styles.recommendedItem}>
                  <View style={styles.recommendedSong}></View>
                  <View style={styles.nameAndTitle}>
                    <Text style={styles.songName}>Song Name</Text>
                    <Text style={styles.songTitle}>Song title</Text>
                  </View>
                </View>
                <View style={styles.recommendedItem}>
                  <View style={styles.recommendedSong}></View>
                  <View style={styles.nameAndTitle}>
                    <Text style={styles.songName}>Song Name</Text>
                    <Text style={styles.songTitle}>Song title</Text>
                  </View>
                </View>
                <View style={styles.recommendedItem}>
                  <View style={styles.recommendedSong}></View>
                  <View style={styles.nameAndTitle}>
                    <Text style={styles.songName}>Song Name</Text>
                    <Text style={styles.songTitle}>Song title</Text>
                  </View>
                </View>
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
  },
  recommendedHeader: {
    color: '#FFF',
    fontFamily: 'RobotoMedium',
    fontSize: 25,
    marginBottom: 10,
  },
  recommendedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  recommendedSong: {
    height: 80,
    width: 80,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  nameAndTitle: {
    marginLeft: 15,
  },
  songName: {
    fontSize: 20,
    fontFamily: 'RobotoBlack',
    fontWeight: '800',
    color: '#FFF',
  },
  songTitle: {
    fontSize: 16,
    color: '#CCC',
    fontFamily: 'RobotoMedium',
  },
});

export default SearchScreen;
