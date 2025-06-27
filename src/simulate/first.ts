import { runPipeline } from "../pipeline";

const input1 = "I keep checking Slack even when I’m exhausted. I know I need rest, but I’m scared I’ll miss something important.";
const input2 = "I keep using my phone when i should be working instead.I want to get rid of this habit";
const input3 = "I want to get rid of this habit"

// const inputs = [
//     "I keep checking Slack even when I’m exhausted. I know I need rest, but I’m scared I’ll miss something important.",
//     "I keep using my phone when I should be working instead.",
//     "I want to get rid of this habit."
//   ];

async function main() {
  // Pass userId explicitly
  const input = process.env.INPUT || "Default fallback input";
  const result = await runPipeline(input, "user1");

  // const result = await runPipeline(input2, "user1");
  // console.log(result.result);

  // for (const input of inputs) {
  //   const result = await runPipeline(input, "user");
  //    console.log(result.result);} 
}

main();
