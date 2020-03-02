import { DOM } from './base';

export const renderPage = () => {
  DOM.contentTitle().innerHTML = 'ALL SCORES';
  DOM.contentMain().classList = 'contentMain allScores';
  const markup = `
    <div class="btn allScoresBtn" data-id="0">TEST 60</div>
    <div class="btn allScoresBtn" data-id="1">BOOK 1</div>
    <div class="btn allScoresBtn" data-id="2">BOOK 2</div>
    <div class="btn allScoresBtn" data-id="3">BOOK 3</div>
    `;
  DOM.contentMain().insertAdjacentHTML('beforeend', markup);
};

export const renderTest60 = () => {
  const markupHome = `
    <div class="btn btnAction" id="btnHome" data-name="btnHome">HOME</div>
  `;
  DOM.actionButtons().insertAdjacentHTML('beforeend', markupHome);
  DOM.contentTitle().innerHTML = 'TEST60 SCORES';
  let markup = '';
  const scores = JSON.parse(localStorage.getItem('scores')) || [];
  if (scores.length === 0 || !scores.test60) {
    markup = ``;
  } else {
    scores.test60.forEach((scoreDate, j) => {
      let markup3 = '';
      scoreDate.wrongQuestions.forEach((score, i) => {
        let markup1 = '';
        score.forEach(questions => {
          const markup = `
          <li>
            <label>
              <div>${questions.catName}: ${questions.questions.join(', ')}</div>
            </label>
          </li>
          `;
          markup1 += markup;
        });
        const markup2 = `
        <li>
            <input type="checkbox" name="score${j}${i}" id="score${j}${i}">
              <label for="score${j}${i}">
                <div>Test ${i + 1}</div>
              </label>
              <ul>
                  ${markup1}
              </ul>
        </li>
        `;
        markup3 += markup2;
      });
      markup = `
      <ul class="treeview">
        <li>
            <input type="checkbox" name="scoreDate${j}" id="scoreDate${j}">
              <label for="scoreDate${j}">
                <div>${scoreDate.date}</div>
              </label>
              <ul>
                  ${markup3}
              </ul>
        </li>
      </ul>
      `;
    });
    DOM.contentMain().insertAdjacentHTML('beforeend', markup);
  }

  DOM.contentMain().classList.remove('allScores');
  DOM.contentMain().style.overflow = 'auto  ';
};

export const renderBook1 = () => {
  const markupHome = `
    <div class="btn btnAction" id="btnHome" data-name="btnHome">HOME</div>
  `;
  DOM.actionButtons().insertAdjacentHTML('beforeend', markupHome);
  DOM.contentTitle().innerHTML = 'BOOK1 SCORES';
  let markup = '';
  const scores = JSON.parse(localStorage.getItem('scores')) || [];

  if (scores.length === 0 || !scores.book1) {
    markup = ``;
  } else {
    scores.book1.forEach((scoreDate, i) => {
      let markup3 = '';
      const score = scoreDate.wrongQuestions;
      Object.keys(score).forEach((item, i) => {
        if (score[item].questions.length > 0) {
          let markup1 = '';
          score[item].questions.forEach((questions, i) => {
            const markup = `
          <li>
            <label>
              <div>Test${i + 1}: ${questions.join(', ')}</div>
            </label>
          </li>
          `;
            markup1 += markup;
          });
          const markup2 = `
        <li>
            <input type="checkbox" name="score${i}" id="score${i}">
              <label for="score${i}">
                <div">${score[item].catName}</div>
              </label>
              <ul>
                  ${markup1}
              </ul>
        </li>
        `;
          markup3 += markup2;
        }
      });
      markup = `
      <ul class="treeview">
        <li>
            <input type="checkbox" name="scoreDate${i}" id="scoreDate${i}">
              <label for="scoreDate${i}">
                <div">${scoreDate.date}</div">
              </label>
              <ul>
                  ${markup3}
              </ul>
        </li>
      </ul>
      `;
    });
  }

  DOM.contentMain().classList.remove('allScores');
  DOM.contentMain().style.overflow = 'auto  ';
  DOM.contentMain().insertAdjacentHTML('beforeend', markup);
};

