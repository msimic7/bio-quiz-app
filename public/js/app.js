const leftSideContent = document.querySelector('#home');
const content = document.querySelector('.content');
const homeBtns = document.querySelectorAll('.btnHome');
const homeBtnPs = document.querySelectorAll('.leftSideContent p');
const contentTitle = document.querySelector('.contentTitle');
const contentMain = document.querySelector('.contentMain');
const btnSubmit = document.querySelector('#btnSubmit');
const btnNext = document.querySelector('#btnNext');
const btnBack = document.querySelector('#btnBack');
const allScoresBtns = document.querySelectorAll('.allScoresBtn');
const btnSave = document.querySelector('.btnSave');
const questionNum = document.querySelector('.questionNum');
const btnAnother60 = document.querySelector('#btnAnother60');
const btnCategories = document.querySelector('#btnCategories');
const btnShowNext = document.querySelector('#btnShowNext');

let tl = new TimelineMax();
tl.add(TweenMax.to(homeBtns, 0.8, { opacity: 1, width: '95%' }));
tl.add(
  TweenMax.from(content, 1, {
    opacity: 0,
    height: 0,
    width: 0,
    ease: Expo.easeOut
  })
);
tl.add(
  TweenMax.to(homeBtns, 0.7, { boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.75)' }),
  '-=0.5'
);
tl.add(TweenMax.to(homeBtnPs, 0.7, { opacity: 1 }), '-=0.3');

let tl1 = new TimelineMax();

let ctg1 = [];
let ctg2 = [];
let ctg3 = [];
let ctg4 = [];
let ctg5 = [];
let ctg6 = [];
let ctg7 = [];
let ctg8 = [];
let ctg9 = [];
let ctg10 = [];
let ctg11 = [];
let ctg12 = [];
let ctg13 = [];

let questionData;
let questions = [];
let catId;
let questionsAmount;
let currentQuestion;
let saveQuestion;

let score = 0;
let allArrayWrong = [];

let timer = document.querySelector('.timer');
let timeHours = document.querySelector('.hours');
let timeMins = document.querySelector('.mins');
let timeSecs = document.querySelector('.secs');
let x;

let test60ScoresBtn = document.getElementById('test60_scores_btn');
let book1ScoresBtn = document.getElementById('book1_scores_btn');
let book2ScoresBtn = document.getElementById('book2_scores_btn');

/*JSON INIT*/

function initApp() {
  fetch('./data.json')
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (!data) {
        Promise.reject('No data was loaded!');
      }
      questionData = data;
      console.log('====================================');
      console.log(questionData);
      console.log('====================================');
      return questionData;
    })
    .catch(err => {
      console.log('====================================');
      console.log('Fetch failed');
      console.log('====================================');
    });
}

initApp();

/* EVENTS */

btnShowNext.addEventListener('click', function() {
  let qNums = document.querySelector('.inSt').value;
  console.log(qNums);
  let qNumArr = qNums.split(/\s*,\s*/);
  console.log(qNumArr);
  let pickedCat = document.querySelector('.opt');
  let pCat = pickedCat.options[pickedCat.selectedIndex].value;
  console.log(pCat);
  let cat = getQuestionCatId(parseInt(pCat));
  console.log(cat);
  let result = [];
  pickCategoryAllQuestions(parseInt(pCat));
  for (let i = 0; i < qNumArr.length; i++) {
    console.log(cat + qNumArr[i]);
    let rez = questions.filter(obj => {
      return obj.questionID === cat + qNumArr[i];
    });
    result.push(rez);
  }
  console.log(result);
  let para = '';
  result.forEach(res => {
    let str = res[0].questionID;
    para += '[ ' + str.slice(3) + '. ] ' + res[0].question + '<br><hr>';
    let corAnsArr = [];
    res[0].correctAnswers.forEach(corAns => {
      corAnsArr.push(corAns.correctAnswer);
    });
    console.log(corAnsArr);
    res[0].answers.forEach(ans => {
      if (corAnsArr.includes(ans.answerID)) {
        para += '==> ' + ans.answer + '<br>';
      } else {
        para += ans.answer + '<br>';
      }
    });
    para += '<hr><br>';
  });
  contentMain.innerHTML = para;
  contentMain.style.overflowY = 'scroll';
  contentMain.style.textAlign = 'center';
  contentMain.style.background = 'rgba(1, 4, 5, 0.9)';
});

leftSideContent.addEventListener('click', function() {
  myFunc(event);
});

btnBack.addEventListener('click', function() {
  /* let tl2 = new TimelineMax();
  tl2.add(TweenMax.to(".content", 0.3, { opacity: 0 }));
  setTimeout(function() {
    showQuiz();
    homeBtns.forEach(el => {
      isElemVisable(el, true);
    });
  }, 320);
  setTimeout(function() {
    tl1.pause(0);
    tl.pause(0);
    tl.play();
  }, 630);

  showQuiz();
  isElemVisable(btnBack, false);
  isElemVisable(timer, false);
  isElemVisable(btnSubmit, false);
  isElemVisable(btnNext, false);*/
  location.reload();
});

