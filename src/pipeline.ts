import { rawText } from "../src/steps/rawText";
import { createEmbedding } from "./steps/embedding";
import { fetchRecentEntries, fetchProfile, saveProfile, saveEntry } from "./utils/mockDB";
import { extractMeta } from "./steps/metaExtract";
import { parseEntry } from "./steps/parseEntry";
import { computeCarryIn } from "./steps/carryIn";
import { checkEmotionFlip } from "./steps/contrastCheck";
import { updateProfile } from "./steps/profileUpdate";
import { generateReply } from "./steps/gptReply";
import { publish } from "./steps/publish";
import { logCostAndLatency } from "./steps/constLatencyLog";
import { ParsedEntry, UserProfile } from "../src/utils/types";

// 👇 Add `userId` parameter (defaults to "user" for simplicity)
export async function runPipeline(
  transcript: string,
  userId: string = "user",
  previousEntries: ParsedEntry[] = [],
  profileOverride?: UserProfile
) {
  // 1. Ingest raw text
  const raw = rawText(transcript);

  // 2. Generate embedding (mocked)
  const embedding = createEmbedding(raw);

  // 3. Fetch recent entries for this user
  const recent = previousEntries.length
    ? previousEntries
    : fetchRecentEntries(userId);

  // 4. Fetch or initialize profile for this user
  const userProfile = profileOverride || fetchProfile(userId);

  // 5–8: Metadata, parse, carry-in, contrast
  const meta = extractMeta(raw);
  const parsed = parseEntry(raw);
  const carryIn = computeCarryIn(parsed, recent);
  const emotionFlip = checkEmotionFlip(parsed, userProfile);

  // 9. Update profile and persist it
  const updatedProfile = updateProfile(userProfile, parsed);
  saveProfile(userId, updatedProfile); // ✅ Save updated profile

  // 10. Save the diary entry under this user
  const entryId = saveEntry(parsed, userId); // ✅ Now user-aware

  // 11. Generate response
  const reply = await generateReply(parsed);

  // 12. Publish package
  const result = publish(entryId, reply, carryIn);

  // 13. Mock cost + latency
  logCostAndLatency();

  return {
    result,
    profile: updatedProfile,
    parsed,
  };
}
