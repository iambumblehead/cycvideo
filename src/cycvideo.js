// Filename: index.js  
// Timestamp: 2016.02.11-13:22:39 (last modified)
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
var cycvideo_mvi = require('./cycvideo_mvi');
var Rx = require('rx-dom');

cyclecore.run(obj => {
  return {DOM: cycvideo_mvi(obj.DOM).skip(1)};
}, {
  DOM: cycledom.makeDOMDriver('#root')
});




