import data from '../../../Questions.json';

export default class Questions {
  constructor() {
    this.allQuestions = [];
    data.forEach(cat => {
      cat.items.forEach(question => {
        this.allQuestions.push(question);
      });
    });
  }

  getData() {
    return data;
  }

  getAllData() {
    return this.allQuestions;
  }

  getCategory(id) {
    return data[id];
  }

  getRandomizedCategoryQuestions(id) {
    let ids = this.arrayShuffle([...Array(data[id].items.length).keys()]);
    let randomQuestions = [];
    ids.forEach(qId => {
      randomQuestions.push(data[id].items[qId]);
    });
    return randomQuestions;
  }

  getRandom60() {
    let ids = this.arrayShuffle([...Array(this.allQuestions.length).keys()]);
    ids = ids.slice(0, 10);
    let randomQuestions = [];
    ids.forEach(qId => {
      randomQuestions.push(this.allQuestions[qId]);
    });
    return randomQuestions;
  }

  getRandomAllQuestionNums() {
    if (JSON.parse(localStorage.getItem('randomAllQuestionNums')).length === 0)
      return this.arrayShuffle([...Array(this.allQuestions.length).keys()]);
    else return JSON.parse(localStorage.getItem('randomAllQuestionNums'));
  }

  saveRandomAllQuestionNums(array) {
    localStorage.setItem('randomAllQuestionNums', JSON.stringify(array));
  }

  resetRandomAllQuestionNums() {
    let array = [];
    localStorage.setItem('randomAllQuestionNums', JSON.stringify(array));
  }

  arrayShuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

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
}
