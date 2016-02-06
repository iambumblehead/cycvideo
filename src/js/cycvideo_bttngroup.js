// Filename: cycvideo_bttngroup.js  
// Timestamp: 2016.02.05-15:20:45 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import cycvideo_bttnplay from './cycvideo_bttnplay';
import cycvideo_bttnpause from './cycvideo_bttnpause';
import cycvideo_bttnload from './cycvideo_bttnload';
import {div} from '@cycle/dom';


// is there a way to make stylesheets work?

function view(state$, playstate) {
  return state$.map(
    (vals) => {
      console.log('playstate: ', playstate);
      
      return div('.cycvideo_bttngroup.cycvideo_bttngroup-'+playstate+'#uidcycvideo_bttnplay', [
        cycvideo_bttnplay.view(state$),
        cycvideo_bttnpause.view(state$),
        cycvideo_bttnload.view(state$)
      ]);
    }
  );
  
}

export default {
  view : view
};