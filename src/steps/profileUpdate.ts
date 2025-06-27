import { ParsedEntry,UserProfile } from "../utils/types";
import { logStep } from "./stepLogger";

function incrementCount<T extends string>(
  map: Record<T, number>,
  key: T
): void {
  map[key] = (map[key] || 0) + 1;
}

export function updateProfile(profile: UserProfile, parsed: ParsedEntry): UserProfile {
  parsed.theme.forEach(t => incrementCount(profile.themeCount, t));
  parsed.vibe.forEach(v => incrementCount(profile.vibeCount, v));
  parsed.bucket.forEach(b => incrementCount(profile.bucketCount, b));

  parsed.personaTrait.forEach(t => {
    if (!profile.traitPool.includes(t)) {
      profile.traitPool.push(t);
    }
  });

  profile.lastTheme = parsed.theme[0];

  // Update top themes
  profile.topThemes = Object.entries(profile.themeCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([t]) => t);

  // Update dominant vibe
  const sortedVibes = Object.entries(profile.vibeCount).sort((a, b) => b[1] - a[1]);
  profile.dominantVibe = sortedVibes[0]?.[0] || "neutral";

  logStep("PROFILE_UPDATE", parsed, profile, "Updated profile with new entry data");
  return profile;
}
