import { logStep } from "./stepLogger";
export function createEmbedding(text:string, dim=384): number[]{
  const vector = Array(dim).fill(0.01);
  logStep("EMBEDDING",text,`Array(${dim})`, "[MOCK] 384-dim MiniLM vector");
  return vector;
}