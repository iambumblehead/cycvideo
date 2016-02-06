// Filename: cycvideo_dropfillmode.js  
// Timestamp: 2016.02.05-16:16:39 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  


import {label, span, select, option} from '@cycle/dom';

function view(state$, fillmode) {
  var list = [{
    label : 'fitted',
    id    : 'fitted'
  },{
    label : 'full',
    id    : 'full'
  },{
    label : 'fill',
    id    : 'fill'
  }];

  return state$.map(
    vals =>
      label('.cycvideo_dropfillmode#uidcycvideo_dropfillmode', [
        span('.cycvideo_dropfillmode_label_primary'),
        select('.cycvideo_dropfillmode_select#uidcycvideo_dropfillmode', {
          name : "name"
        }, list.map(
          data =>
            option({
              value : data.label,
              selected : data.label === fillmode ? 'selected' : ''
            }, data.label)))
      ])
  );
}

export default {
  view : view
};
