const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { Option, Question, QuizSession, UserAnswer } = require('../models');
const { generateExplanation } = require('../services/grokService');

function loadSdgs() {
  const data = fs.readFileSync(path.join(__dirname, '..', 'data', 'sdg_data.json'), 'utf8');
  return JSON.parse(data).sdgs;
}

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateQuestion(id, sdgs) {
  // Mix of question types: scenario-based, definition, action-based, impact-based
  const questionTypes = [
    generateScenarioQuestion,
    generateDefinitionQuestion,
    generateActionQuestion,
    generateImpactQuestion,
    generateTargetQuestion
  ];

  const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  return selectedType(id, sdgs);
}

function generateScenarioQuestion(id, sdgs) {
  const scenarios = [
    "A tech startup is considering open-sourcing their AI model to help developing nations.",
    "A manufacturing company discovers they can reduce emissions by 40% but it will cost $2M.",
    "A farmer wants to increase yields while protecting biodiversity in their region.",
    "A government is deciding between renewable energy vs. faster job creation from coal.",
    "A community faces water scarcity - they need to choose conservation vs. development."
  ];

  const sdg = sdgs[Math.floor(Math.random() * sdgs.length)];
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  
  const stem = `In the following scenario, which SDG is MOST relevant? "${scenario}"`;
  const correct = `${sdg.title} (${sdg.description})`;

  const otherSdgs = sdgs.filter(s => s.id !== sdg.id).slice(0, 3);
  const distractors = otherSdgs.map(s => `${s.title} (${s.description})`);

  const options = shuffle([correct, ...distractors]).map((t, idx) => new Option(idx + 1, t));
  const correctOption = options.find(o => o.text === correct);

  return new Question(id, sdg.id, stem, options, correctOption.id);
}

function generateDefinitionQuestion(id, sdgs) {
  const sdg = sdgs[Math.floor(Math.random() * sdgs.length)];
  const definitions = [
    `${sdg.title} focuses on: ${sdg.description}`,
    `The core goal of ${sdg.title} is to ensure ${sdg.description.toLowerCase()}`,
    `${sdg.title} seeks to promote ${sdg.description.toLowerCase()}`,
    `To achieve ${sdg.title}, we must ${sdg.description.toLowerCase()}`
  ];

  const correct = definitions[Math.floor(Math.random() * definitions.length)];
  const stem = `What is the primary focus of "${sdg.title}"?`;

  const otherSdgs = sdgs.filter(s => s.id !== sdg.id).slice(0, 3);
  const distractors = [
    `It aims to maximize profits for multinational corporations.`,
    `It focuses solely on economic growth without environmental concerns.`,
    `It emphasizes military strength and geopolitical dominance.`,
    `${otherSdgs[0]?.title || 'This SDG'} focuses on: ${otherSdgs[0]?.description || 'something else'}`
  ].slice(0, 3);

  const options = shuffle([correct, ...distractors]).map((t, idx) => new Option(idx + 1, t));
  const correctOption = options.find(o => o.text === correct);

  return new Question(id, sdg.id, stem, options, correctOption.id);
}

function generateActionQuestion(id, sdgs) {
  const sdg = sdgs[Math.floor(Math.random() * sdgs.length)];
  const actions = [
    `Implementing policies that ${sdg.description.toLowerCase()}`,
    `Supporting initiatives that promote ${sdg.description.toLowerCase()}`,
    `Investing in technologies that advance ${sdg.description.toLowerCase()}`,
    `Educating communities about ${sdg.description.toLowerCase()}`
  ];

  const correct = actions[Math.floor(Math.random() * actions.length)];
  const stem = `Which action would BEST contribute to ${sdg.title}?`;

  const counterActions = [
    `Prioritizing short-term profits over environmental protection`,
    `Reducing funding for social and environmental programs`,
    `Ignoring climate change and biodiversity loss`,
    `Concentrating wealth among a small percentage of the population`,
    `Promoting unsustainable consumption patterns`
  ];

  const distractors = counterActions.slice(0, 3);
  const options = shuffle([correct, ...distractors]).map((t, idx) => new Option(idx + 1, t));
  const correctOption = options.find(o => o.text === correct);

  return new Question(id, sdg.id, stem, options, correctOption.id);
}

