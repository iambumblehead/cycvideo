// Filename: cycvideo_slategroup.js  
// Timestamp: 2016.02.09-15:39:22 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import Rx from 'rx-dom';
import cycvideo_slatepause from './cycvideo_slatepause';
import cycvideo_slateplay from './cycvideo_slateplay';
import cycvideo_slateload from './cycvideo_slateload';
import {div} from '@cycle/dom';


function view(state$, opts, playstate, progress) {
  return state$.map(
    (vals) => {
      return div('.cycvideo_slategroup.cycvideo_slategroup-'+playstate+'#uidcycvideo_slategroup', [
        cycvideo_slateload.view(state$, progress),
        cycvideo_slateplay.view(state$),        
        cycvideo_slatepause.view(state$)
      ]);
    }
  );
}

function streams(DOM, opts) {
  return Rx.Observable.merge(
    //cycvideo_slateload.streams(DOM, opts).click.map(ev => 'play'),
    cycvideo_slateplay.streams(DOM, opts).click.map(ev => 'play'),    
    cycvideo_slatepause.streams(DOM, opts).click.map(ev => 'pause')
  );
}

export default {
  view : view,
  streams : streams
};
