// Filename: index.js  
// Timestamp: 2016.02.04-00:34:30 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import { run } from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import cycvideo from './cycvideo';

import Rx from 'rx-dom';

/*run(({ DOM }) => ({
  DOM: cycvideo(DOM).skip(1)
}), {
 */
run(function main ({ DOM, DOMVIDEO }) {
  /*
  Rx.Observable.merge(
    DOM.select('.cycvideo_bttnplay').events('click').map(ev => 'play'),
    DOM.select('.cycvideo_bttnpause').events('click').map(ev => 'pause'),
    DOM.select('.cycvideo_bttnload').events('click').map(ev => 'load')      
  ).subscribe(function (s) {
    if (s === 'play') {
      document.getElementsByTagName('video')[0].play();
    } else if (s === 'pause') {
      document.getElementsByTagName('video')[0].pause();
    }
  });
   */
  
  return {
    DOM: cycvideo(DOM, DOMVIDEO).skip(1)
//    DOMVIDEO: cycvideo(DOM).skip(1)    
  };
}, {
  DOM: makeDOMDriver('#root'),
  DOMVIDEO: function (state$) {
    //    function playDriver(playBtnClick$) {
    //      playBtnClick$.subscribe(() => video.play());
    //    }
    return state$.subscribe(function (s) {
      console.log('your driver');
      if (s === 'play') {}
    });
  }
});
