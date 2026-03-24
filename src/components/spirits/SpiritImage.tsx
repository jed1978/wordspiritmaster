import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import type { SpiritType, PosCategory, SpiritStage } from "@/store/types";
import { getSpiritImage } from "@/utils/spiritImage";

interface SpiritImageProps {
  readonly type: SpiritType;
  readonly posCategory: PosCategory;
  readonly stage: SpiritStage;
  readonly size?: number;
}

export function SpiritImage({
  type,
  posCategory,
  stage,
  size = 100,
}: SpiritImageProps): React.JSX.Element {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 600 }),
        withTiming(0, { duration: 600 }),
      ),
      -1,
      true,
    );
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const source = getSpiritImage(type, posCategory, stage);

  return (
    <Animated.View style={animatedStyle}>
      {source ? (
        <Image
          source={source}
          style={[styles.image, { width: size, height: size }]}
          resizeMode="contain"
        />
      ) : (
        <Animated.View
          style={[styles.placeholder, { width: size, height: size }]}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: { borderRadius: 8 },
  placeholder: {
    borderRadius: 12,
    backgroundColor: "#2a2a4a",
    borderWidth: 2,
    borderColor: "#4a4a7a",
    borderStyle: "dashed",
  },
});