btnSubmit.addEventListener('click', function() {
  let answers = document.querySelectorAll('.answerInput');
  let lab = document.getElementsByTagName('label');
  let question = questions[currentQuestion];
  saveQuestion = question;
  if (question.correctAnswers.length == 1) {
    let correctAnswerValue = question.correctAnswers[0].correctAnswer;

    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];

      if (answer.checked) {
        if (answer.value == correctAnswerValue) {
          lab[i].classList.add('correct');
          score++;
        } else {
          lab[i].classList.add('incorrect');
          wrQuestionArrayAdd(question);
        }
      } else if (answer.value == correctAnswerValue) {
        lab[i].classList.add('correctDark');
      }
    }
    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];

      //lab[i].classList.add("no-before");
      lab[i].classList.remove('before');
      answer.disabled = true;
    }
  } else {
    checkedCount = 0;
    for (let i = 0; i < answers.length; i++) {
      checkedCount += answers[i].checked ? 1 : 0;
    }

    if (checkedCount !== question.correctAnswers.length) {
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];

        if (answer.checked) {
          for (let j = 0; j < question.correctAnswers.length; j++) {
            if (answer.value == question.correctAnswers[j].correctAnswer) {
              lab[i].classList.add('correct');
            } else {
              lab[i].classList.add('incorrect');
            }
          }
        }
      }
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        if (!answer.checked) {
          for (let j = 0; j < question.correctAnswers.length; j++) {
            if (answer.value == question.correctAnswers[j].correctAnswer) {
              lab[i].classList.add('correctDark');
              break;
            }
          }
        }
      }
    } else {
      checkedCountCorrect = 0;
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        if (answer.checked) {
          for (let j = 0; j < question.correctAnswers.length; j++) {
            if (answer.value == question.correctAnswers[j].correctAnswer) {
              lab[i].classList.add('correct');
              checkedCountCorrect += 1;
            } else {
              lab[i].classList.add('incorrect');
            }
          }
        }
      }
      if (question.correctAnswers.length == checkedCountCorrect) {
        score++;
      } else {
        wrQuestionArrayAdd(question);
      }
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        for (let j = 0; j < question.correctAnswers.length; j++) {
          if (answer.value == question.correctAnswers[j].correctAnswer) {
            lab[i].classList.add('correctDark');
            break;
          }
        }
      }
    }
    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];

      lab[i].classList.add('no-before');
      lab[i].classList.remove('before');
      answer.disabled = true;
    }
  }

  isElemVisable(btnNext, true);
  isElemVisable(btnSubmit, false);
  console.log(ctg1);
  console.log(ctg2);
  console.log(ctg3);
  console.log(ctg4);
  console.log(ctg5);
  console.log(ctg6);
  console.log(ctg7);
  console.log(ctg8);
  console.log(ctg9);
  console.log(ctg10);
  console.log(ctg11);
  console.log(ctg12);
  console.log(ctg13);

  currentQuestion++;
});

btnNext.addEventListener('click', function() {
  if (currentQuestion == questions.length) {
    isElemVisable(btnSave, false);
    isElemVisable(questionNum, false);
    clearInterval(x);
    isElemVisable(timer, false);
    contentMain.className = 'contentMain scores';

    contentMain.innerHTML = '';
    contentTitle.innerHTML = '';
    isElemVisable(btnNext, false);
    isElemVisable(btnAnother60, true);
    isElemVisable(btnCategories, true);
    //anotherTestBtn.classList.remove("hide");
    //allScoresBtn.classList.remove("hide");
    //categoryButton.classList.remove("hide");

    let scoreTxt = 'YOUR SCORE IS ' + score + '/' + questions.length;
    let scoreT = document.createTextNode(scoreTxt);

    contentTitle.appendChild(scoreT);

    let wrQLS = [];
    addAllArrays();
    for (let i = 0; i < allArrayWrong.length; i++) {
      if (allArrayWrong[i].wqArray.length >= 1) {
        let wrQ = [];

        for (let j = 0; j < allArrayWrong[i].wqArray.length; j++) {
          wrQ.push(allArrayWrong[i].wqArray[j]);
        }

        wrQLS.push({
          cat: allArrayWrong[i].cat,
          wqArray: wrQ.sort()
        });

        let wrQuestionDiv = document.createElement('div');
        let wrQTxt = document.createTextNode(allArrayWrong[i].cat + ': ' + wrQ);

        wrQuestionDiv.appendChild(wrQTxt);

        contentMain.appendChild(wrQuestionDiv);
      }
    }

    scoresTest60 = JSON.parse(localStorage.getItem('scores')) || [];
    scoresBook1 = JSON.parse(localStorage.getItem('scoresBook1')) || [];
    scoresBook2 = JSON.parse(localStorage.getItem('scoresBook2')) || [];
    scoresBook3 = JSON.parse(localStorage.getItem('scoresBook3')) || [];

    let todaysDate = getCurrentDate();
    let percent = Math.round((score / questions.length) * 100);

    resetWrQuestionArrayAdd();
    allArrayWrong = [];
    if (!wrQLS === undefined || !wrQLS.length == 0) {
      wrQLS[0].wqArray.sort(function(a, b) {
        return a - b;
      });
    }
    console.log('======CATEGORY ID========');
    console.log(catId);
    console.log('====================================');

    testFBook(todaysDate, wrQLS, percent, catId);

    testFF = JSON.parse(localStorage.getItem('scores')) || [];
    console.log('==========NEW TEST FF==========');
    console.log(testFF);
    console.log('====================================');
    testFFB = JSON.parse(localStorage.getItem('scoresBook1')) || [];
    console.log('==========NEW BOOK1 FF==========');
    console.log(testFFB);
    console.log('====================================');
    testFFB2 = JSON.parse(localStorage.getItem('scoresBook2')) || [];
    console.log('==========NEW BOOK2 FF==========');
    console.log(testFFB2);
    console.log('====================================');
    testFFB3 = JSON.parse(localStorage.getItem('scoresBook3')) || [];
    console.log('==========NEW BOOK3 FF==========');
    console.log(testFFB3);
    console.log('====================================');

    // setTimeout(function() {
    //   categories();
    // }, 2000);
  } else {
    displayQuestion(questions[currentQuestion]);

    btnSubmit.classList.remove('hide');

    btnNext.classList.add('hide');
  }
});

