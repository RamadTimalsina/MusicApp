// import React, {useEffect} from 'react';
// import {StyleSheet} from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
// import {AuthProvider} from './AuthContext'; // AuthProvider for the context
// import AppNav from './navigation/AppNav'; // Navigation management

// const App = () => {
//   useEffect(() => {
//     SplashScreen.hide(); //hides the splash screen after the main screen or loginorsignup screen load
//   }, []);

//   return (
//     <AuthProvider>
//       <AppNav />
//     </AuthProvider>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});

import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {AuthProvider} from './AuthContext'; // AuthProvider for the context
import AppNav from './navigation/AppNav'; // Navigation management
import TrackPlayer from 'react-native-track-player';

const App = () => {
  useEffect(() => {
    setupPlayer();
  }, []);
  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    console.log(' TrackPlayer is ready');
  };
  useEffect(() => {
    SplashScreen.hide(); // Hides the splash screen after the main screen or login/signup screen load
    //setupTrackPlayer(); // Set up the track player here
  }, []);

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;

// import React, {useEffect} from 'react';
// import {StyleSheet} from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
// import {AuthProvider} from './AuthContext';
// import AppNav from './navigation/AppNav';
// import TrackPlayer, {Capability} from 'react-native-track-player';

// const App = () => {
//   useEffect(() => {
//     // setupTrackPlayer(); // Set up the TrackPlayer
//     SplashScreen.hide(); // Hide the splash screen
//   }, []);

//   const setupPlayer = async () => {
//     try {
//       await TrackPlayer.setupPlayer();
//       await TrackPlayer.updateOptions({
//         stopWithApp: false,
//         capabilities: [
//           Capability.Play,
//           Capability.Pause,
//           Capability.SkipToNext,
//           Capability.SkipToPrevious,
//           Capability.Stop,
//         ],
//         compactCapabilities: [
//           Capability.Play,
//           Capability.Pause,
//           Capability.SkipToNext,
//           Capability.SkipToPrevious,
//         ],
//       });
//       console.log('TrackPlayer is ready');
//     } catch (error) {
//       console.error('Error during TrackPlayer setup:', error);
//     }
//   };

//   return (
//     <AuthProvider>
//       <AppNav />
//     </AuthProvider>
//   );
// };

// export default App;
