import { DOM } from './base';

export const renderPage = state => {
  DOM.contentTitle().innerHTML = `YOUR SCORE IS ${state.score}/${state.questionNum}`;
  DOM.actionButtons().innerHTML = '';

  const wronqQQ = renderWrongQuestions(state.wrongQuestions);
  wronqQQ.forEach(wQuestions => {
    const markup = `
    <div class="score">
    <p>${wQuestions.catName}: ${wQuestions.questions.join(', ')}</p>
    </div>`;
    DOM.contentMain().insertAdjacentHTML('beforeend', markup);
  });
  const markup2 = `
    <div class="btn btnAction" id="btnHome" data-name="btnHome">HOME</div>
  `;
  DOM.actionButtons().insertAdjacentHTML('beforeend', markup2);
};

export const renderWrongQuestions = wrongQuestions => {
  const data = [
    {
      catName: 'Celije',
      catId: 'cel',
      questions: []
    },
    {
      catName: 'Virusi i bakterije',
      catId: 'vib',
      questions: []
    },
    {
      catName: 'Ekologija zavrsni test',
      catId: 'ezt',
      questions: []
    },
    {
      catName: 'Zavrsni test citologija',
      catId: 'ztc',
      questions: []
    },
    {
      catName: 'Citologija zavrsni test',
      catId: 'czt',
      questions: []
    },
    {
      catName: 'Biljna tkiva i organi',
      catId: 'bto',
      questions: []
    },
    {
      catName: 'Beskicmenjaci',
      catId: 'bkm',
      questions: []
    },
    {
      catName: 'Kicmenjaci',
      catId: 'kcm',
      questions: []
    },
    {
      catName: 'Protozoe, sundjeri, zarnjaci',
      catId: 'psz',
      questions: []
    },
    {
      catName: 'Tkiva test za prijemni',
      catId: 'ttp',
      questions: []
    },
    {
      catName: 'Biljni organi i razn. zivog sveta',
      catId: 'bor',
      questions: []
    },
    {
      catName: 'Mehanizmi nasledjivanja test',
      catId: 'mnt',
      questions: []
    },
    {
      catName: 'Molekularna biologija test',
      catId: 'mbt',
      questions: []
    }
  ];

  wrongQuestions.forEach(question => {
    let cat;
    switch (question.substring(0, 3)) {
      case 'cel':
        cat = data.find(q => {
          return q.catId === 'cel';
        });
        cat.questions.push(question.slice(3));
        break;
      case 'vib':
        cat = data.find(q => {
          return q.catId === 'vib';
        });
        cat.questions.push(question.slice(3));
        break;
      case 'ezt':
        cat = data.find(q => {
          return q.catId === 'ezt';
        });
        cat.questions.push(question.slice(3));
        break;
      case 'ztc':
        cat = data.find(q => {
          return q.catId === 'ztc';
        });
        cat.questions.push(question.slice(3));
        break;
      case 'czt':
        cat = data.find(q => {
          return q.catId === 'czt';
        });
        cat.questions.push(question.slice(3));
        break;
      case 'bto':
        cat = data.find(q => {
          return q.catId === 'bto';
        });
        cat.questions.push(question.slice(3));
        break;
      case 'bkm':
        cat = data.find(q => {
          return q.catId === 'bkm';
        });
        cat.questions.push(question.slice(3));
        break;
      case 'kcm':
        cat = data.find(q => {
          return q.catId === 'kcm';
        });
        cat.questions.push(question.slice(3));
        break;
      case 'psz':
        cat = data.find(q => {
          return q.catId === 'psz';
        });
        cat.questions.push(question.slice(3));
        break;
      case 'ttp':
        cat = data.find(q => {
          return q.catId === 'ttp';
        });
        cat.questions.push(question.slice(3));
        break;
      case 'bor':
        cat = data.find(q => {
          return q.catId === 'bor';
        });
        cat.questions.push(question.slice(3));
        break;
      case 'mnt':
        cat = data.find(q => {
          return q.catId === 'mnt';
        });
        cat.questions.push(question.slice(3));
        break;
      case 'mbt':
        cat = data.find(q => {
          return q.catId === 'mbt';
        });
        cat.questions.push(question.slice(3));
        break;
    }
  });
  let wrongQ = data.filter(d => {
    return d.questions.length > 0;
  });
  return wrongQ;
};
