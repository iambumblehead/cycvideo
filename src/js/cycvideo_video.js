// Filename: cycvideo_video.js  
// Timestamp: 2016.02.04-09:42:12 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import {video} from '@cycle/dom';

function view(state$) {
  return state$.map(
    vals =>
      video('.cycvideo_video #cycvideo_video', {
        crossOrigin : 'anonymous',
        playsinline : 'playsinline',        
        //width       : state$.wharr[0],
        //height      : state$.wharr[1],
        src         : 'http://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4',
        width       : 640,
        height      : 480,
        autoplay    : state$.autoplay,
        poster      : state$.poster,
        loop        : state$.loop
      }));
}

export default {
  view : view
};
