// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };

module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      {
        loose: true, // Set 'loose' mode to true here
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-transform-private-methods', {loose: true}], // Ensure 'loose' is set to true
    ['@babel/plugin-transform-class-properties', {loose: true}], // Ensure 'loose' is set to true
    ['@babel/plugin-transform-private-property-in-object', {loose: true}], // Ensure 'loose' is set to true
  ],
};
