import { saveEntry as storeEntry } from "../utils/mockDB";
import { ParsedEntry } from "../utils/types";
import { logStep } from "./stepLogger";

export function saveEntry(entry: ParsedEntry, userId = "default"): string {
  const id = storeEntry(entry, userId);
  logStep("SAVE_ENTRY", entry, id, "Simulated saving entry");
  return id;
}
