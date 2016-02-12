// Filename: cycvideo_video.js  
// Timestamp: 2016.02.11-16:37:53 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var cycledom = require('@cycle/dom');
var cycvideo_dom = require('./cycvideo_dom');

var cycvideo = module.exports = (function (o) {

  o.setplaystate = function (opts, playstate) {
    if (cycvideo_dom.is_doc()) {
      var videoelem = cycvideo_dom.get_video_elem(opts);

      if (playstate === 'play') {
        videoelem.play();
      } else if (playstate === 'pause') {
        videoelem.pause();
      } 
    }
  };

  o.view = function (state$, opts, playstate, blob, wharr) {
    var video = cycledom.video;

    o.setplaystate(opts, playstate);
    
    return video('.cycvideo_video#:uidcycvideo_video'.replace(/:uid/, opts.uid), {
      crossOrigin : 'anonymous',
      playsinline : 'playsinline',        
      src         : typeof blob === 'string' ? blob : '',
      width       : opts.wharr[0],
      height      : opts.wharr[1],
      autoplay    : state$.autoplay,
      poster      : state$.poster || '',
      loop        : state$.loop
    });
  };

  return o;

}({}));
