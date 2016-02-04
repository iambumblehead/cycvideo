// Filename: cycvideo_bttnpause.js  
// Timestamp: 2016.02.03-15:54:27 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>
//
// not really a button.

import {label, span, button, makeDOMDriver} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      label('.cycvideo_bttnload', [
        span('.cycvideo_bttnload-primary')
      ]));
}

export default {
  view : view
};
