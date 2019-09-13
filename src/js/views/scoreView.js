import { DOM } from './base';

export const renderPage = state => {
  DOM.contentTitle().innerHTML = `YOUR SCORE IS ${state.score}/${state.questionNum}`;
  DOM.actionButtons().innerHTML = '';
  state.wrongQuestions.forEach(el => {
    DOM.contentMain().insertAdjacentHTML('beforeend', el);
  });
};
