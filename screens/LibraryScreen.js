import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const LibraryScreen = () => {
  return (
    <LinearGradient
      colors={['#8A2BE2', '#FF7F7F']}
      style={styles.gradient}
      start={{x: 0, y: 0}} // Start from the left
      end={{x: 1, y: 0}} // End at the right
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.homeContainer}>
            <Text style={styles.header}>Library</Text>
          </View>
          <View
            style={{backgroundColor: '#FAF9F6', borderRadius: 17, padding: 5}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 15,
              }}>
              <Text style={styles.GeneresContainer}>Explore Generes </Text>
              <View>
                <FontAwesome5
                  name="arrow-circle-right"
                  size={30}
                  color="#FF5722"
                />
              </View>
            </View>
            <View style={styles.geners}>
              <View style={styles.genersItem}>
                <View style={styles.Icon}>
                  <MaterialCommunityIcons
                    name="music-clef-treble"
                    size={30}
                    color="#795548"
                  />
                  <Text style={{fontSize: 18, color: '#242124'}}>Classic</Text>
                </View>
              </View>

              <View style={styles.genersItem}>
                <View style={styles.Icon}>
                  <MaterialCommunityIcons
                    name="guitar-electric"
                    size={30}
                    color="#FF5722"
                  />
                  <Text style={{fontSize: 18, color: '#242124'}}>Rock</Text>
                </View>
              </View>

              <View style={styles.genersItem}>
                <View style={styles.Icon}>
                  <MaterialCommunityIcons
                    name="saxophone"
                    size={30}
                    color="#3F51B5"
                  />
                  <Text style={{fontSize: 18, color: '#242124'}}>Jazz</Text>
                </View>
              </View>

              <View style={styles.genersItem}>
                <View style={styles.Icon}>
                  <FontAwesome5
                    name="microphone-alt"
                    size={30}
                    color="#4CAF50"
                  />
                  <Text style={{fontSize: 18, color: '#242124'}}>
                    Hip-Hop/Rap
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#FFFFFF',
              top: 10,
              borderRadius: 15,
              padding: 5,
            }}>
            <View style={styles.popularSection}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                  // backgroundColor: '#ddd',
                }}>
                <Text style={styles.GeneresContainer}>Artist songs here! </Text>
                <View>
                  <FontAwesome5
                    name="arrow-circle-right"
                    size={30}
                    color="#FF5722"
                  />
                </View>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              style={styles.scrollContainer}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder1}></View>
                <View style={styles.playlistContainer}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                </View>
              </View>

              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder1}></View>
                <View style={styles.playlistContainer}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                </View>
              </View>

              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder1}></View>
                <View style={styles.playlistContainer}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                </View>
              </View>

              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder1}></View>
                <View style={styles.playlistContainer}>
                  <Text style={styles.songTitle}>Top Hits of Year</Text>
                </View>
              </View>
              {/* Repeat for other popular tiles */}
              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder1}></View>
                <View style={styles.playlistContainer}>
                  <Text style={styles.songTitle}>Chill Vibes</Text>
                </View>
              </View>
              <View style={styles.popularTile}>
                <View style={styles.imagePlaceholder1}></View>
                <View style={styles.playlistContainer}>
                  <Text style={styles.songTitle}>Party Mix</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              backgroundColor: '#FFFFFF',
              marginTop: 20,
              borderRadius: 15,
              padding: 5,
            }}>
            <View style={styles.popularSection}>
              <Text style={styles.featuredHeader}>Liked Songs</Text>
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
              {/* Repeat for other popular tiles */}
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
                  <Text style={styles.songSubtitle}>
                    Get the party started!
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              backgroundColor: '#FFFFFF',
              marginTop: 10,
              borderRadius: 10,
              padding: 5,
              marginBottom: 100,
            }}>
            <View style={styles.popularSection}>
              <Text style={styles.featuredHeader}>liked playlist</Text>
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
              {/* Repeat for other popular tiles */}
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
                  <Text style={styles.songSubtitle}>
                    Get the party started!
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>

        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              /* Functionality to add album */
            }}>
            <MaterialCommunityIcons name="plus" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.addButtonText}>Create Album</Text>
        </View>
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
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  homeContainer: {
    marginHorizontal: 20,
  },
  header: {
    fontFamily: 'RobotoMedium',
    fontWeight: '500',
    color: '#000',
    fontSize: 38,
  },
  GeneresContainer: {
    color: '#181A18',
    fontFamily: 'RobotoMedium',
    fontSize: 25,
    marginBottom: 10,
  },
  geners: {
    borderRadius: 15,
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FAF9F6',
    marginTop: 10,
  },
  genersItem: {
    margin: 5,
    height: 100,
    width: 175,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularSection: {
    marginHorizontal: 20,
    marginTop: 12,
  },
  featuredHeader: {
    color: '#181A18',
    fontFamily: 'RobotoMedium',
    fontSize: 25,
    marginBottom: 10,
    marginTop: 12,
  },
  popularTile: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginRight: 10,
    width: 150,
    elevation: 3,
  },
  imagePlaceholder: {
    height: 150,
    width: 150,
    backgroundColor: '#DCDCDC',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imagePlaceholder1: {
    height: 150,
    width: 150,
    backgroundColor: '#8A2BE2',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  playlistContainer: {
    padding: 10,
    alignItems: 'center',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'RobotoMedium',
    color: '#000',
    marginTop: 5,
  },
  songSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  scrollContainer: {
    paddingVertical: 15,
    paddingLeft: 16,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#8A2BE2',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    fontFamily: 'RobotoBlack',
    color: '#000',
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