btnAnother60.addEventListener('click', function() {
  catId = -1;
  //animateHomeBtnsOut(ev);
  generateTest(catId);
});

btnSave.addEventListener('click', function() {
  wrQuestionArrayAdd(saveQuestion);
  console.log(ctg1);
  console.log(ctg2);
  console.log(ctg3);
  console.log(ctg4);
  console.log(ctg5);
  console.log(ctg6);
  console.log(ctg7);
  console.log(ctg8);
  console.log(ctg9);
  console.log(ctg10);
  console.log(ctg11);
  console.log(ctg12);
  console.log(ctg13);
});

btnCategories.addEventListener('click', function() {
  categories();
});

/* MAIN FUNCTIONS */

function animateHomeBtnsOut(btnEvent) {
  console.log('INSIDE ANIM OUT' + btnEvent);
  let tl11 = new TimelineMax();
  tl11.pause();
  tl11.add(TweenMax.to(btnEvent, 0.4, { xPercent: 115, opacity: 0 }));
  tl11.add(TweenMax.to(homeBtns, 0.4, { opacity: 0 }), '-=0.3');
  tl11.add(
    TweenMax.to(btnEvent, 0.4, {
      xPercent: 0,
      opacity: 0
    })
  );
  tl11.add(TweenMax.to(homeBtnPs, 0.7, { opacity: 0 }), '-=0.3');
  tl11.addCallback(function() {
    homeBtns.forEach(el => {
      isElemVisable(el, false);
    });
  }, 0.9);
  tl1 = tl11;
  tl1.pause(0);
  tl1.play();
}

function myFunc(event) {
  let button1 = event.target.dataset.name;
  let button2 = event.target.parentNode.dataset.name;
  let button = button1 == undefined ? button2 : button1;
  let ev = button1 == undefined ? event.target.parentNode : event.target;
  console.log(button);

  if (button != undefined) {
    switch (button) {
      case 'test60':
        catId = -1;
        animateHomeBtnsOut(ev);
        generateTest(catId);
        break;
      case 'cat':
        animateHomeBtnsOut(ev);
        categories();
        break;
      case 'allSc':
        animateHomeBtnsOut(ev);
        generateAllScores();
        break;
      case 'allQw':
        animateHomeBtnsOut(ev);
        getQuestion();
        break;
    }
  }
}

function generateTest(catId) {
  showQuiz();
  score = 0;
  contentTitle.classList.add('questionText');
  isElemVisable(btnBack, false);
  isElemVisable(btnSubmit, true);
  isElemVisable(btnSave, true);
  isElemVisable(questionNum, true);
  isElemVisable(btnAnother60, false);
  isElemVisable(btnCategories, false);
  pickCategory(catId);

  if (catId == -1) {
    generateQuestionIdsArrayToLS(questions);
    questions = prepareQuestions(questions);
  }

  currentQuestion = 0;
  displayQuestion(questions[currentQuestion]);

  if (catId == 0) {
    setTimer(questions.length * 1);
  } else if (catId == 11) {
    setTimer(questions.length * 0.75);
  } else {
    setTimer(questions.length * 1.5);
  }
}

function categories() {
  showQuiz();
  isElemVisable(btnAnother60, false);
  isElemVisable(btnCategories, false);
  contentMain.classList.add('categories');
  isElemVisable(btnBack, true);
  let titleText = document.createTextNode('CATEGORIES');
  contentTitle.appendChild(titleText);
  contentTitle.classList.add('titleText');
  let i = 0;
  questionData.forEach(category => {
    let categoryDiv = document.createElement('div');
    let categoryName = document.createTextNode(category.catID);
    let categoryP = document.createElement('p');
    categoryP.appendChild(categoryName);
    categoryDiv.appendChild(categoryP);
    categoryDiv.className = 'btn category';
    categoryDiv.dataset.id = i.toString();
    contentMain.appendChild(categoryDiv);
    i++;
  });
  TweenMax.from('.category', 1, { scale: 0, ease: Expo.easeOut });
  TweenMax.from('.category p', 1.2, { opacity: 0, delay: 1 });
  //TweenMax.from(".category", 5, { opacity: 0 });
  let func;
  contentMain.addEventListener(
    'click',
    (func = function() {
      catId = getCategoryBtnId(event);
      if (catId != -1) {
        generateTest(catId);
        contentMain.removeEventListener('click', func);
      }
    })
  );
}

function getQuestion() {
  let pickCategory = document.createElement('select');
  pickCategory.classList.add('opt');
  let categoryOptions = [
    'Celije',
    'Virusi i bakterije',
    'Ekologija zavrsni test',
    'Zavrsni test citologija',
    'Citologija zavrsni test',
    'Biljna tkiva i organi',
    'Beskicmenjaci',
    'Kicmenjaci',
    'Protozoe, sundjeri, zarnjaci',
    'Tkiva test za prijemni',
    'Biljni organi i razn. zivog sveta',
    'Mehanizmi nasledjivanja test',
    'Molekularna biologija test'
  ];
  for (let i = 0; i < 13; i++) {
    let opt = document.createElement('option');
    opt.value = i.toString();
    opt.innerHTML = categoryOptions[i];
    pickCategory.appendChild(opt);
  }
  contentTitle.appendChild(pickCategory);
  let questionNumbers = document.createElement('input');
  questionNumbers.type = 'text';
  questionNumbers.classList.add('inSt');
  contentTitle.appendChild(questionNumbers);
  isElemVisable(btnShowNext, true);
}

