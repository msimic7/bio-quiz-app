export default class Score {
  constructor(qCateg, wrongQuestions) {
    const today = new Date();
    const dd = today.getDate();

    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }

    this.date = `${mm}/${dd}/${yyyy}`;

    switch (qCateg) {
      case -1:
        this.type = 't60';
        break;
      case 0:
        this.type = 'book1';
        this.cat = 'cel';
        break;
      case 1:
        this.type = 'book1';
        this.cat = 'vib';
        break;
      case 2:
        this.type = 'book1';
        this.cat = 'ezt';
        break;
      case 3:
        this.type = 'book1';
        this.cat = 'ztc';
        break;
      case 4:
        this.type = 'book1';
        this.cat = 'czt';
        break;
      case 5:
        this.type = 'book1';
        this.cat = 'bto';
        break;
      case 6:
        this.type = 'book2';
        this.cat = 'bkm';
        break;
      case 7:
        this.type = 'book2';
        this.cat = 'kcm';
        break;
      case 8:
        this.type = 'book2';
        this.cat = 'psz';
        break;
      case 9:
        this.type = 'book2';
        this.cat = 'ttp';
        break;
      case 10:
        this.type = 'book2';
        this.cat = 'bor';
        break;
      case 11:
        this.type = 'book3';
        this.cat = 'mnt';
        break;
      case 12:
        this.type = 'book3';
        this.cat = 'mbt';
        break;
    }
    this.wrongQuestions = wrongQuestions;
  }

  saveScore() {
    if (this.type === 't60') {
      const scores = JSON.parse(localStorage.getItem('scores')) || {};
      if (!scores || (scores && !scores.test60)) {
        scores.test60 = [];
        scores.test60.push({
          date: this.date,
          wrongQuestions: [this.wrongQuestions]
        });
      } else if (scores && scores.test60) {
        const res = scores.test60.find(obj => {
          return obj.date === this.date;
        });
        if (!res) {
          scores.test60.push({
            date: this.date,
            wrongQuestions: [this.wrongQuestions]
          });
        } else res.wrongQuestions.push(this.wrongQuestions);
      }
      localStorage.setItem('scores', JSON.stringify(scores));
    } else if (this.type === 'book1') {
      const scores = JSON.parse(localStorage.getItem('scores')) || {};
      if (!scores || (scores && !scores.book1)) {
        scores.book1 = [];
        scores.book1.push({
          date: this.date,
          wrongQuestions: {
            cel: {
              catName: 'Celije',
              questions: []
            },
            vib: {
              catName: 'Virusi i bakterije',
              questions: []
            },
            ezt: {
              catName: 'Ekologija zavrsni test',
              questions: []
            },
            ztc: {
              catName: 'Zavrsni test citologija',
              questions: []
            },
            czt: {
              catName: 'Citologija zavrsni test',
              questions: []
            },
            bto: {
              catName: 'Biljna tkiva i organi',
              questions: []
            }
          }
        });
        scores.book1[0].wrongQuestions[this.cat].questions.push(
          this.wrongQuestions[0].questions
        );
      } else if (scores && scores.book1) {
        const res = scores.book1.find(obj => {
          return obj.date === this.date;
        });
        if (!res) {
          const wrQuestions = {
            cel: {
              catName: 'Celije',
              questions: []
            },
            vib: {
              catName: 'Virusi i bakterije',
              questions: []
            },
            ezt: {
              catName: 'Ekologija zavrsni test',
              questions: []
            },
            ztc: {
              catName: 'Zavrsni test citologija',
              questions: []
            },
            czt: {
              catName: 'Citologija zavrsni test',
              questions: []
            },
            bto: {
              catName: 'Biljna tkiva i organi',
              questions: []
            }
          };
          wrQuestions[this.cat].questions.push(
            this.wrongQuestions[0].questions
          );
          scores.book1.push({
            date: this.date,
            wrongQuestions: wrQuestions
          });
        } else
          res.wrongQuestions[this.cat].questions.push(
            this.wrongQuestions[0].questions
          );
      }
      localStorage.setItem('scores', JSON.stringify(scores));
    } else if (this.type === 'book2') {
      const scores = JSON.parse(localStorage.getItem('scores')) || {};
      if (!scores || (scores && !scores.book2)) {
        scores.book2 = [];

        scores.book2.push({
          date: this.date,
          wrongQuestions: {
            bkm: {
              catName: 'Beskicmenjaci',
              questions: []
            },
            kcm: {
              catName: 'Kicmenjaci',
              questions: []
            },
            psz: {
              catName: 'Protozoe, sudnjeri, zarnjaci',
              questions: []
            },
            ttp: {
              catName: 'Tkiva test za prijemni',
              questions: []
            },
            bor: {
              catName: 'Biljni organi i razn. zivog sveta',
              questions: []
            }
          }
        });
        scores.book2[0].wrongQuestions[this.cat].questions.push(
          this.wrongQuestions[0].questions
        );
      } else if (scores && scores.book2) {
        const res = scores.book2.find(obj => {
          return obj.date === this.date;
        });
        if (!res) {
          const wrQuestions = {
            bkm: {
              catName: 'Beskicmenjaci',
              questions: []
            },
            kcm: {
              catName: 'Kicmenjaci',
              questions: []
            },
            psz: {
              catName: 'Protozoe, sudnjeri, zarnjaci',
              questions: []
            },
            ttp: {
              catName: 'Tkiva test za prijemni',
              questions: []
            },
            bor: {
              catName: 'Biljni organi i razn. zivog sveta',
              questions: []
            }
          };
          wrQuestions[this.cat].questions.push(
            this.wrongQuestions[0].questions
          );
          scores.book2.push({
            date: this.date,
            wrongQuestions: wrQuestions
          });
        } else
          res.wrongQuestions[this.cat].questions.push(
            this.wrongQuestions[0].questions
          );
      }
      localStorage.setItem('scores', JSON.stringify(scores));
    } else if (this.type === 'book3') {
      const scores = JSON.parse(localStorage.getItem('scores')) || {};
      if (!scores || (scores && !scores.book3)) {
        scores.book3 = [];

        scores.book3.push({
          date: this.date,
          wrongQuestions: {
            mnt: {
              catName: 'Mehanizmi nasl. test',
              questions: []
            },
            mbt: {
              catName: 'Molekularna biologija test',
              questions: []
            }
          }
        });
        scores.book3[0].wrongQuestions[this.cat].questions.push(
          this.wrongQuestions[0].questions
        );
      } else if (scores && scores.book3) {
        const res = scores.book3.find(obj => {
          return obj.date === this.date;
        });
        if (!res) {
          const wrQuestions = {
            mnt: {
              catName: 'Mehanizmi nasl. test',
              questions: []
            },
            mbt: {
              catName: 'Molekularna biologija test',
              questions: []
            }
          };
          wrQuestions[this.cat].questions.push(
            this.wrongQuestions[0].questions
          );
          scores.book3.push({
            date: this.date,
            wrongQuestions: wrQuestions
          });
        } else
          res.wrongQuestions[this.cat].questions.push(
            this.wrongQuestions[0].questions
          );
      }
      localStorage.setItem('scores', JSON.stringify(scores));
    }
  }
}