export const renderBook2 = () => {
  const markupHome = `
    <div class="btn btnAction" id="btnHome" data-name="btnHome">HOME</div>
  `;
  DOM.actionButtons().insertAdjacentHTML('beforeend', markupHome);
  DOM.contentTitle().innerHTML = 'BOOK2 SCORES';
  let markup = '';
  const scores = JSON.parse(localStorage.getItem('scores')) || [];

  if (scores.length === 0 || !scores.book2) {
    markup = ``;
  } else {
    scores.book2.forEach((scoreDate, i) => {
      let markup3 = '';
      const score = scoreDate.wrongQuestions;
      Object.keys(score).forEach((item, i) => {
        if (score[item].questions.length > 0) {
          let markup1 = '';
          score[item].questions.forEach((questions, i) => {
            const markup = `
          <li>
            <label>
              <div>Test${i + 1}: ${questions.join(', ')}</div>
            </label>
          </li>
          `;
            markup1 += markup;
          });
          const markup2 = `
        <li>
            <input type="checkbox" name="score${i}" id="score${i}">
              <label for="score${i}">
                <div">${score[item].catName}</div>
              </label>
              <ul>
                  ${markup1}
              </ul>
        </li>
        `;
          markup3 += markup2;
        }
      });
      markup = `
      <ul class="treeview">
        <li>
            <input type="checkbox" name="scoreDate${i}" id="scoreDate${i}">
              <label for="scoreDate${i}">
                <div">${scoreDate.date}</div">
              </label>
              <ul>
                  ${markup3}
              </ul>
        </li>
      </ul>
      `;
    });
  }

  DOM.contentMain().classList.remove('allScores');
  DOM.contentMain().style.overflow = 'auto  ';
  DOM.contentMain().insertAdjacentHTML('beforeend', markup);
};

export const renderBook3 = () => {
  const markupHome = `
    <div class="btn btnAction" id="btnHome" data-name="btnHome">HOME</div>
  `;
  DOM.actionButtons().insertAdjacentHTML('beforeend', markupHome);
  DOM.contentTitle().innerHTML = 'BOOK3 SCORES';
  let markup = '';
  const scores = JSON.parse(localStorage.getItem('scores')) || [];

  if (scores.length === 0 || !scores.book3) {
    markup = ``;
  } else {
    scores.book3.forEach((scoreDate, i) => {
      let markup3 = '';
      const score = scoreDate.wrongQuestions;
      Object.keys(score).forEach((item, i) => {
        if (score[item].questions.length > 0) {
          let markup1 = '';
          score[item].questions.forEach((questions, i) => {
            const markup = `
          <li>
            <label>
              <div>Test${i + 1}: ${questions.join(', ')}</div>
            </label>
          </li>
          `;
            markup1 += markup;
          });
          const markup2 = `
        <li>
            <input type="checkbox" name="score${i}" id="score${i}">
              <label for="score${i}">
                <div">${score[item].catName}</div>
              </label>
              <ul>
                  ${markup1}
              </ul>
        </li>
        `;
          markup3 += markup2;
        }
      });
      markup = `
      <ul class="treeview">
        <li>
            <input type="checkbox" name="scoreDate${i}" id="scoreDate${i}">
              <label for="scoreDate${i}">
                <div">${scoreDate.date}</div">
              </label>
              <ul>
                  ${markup3}
              </ul>
        </li>
      </ul>
      `;
    });
  }

  DOM.contentMain().classList.remove('allScores');
  DOM.contentMain().style.overflow = 'auto  ';
  DOM.contentMain().insertAdjacentHTML('beforeend', markup);
};