function prepareQuestions(questions) {
  /*PULL VALID QUESTION IDS ARRAY FROM LS*/
  let validQuestions = JSON.parse(localStorage.getItem('validQuestions'));
  console.log('VALID QUESTIONS FROM LS');
  console.log(validQuestions);
  console.log('====================================');

  let vQAmount = validQuestions.length;
  /*PULL 60 NEW IDS*/
  let array60 = [];
  if (vQAmount >= 60) {
    for (let i = 0; i < 9; i++) {
      array60.push(validQuestions[i]);
    }
    validQuestions.splice(0, 9);
  } else {
    for (let i = 0; i < vQAmount; i++) {
      array60.push(validQuestions[i]);
    }
    validQuestions = [];
  }

  /*REDUCE VALID QUESTIONS ARRAY AND SAVE TO LS*/

  localStorage.setItem('validQuestions', JSON.stringify(validQuestions));
  console.log('NEW VALID QUESTIONS TO LS');
  console.log(validQuestions);
  console.log('====================================');

  /*PULL 60 RANDOM QUESTIONS*/
  let random60Questions = [];
  for (let i = 0; i < array60.length; i++) {
    random60Questions.push(questions[array60[i] - 1]);
  }
  console.log('NEW 60 QUESTIONS');
  console.log(random60Questions);
  console.log('====================================');

  return random60Questions;
}

function displayQuestion(question) {
  contentMain.innerHTML = '';
  contentTitle.innerHTML = '';

  let currQuest = currentQuestion + 1;
  questionNum.innerHTML = currQuest + '.';
  //saveCurrentQuestion = question;

  let questionNumb = currQuest.toString() + '.';
  let questionNumber = document.createTextNode(questionNumb);
  console.log('====QUESTION NUMBER====');
  console.log(questionNumber);
  console.log('====================================');
  //questionNum.appendChild(questionNumber);

  let questionQText = document.createTextNode(question.question);
  contentTitle.appendChild(questionQText);

  let ansNum = 1;
  if (question.correctAnswers.length == 1) {
    question.answers.forEach(answer => {
      let answerDiv = document.createElement('div');
      answerDiv.classList.add('answer');
      let radioId = 'radio' + ansNum;
      let label = document.createElement('label');
      label.setAttribute('for', radioId);
      label.classList.add('before');

      let answerInput = document.createElement('input');

      answerInput.setAttribute('id', radioId);
      answerInput.setAttribute('type', 'radio');
      answerInput.setAttribute('name', 'radio');
      answerInput.setAttribute('value', answer.answerID);
      answerInput.classList.add('answerInput');

      let answerText = document.createTextNode(answer.answer);
      //answerP.appendChild(answerText);
      label.appendChild(answerText);

      answerDiv.appendChild(answerInput);
      answerDiv.appendChild(label);

      ansNum++;
      contentMain.appendChild(answerDiv);
    });
  } else {
    question.answers.forEach(answer => {
      let answerDiv = document.createElement('div');
      answerDiv.classList.add('answer');
      let chkboxId = 'chkbox' + ansNum;
      let label = document.createElement('label');
      label.setAttribute('for', chkboxId);
      //label.classList.add("before");

      let answerInput = document.createElement('input');

      answerInput.setAttribute('id', chkboxId);
      answerInput.setAttribute('type', 'checkbox');
      answerInput.setAttribute('name', 'checkbox');
      answerInput.setAttribute('value', answer.answerID);
      answerInput.classList.add('answerInput');

      let answerText = document.createTextNode(answer.answer);
      //answerP.appendChild(answerText);
      label.appendChild(answerText);

      answerDiv.appendChild(answerInput);
      answerDiv.appendChild(label);

      ansNum++;
      contentMain.appendChild(answerDiv);
    });
  }
}

