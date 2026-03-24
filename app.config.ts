import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "單字精靈大師",
  slug: "word-spirit-master",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "wordspiritmaster",
  userInterfaceStyle: "dark",
  icon: "./src/assets/icon.png",
  splash: {
    image: "./src/assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#1a1a2e",
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.clearforge.wordspiritmaster",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/adaptive-icon.png",
      backgroundColor: "#1a1a2e",
    },
    package: "com.clearforge.wordspiritmaster",
  },
  plugins: [
    "expo-router",
    "expo-font",
    "expo-asset",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#1a1a2e",
        image: "./src/assets/splash.png",
        imageWidth: 200,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
