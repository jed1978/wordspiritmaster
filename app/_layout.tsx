import React from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { GameProvider } from "@/store/GameContext";
import { COLORS } from "@/utils/colors";

export default function RootLayout(): React.JSX.Element {
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: COLORS.bgPrimary }}
    >
      <SafeAreaProvider>
        <GameProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: COLORS.bgPrimary },
              animation: "fade",
            }}
          />
        </GameProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