function generateImpactQuestion(id, sdgs) {
  const sdg = sdgs[Math.floor(Math.random() * sdgs.length)];
  const impacts = [
    `Progress on ${sdg.title} leads to: ${sdg.description}`,
    `Achieving ${sdg.title} would result in: ${sdg.description.toLowerCase()}`,
    `The positive impact of ${sdg.title} includes: ${sdg.description.toLowerCase()}`,
    `Success with ${sdg.title} means: ${sdg.description.toLowerCase()}`
  ];

  const correct = impacts[Math.floor(Math.random() * impacts.length)];
  const stem = `What is a key expected outcome of achieving ${sdg.title}?`;

  const negativeImpacts = [
    `Increased environmental degradation and resource depletion`,
    `Widening inequality and social division`,
    `Loss of biodiversity and ecosystem services`,
    `Perpetuation of poverty and lack of opportunity`,
    `Health crises due to pollution and inadequate healthcare`
  ];

  const distractors = negativeImpacts.slice(0, 3);
  const options = shuffle([correct, ...distractors]).map((t, idx) => new Option(idx + 1, t));
  const correctOption = options.find(o => o.text === correct);

  return new Question(id, sdg.id, stem, options, correctOption.id);
}

function generateTargetQuestion(id, sdgs) {
  const sdg = sdgs[Math.floor(Math.random() * sdgs.length)];
  const targets = [
    `To advance ${sdg.title}, we should: ${sdg.description.toLowerCase()}`,
    `${sdg.title} requires: ${sdg.description.toLowerCase()}`,
    `Key targets for ${sdg.title} involve: ${sdg.description.toLowerCase()}`,
    `Measurable progress on ${sdg.title} includes: ${sdg.description.toLowerCase()}`
  ];

  const correct = targets[Math.floor(Math.random() * targets.length)];
  const stem = `What are measurable targets for ${sdg.title}?`;

  const vagueDistractors = [
    `General feelings of goodwill without specific measurable goals`,
    `One-time charity efforts without systemic change`,
    `Marketing campaigns that use sustainability language without action`,
    `Voluntary commitments with no accountability mechanisms`,
    `Hope that problems will solve themselves over time`
  ];

  const distractors = vagueDistractors.slice(0, 3);
  const options = shuffle([correct, ...distractors]).map((t, idx) => new Option(idx + 1, t));
  const correctOption = options.find(o => o.text === correct);

  return new Question(id, sdg.id, stem, options, correctOption.id);
}

// In-memory sessions (for demo). In production use persistent store.
const sessions = new Map();

router.get('/new', (req, res) => {
  const sdgs = loadSdgs();
  const questions = [];
  
  // Generate 10 diverse questions - randomly select SDGs (allow repeats for diversity)
  // This ensures question types vary and SDGs can appear multiple times with different questions
  for (let i = 0; i < 10; i++) {
    questions.push(generateQuestion(i + 1, sdgs));
  }

  const session = new QuizSession(Date.now().toString(), questions);
  sessions.set(session.id, session);

  // Return questions without revealing correctOptionId
  const publicQuestions = session.questions.map(q => ({
    id: q.id,
    sdgId: q.sdgId,
    text: q.text,
    options: q.options.map(o => ({ id: o.id, text: o.text }))
  }));

  res.json({ sessionId: session.id, questions: publicQuestions });
});

router.post('/submit', async (req, res) => {
  const { sessionId, answers } = req.body || {};
  if (!sessionId || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'sessionId and answers array required' });
  }

  const session = sessions.get(sessionId);
  if (!session) return res.status(404).json({ error: 'session not found' });

  // Validate completeness
  if (session.questions.length !== 10 || answers.length !== 10) {
    return res.status(400).json({ error: 'Incomplete answers - exactly 10 required' });
  }

  const sdgs = loadSdgs();

  // Compute score
  let correctCount = 0;
  const perQuestion = [];

  for (const q of session.questions) {
    const ans = answers.find(a => a.questionId === q.id);
    const selectedId = ans ? ans.selectedOptionId : null;
    const isCorrect = selectedId === q.correctOptionId;
    if (isCorrect) correctCount++;

    const sdg = sdgs.find(s => s.id === q.sdgId) || { title: 'SDG', description: '' };

    perQuestion.push({
      questionId: q.id,
      questionText: q.text,
      selectedOptionId: selectedId,
      selectedText: q.options.find(o => o.id === selectedId)?.text || null,
      correctOptionId: q.correctOptionId,
      correctText: q.options.find(o => o.id === q.correctOptionId).text,
      isCorrect,
      sdg
    });
  }

  const percentage = Math.round((correctCount / session.questions.length) * 100);

  // Generate explanations using Grok service (in parallel)
  const explanations = await Promise.all(perQuestion.map(async pq => {
    const explanation = await generateExplanation({
      questionText: pq.questionText,
      correctText: pq.correctText,
      selectedText: pq.selectedText || '',
      sdg: pq.sdg
    });
    return { questionId: pq.questionId, explanation };
  }));

  res.json({
    score: percentage,
    correctCount,
    total: session.questions.length,
    perQuestion,
    explanations
  });
});

module.exports = router;
