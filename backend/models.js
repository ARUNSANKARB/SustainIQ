// Models: Question, Option, QuizSession, UserAnswer

class Option {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

class Question {
  constructor(id, sdgId, text, options, correctOptionId) {
    this.id = id;
    this.sdgId = sdgId;
    this.text = text;
    this.options = options; // array of Option
    this.correctOptionId = correctOptionId;
  }
}

class QuizSession {
  constructor(id, questions) {
    this.id = id;
    this.questions = questions; // array of Question
    this.createdAt = new Date();
  }
}

class UserAnswer {
  constructor(questionId, selectedOptionId) {
    this.questionId = questionId;
    this.selectedOptionId = selectedOptionId;
  }
}

module.exports = { Option, Question, QuizSession, UserAnswer };
