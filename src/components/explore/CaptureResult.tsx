import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import type { SpiritType, PosCategory } from "@/store/types";
import { STRINGS } from "@/utils/strings";
import { SPIRIT_TYPE_COLORS } from "@/utils/colors";
import { ThemedText } from "@/components/ui/ThemedText";
import { SpiritImage } from "@/components/spirits/SpiritImage";
import { WrongAnswerHint } from "@/components/explore/WrongAnswerHint";

interface CaptureResultProps {
  readonly success: boolean;
  readonly type: SpiritType;
  readonly posCategory: PosCategory;
  readonly correctAnswer: string;
  readonly hint?: string;
  readonly word?: string;
  readonly pos?: string;
}

export function CaptureResult({
  success,
  type,
  posCategory,
  correctAnswer,
  hint,
  word,
  pos,
}: CaptureResultProps): React.JSX.Element {
  if (success) {
    const glowColor = SPIRIT_TYPE_COLORS[type];
    return (
      <Animated.View entering={ZoomIn.duration(400)} style={styles.container}>
        <View
          style={[styles.spiritPlate, { backgroundColor: glowColor + "26" }]}
        >
          <SpiritImage
            type={type}
            posCategory={posCategory}
            stage={1}
            size={160}
          />
        </View>
        <ThemedText variant="correct" size="xl" style={styles.title}>
          {STRINGS.captureSuccess}
        </ThemedText>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <ThemedText variant="wrong" size="lg" style={styles.title}>
        {STRINGS.captureFail}
      </ThemedText>
      <WrongAnswerHint
        correctAnswer={correctAnswer}
        hint={hint}
        word={word}
        pos={pos}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 16, padding: 16 },
  title: { fontWeight: "700" },
  spiritPlate: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
