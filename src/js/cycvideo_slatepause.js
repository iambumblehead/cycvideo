// Filename: cycvideo_slatepause.js  
// Timestamp: 2016.02.09-11:05:38 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import Rx from 'rx-dom';
import {div} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      div('.cycvideo_slatepause', [
        
      ]));
}

function streams(DOM, opts) {
  return {
    click : DOM.select('.cycvideo_slatepause').events('click')
  };
}

export default {
  view : view,
  streams : streams
};