function testFBook(date, scores, percent, catId) {
  let overallPercent;
  let emptyArray = [];
  let ind1 = 0;
  let ind2 = 0;
  let sum = 0;
  let max = 0;
  let maxI = 0;
  let scoresB = [];
  let scoresBB;
  let allScores = [];
  let wQRepeated = [];
  let scoresBook = [];
  if (scores === undefined || scores.length == 0) {
    scores.push({
      cat: getCatName(catId),
      percent: percent,
      wqArray: emptyArray
    });
  }

  if (catId == -1) {
    for (let i = 0; i < scores.length; i++) {
      if (scores[i].wqArray.length > max) {
        max = scores[i].wqArray.length;
        maxI = i;
      }
    }

    if (scoresTest60.length === 0) {
      allScores.push({
        percent: percent,
        wQMost: maxI,
        scores: scores
      });

      overallPercent = percent;

      let newDate = {
        date: date,
        overallPercent: overallPercent,
        allScores: allScores
      };

      scoresTest60.push(newDate);
    } else {
      for (let i = 0; i < scoresTest60.length; i++) {
        let dat = scoresTest60[i].date;

        if (dat == date) {
          allScores = scoresTest60[i].allScores;

          allScores.push({
            percent: percent,
            wQMost: maxI,
            scores: scores
          });

          for (let i = 0; i < allScores.length; i++) {
            sum += allScores[i].percent;
          }
          let len = allScores.length;
          overallPercent = Math.round(sum / len);
          scoresTest60[i].overallPercent = overallPercent;
          scoresTest60[i].allScores == allScores;
          ind1 = 1;
          break;
        }
      }
      if (ind1 === 0) {
        allScores.push({
          percent: percent,
          wQMost: maxI,
          scores: scores
        });

        for (let i = 0; i < allScores.length; i++) {
          sum += allScores[i].percent;
        }

        overallPercent = Math.round(sum / allScores.length);

        let newDate = {
          date: date,
          overallPercent: overallPercent,
          allScores: allScores
        };

        scoresTest60.push(newDate);
      }
    }
  } else {
    if (catId > -1 && catId < 6) {
      scoresBook = scoresBook1;
    } else if (catId > 5 && catId < 11) {
      scoresBook = scoresBook2;
    } else {
      scoresBook = scoresBook3;
    }

    if (scoresBook.length === 0) {
      scoresB.push({
        catName: scores[0].cat,
        percent: percent,
        wqArray: scores[0].wqArray
      });
      allScores.push({
        cat: catId,
        catPercent: percent,
        wQRepeated: wQRepeated,
        scores: scoresB
      });

      let newDate = {
        date: date,
        overallPercent: percent,
        allScores: allScores
      };

      if (catId > -1 && catId < 6) {
        scoresBook1.push(newDate);
      } else if (catId > 5 && catId < 11) {
        scoresBook2.push(newDate);
      } else {
        scoresBook3.push(newDate);
      }
    } else {
      for (let i = 0; i < scoresBook.length; i++) {
        let dat = scoresBook[i].date;
        let isDateDiff = strcmp(dat, date);
        if (isDateDiff == 0) {
          allScores = scoresBook[i].allScores;
          scoresBB = {
            catName: scores[0].cat,
            percent: percent,
            wqArray: scores[0].wqArray
          };
          for (let j = 0; j < allScores.length; j++) {
            if (allScores[j].cat === catId) {
              allScores[j].scores.push(scoresBB);

              for (let t = 0; t < allScores[j].scores.length; t++) {
                let per = allScores[j].scores[t].percent;
                sum += per;
                wQRepeated.push(allScores[j].scores[t].wqArray);
              }
              let len = allScores[j].scores.length;
              catPercent = Math.round(sum / len);

              allScores[j].catPercent = catPercent;

              let newWQRepeated = wQRepeated.shift().filter(function(v) {
                return wQRepeated.every(function(a) {
                  return a.indexOf(v) !== -1;
                });
              });

              allScores[j].wQRepeated = newWQRepeated;

              ind2 = 1;
              ind1 = 1;
              break;
            }
          }

          if (ind2 == 0) {
            scoresB.push({
              catName: scores[0].cat,
              percent: percent,
              wqArray: scores[0].wqArray
            });
            allScores.push({
              cat: catId,
              catPercent: percent,
              wQRepeated: wQRepeated,
              scores: scoresB
            });
            ind1 = 1;
          }

          sum = 0;

          for (let i = 0; i < allScores.length; i++) {
            sum += allScores[i].catPercent;
          }
          let len = allScores.length;
          overallPercent = Math.round(sum / len);

          if (catId > -1 && catId < 6) {
            scoresBook1[i].overallPercent = overallPercent;
            scoresBook1[i].allScores == allScores;
          } else if (catId > 5 && catId < 11) {
            scoresBook2[i].overallPercent = overallPercent;
            scoresBook2[i].allScores == allScores;
          } else {
            scoresBook3[i].overallPercent = overallPercent;
            scoresBook3[i].allScores == allScores;
          }
        }
      }
      if (ind1 == 0) {
        scoresB = [];
        scoresB.push({
          catName: scores[0].cat,
          percent: percent,
          wqArray: scores[0].wqArray
        });
        allScores.push({
          cat: catId,
          catPercent: percent,
          wQRepeated: wQRepeated,
          scores: scoresB
        });

        for (let i = 0; i < allScores.length; i++) {
          sum += allScores[i].catPercent;
        }

        overallPercent = Math.round(sum / allScores.length);

        let newDate = {
          date: date,
          overallPercent: overallPercent,
          allScores: allScores
        };

        if (catId > -1 && catId < 6) {
          scoresBook1.push(newDate);
        } else if (catId > 5 && catId < 11) {
          scoresBook2.push(newDate);
        } else {
          scoresBook3.push(newDate);
        }
      }
    }
  }

  localStorage.setItem('scores', JSON.stringify(scoresTest60));
  localStorage.setItem('scoresBook1', JSON.stringify(scoresBook1));
  localStorage.setItem('scoresBook2', JSON.stringify(scoresBook2));
  localStorage.setItem('scoresBook3', JSON.stringify(scoresBook3));
}

function generateAllScores() {
  contentTitle.innerHTML = '';
  contentMain.innerHTML = '';
  contentMain.className = 'contentMain allScores';
  isElemVisable(btnBack, true);

  let testNames = ['TEST 60', 'BOOK1', 'BOOK2', 'BOOK 3'];
  for (let i = 0; i < testNames.length; i++) {
    let div = document.createElement('div');
    div.className = 'btn allScoresBtn';
    div.dataset.id = i.toString();
    let divText = document.createTextNode(testNames[i]);
    let divP = document.createElement('p');
    divP.appendChild(divText);
    div.appendChild(divP);
    contentMain.appendChild(div);
  }
  let titleText = document.createTextNode('ALL SCORES');
  contentTitle.appendChild(titleText);
  contentTitle.classList.add('titleText');
  TweenMax.from('.allScoresBtn', 1, { scale: 0, ease: Expo.easeOut });
  TweenMax.from('.allScoresBtn p', 1.2, { opacity: 0, delay: 1 });
  let func;
  let contentMainBtns = document.querySelector('.contentMain');
  contentMainBtns.addEventListener(
    'click',
    (func = function() {
      let testType = getCategoryBtnId(event);
      if (testType != undefined && !Number.isNaN(testType)) {
        generateScores(testType);
        contentMainBtns.removeEventListener('click', func);
      }
    })
  );
}

