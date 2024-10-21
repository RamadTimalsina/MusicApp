// /**
//  * @format
//  */

import 'react-native-get-random-values';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
//import TrackPlayerService from './service'; // Import the service

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service'));
