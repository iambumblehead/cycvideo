// Filename: cycvideo_bttnminimize.js  
// Timestamp: 2016.02.09-03:28:22 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import {label, span} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      label('.cycvideo_bttnminimize', [
        span('.cycvideo_bttnminimize_tl'),
        span('.cycvideo_bttnminimize_tr'),
        span('.cycvideo_bttnminimize_br'),
        span('.cycvideo_bttnminimize_bl')
      ]));
}

function streams(DOM, opts) {
  return {
    click : DOM.select('.cycvideo_bttnminimize').events('click')
  };
}

export default {
  view : view,
  streams : streams
};
