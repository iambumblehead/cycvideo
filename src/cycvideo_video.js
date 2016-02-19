// Filename: cycvideo_video.js  
// Timestamp: 2016.02.18-17:14:00 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var domwh = require('domwh');
var cycledom = require('@cycle/dom');
var cycvideo_dom = require('./cycvideo_dom');
var cycvideo_aspect = require('./cycvideo_aspect');

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

  // 100vw 100vh for full screen
  o.view = function (opts, playstate, blob, minmaxmode, fillmode, wharr) {
    var video = cycledom.video;

    var maximizeClassName = '.ismaximized-' + (minmaxmode === 'maximized' ? true : false);
    var fittedClassName = '.isfitted-' + (fillmode === 'fitted' ? true : false);
      //var aspectClassName = '.isaspect-' + (fillmode === 'fitted' ? true : false);
    var aspectClassName = '.isaspect-' + cycvideo_aspect.nearestaspect(wharr);

    var viewmodeclass = maximizeClassName + fittedClassName + aspectClassName;

    o.setplaystate(opts, playstate);

    if (typeof window === 'object' && minmaxmode === 'maximized') {
      var finwharr = cycvideo_aspect.wharr_scaledtofit(wharr, domwh(document.getElementById('cycvideo' + opts.uid)));
    } else {
      var finwharr = wharr;
    }
    // 'optimal' fullscreen should never be an option,
    // but should only be applied to when needed by canvas
    
    return video('.cycvideo_video:viewmodeclass#cycvideo_video:uid'.replace(/:viewmodeclass/, viewmodeclass).replace(/:uid/g, opts.uid), {
      style: {
        marginTop : minmaxmode === 'maximized' ? 'calc(50vh - ' + (finwharr[1] / 2) + 'px)' : ''
      },
      crossOrigin : 'anonymous',
      playsinline : 'playsinline',        
      src         : typeof blob === 'string' ? blob : '',
      //width       : opts.wharr[0],
      //height      : opts.wharr[1],
      width       : finwharr[0],
      height      : finwharr[1],
      autoplay    : opts.autoplay,
      poster      : opts.poster || '',
      loop        : opts.loop
    });
  };

  return o;

}({}));
