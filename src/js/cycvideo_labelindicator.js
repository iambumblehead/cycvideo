// Filename: cycvideo_labelindicator.js  
// Timestamp: 2016.02.05-15:40:57 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  


import {label, span} from '@cycle/dom';

function view(state$, vrmode) {
  
  return state$.map(
    vals =>
      label('.cycvideo_labelindicator#uidcycvideo_labelindicator', [
        span('.cycvideo_labelindicator_label_seektime#uidcycvideo_labelindicator_label_seektime', '0:00'),
        span('.cycvideo_labelindicator_label_fulltime#uidcycvideo_labelindicator_label_fulltime', '0:00'),
      ])
  );
}

export default {
  view : view
};


/*
  o.player_get_textindicatorHTML = function (player) {
    return [
      '<label class="fsgo-video-layer-control-textindicator-label" for=":uidtextindicator">',
      '  <span class="fsgo-video-layer-control-textindicator-label-seektime" id=":uidlabelseektime">0:00</span>',
      '  <span class="fsgo-video-layer-control-textindicator-label-fulltime" id=":uidlabelfulltime">0:00</span>',            
      '</label>'
    ].join('\n').replace(/:uid/gi, player.uid);            
  };
*/
  
