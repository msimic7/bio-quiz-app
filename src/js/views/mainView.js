import { DOM } from './base';

export const renderPage = () => {
  const markup = `
    <div class="btn btnHome" data-name="test60"><p>TEST 60</p></div>
    <div class="btn btnHome" data-name="cat"><p>CATEGORIES</p></div>
    <div class="btn btnHome" data-name="allSc"><p>ALL SCORES</p></div>
    <div class="btnHomeTODO" data-name="allQw"><p></p></div>
    `;
  DOM.leftSideContent().insertAdjacentHTML('beforeend', markup);
  animateContentIn();
};

const animateContentIn = () => {
  const tl = new TimelineMax();
  tl.add(TweenMax.to(DOM.homeBtns(), 0.8, { opacity: 1, width: '95%' }));
  tl.add(
    TweenMax.from(DOM.content(), 1, {
      opacity: 0,
      height: 0,
      width: 0,
      ease: Expo.easeOut
    })
  );
  tl.add(
    TweenMax.to(DOM.homeBtns(), 0.7, {
      boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.75)'
    }),
    '-=0.5'
  );
  tl.add(TweenMax.to(DOM.homeBtnsPs(), 0.7, { opacity: 1 }), '-=0.3');
};

export const animateContentOut = button => {
  let tl11 = new TimelineMax();
  let tl1 = new TimelineMax();

  tl11.pause();
  tl11.add(TweenMax.to(button, 0.4, { xPercent: 115, opacity: 0 }));
  tl11.add(TweenMax.to(DOM.homeBtns(), 0.4, { opacity: 0 }), '-=0.3');
  tl11.add(
    TweenMax.to(button, 0.4, {
      xPercent: 0,
      opacity: 0
    })
  );
  tl11.add(TweenMax.to(DOM.homeBtnsPs(), 0.7, { opacity: 0 }), '-=0.3');
  tl11.addCallback(function() {
    DOM.homeBtns().forEach(el => {
      el.classList.add('hide');
    });
  }, 0.9);
  tl1 = tl11;
  tl1.pause(0);
  tl1.play();
};
