import type { ReadingPassage } from "@/store/types";
import { area01 } from "./area01";
import { area02 } from "./area02";
import { area03 } from "./area03";
import { area04 } from "./area04";
import { area05 } from "./area05";
import { area06 } from "./area06";

export { area01, area02, area03, area04, area05, area06 };

export const ALL_PASSAGES: ReadingPassage[] = [
  area01,
  area02,
  area03,
  area04,
  area05,
  area06,
];

export function getPassageByAreaId(
  id: number,
): ReadingPassage | undefined {
  return ALL_PASSAGES.find((p) => p.areaId === id);
}
