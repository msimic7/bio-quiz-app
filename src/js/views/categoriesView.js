import { DOM } from './base';

export const renderPage = questions => {
  DOM.contentTitle().innerHTML = 'CATEGORIES';
  DOM.contentTitle().classList.add('categories');
  questions.forEach((cat, i) => {
    const markup = `
    <div class="btn category" data-id="${i}">${cat.category}</div>
    `;
    DOM.contentMain().insertAdjacentHTML('beforeend', markup);
  });
};
