import { AudioPlayer, createAudioPlayer } from "expo-audio";

export type SoundKey =
  | "correct"
  | "wrong"
  | "capture"
  | "evolve"
  | "gachaReveal"
  | "bossHit"
  | "bossDefeat";

// Audio files not yet available — use null placeholders
const SOUND_SOURCES: Partial<Record<SoundKey, unknown>> = {
  // TODO: uncomment when audio files are ready
  // correct: require('@/assets/sounds/correct.mp3'),
  // wrong: require('@/assets/sounds/wrong.mp3'),
  // capture: require('@/assets/sounds/capture.mp3'),
  // evolve: require('@/assets/sounds/evolve.mp3'),
  // gachaReveal: require('@/assets/sounds/gacha_reveal.mp3'),
  // bossHit: require('@/assets/sounds/boss_hit.mp3'),
  // bossDefeat: require('@/assets/sounds/boss_defeat.mp3'),
};

const players: Partial<Record<SoundKey, AudioPlayer>> = {};

export async function preloadSounds(): Promise<void> {
  for (const [key, source] of Object.entries(SOUND_SOURCES)) {
    if (!source) continue;
    try {
      players[key as SoundKey] = createAudioPlayer(
        source as Parameters<typeof createAudioPlayer>[0],
      );
    } catch {
      // silent fail — audio is non-critical
    }
  }
}

export function playSound(key: SoundKey, soundEnabled: boolean): void {
  if (!soundEnabled) return;
  const player = players[key];
  if (!player) return;
  try {
    player.seekTo(0);
    player.play();
  } catch {
    // silent fail
  }
}

export function cleanupSounds(): void {
  for (const player of Object.values(players)) {
    try {
      player?.remove();
    } catch {
      // silent fail
    }
  }
}
