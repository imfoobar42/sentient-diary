export interface TranscriptEntry{
  rawText : string;
  embedding: number[];
  parsed: ParsedEntry;
}
export interface ParsedEntry{
  theme: string[];
  vibe: string[];
  intent: string;
  subtext: string;
  personaTrait: string[];
  bucket: string[];
}
export interface UserProfile{
  topThemes: string[];
  themeCount: Record<string,number>;
  dominantVibe: string;
  vibeCount: Record<string, number>;
  bucketCount: Record<string, number>;
  traitPool: string[];
  lastTheme: string;
}