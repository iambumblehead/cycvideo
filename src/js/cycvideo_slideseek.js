// Filename: cycvideo_slideseek.js  
// Timestamp: 2016.02.05-17:39:27 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import {label, span, progress, input, h} from '@cycle/dom';

function view(state$, buffer, loadprogress, seek) {

  //console.log('load progress is ', loadprogress);
  console.log('load buffer is ', buffer);
  
  return state$.map(
    vals =>
      label('.cycvideo_slideseek#uidcycvideo_slideseek', [
        span('.cycvideo_slideseek_label_primary'),
        // progress of video load
        h('progress.cycvideo_slideseek_progress#uidcycvideo_slideseek_progress', {
          value : loadprogress,
          min   : 0,
          max   : 100
        }),
        // position of video
        input('.cycvideo_slideseek_input#uidcycvideo_slideseek_input', {
          type  : 'range',
          value : 0,
          min   : 0,
          max   : 100
        })
      ])
  );
}

export default {
  view : view
};

/*
  o.player_get_seek_slideHTML = function (player) {
    return [
      '<label class="fsgo-video-layer-control-slider-label" for=":uidsliderlabel">',
      '  <span class="fsgo-video-layer-cotnrol-slider-label-primary"></span>',
      '  <progress class="fsgo-video-layer-control-slider-label-buffer" id=":uidbufferprogress" value="0" min="0" max="100"></progress>',
      '  <input class="fsgo-video-layer-control-slider-label-seek" id=":uidseekslider" type="range" value="0" min="0" max="100" />',
      '</label>'
    ].join('\n').replace(/:uid/gi, player.uid);
  };
*/
