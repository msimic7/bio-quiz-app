import { DOM } from './base';

export const renderQuestion = (question, num = 0) => {
  const qMarkup = question.question;
  DOM.contentTitle().insertAdjacentHTML('beforeend', qMarkup);
  question.answers.forEach(ans => {
    const markup = `
      <div class="answer">
        <input id="radio${ans.answerID}" type="radio" name="radio" value="${ans.answerID}" class="answerInput">
        <label for="radio${ans.answerID}" class="before">${ans.answer}</label>
      </div>
      `;
    DOM.contentMain().insertAdjacentHTML('beforeend', markup);
  });
  DOM.questionNum().innerHTML = `${num + 1}.`;
};

export const clearQuestion = () => {
  DOM.contentTitle().innerHTML = '';
  DOM.contentMain().innerHTML = '';
};
