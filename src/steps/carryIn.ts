import {ParsedEntry} from "../utils/types";
import { logStep } from "./stepLogger";

// Mock cosine similarity between 0.0 and 1.0
function mockCosineSim(): number {
  return 0.91; // > 0.86 to trigger carry-in
}

export function computeCarryIn(
  current: ParsedEntry,
  recent: ParsedEntry[]
): boolean {
  const cosineSim = mockCosineSim();
  const overlap = recent.some(entry =>
    entry.theme.some(t => current.theme.includes(t)) ||
    entry.vibe.some(v => current.vibe.includes(v))
  );


  const carryIn = cosineSim > 0.86 || overlap;

  logStep(
    "CARRY_IN",
    { cosineSim, overlap },
    carryIn,
    "[MOCK] cosineSim > 0.86 or theme/vibe overlap"
  );

  return carryIn;
}