function generateScores(testType) {
  contentTitle.innerHTML = '';
  contentMain.innerHTML = '';
  contentMain.className = 'contentMain';
  clearInterval(x);
  isElemVisable(timer, false);
  isElemVisable(btnSubmit, false);
  let allTestScores = [];
  if (testType == 0) {
    isElemVisable(btnBack, true);
    allTestScores = JSON.parse(localStorage.getItem('scores')) || [];
    let title = document.createElement('p');
    //title.id = "test_type";
    title.innerHTML = 'TEST 60';
    contentTitle.appendChild(title);

    for (let i = 0; i < allTestScores.length; i++) {
      generateScoresT60(allTestScores[i], i);
    }
    let buttons = document.getElementsByClassName('see_more');
    let buttonsCount = buttons.length;
    for (let i = 0; i < buttonsCount; i++) {
      buttons[i].onclick = function() {
        contentMain.style.overflowY = 'scroll';
        generateScoresT60More(allTestScores[this.value].allScores);
      };
    }
  } else {
    isElemVisable(btnBack, true);
    let title = document.createElement('p');
    //title.id = "test_type";
    switch (testType) {
      case 1:
        allTestScores = JSON.parse(localStorage.getItem('scoresBook1')) || [];
        title.innerHTML = 'BOOK 1';
        break;
      case 2:
        allTestScores = JSON.parse(localStorage.getItem('scoresBook2')) || [];
        title.innerHTML = 'BOOK 2';
        break;
      case 3:
        allTestScores = JSON.parse(localStorage.getItem('scoresBook3')) || [];
        title.innerHTML = 'BOOK 3';
        break;
    }

    contentTitle.appendChild(title);

    for (let i = 0; i < allTestScores.length; i++) {
      generateScoresT60(allTestScores[i], i);
    }
    let buttons = document.getElementsByClassName('see_more');
    let buttonsCount = buttons.length;
    for (let i = 0; i < buttonsCount; i++) {
      buttons[i].onclick = function() {
        generateScoresB1More(allTestScores[this.value].allScores, i);
      };
    }
  }
}

function generateScoresT60(score, val) {
  let item = document.createElement('div');
  item.classList.add('w100');

  let det = document.createElement('details');
  let sum = document.createElement('summary');

  let date = document.createElement('div');
  date.classList.add('date');
  date.innerHTML = score.date;

  let percent_div = document.createElement('div');
  percent_div.classList.add('percent_div');
  percent_div.style.width = 40 + '%';

  let percent = document.createElement('div');
  percent.classList.add('percent');
  let p = score.overallPercent + '%';
  if (score.overallPercent != 0) {
    if (score.overallPercent < 80) {
      percent.style.background = 'red';
    }
    if (score.overallPercent > 79 && score.overallPercent < 91) {
      percent.style.background = 'orange';
    }
    if (score.overallPercent > 89 && score.overallPercent < 95) {
      percent.style.background = 'green';
    }
    if (score.overallPercent > 94 && score.overallPercent <= 100) {
      percent.style.background = 'purple';
    }
  }
  percent.innerHTML = p;
  percent.style.width = p;
  percent_div.appendChild(percent);

  let btn = document.createElement('button');
  btn.classList.add('see_more');
  btn.setAttribute('id', 'see_more_btn');
  let b = '=>';
  btn.innerHTML = b;
  btn.setAttribute('value', val);

  sum.appendChild(date);
  sum.appendChild(percent_div);
  sum.appendChild(btn);

  det.appendChild(sum);
  item.appendChild(det);
  contentMain.appendChild(item);
}

function generateScoresT60More(allScores) {
  contentMain.innerHTML = '';
  btnBack.classList.remove('hide');
  for (let i = 0; i < allScores.length; i++) {
    let item = document.createElement('div');
    item.classList.add('w100');

    let det = document.createElement('details');
    let sum = document.createElement('summary');

    let percent_div = document.createElement('div');
    percent_div.classList.add('percent_div');
    percent_div.style.width = '30%';

    let percent = document.createElement('div');
    percent.classList.add('percent');
    let p = allScores[i].percent;
    if (p != 0) {
      if (p < 80) {
        percent.style.background = 'red';
      }
      if (p > 79 && p < 91) {
        percent.style.background = 'orange';
      }
      if (p > 89 && p < 95) {
        percent.style.background = 'green';
      }
      if (p > 94 && p <= 100) {
        percent.style.background = 'purple';
      }
    }
    percent.innerHTML = p + '%';
    percent.style.width = p + '%';
    percent_div.appendChild(percent);

    let wQMost = document.createElement('div');
    wQMost.style.width = '70%';
    wQMost.style.paddingLeft = '10px';
    wQMost.innerHTML =
      allScores[i].scores[allScores[i].wQMost].cat +
      ': ' +
      allScores[i].scores[allScores[i].wQMost].wqArray.length;

    sum.appendChild(percent_div);
    sum.appendChild(wQMost);

    let ul = document.createElement('ul');

    for (let j = 0; j < allScores[i].scores.length; j++) {
      let li = document.createElement('li');
      let liDiv = document.createElement('div');
      liDiv.classList.add('small_txt');
      liDiv.innerHTML =
        allScores[i].scores[j].cat +
        ': ' +
        allScores[i].scores[j].wqArray.toString();
      li.appendChild(liDiv);
      ul.appendChild(li);
    }

    det.appendChild(sum);
    det.appendChild(ul);
    item.appendChild(det);
    contentMain.appendChild(item);
  }
}

