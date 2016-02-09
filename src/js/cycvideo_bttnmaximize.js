// Filename: cycvideo_bttnmaximize.js  
// Timestamp: 2016.02.09-03:08:45 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import {label, span} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      label('.cycvideo_bttnmaximize', [
        span('.cycvideo_bttnmaximize_tl'),
        span('.cycvideo_bttnmaximize_tr'),
        span('.cycvideo_bttnmaximize_br'),
        span('.cycvideo_bttnmaximize_bl')
      ]));
}

function streams(DOM, opts) {
  return {
    click : DOM.select('.cycvideo_bttnmaximize').events('click')
  };
}

export default {
  view : view,
  streams : streams
};
