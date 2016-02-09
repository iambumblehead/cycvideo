// Filename: cycvideo_bttnplay.js  
// Timestamp: 2016.02.08-17:28:43 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import {label, span} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      label('.cycvideo_bttnplay#uidcycvideo_bttnplay', [
        span('.cycvideo_bttnplay-primary')
      ]));
}

function streams(DOM, opts) {
  return {
    click : DOM.select('.cycvideo_bttnplay').events('click')
  };
}

export default {
  view : view,
  streams : streams  
};
