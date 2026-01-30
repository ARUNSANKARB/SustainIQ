const axios = require('axios');

const GROK_API_KEY = process.env.GROK_API_KEY;
const GROK_API_URL = process.env.GROK_API_URL || 'https://api.grok.ai/v1';

async function generateExplanation({ questionText, correctText, selectedText, sdg }) {
  // Provider abstraction: use GROK if key present, otherwise fallback
  if (!GROK_API_KEY) {
    return fallbackExplanation({ questionText, correctText, selectedText, sdg });
  }

  try {
    const prompt = buildPrompt({ questionText, correctText, selectedText, sdg });
    const resp = await axios.post(
      `${GROK_API_URL}/generate`,
      { prompt, max_tokens: 200 },
      { headers: { Authorization: `Bearer ${GROK_API_KEY}` } }
    );

    const text = resp?.data?.text || resp?.data?.result || '';
    return sanitizeExplanation(text) || fallbackExplanation({ questionText, correctText, selectedText, sdg });
  } catch (err) {
    return fallbackExplanation({ questionText, correctText, selectedText, sdg });
  }
}

function buildPrompt({ questionText, correctText, selectedText, sdg }) {
  return `You are an educational assistant aligned with the UN SDGs.
Provide a concise explanation (2-4 sentences) for the following question. Explain why the correct answer is correct and, if the user picked a wrong answer, why that choice is incorrect. Keep it friendly, educational and aligned with the SDG: ${sdg.title}.

Question: ${questionText}
Correct answer: ${correctText}
Selected answer: ${selectedText}

Return only the explanation.`;
}

function sanitizeExplanation(text) {
  if (!text) return '';
  return text.trim();
}

function fallbackExplanation({ questionText, correctText, selectedText, sdg }) {
  const chosenPhrase = selectedText && selectedText !== correctText
    ? `You chose "${selectedText}", which is incorrect because it doesn't directly address the core issues of ${sdg.title.toLowerCase()}.` : '';

  return `${correctText} is correct because it directly supports the goals of "${sdg.title}". ${chosenPhrase} In short, the correct answer focuses on the primary mechanisms used to advance this SDG.`;
}

module.exports = { generateExplanation };
