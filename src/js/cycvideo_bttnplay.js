// Filename: cycvideo_bttnplay.js  
// Timestamp: 2016.02.03-15:47:21 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import {label, span, button, makeDOMDriver} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      label('.cycvideo_bttnplay', {for : 'uidplay'}, [
        span('.cycvideo_bttnplay-primary'),
        button('.cycvideo_bttnplay-button #uidplay', {
          type : "button"
        })
      ]));
}

export default {
  view : view
};
