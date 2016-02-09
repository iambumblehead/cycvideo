// Filename: cycvideo_bttngroup.js  
// Timestamp: 2016.02.08-17:30:24 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import Rx from 'rx-dom';
import cycvideo_bttnplay from './cycvideo_bttnplay';
import cycvideo_bttnpause from './cycvideo_bttnpause';
import cycvideo_bttnload from './cycvideo_bttnload';
import {div} from '@cycle/dom';


// is there a way to make stylesheets work?

function view(state$, playstate) {
  return state$.map(
    (vals) => {
      return div('.cycvideo_bttngroup.cycvideo_bttngroup-'+playstate+'#uidcycvideo_bttnplay', [
        cycvideo_bttnplay.view(state$),
        cycvideo_bttnpause.view(state$),
        cycvideo_bttnload.view(state$)
      ]);
    }
  );
}

function streams(DOM, opts) {

  return Rx.Observable.merge(
    cycvideo_bttnplay.streams(DOM, opts).click.map(ev => 'play'),
    cycvideo_bttnpause.streams(DOM, opts).click.map(ev => 'pause'),
    cycvideo_bttnload.streams(DOM, opts).click.map(ev => 'load')
  );

}

export default {
  view : view,
  streams : streams
};
