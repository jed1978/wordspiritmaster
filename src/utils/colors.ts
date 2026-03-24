import type { SpiritType } from '@/store/types';

export const THEME = {
  // Backgrounds
  bgPrimary: '#1a1a2e',
  bgPanel: '#1e1e3a',
  bgButton: '#2a2a4a',
  bgButtonBorder: '#3a3a6a',

  // Text
  textPrimary: '#e0e0ff',
  textSecondary: '#94a3b8',
  textHint: '#666680',

  // Feedback
  correct: '#4ade80',
  wrong: '#f87171',
  accent: '#a78bfa', // purple — progress, active tab

  // Tab bar
  tabBarBg: '#12122a',
  tabActive: '#a78bfa',
  tabInactive: '#4a4a6a',
} as const;

export const SPIRIT_TYPE_COLORS: Record<SpiritType, string> = {
  flame: '#ef4444',
  aqua: '#3b82f6',
  nature: '#22c55e',
  metal: '#eab308',
  bloom: '#ec4899',
  star: '#a855f7',
  moon: '#6366f1',
  crystal: '#06b6d4',
};

export const SPIRIT_TYPE_ACCENT: Record<SpiritType, string> = {
  flame: '#fbbf24',
  aqua: '#7dd3fc',
  nature: '#86efac',
  metal: '#fde68a',
  bloom: '#f9a8d4',
  star: '#d8b4fe',
  moon: '#a5b4fc',
  crystal: '#67e8f9',
};

export const SPIRIT_TYPE_LABELS: Record<SpiritType, string> = {
  flame: '🔥 火焰系',
  aqua: '💧 水流系',
  nature: '🌿 草木系',
  metal: '⚡ 金屬系',
  bloom: '🌸 花語系',
  star: '✨ 星光系',
  moon: '🌙 月影系',
  crystal: '💎 結晶系',
};
