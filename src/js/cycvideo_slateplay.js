// Filename: cycvideo_slateplay.js  
// Timestamp: 2016.02.09-11:08:44 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import Rx from 'rx-dom';
import {div} from '@cycle/dom';


function view(state$) {
  return state$.map(
    vals =>
      div('.cycvideo_slateplay', [
        // use whole number
        // Math.floor(per * 100)
        div('.pgplaycircle', [
          div('.video-layer-load-playiconbg'),
          div('.video-layer-load-playicon')
        ])
      ]));
}

function streams(DOM, opts) {
  return {
    click : DOM.select('.cycvideo_slateplay').events('click')
  };
}

export default {
  view : view,
  streams : streams
};

