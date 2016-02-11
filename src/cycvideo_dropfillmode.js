// Filename: cycvideo_dropfillmode.js  
// Timestamp: 2016.02.10-15:12:16 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var cycledom = require('@cycle/dom');

var cycvideo_dropfillmode = module.exports = (function (o) {

  o.view = function (state$, fillmode) {
    var label = cycledom.label,
        span = cycledom.span,
        select = cycledom.select,
        option = cycledom.option;
    
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
  };

  return o;

}({}));
