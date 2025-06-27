// export function logStep(tag: string, input: any, output: any, note = "") {
//   console.log(`[${tag}] input=${JSON.stringify(input)} | output=${JSON.stringify(output)} | note=${note}`);
// }
// // utils/logger.ts
// src/utils/stepLogger.ts

export function logStep(tag: string, input: any, output: any, note = "") {
  const sanitize = (x: any) =>
    typeof x === "string" ? x :
    x === undefined ? "-" :
    JSON.stringify(x);

  console.log(`[${tag}] input=${sanitize(input)} | output=${sanitize(output)} | note=${note}`);
}
