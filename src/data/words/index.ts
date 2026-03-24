import type { PosCategory, SpiritType, WordEntry } from '@/store/types';

import { pack01 } from './pack01';
import { pack02 } from './pack02';
import { pack03 } from './pack03';
import { pack04 } from './pack04';

export const ALL_WORDS: readonly WordEntry[] = [
  ...pack01,
  ...pack02,
  ...pack03,
  ...pack04,
];

export function getWordById(id: string): WordEntry | undefined {
  return ALL_WORDS.find(w => w.id === id);
}

export function getWordsByPack(pack: number): readonly WordEntry[] {
  return ALL_WORDS.filter(w => w.pack === pack);
}

export function getWordsByType(type: SpiritType): readonly WordEntry[] {
  return ALL_WORDS.filter(w => w.type === type);
}

export function getWordsByPosCategory(
  posCategory: PosCategory,
): readonly WordEntry[] {
  return ALL_WORDS.filter(w => w.posCategory === posCategory);
}

export { pack01, pack02, pack03, pack04 };
