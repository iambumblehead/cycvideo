// Filename: cycvideo_bttngear.js  
// Timestamp: 2016.02.09-16:16:11 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import {label, span} from '@cycle/dom';
import Rx from 'rx-dom';

function view(state$) {
  return state$.map(
    vals =>
      label('.cycvideo_bttngear', [
        span('.cycvideo_bttngear-primary')
      ]));
}

function streams(DOM, opts) {
  return {
    click : DOM.select('.cycvideo_bttngear').events('click')
  };
}

export default {
  view : view,
  streams : streams
};
