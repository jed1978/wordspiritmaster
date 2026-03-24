import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import type { SpiritType, PosCategory, SpiritStage } from "@/store/types";
import { COLORS, SPIRIT_TYPE_COLORS } from "@/utils/colors";
import { getSpiritImage, SPIRIT_TYPE_EMOJI } from "@/utils/spiritImage";

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
        <View
          style={[
            styles.fallback,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: SPIRIT_TYPE_COLORS[type],
            },
          ]}
        >
          <Text style={styles.emoji}>{SPIRIT_TYPE_EMOJI[type]}</Text>
          <Text style={styles.stageLabel}>{stage}</Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: { borderRadius: 8 },
  fallback: {
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.85,
  },
  emoji: {
    fontSize: 28,
  },
  stageLabel: {
    position: "absolute",
    bottom: 2,
    right: 4,
    fontSize: 10,
    color: COLORS.textWhite,
    fontWeight: "700",
  },
});
