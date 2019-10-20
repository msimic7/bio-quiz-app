import { DOM } from './base';

export const renderPage = questions => {
  DOM.contentTitle().innerHTML = 'CATEGORIES';
  DOM.contentTitle().classList.add('categories');
  questions.forEach((cat, i) => {
    const markup = `
    <div class="btn category" data-id="${i}">${cat.catID}</div>
    `;
    DOM.contentMain().insertAdjacentHTML('beforeend', markup);
  });
  const markup2 = `
    <div class="btn btnAction" id="btnHome" data-name="btnHome">HOME</div>
  `;
  DOM.actionButtons().insertAdjacentHTML('beforeend', markup2);
};
