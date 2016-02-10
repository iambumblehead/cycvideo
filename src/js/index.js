// Filename: index.js  
// Timestamp: 2016.02.10-15:38:12 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

//import { run } from '@cycle/core';

//https://github.com/tc39/ecma262
/*
While ES6 provides syntax for import/export, it currently *does nothing*, anywhere, because the loader spec is not finished ( https://github.com/whatwg/loader ). ES6 
                 Modules are not yet a thing; they do not yet exist. !babel simply transpiles import/export to `require`, which is not guaranteed to work once the loader is finished. Use CommonJS 
                 modules for now.
*/



var cyclecore = require('@cycle/core');
var cycledom = require('@cycle/dom');
var cycvideo = require('./cycvideo');
var Rx = require('rx-dom');


//import { makeDOMDriver } from '@cycle/dom';
//import cycvideo from './cycvideo';

//import Rx from 'rx-dom';

/*run(({ DOM }) => ({
  DOM: cycvideo(DOM).skip(1)
}), {
 */


cyclecore.run(function main ({ DOM, DOMVIDEO }) {
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
    DOM: cycledom.makeDOMDriver('#root'),
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

