import { fetchProfile } from "../utils/mockDB";
import { UserProfile } from "../utils/types";
import { logStep } from "./stepLogger";

export function fetchOrInitProfile(userId = "default"): UserProfile {
  const profile = fetchProfile(userId)
  const defaultProfile: UserProfile = {
    topThemes: [],
    themeCount: {},
    dominantVibe: "neutral",
    vibeCount: {},
    bucketCount: {},
    traitPool: [],
    lastTheme: ""
  };
  const result = profile || defaultProfile;
  logStep("FETCH_PROFILE", "-", result, profile ? "Used provided profile" : "Initialized empty profile");
  return result;
}

