import type { SpiritType } from "@/store/types";

export const COLORS = {
  // Backgrounds
  bgPrimary: "#1a1a2e",
  bgCard: "#1e1e3a",
  bgButton: "#2a2a4a",
  borderButton: "#3a3a6a",
  bgDisabled: "#1a1a2a",
  overlay: "rgba(0,0,0,0.6)",

  // Text
  textPrimary: "#e0e0ff",
  textSecondary: "#94a3b8",
  textHint: "#666680",
  textDisabled: "#444444",
  textWhite: "#ffffff",

  // Feedback
  correct: "#4ade80",
  wrong: "#f87171",
  accent: "#a78bfa", // purple — progress, active tab
  warning: "#fbbf24",

  // Tab bar
  tabBarBg: "#12122a",
  tabActive: "#a78bfa",
  tabInactive: "#4a4a6a",

  // Spirit Type Glow
  flameGlow: "rgba(239,68,68,0.3)",
  aquaGlow: "rgba(59,130,246,0.3)",
  natureGlow: "rgba(34,197,94,0.3)",
  metalGlow: "rgba(234,179,8,0.3)",
  bloomGlow: "rgba(236,72,153,0.3)",
  starGlow: "rgba(168,85,247,0.3)",
  moonGlow: "rgba(99,102,241,0.3)",
  crystalGlow: "rgba(6,182,212,0.3)",
} as const;

export const SPIRIT_TYPE_COLORS: Record<SpiritType, string> = {
  flame: "#ef4444",
  aqua: "#3b82f6",
  nature: "#22c55e",
  metal: "#eab308",
  bloom: "#ec4899",
  star: "#a855f7",
  moon: "#6366f1",
  crystal: "#06b6d4",
};

export const SPIRIT_TYPE_ACCENT: Record<SpiritType, string> = {
  flame: "#fbbf24",
  aqua: "#7dd3fc",
  nature: "#86efac",
  metal: "#fde68a",
  bloom: "#f9a8d4",
  star: "#d8b4fe",
  moon: "#a5b4fc",
  crystal: "#67e8f9",
};

export const SPIRIT_TYPE_LABELS: Record<SpiritType, string> = {
  flame: "🔥 火焰系",
  aqua: "💧 水流系",
  nature: "🌿 草木系",
  metal: "⚡ 金屬系",
  bloom: "🌸 花語系",
  star: "✨ 星光系",
  moon: "🌙 月影系",
  crystal: "💎 結晶系",
};
