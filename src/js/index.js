import Questions from './models/Questions';
import Question from './models/Question';
import Score from './models/Score';

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

function setState(questions, type) {
  state.questions = new Question(questions);
  state.score = 0;
  state.questionNum = 0;
  state.wrongQuestions = [];
  state.type = type;
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

const quizControler = (questionData, type) => {
  setState(questionData, type);

  mainView.animateContentOut(DOM.test60());
  testView.clearQuiz();
  testView.renderQuiz(state.questions.currentQuestion);

  DOM.btnSubmit().addEventListener('click', () => {
    const answers = [];
    const correctAnswers = state.questions.currentQuestion.correctAnswers;
    const labels = document.querySelectorAll('.answer label');

    document.querySelectorAll('.answerInput').forEach((ans, i) => {
      if (ans.checked) answers.push(parseInt(ans.value));
    });

    if (answers.length !== 0) {
      document.querySelectorAll('.answerInput').forEach((ans, i) => {
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
      DOM.btnNext().classList.remove('hide');
    }
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
      DOM.btnSubmit().classList.remove('hide');
      DOM.btnNext().classList.add('hide');
    } else {
      testView.clearQuiz();
      scoreView.renderPage(state);
      DOM.btnHome().addEventListener('click', () => {
        location.reload();
      });
      console.log(state.type);
      const sc = new Score(
        state.type,
        scoreView.renderWrongQuestions(state.wrongQuestions)
      );
      console.log(sc);
      sc.saveScore();
    }
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
    quizControler(data.getRandom60(), -1)
  );

  DOM.categories().addEventListener('click', e => {
    mainView.animateContentOut(DOM.categories());
    categoriesView.renderPage(data.getData());
    DOM.contentMain().addEventListener('click', e => {
      const elem = e.target.closest('.category');
      if (elem) {
        quizControler(
          data.getRandomizedCategoryQuestions(elem.dataset.id),
          parseInt(elem.dataset.id)
        );
      }
    });
    DOM.btnHome().addEventListener('click', () => {
      location.reload();
    });
  });

  DOM.allScores().addEventListener('click', e => {
    mainView.animateContentOut(DOM.allScores());
    allScoresView.renderPage();
    DOM.contentMain().addEventListener('click', e => {
      const elem = e.target.closest('.allScoresBtn');
      if (elem) {
        if (elem.dataset.id === '0') {
          testView.clearQuiz();
          allScoresView.renderTest60();
        } else if (elem.dataset.id === '1') {
          testView.clearQuiz();
          allScoresView.renderBook1();
        } else if (elem.dataset.id === '2') {
          testView.clearQuiz();
          allScoresView.renderBook2();
        } else if (elem.dataset.id === '3') {
          testView.clearQuiz();
          allScoresView.renderBook3();
        }
        DOM.btnHome().addEventListener('click', () => {
          location.reload();
        });
      }
    });
  });

  DOM.allQuestions().addEventListener('click', e => {
    mainView.animateContentOut(DOM.allQuestions());
    allQuestionsView.renderPage();
  });
});
