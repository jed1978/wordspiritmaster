import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { WordEntry, CapturedSpirit } from '@/store/types';
import { STAGE_NAMES } from '@/utils/constants';
import { STRINGS, getPosLabel, formatNextReview } from '@/utils/strings';
import { Modal } from '@/components/ui/Modal';
import { ThemedText } from '@/components/ui/ThemedText';
import { SpiritCard } from '@/components/spirits/SpiritCard';
import { PressableButton } from '@/components/ui/PressableButton';

interface SpiritDetailModalProps {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly word: WordEntry | null;
  readonly spirit: CapturedSpirit | null;
}

export function SpiritDetailModal({
  visible,
  onClose,
  word,
  spirit,
}: SpiritDetailModalProps): React.JSX.Element {
  if (!word || !spirit) {
    return <Modal visible={false} onClose={onClose}><View /></Modal>;
  }

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.content}>
        <SpiritCard
          word={word.word}
          type={word.type}
          posCategory={word.posCategory}
          stage={spirit.stage}
          size={80}
        />

        <View style={styles.info}>
          <DetailRow label={STRINGS.spiritDetailMeaning} value={word.meaning} />
          <DetailRow label={STRINGS.spiritDetailPos} value={getPosLabel(word.pos)} />
          <DetailRow
            label={STRINGS.spiritDetailStage}
            value={STAGE_NAMES[spirit.stage]}
          />
          <DetailRow
            label={STRINGS.spiritDetailNextReview}
            value={formatNextReview(spirit.nextReviewAt)}
          />
          <DetailRow
            label={STRINGS.spiritDetailTotalReviews}
            value={`${spirit.totalCorrect}/${spirit.totalReviews}`}
          />
        </View>

        <PressableButton
          label={STRINGS.spiritDetailClose}
          onPress={onClose}
          variant="accent"
        />
      </View>
    </Modal>
  );
}

function DetailRow({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}): React.JSX.Element {
  return (
    <View style={styles.row}>
      <ThemedText variant="secondary" size="sm">{label}</ThemedText>
      <ThemedText size="md">{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: 'center', gap: 16 },
  info: { width: '100%', gap: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
