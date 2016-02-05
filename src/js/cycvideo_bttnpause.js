// Filename: cycvideo_bttnpause.js  
// Timestamp: 2016.02.04-16:54:27 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import {label, span, button, makeDOMDriver} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      label('.cycvideo_bttnpause', [
        span('.cycvideo_bttnpause-primary')
      ]));
}

export default {
  view : view
};
