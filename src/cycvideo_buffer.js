// Filename: cycvideo_buffer.js  
// Timestamp: 2016.02.22-16:37:47 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var cycvideo_buffer = module.exports = (function (o) {

  o.get_buffer_state = function (opt) {
    return {
      load_percent : opt.load_percent || 0.0,
      seek_percent : opt.seek_percent || 0.0,
      timess_duration : opt.timess_duration || 0,
      timess_current  : opt.timess_current  || 0
    };
  };

  // http://stackoverflow.com/questions/9754527/what-does-the-video-buffered-length-exactly-tells
  //
  // length returns how many "parts" of the media are being buffered.
  o.buffer_is_buffered_parts = function (videoelem) {
    return videoelem.buffered.length >= 1;
  };

  // to be enabled later
  o.buffer_is_not_time_buffered = function (videoelem, time) {
    var buffered = videoelem.buffered;

    return (!(buffered.start(0) <= time && time <= buffered.end(0)));
  };

  o.gettimeatposition = function (videoelem, positionper) {
    var duration_ss = videoelem.duration;

    
    var position_ss = (positionper / 100) * duration_ss;

    return position_ss;
    
  };

  // https://developer.mozilla.org/en-US/Apps/Build/Audio_and_video_delivery/buffering_seeking_time_ranges
  // http://stackoverflow.com/questions/5029519/html5-video-percentage-loaded
  //
  o.get_buffer_state_videoelem = function (videoelem) {
    var range = 0,
        bf = videoelem.buffered,
        time = videoelem.currentTime,
        stateobj = o.get_buffer_state({
          timess_duration : videoelem.duration,
          timess_current : time
        });
    
    if (o.buffer_is_buffered_parts(videoelem)) {
      range = (function next(range, bufbgn, bufend) {
        bufbgn = bf.start(range);
        bufend = bf.end(range);

        if (!(bufbgn <= time && time <= bufend)) {
          //if (o.buffer_is_not_time_buffered(videoelem, time)) {
          // buffer is not within range
          videoelem.pause();
          setTimeout(function () {
            videoelem.play();
          }, 20000);
          return 0;
          //return next(++range);
        } else {
          return range;
        }
      }(0));

      var loadStartPercentage = bf.start(range) / videoelem.duration;
      var loadEndPercentage = bf.end(range) / videoelem.duration;

      stateobj.duration_ss = videoelem.duration;
      stateobj.load_percent = loadEndPercentage - loadStartPercentage;
      stateobj.seek_percent = videoelem.currentTime/videoelem.duration;
    }
    
    return stateobj;
  };

  return o;
  
}({}));
