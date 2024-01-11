module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["nativewind/babel", "react-native-paper/babel", "module:react-native-dotenv"],
      },
    },
    plugins: ["nativewind/babel", "react-native-paper/babel"],
  };
};
