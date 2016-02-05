// Filename: cycvideo_video.js  
// Timestamp: 2016.02.04-22:02:02 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import {video} from '@cycle/dom';

function view(state$, blob, wharr) {

  return state$.map(
    vals =>
      video('.cycvideo_video #cycvideo_video', {
        crossOrigin : 'anonymous',
        playsinline : 'playsinline',        
        src         : blob,//'http://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4',
        width       : wharr[0],
        height      : wharr[1],
        autoplay    : state$.autoplay,
        poster      : state$.poster || '',
        loop        : state$.loop
      }));
}

export default {
  view : view
};
