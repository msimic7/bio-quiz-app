import Questions from './models/Questions';
import Question from './models/Question';

import { DOM } from './views/base';
import * as testView from './views/testView';
import * as mainView from './views/mainView';
import * as questionView from './views/questionView';
import * as categoriesView from './views/categoriesView';
import * as allScoresView from './views/allScoresView';
import * as allQuestionsView from './views/allQuestionsView';
import * as scoreView from './views/scoreView';

let state = {};

const data = new Questions();

function setState(questions) {
  state.questions = new Question(questions);
  state.score = 0;
  state.questionNum = 0;
  state.wrongQuestions = [];
}

function isEqual(array1, array2) {
  if (array1.length != array2.length) return false;

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

/*function isAnswerCorrect(answers, answersLength) {
  if (answersLength === 1)
    return answers[0] === state.currentQuestion.correctAnswers[0];
  else {
    return isEqual(answers, state.currentQuestion.correctAnswers);
  }
}*/

const quizControler = questionData => {
  setState(questionData);

  mainView.animateContentOut(DOM.test60());
  testView.clearQuiz();
  testView.renderQuiz(state.questions.currentQuestion);

  DOM.btnSubmit().addEventListener('click', () => {
    const answers = [];
    const correctAnswers = state.questions.currentQuestion.correctAnswers;
    const labels = document.querySelectorAll('.answer label');

    document.querySelectorAll('.answerInput').forEach((ans, i) => {
      if (ans.checked) answers.push(parseInt(ans.value));
      ans.disabled = true;
      labels[i].classList.remove('before');
    });

    if (isEqual(answers, correctAnswers)) {
      state.score += 1;
      answers.forEach(el => {
        labels[el - 1].classList.add('correct');
      });
    } else {
      state.wrongQuestions.push(state.questions.currentQuestion.questionID);

      answers
        .filter(el => correctAnswers.includes(el))
        .forEach(elem => {
          if (elem) labels[elem - 1].classList.add('correct');
        });

      answers
        .filter(el => !correctAnswers.includes(el))
        .forEach(elem => {
          if (elem) labels[elem - 1].classList.add('incorrect');
        });

      correctAnswers
        .filter(el => !answers.includes(el))
        .forEach(elem => {
          if (elem) labels[elem - 1].classList.add('correctDark');
        });
    }

    DOM.btnSubmit().classList.add('hide');
  });

  DOM.btnNext().addEventListener('click', () => {
    state.questionNum += 1;

    if (state.questions.questionAmount !== state.questionNum) {
      questionView.clearQuestion();
      state.questions.nextQuestion(state.questionNum);
      questionView.renderQuestion(
        state.questions.currentQuestion,
        state.questionNum
      );
    } else {
      //TODO show score
      testView.clearQuiz();
      scoreView.renderPage(state);
    }
    DOM.btnSubmit().classList.remove('hide');
  });

  DOM.btnSave().addEventListener('click', () => {
    if (
      !state.wrongQuestions.includes(state.questions.currentQuestion.questionID)
    )
      state.wrongQuestions.push(state.questions.currentQuestion.questionID);
  });
};

window.addEventListener('load', () => {
  mainView.renderPage();

  DOM.test60().addEventListener('click', () =>
    quizControler(data.getAllData())
  );

  DOM.categories().addEventListener('click', e => {
    mainView.animateContentOut(DOM.categories());
    categoriesView.renderPage(data.getData());
    DOM.contentMain().addEventListener('click', e => {
      const elem = e.target.closest('.category');
      if (elem) {
        quizControler(data.getData()[elem.dataset.id].questions);
      }
    });
  });

  DOM.allScores().addEventListener('click', e => {
    mainView.animateContentOut(DOM.allScores());
    allScoresView.renderPage();
  });

  DOM.allQuestions().addEventListener('click', e => {
    mainView.animateContentOut(DOM.allQuestions());
    allQuestionsView.renderPage();
  });
});
