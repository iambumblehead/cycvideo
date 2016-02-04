// Filename: cycvideo_bttnplay.js  
// Timestamp: 2016.02.04-09:42:01 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import {label, span, button, makeDOMDriver} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      label('.cycvideo_bttnplay #uidcycvideo_bttnplay', {for : 'uidplay5'}, [
        span('.cycvideo_bttnplay-primary'),
        // presence of button here results in double click-event
        // at .cycvideo_bttnplay
        button('.cycvideo_bttnplay-button #uidplay', {
          type : "button"
        })
      ]));
}

export default {
  view : view
};
