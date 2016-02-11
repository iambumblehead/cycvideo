// Filename: index.js  
// Timestamp: 2016.02.11-02:10:51 (last modified)
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

