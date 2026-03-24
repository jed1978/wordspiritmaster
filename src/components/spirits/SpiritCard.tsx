import React from "react";
import { View, StyleSheet } from "react-native";
import type { SpiritType, PosCategory, SpiritStage } from "@/store/types";
import { COLORS, SPIRIT_TYPE_COLORS } from "@/utils/colors";
import { SpiritImage } from "@/components/spirits/SpiritImage";
import { EvolutionDots } from "@/components/spirits/EvolutionDots";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { ThemedText } from "@/components/ui/ThemedText";

interface SpiritCardProps {
  readonly word: string;
  readonly type: SpiritType;
  readonly posCategory: PosCategory;
  readonly stage: SpiritStage;
  readonly size?: number;
  readonly compact?: boolean;
}

export function SpiritCard({
  word,
  type,
  posCategory,
  stage,
  size = 100,
  compact = false,
}: SpiritCardProps): React.JSX.Element {
  const glowColor = SPIRIT_TYPE_COLORS[type];

  if (compact) {
    return (
      <View style={[styles.compact, { shadowColor: glowColor }]}>
        <SpiritImage
          type={type}
          posCategory={posCategory}
          stage={stage}
          size={size}
        />
      </View>
    );
  }

  return (
    <View style={[styles.card, { shadowColor: glowColor }]}>
      <SpiritImage
        type={type}
        posCategory={posCategory}
        stage={stage}
        size={size}
      />
      <ThemedText size="lg" style={styles.word}>
        {word}
      </ThemedText>
      <TypeBadge type={type} />
      <EvolutionDots stage={stage} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    gap: 8,
    padding: 16,
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  compact: {
    alignItems: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  word: { fontWeight: "700", marginTop: 4 },
});
