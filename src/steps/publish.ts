import { logStep } from "./stepLogger";

export function publish(entryId: string, response: string, carryIn: boolean) {
  const result = { entryId, response_text: response, carry_in: carryIn };
  logStep("PUBLISH", "-", result, "Final output package");
  return result;
}
