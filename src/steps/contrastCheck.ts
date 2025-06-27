import { ParsedEntry, UserProfile } from "../utils/types";
import { logStep } from "./stepLogger";

export function checkEmotionFlip(
  parsed: ParsedEntry,
  profile: UserProfile
): boolean {
  const dominant = profile.dominantVibe;
  const flip = !!dominant && !parsed.vibe.includes(dominant);
  
  logStep(
    "CONTRAST_CHECK",
    { dominant, newVibe: parsed.vibe },
    flip,
    "Detects emotional shift from profile"
  );

  return flip;
}
