// Filename: cycvideo_bttntheater.js  
// Timestamp: 2016.02.09-16:10:52 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import {div} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      div('.cycvideo_bttntheater', [
        div('.cycvideo_bttntheater_tl'),
        div('.cycvideo_bttntheater_tr'),
        div('.cycvideo_bttntheater_br'),
        div('.cycvideo_bttntheater_bl')
      ]));
}

function streams(DOM, opts) {
  return {
    click : DOM.select('.cycvideo_bttntheater').events('click')
  };
}

export default {
  view : view,
  streams : streams  
};

