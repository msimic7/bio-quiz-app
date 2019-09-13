import { DOM } from './base';

export const renderQuiz = question => {
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
  const markup1 = `
  <div class="questionNum">1.</div>
  <div class="btn btnSave">SAVE</div>
  `;
  DOM.leftSideContent().insertAdjacentHTML('beforeend', markup1);
  const markup2 = `
    <div class="btn btnAction" id="btnSubmit" data-name="btnSubmit">SUBMIT</div>
    <div class="btn btnAction" id="btnNext" data-name="btnNext">NEXT</div>
  `;
  DOM.actionButtons().insertAdjacentHTML('beforeend', markup2);
};

export const clearQuiz = () => {
  DOM.contentTitle().innerHTML = '';
  DOM.contentMain().innerHTML = '';
  DOM.leftSideContent().innerHTML = '';
};
