// Filename: cycvideo_video.js  
// Timestamp: 2016.02.09-11:55:05 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

import {video} from '@cycle/dom';
import cycvideo_dom from './cycvideo_dom';


function setplaystate (opts, playstate) {
  if (cycvideo_dom.is_doc()) {
    var videoelem = cycvideo_dom.get_video_elem(opts);

    if (playstate === 'play') {
      videoelem.play();
    } else if (playstate === 'pause') {
      videoelem.pause();
    } 
  }
}

function view(state$, opts, playstate, blob, wharr) {
  
  return state$.map(
    (vals) => {

      setplaystate(opts, playstate);
      
      return video('.cycvideo_video#:uidcycvideo_video'.replace(/:uid/, opts.uid), {
        crossOrigin : 'anonymous',
        playsinline : 'playsinline',        
        src         : typeof blob === 'string' ? blob : '',
        //'http://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4',
        width       : opts.wharr[0],
        height      : opts.wharr[1],
        autoplay    : state$.autoplay,
        poster      : state$.poster || '',
        loop        : state$.loop
      });
    });
  };
//}

export default {
  view : view,
  setplaystate : setplaystate
};