function generateScoresB1More(allScores, val) {
  contentMain.innerHTML = '';
  btnBack.classList.remove('hide');
  for (let i = 0; i < allScores.length; i++) {
    let item = document.createElement('div');
    item.classList.add('w100');

    let det = document.createElement('details');
    let sum = document.createElement('summary');

    let percent_div = document.createElement('div');
    percent_div.classList.add('percent_div');
    percent_div.style.width = '10%';

    let percent = document.createElement('div');
    percent.classList.add('percent');
    let p = allScores[i].catPercent;
    if (p != 0) {
      if (p < 80) {
        percent.style.background = 'red';
      }
      if (p > 79 && p < 91) {
        percent.style.background = 'orange';
      }
      if (p > 89 && p < 95) {
        percent.style.background = 'green';
      }
      if (p > 94 && p <= 100) {
        percent.style.background = 'purple';
      }
    }
    percent.innerHTML = p + '%';
    percent.style.width = p + '%';
    percent_div.appendChild(percent);

    let wQRepeated = document.createElement('div');
    wQRepeated.style.width = '35%';
    wQRepeated.style.paddingLeft = '10px';
    let repeated;
    if (allScores[i].wQRepeated.length < 1) {
      repeated = 'No repeated :)';
    } else {
      repeated = '[' + allScores[i].wQRepeated.toString() + ']';
    }
    wQRepeated.innerHTML = repeated;

    let catName = document.createElement('div');
    catName.style.width = '50%';
    catName.style.paddingLeft = '10px';
    catName.innerHTML = getCatName(allScores[i].cat);

    let ul = document.createElement('ul');
    for (let j = 0; j < allScores[i].scores.length; j++) {
      let li = document.createElement('li');
      let liDiv = document.createElement('div');
      liDiv.classList.add('small_txt_2');
      let scoresDiv = document.createElement('div');
      let percentDiv = document.createElement('div');
      percentDiv.classList.add('testStyle');
      let percent = document.createElement('div');
      percent.classList.add('percent');
      let p = allScores[i].scores[j].percent;
      if (p != 0) {
        if (p < 80) {
          percent.style.background = 'red';
        }
        if (p > 79 && p < 91) {
          percent.style.background = 'orange';
        }
        if (p > 89 && p < 95) {
          percent.style.background = 'green';
        }
        if (p > 94 && p <= 100) {
          percent.style.background = 'purple';
        }
      }
      percent.innerHTML = p + '%';
      percent.style.width = p + '%';
      percentDiv.appendChild(percent);
      percentDiv.style.width = '30%';
      scoresDiv.style.width = '60%';
      scoresDiv.innerHTML = allScores[i].scores[j].wqArray.toString();

      liDiv.appendChild(percentDiv);
      liDiv.appendChild(scoresDiv);
      li.appendChild(liDiv);
      ul.appendChild(li);
    }

    sum.appendChild(percent_div);
    sum.appendChild(catName);
    sum.appendChild(wQRepeated);

    det.appendChild(sum);
    det.appendChild(ul);
    item.appendChild(det);
    contentMain.appendChild(item);
    /*
		let buttons = document.getElementsByClassName("see_more");
		let buttonsCount = buttons.length;
		for(let i=0;i<buttonsCount;i++) {
			buttons[i].onclick = function(){
				generateScoresB1Moar(allScores[this.value].scores);
			};
		}*/
  }
}

/*UTILITY FUNCTIONS*/

function showQuiz() {
  contentTitle.className = 'contentTitle';
  contentTitle.innerHTML = '';
  contentMain.className = 'contentMain answers';
  contentMain.innerHTML = '';
}

function strcmp(a, b) {
  if (a.toString() < b.toString()) return -1;
  if (a.toString() > b.toString()) return 1;
  return 0;
}

function getCatName(catId) {
  let catName;
  switch (catId) {
    case 0:
      catName = 'Celije';
      break;
    case 1:
      catName = 'Virusi i bakterije';
      break;
    case 2:
      catName = 'Ekologija zavrsni test';
      break;
    case 3:
      catName = 'Zavrsni test citologija';
      break;
    case 4:
      catName = 'Citologija zavrsni test';
      break;
    case 5:
      catName = 'Biljna tkiva i organi';
      break;
    case 6:
      catName = 'Beskicmenjaci';
      break;
    case 7:
      catName = 'Kicmenjaci';
      break;
    case 8:
      catName = 'Protozoe, sundjeri, zarnjaci';
      break;
    case 9:
      catName = 'Tkiva test za prijemni';
      break;
    case 10:
      catName = 'Biljni organi i razn. zivog sveta';
      break;
    case 11:
      catName = 'Mehanizmi nasledjivanja';
      break;
    case 12:
      catName = 'Molekularna bilogija';
      break;
  }

  return catName;
}

function getQuestionCatId(catId) {
  let catName;
  switch (catId) {
    case 0:
      catName = 'cel';
      break;
    case 1:
      catName = 'vib';
      break;
    case 2:
      catName = 'ezt';
      break;
    case 3:
      catName = 'ztc';
      break;
    case 4:
      catName = 'czt';
      break;
    case 5:
      catName = 'bto';
      break;
    case 6:
      catName = 'bkm';
      break;
    case 7:
      catName = 'kcm';
      break;
    case 8:
      catName = 'psz';
      break;
    case 9:
      catName = 'ttp';
      break;
    case 10:
      catName = 'bor';
      break;
    case 11:
      catName = 'mnt';
      break;
    case 12:
      catName = 'mbt';
      break;
  }

  return catName;
}

function isElemVisable(elem, choice) {
  if (choice == true) {
    elem.classList.remove('hide');
  } else if (choice == false) {
    elem.classList.add('hide');
  }
}

function pickCategory(catId) {
  //score = 0;
  questions = [];

  if (catId == -1) {
    questionData.map(kat => {
      kat.items.map(item => {
        questions.push(item);
      });
    });
  } else {
    questions = questionData[catId].items;
  }
  questions = shuffle(questions);
}
function pickCategoryAllQuestions(catId) {
  //score = 0;
  questions = [];

  if (catId == -1) {
    questionData.map(kat => {
      kat.items.map(item => {
        questions.push(item);
      });
    });
  } else {
    questions = questionData[catId].items;
  }
}

