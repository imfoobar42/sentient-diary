import {logStep} from "./stepLogger";

export function rawText(transcript:string): string{
  logStep("RAW_TEXT_IN", transcript, transcript,"Accepted transcript");
  return transcript;
}