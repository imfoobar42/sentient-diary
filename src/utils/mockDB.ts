import { ParsedEntry, UserProfile } from "../utils/types";

// Stores entries and profiles keyed by userId
const entryStore = new Map<string, ParsedEntry[]>(); // key: userId ➜ array of entries
const userProfile = new Map<string, UserProfile>();  // key: userId ➜ user profile
const entryCounters = new Map<string, number>();     // key: userId ➜ count of entries

const INITIAL_PROFILE: UserProfile = {
  topThemes: [],
  themeCount: {},
  dominantVibe: "neutral",
  vibeCount: {},
  bucketCount: {},
  traitPool: [],
  lastTheme: ""
};

/**
 * Returns profile for a given userId, or initializes one if absent.
 */
export function fetchProfile(userId: string = "user"): UserProfile {
  if (!userProfile.has(userId)) {
    userProfile.set(userId, { ...INITIAL_PROFILE });
  }
  return userProfile.get(userId)!;
}

/**
 * Updates and saves the profile for a given userId.
 */
export function saveProfile(userId: string, updatedProfile: UserProfile): void {
  userProfile.set(userId, updatedProfile);
}

/**
 * Returns the last 5 entries for a given userId.
 */
export function fetchRecentEntries(userId: string = "user"): ParsedEntry[] {
  return entryStore.get(userId)?.slice(-5) ?? [];
}

/**
 * Saves a diary entry under an auto-incremented ID for a userId.
 */
export function saveEntry(entry: ParsedEntry, userId: string = "user"): string {
  const currentCount = entryCounters.get(userId) ?? 0;
  const nextCount = currentCount + 1;
  const entryId = `entry_${nextCount}`;

  const entries = entryStore.get(userId) ?? [];
  entries.push(entry);
  entryStore.set(userId, entries);

  entryCounters.set(userId, nextCount);

  return entryId;
}

/**
 * Pre-loads 99 mock entries and a populated profile for a userId (simulate:hundred).
 */
export function preloadMockHundredEntries(userId: string = "user"): void {
  const mockEntry: ParsedEntry = {
    theme: ["intern management"],
    vibe: ["driven"],
    intent: "Lead effectively",
    subtext: "Wants to be respected",
    personaTrait: ["organiser"],
    bucket: ["Goal"]
  };

  const entries = Array.from({ length: 99 }, () => ({ ...mockEntry }));
  entryStore.set(userId, entries);
  entryCounters.set(userId, 99);

  userProfile.set(userId, {
    topThemes: ["intern management"],
    themeCount: { "intern management": 35 },
    dominantVibe: "driven",
    vibeCount: { "driven": 41 },
    bucketCount: { "Goal": 48 },
    traitPool: ["organiser"],
    lastTheme: "intern management"
  });
}

/**
 * Clears all mock data (simulate:first).
 */
export function resetMockDb(): void {
  entryStore.clear();
  userProfile.clear();
  entryCounters.clear();
}
