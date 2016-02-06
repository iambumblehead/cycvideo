// Filename: cycvideo_dropvrmode.js  
// Timestamp: 2016.02.05-16:16:34 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import {label, span, select, option} from '@cycle/dom';

function view(state$, vrmode) {
  var list = [{
    label : 'flat',
    id    : 'flat'
  },{
    label : 'panorama',
    id    : 'panorama'
  },{
    label : 'cube',
    id    : 'cube'
  }];
  
  return state$.map(
    vals =>
      label('.cycvideo_dropvrmode#uidcycvideo_dropvrmode', [
        span('.cycvideo_dropvrmode_label_primary'),
        select('.cycvideo_dropvrmode_select#uidcycvideo_dropvrmode', {
          name : "vrmode"
        }, list.map(
          data =>
            option({
              value : data.label,
              selected : data.label === vrmode ? 'selected' : ''
            }, data.label)))
      ])
  );
}

export default {
  view : view
};
