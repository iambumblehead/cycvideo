// Filename: cycvideo_bttnpause.js  
// Timestamp: 2016.02.03-15:47:29 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import {label, span, button, makeDOMDriver} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      label('.cycvideo_bttnpause', {for : 'uidpause'}, [
        span('.cycvideo_bttnpause-primary'),
        button('.cycvideo_bttnpause-button #uidpause', {
          type : "button"
        })
      ]));
}

export default {
  view : view
};
