
import { getRecentEntries } from "../utils/mockDB";
import { ParsedEntry } from "../utils/types";
import { logStep } from "./stepLogger";

export function fetchRecentEntries(userId = "default"): ParsedEntry[] {
  const recent = getRecentEntries(userId);
  logStep("FETCH_RECENT", "-", recent, recent.length ? "Fetched from store" : "No prior entries");
  return recent;
}
