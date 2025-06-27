
import { ParsedEntry } from "../utils/types";
import { logStep } from "./stepLogger";

export function parseEntry(text: string): ParsedEntry {
  // Basic rule-based mock extraction
  const parsed: ParsedEntry = {
    theme: ["work-life balance"],
    vibe: ["anxious", "exhausted"],
    intent: "Find rest without guilt or fear of missing out.",
    subtext: "Fears being seen as less committed.",
    personaTrait: ["conscientious", "vigilant"],
    bucket: ["Thought"]
  };

  logStep("PARSE_ENTRY", text, parsed, "[MOCK] Rule-based parsed output");
  return parsed;
}
