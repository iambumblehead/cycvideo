// Filename: cycvideo_slateload.js  
// Timestamp: 2016.02.11-17:25:06 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var Rx = require('rx-dom');
var cycledom = require('@cycle/dom');

var cycvideo_slateload = module.exports = (function (o) {

  o.view = function (state$, progress) {
    var div = cycledom.div;
    
    return  div('.cycvideo_slateload', [
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
    ]);
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_slateload').events('click')
    };
  };

  return o;

}({}));
