// Filename: cycvideo_bttngroup.js  
// Timestamp: 2016.02.09-03:59:38 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import Rx from 'rx-dom';
import cycvideo_bttnmaximize from './cycvideo_bttnmaximize';
import cycvideo_bttnminimize from './cycvideo_bttnminimize';
import {div} from '@cycle/dom';

function view(state$, minmaxstate) {
  return state$.map(
    (vals) => {
      return div('.cycvideo_bttngroupminmax.cycvideo_bttngroupminmax-'+minmaxstate+'#uidcycvideo_bttngroup', [
        cycvideo_bttnmaximize.view(state$),
        cycvideo_bttnminimize.view(state$)
      ]);
    }
  );
}

function streams(DOM, opts) {
  return Rx.Observable.merge(
    cycvideo_bttnmaximize.streams(DOM, opts).click.map(ev => 'maximized'),
    cycvideo_bttnminimize.streams(DOM, opts).click.map(ev => 'minimized')    
  );
}

export default {
  view : view,
  streams : streams
};
