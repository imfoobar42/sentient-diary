import { logStep } from "./stepLogger";

export interface MetaData {
  word_count: number;
  has_exclamation: boolean;
  has_question: boolean;
  top_words: string[];
}

export function extractMeta(text: string): MetaData {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const freq: Record<string, number> = {};

  for (const word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }

  const top_words = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);

  const meta: MetaData = {
    word_count: words.length,
    has_exclamation: text.includes("!"),
    has_question: text.includes("?"),
    top_words
  };

  logStep("META_EXTRACT", text, meta, "Extracted top words and punctuation features");
  return meta;
}
