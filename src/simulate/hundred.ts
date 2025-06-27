import { runPipeline } from "../pipeline";
import { ParsedEntry, UserProfile } from "../utils/types";

// Mock 5 recent prior entries (to simulate last 5)
const pastEntry: ParsedEntry = {
  theme: ["intern management"],
  vibe: ["driven"],
  intent: "Lead effectively",
  subtext: "Wants to be respected",
  personaTrait: ["organiser"],
  bucket: ["Goal"]
};

const mockEntries: ParsedEntry[] = Array(5).fill(pastEntry);

// Mock profile matching 99 prior entries
const profile: UserProfile = {
  topThemes: ["intern management"],
  themeCount: { "intern management": 35 },
  dominantVibe: "driven",
  vibeCount: { driven: 41 },
  bucketCount: { Goal: 48 },
  traitPool: ["organiser"],
  lastTheme: "intern management"
};

const input = "I keep checking Slack even when I’m exhausted. I know I need rest, but I’m scared I’ll miss something important.";
const input2 = "I keep using my phone when i should be working instead.I want to get rid of this habit";
const input3= "I feel really tired today, I dont want to work!"
async function main() {
  // Pass userId along with mocks
  const result = await runPipeline(input2, "user2", mockEntries, profile);
  console.log(result.result);
}

main();
