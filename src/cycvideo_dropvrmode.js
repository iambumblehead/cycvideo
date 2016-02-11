// Filename: cycvideo_dropvrmode.js  
// Timestamp: 2016.02.10-15:14:09 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  


var cycledom = require('@cycle/dom');

var cycvideo_dropvrmode = module.exports = (function (o) {

  o.view = function (state$, fillmode) {
    var label = cycledom.label,
        span = cycledom.span,
        select = cycledom.select,
        option = cycledom.option;
    
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
                selected : data.label === 'vrmode' ? 'selected' : ''
              }, data.label)))
        ])
    );
  };

  return o;
  
}({}));

