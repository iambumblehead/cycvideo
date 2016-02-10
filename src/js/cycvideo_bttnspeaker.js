// Filename: cycvideo_bttntheater.js  
// Timestamp: 2016.02.09-17:38:45 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import {div} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      div('.cycvideo_bttnspeaker', [
        div('.cycvideo_bttnspeaker_icon')
      ]));
}

function streams(DOM, opts) {
  return {
    click : DOM.select('.cycvideo_bttnspeaker').events('click')
  };
}

export default {
  view : view,
  streams : streams  
};

