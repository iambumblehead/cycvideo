// Filename: cycvideo_bttnplay.js  
// Timestamp: 2016.02.05-11:43:38 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import {label, span } from '@cycle/dom';

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
