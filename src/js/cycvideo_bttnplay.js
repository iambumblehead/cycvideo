// Filename: cycvideo_bttnplay.js  
// Timestamp: 2016.02.04-16:54:46 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import {label, span, button, makeDOMDriver} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      label('.cycvideo_bttnplay#uidcycvideo_bttnplay', [
        span('.cycvideo_bttnplay-primary')
      ]));
}

export default {
  view : view
};
