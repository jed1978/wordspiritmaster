import type { SpiritType, PosCategory, SpiritStage } from '@/store/types';

export const SPIRIT_IMAGES: Record<string, ReturnType<typeof require>> = {
  // flame
  flame_noun_1: require('@/assets/spirits/spirit_flame_noun_1.png'),
  flame_noun_2: require('@/assets/spirits/spirit_flame_noun_2.png'),
  flame_verb_1: require('@/assets/spirits/spirit_flame_verb_1.png'),
  flame_verb_2: require('@/assets/spirits/spirit_flame_verb_2.png'),
  flame_adj_1: require('@/assets/spirits/spirit_flame_adj_1.png'),
  flame_adj_2: require('@/assets/spirits/spirit_flame_adj_2.png'),
  flame_func_1: require('@/assets/spirits/spirit_flame_func_1.png'),
  flame_func_2: require('@/assets/spirits/spirit_flame_func_2.png'),
  // aqua
  aqua_noun_1: require('@/assets/spirits/spirit_aqua_noun_1.png'),
  aqua_noun_2: require('@/assets/spirits/spirit_aqua_noun_2.png'),
  aqua_verb_1: require('@/assets/spirits/spirit_aqua_verb_1.png'),
  aqua_verb_2: require('@/assets/spirits/spirit_aqua_verb_2.png'),
  aqua_adj_1: require('@/assets/spirits/spirit_aqua_adj_1.png'),
  aqua_adj_2: require('@/assets/spirits/spirit_aqua_adj_2.png'),
  aqua_func_1: require('@/assets/spirits/spirit_aqua_func_1.png'),
  aqua_func_2: require('@/assets/spirits/spirit_aqua_func_2.png'),
  // nature
  nature_noun_1: require('@/assets/spirits/spirit_nature_noun_1.png'),
  nature_noun_2: require('@/assets/spirits/spirit_nature_noun_2.png'),
  nature_verb_1: require('@/assets/spirits/spirit_nature_verb_1.png'),
  nature_verb_2: require('@/assets/spirits/spirit_nature_verb_2.png'),
  nature_adj_1: require('@/assets/spirits/spirit_nature_adj_1.png'),
  nature_adj_2: require('@/assets/spirits/spirit_nature_adj_2.png'),
  nature_func_1: require('@/assets/spirits/spirit_nature_func_1.png'),
  nature_func_2: require('@/assets/spirits/spirit_nature_func_2.png'),
  // metal (metal_func_2 missing — fallback handles it)
  metal_noun_1: require('@/assets/spirits/spirit_metal_noun_1.png'),
  metal_noun_2: require('@/assets/spirits/spirit_metal_noun_2.png'),
  metal_verb_1: require('@/assets/spirits/spirit_metal_verb_1.png'),
  metal_verb_2: require('@/assets/spirits/spirit_metal_verb_2.png'),
  metal_adj_1: require('@/assets/spirits/spirit_metal_adj_1.png'),
  metal_adj_2: require('@/assets/spirits/spirit_metal_adj_2.png'),
  metal_func_1: require('@/assets/spirits/spirit_metal_func_1.png'),
  // bloom
  bloom_noun_1: require('@/assets/spirits/spirit_bloom_noun_1.png'),
  bloom_noun_2: require('@/assets/spirits/spirit_bloom_noun_2.png'),
  bloom_verb_1: require('@/assets/spirits/spirit_bloom_verb_1.png'),
  bloom_verb_2: require('@/assets/spirits/spirit_bloom_verb_2.png'),
  bloom_adj_1: require('@/assets/spirits/spirit_bloom_adj_1.png'),
  bloom_adj_2: require('@/assets/spirits/spirit_bloom_adj_2.png'),
  bloom_func_1: require('@/assets/spirits/spirit_bloom_func_1.png'),
  bloom_func_2: require('@/assets/spirits/spirit_bloom_func_2.png'),
  // star
  star_noun_1: require('@/assets/spirits/spirit_star_noun_1.png'),
  star_noun_2: require('@/assets/spirits/spirit_star_noun_2.png'),
  star_verb_1: require('@/assets/spirits/spirit_star_verb_1.png'),
  star_verb_2: require('@/assets/spirits/spirit_star_verb_2.png'),
  star_adj_1: require('@/assets/spirits/spirit_star_adj_1.png'),
  star_adj_2: require('@/assets/spirits/spirit_star_adj_2.png'),
  star_func_1: require('@/assets/spirits/spirit_star_func_1.png'),
  star_func_2: require('@/assets/spirits/spirit_star_func_2.png'),
  // moon
  moon_noun_1: require('@/assets/spirits/spirit_moon_noun_1.png'),
  moon_noun_2: require('@/assets/spirits/spirit_moon_noun_2.png'),
  moon_verb_1: require('@/assets/spirits/spirit_moon_verb_1.png'),
  moon_verb_2: require('@/assets/spirits/spirit_moon_verb_2.png'),
  moon_adj_1: require('@/assets/spirits/spirit_moon_adj_1.png'),
  moon_adj_2: require('@/assets/spirits/spirit_moon_adj_2.png'),
  moon_func_1: require('@/assets/spirits/spirit_moon_func_1.png'),
  moon_func_2: require('@/assets/spirits/spirit_moon_func_2.png'),
  // crystal
  crystal_noun_1: require('@/assets/spirits/spirit_crystal_noun_1.png'),
  crystal_noun_2: require('@/assets/spirits/spirit_crystal_noun_2.png'),
  crystal_verb_1: require('@/assets/spirits/spirit_crystal_verb_1.png'),
  crystal_verb_2: require('@/assets/spirits/spirit_crystal_verb_2.png'),
  crystal_adj_1: require('@/assets/spirits/spirit_crystal_adj_1.png'),
  crystal_adj_2: require('@/assets/spirits/spirit_crystal_adj_2.png'),
  crystal_func_1: require('@/assets/spirits/spirit_crystal_func_1.png'),
  crystal_func_2: require('@/assets/spirits/spirit_crystal_func_2.png'),
};

export function getSpiritImage(
  type: SpiritType,
  posCategory: PosCategory,
  stage: SpiritStage,
): ReturnType<typeof require> | null {
  const clampedStage = Math.min(stage, 2) as 1 | 2;
  const key = `${type}_${posCategory}_${clampedStage}`;
  return (
    SPIRIT_IMAGES[key] ??
    SPIRIT_IMAGES[`${type}_${posCategory}_1`] ??
    null
  );
}
