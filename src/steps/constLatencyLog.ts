import { logStep } from "./stepLogger";

export function logCostAndLatency() {
  const cost = "$0.0008";
  const latency = "1.23s";
  logStep("COST_LATENCY_LOG", "-", "-", `[MOCK] Cost=${cost}, Latency=${latency}`);
}
