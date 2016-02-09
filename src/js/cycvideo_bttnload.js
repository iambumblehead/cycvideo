// Filename: cycvideo_bttnpause.js  
// Timestamp: 2016.02.08-17:27:32 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>
//
// not really a button.

import {label, span} from '@cycle/dom';
import Rx from 'rx-dom';

function view(state$) {
  return state$.map(
    vals =>
      label('.cycvideo_bttnload', [
        span('.cycvideo_bttnload-primary')
      ]));
}

function streams(DOM, opts) {
  return {
    click : DOM.select('.cycvideo_bttnload').events('click')
  };
}

export default {
  view : view,
  streams : streams
};
