export default class Question {
  constructor(questions) {
    this.questions = questions;
    this.questionAmount = this.questions.length;
    this.currentQuestion = this.questions[0];
    this.correctAnswers = this.currentQuestion.correctAnswers;
    this.answerAmount = this.currentQuestion.correctAnswers.length;
  }

  nextQuestion(num) {
    this.currentQuestion = this.questions[num];
    this.correctAnswers = this.currentQuestion.correctAnswers;
    this.answerAmount = this.currentQuestion.correctAnswers.length;
  }
}
