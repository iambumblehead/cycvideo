// Filename: cycvideo_bttnpause.js  
// Timestamp: 2016.02.08-17:28:05 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import {label, span} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      label('.cycvideo_bttnpause', [
        span('.cycvideo_bttnpause-primary')
      ]));
}

function streams(DOM, opts) {
  return {
    click : DOM.select('.cycvideo_bttnpause').events('click')
  };
}

export default {
  view : view,
  streams : streams
};
