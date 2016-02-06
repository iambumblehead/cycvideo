// Filename: cycvideo_video.js  
// Timestamp: 2016.02.05-16:37:52 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import {video} from '@cycle/dom';

function view(state$, blob, wharr) {

  return state$.map(
    (vals) => {

      console.log('blob is ', blob);
      
      return video('.cycvideo_video#cycvideo_video', {
        crossOrigin : 'anonymous',
        playsinline : 'playsinline',        
        src         : typeof blob === 'string' ? blob : '',//'http://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4',
        width       : wharr[0],
        height      : wharr[1],
        autoplay    : state$.autoplay,
        poster      : state$.poster || '',
        loop        : state$.loop
      })
    });
  };
//}

export default {
  view : view
};