function wrQuestionArrayAdd(question) {
  switch (question.questionID.substr(0, 3)) {
    case 'cel':
      ctg1.push(
        parseInt(question.questionID.substr(3, question.questionID.length - 1))
      );
      break;
    case 'vib':
      ctg2.push(
        parseInt(question.questionID.substr(3, question.questionID.length - 1))
      );
      break;
    case 'ezt':
      ctg3.push(
        parseInt(question.questionID.substr(3, question.questionID.length - 1))
      );
      break;
    case 'ztc':
      ctg4.push(
        parseInt(question.questionID.substr(3, question.questionID.length - 1))
      );
      break;
    case 'czt':
      ctg5.push(
        parseInt(question.questionID.substr(3, question.questionID.length - 1))
      );
      break;
    case 'bto':
      ctg6.push(
        parseInt(question.questionID.substr(3, question.questionID.length - 1))
      );
      break;
    case 'bkm':
      ctg7.push(
        parseInt(question.questionID.substr(3, question.questionID.length - 1))
      );
      break;
    case 'kcm':
      ctg8.push(
        parseInt(question.questionID.substr(3, question.questionID.length - 1))
      );
      break;
    case 'psz':
      ctg9.push(
        parseInt(question.questionID.substr(3, question.questionID.length - 1))
      );
      break;
    case 'ttp':
      ctg10.push(
        parseInt(question.questionID.substr(3, question.questionID.length - 1))
      );
      break;
    case 'bor':
      ctg11.push(
        parseInt(question.questionID.substr(3, question.questionID.length - 1))
      );
      break;
    case 'mnt':
      ctg12.push(
        parseInt(question.questionID.substr(3, question.questionID.length - 1))
      );
      break;
    case 'mbt':
      ctg13.push(
        parseInt(question.questionID.substr(3, question.questionID.length - 1))
      );
      break;
  }
}

function resetWrQuestionArrayAdd() {
  ctg1 = [];
  ctg2 = [];
  ctg3 = [];
  ctg4 = [];
  ctg5 = [];
  ctg6 = [];
  ctg7 = [];
  ctg8 = [];
  ctg9 = [];
  ctg10 = [];
  ctg11 = [];
  ctg12 = [];
  ctg13 = [];
}

function addAllArrays() {
  allArrayWrong.push({
    cat: 'Celije',
    wqArray: ctg1
  });
  allArrayWrong.push({
    cat: 'Virusi i bakterije',
    wqArray: ctg2
  });
  allArrayWrong.push({
    cat: 'Ekologija zavrsni test',
    wqArray: ctg3
  });
  allArrayWrong.push({
    cat: 'Zavrsni test citologija',
    wqArray: ctg4
  });
  allArrayWrong.push({
    cat: 'Citologija zavrsni test',
    wqArray: ctg5
  });
  allArrayWrong.push({
    cat: 'Biljna ktiva i organi',
    wqArray: ctg6
  });
  allArrayWrong.push({
    cat: 'Beskicmenjaci',
    wqArray: ctg7
  });
  allArrayWrong.push({
    cat: 'Kicmenjaci',
    wqArray: ctg8
  });
  allArrayWrong.push({
    cat: 'Protozoe, sundjeri, zarnjaci',
    wqArray: ctg9
  });
  allArrayWrong.push({
    cat: 'Tkiva test za prijemni',
    wqArray: ctg10
  });
  allArrayWrong.push({
    cat: 'Biljni organi i raznovrsnost zivog sveta',
    wqArray: ctg11
  });
  allArrayWrong.push({
    cat: 'Mehanizmi nasledjivanja test',
    wqArray: ctg12
  });
  allArrayWrong.push({
    cat: 'Molekularna bilogija test',
    wqArray: ctg13
  });
}

function setTimer(minutes) {
  isElemVisable(timer, true);
  let nau = new Date().getTime();
  let countDownDate = nau + minutes * 60000 + 1000;
  let nowST = new Date().getTime();
  x = setInterval(function() {
    // Get todays date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    timeHours.innerHTML = hrs;
    timeMins.innerHTML = mins;
    timeSecs.innerHTML = secs;

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      isElemVisable(timer, false);
      isElemVisable(btnSubmit, false);
      contentTitle.innerHTML = '';
      contentMain.innerHTML = '';
      currentQuestion = questions.length;
      btnNext.click();
    }
  }, 1000);
}

function getCategoryBtnId(event) {
  if (event.target.dataset.id != undefined) {
    let catBtnId = parseInt(event.target.dataset.id, 10);
    return catBtnId;
  } else if (event.target.parentNode.dataset.id != undefined) {
    let catBtnId = parseInt(event.target.parentNode.dataset.id, 10);
    return catBtnId;
  }
}

function generateQuestionIdsArrayToLS(questions) {
  let allQuestionIdsArray =
    JSON.parse(localStorage.getItem('validQuestions')) || [];

  if (allQuestionIdsArray.length == 0) {
    for (let i = 0; i < questions.length; i++) {
      allQuestionIdsArray.push(i + 1);
    }
    allQuestionIdsArray = shuffle(allQuestionIdsArray);
    localStorage.setItem('validQuestions', JSON.stringify(allQuestionIdsArray));
  }
}

function resetValidQuestions(questions) {
  let allQuestionIdsArray = [];

  for (let i = 0; i < questions.length; i++) {
    allQuestionIdsArray.push(i + 1);
  }

  allQuestionIdsArray = shuffle(allQuestionIdsArray);
  localStorage.setItem('validQuestions', JSON.stringify(allQuestionIdsArray));
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getCurrentDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = dd + '/' + mm + '/' + yyyy;

  return today;
}
