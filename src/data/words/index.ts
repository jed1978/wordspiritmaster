import type { PosCategory, SpiritType, WordEntry } from '@/store/types';

import { pack01 } from './pack01';
import { pack02 } from './pack02';
import { pack03 } from './pack03';
import { pack04 } from './pack04';
import { pack05 } from './pack05';
import { pack06 } from './pack06';
import { pack07 } from './pack07';
import { pack08 } from './pack08';
import { pack09 } from './pack09';
import { pack10 } from './pack10';
import { pack11 } from './pack11';
import { pack12 } from './pack12';
import { pack13 } from './pack13';
import { pack14 } from './pack14';
import { pack15 } from './pack15';
import { pack16 } from './pack16';
import { pack17 } from './pack17';
import { pack18 } from './pack18';
import { pack19 } from './pack19';
import { pack20 } from './pack20';
import { pack21 } from './pack21';
import { pack22 } from './pack22';
import { pack23 } from './pack23';
import { pack24 } from './pack24';
import { pack25 } from './pack25';
import { pack26 } from './pack26';
import { pack27 } from './pack27';
import { pack28 } from './pack28';
import { pack29 } from './pack29';
import { pack30 } from './pack30';
import { pack31 } from './pack31';
import { pack32 } from './pack32';
import { pack33 } from './pack33';
import { pack34 } from './pack34';
import { pack35 } from './pack35';
import { pack36 } from './pack36';
import { pack37 } from './pack37';
import { pack38 } from './pack38';
import { pack39 } from './pack39';
import { pack40 } from './pack40';

export const ALL_WORDS: readonly WordEntry[] = [
  ...pack01,
  ...pack02,
  ...pack03,
  ...pack04,
  ...pack05,
  ...pack06,
  ...pack07,
  ...pack08,
  ...pack09,
  ...pack10,
  ...pack11,
  ...pack12,
  ...pack13,
  ...pack14,
  ...pack15,
  ...pack16,
  ...pack17,
  ...pack18,
  ...pack19,
  ...pack20,
  ...pack21,
  ...pack22,
  ...pack23,
  ...pack24,
  ...pack25,
  ...pack26,
  ...pack27,
  ...pack28,
  ...pack29,
  ...pack30,
  ...pack31,
  ...pack32,
  ...pack33,
  ...pack34,
  ...pack35,
  ...pack36,
  ...pack37,
  ...pack38,
  ...pack39,
  ...pack40,
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

export {
  pack01, pack02, pack03, pack04, pack05, pack06, pack07, pack08, pack09, pack10,
  pack11, pack12, pack13, pack14, pack15, pack16, pack17, pack18, pack19, pack20,
  pack21, pack22, pack23, pack24, pack25, pack26, pack27, pack28, pack29, pack30,
  pack31, pack32, pack33, pack34, pack35, pack36, pack37, pack38, pack39, pack40,
};
