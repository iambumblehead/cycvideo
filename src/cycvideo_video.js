// Filename: cycvideo_video.js  
// Timestamp: 2016.02.22-18:03:52 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var domwh = require('domwh');
var cycledom = require('@cycle/dom');
var cycvideo_dom = require('./cycvideo_dom');
var cycvideo_buffer = require('./cycvideo_buffer');
var cycvideo_aspect = require('./cycvideo_aspect');

var cycvideo = module.exports = (function (o) {

  // use composition...
  // getContainer and Content elem$
  o.getcontentelem = function (opts) {

  };

  o.getcontentelem$ = function (opts) {

  };


  o.setseekposition = function (opts, seekpos) {
    var videoelem = cycvideo_dom.get_video_elem(opts);

    if (videoelem) {
       videoelem.currentTime = cycvideo_buffer.gettimeatposition(videoelem, seekpos);
    }
  };

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

  
  // need abstraction which supplies unique id and className to elements
  // 100vw 100vh for full screen
  o.view = function (opts, playstate, blob, ismaximized, istheatered, wharr) {
    var video = cycledom.video,
        viewmodeclass =
          '.ismaximized-' + ismaximized +
          '.isfitted-' + istheatered +
          '.isaspect-' + cycvideo_aspect.nearestaspect(wharr),
        finwharr = ismaximized ?
          cycvideo_aspect.wharr_scaledtofit(wharr, domwh(document.getElementById('cycvideo' + opts.uid))) : wharr;


    console.log('wharr is ', wharr);
    
    o.setplaystate(opts, playstate);

    // 'optimal' fullscreen should never be an option,
    // but should only be applied to when needed by canvas
    return video('.cycvideo_video:viewmodeclass#cycvideo_video:uid'.replace(/:viewmodeclass/, viewmodeclass).replace(/:uid/g, opts.uid), {
      style: {
        marginTop : ismaximized ? 'calc(50vh - ' + (finwharr[1] / 2) + 'px)' : ''
      },
      crossOrigin : 'anonymous',
      playsinline : 'playsinline',        
      src         : typeof blob === 'string' ? blob : '',
      width       : finwharr[0],
      height      : finwharr[1],
      autoplay    : opts.autoplay,
      poster      : opts.poster || '',
      loop        : opts.loop
    });
  };

  o.streams = function (DOM, opts) {
    var contentelem$ = DOM.select('#cycvideo_video1');
    
    return {
      timeupdate$ : DOM.select('#cycvideo_video1')
        .events('timeupdate')
        .filter(e => e && e.target)
    };
  };

  return o;

}({}));
