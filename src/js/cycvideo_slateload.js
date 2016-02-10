// Filename: cycvideo_slateload.js  
// Timestamp: 2016.02.09-14:58:22 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import Rx from 'rx-dom';
import {div} from '@cycle/dom';


function view(state$, progress) {
  return state$.map(
    vals =>
      div('.cycvideo_slateload', [

        // use whole number
        // Math.floor(per * 100)
        div('.pgloadcircle', [
          div('.radial-progress#ProgressElem', {attributes: { "data-progress" : progress }}, [
            div('.circle', [
              div('.mask.full', [
                div('.fill')
              ]),
              div('.mask.half', [
                div('.fill')
              ]),
              div('.shadow')
            ]),
            div('.inset', [
              div('.percentage', [
                div('.label', progress + '%')
              ])
            ])
          ])
        ])
        

      ]));
}

function streams(DOM, opts) {
  return {
    click : DOM.select('.cycvideo_slateload').events('click')
  };
}

export default {
  view : view,
  streams : streams
};
