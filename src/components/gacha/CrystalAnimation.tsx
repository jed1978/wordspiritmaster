import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { COLORS } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";
import { ThemedText } from "@/components/ui/ThemedText";

interface CrystalAnimationProps {
  readonly onPress: () => void;
}

export function CrystalAnimation({
  onPress,
}: CrystalAnimationProps): React.JSX.Element {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.3, { damping: 6 }, () => {
      scale.value = withTiming(0, { duration: 300 });
    });
    // Delay onPress to let animation play
    setTimeout(onPress, 500);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Animated.View style={animatedStyle}>
          <ThemedText style={styles.crystal}>💎</ThemedText>
        </Animated.View>
      </Pressable>
      <ThemedText variant="secondary" size="md" style={styles.tapHint}>
        {STRINGS.gachaTap}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", gap: 24 },
  crystal: { fontSize: 80, textAlign: "center" },
  tapHint: { textAlign: "center" },
});
