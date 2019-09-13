import { DOM } from './base';

export const renderPage = () => {
  DOM.contentTitle().innerHTML = 'CATEGORIES';
  DOM.contentMain().classList = 'contentMain allScores';
  const markup = `
    <div class="btn allScoresBtn" data-id="0">TEST 60</div>
    <div class="btn allScoresBtn" data-id="1">BOOK 1</div>
    <div class="btn allScoresBtn" data-id="2">BOOK 2</div>
    <div class="btn allScoresBtn" data-id="3">BOOK 3</div>
    `;
  DOM.contentMain().insertAdjacentHTML('beforeend', markup);
};
