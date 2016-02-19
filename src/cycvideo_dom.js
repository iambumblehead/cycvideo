// Filename: cycvideo_dom.js  
// Timestamp: 2016.02.17-15:19:21 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var cycvideo_dom = module.exports = (function (o) {

o.is_doc = function () {
  return typeof document === 'object';
};

o.get_elem = function (cfg, id) {
  return document.getElementById(id + cfg.uid);
};

o.get_video_elem = function (player) {
  //return o.get_elem(player, 'fsgo-video-elem');
  return o.get_elem(player, 'cycvideo_video');
};

o.get_video_layer_elem = function (player) {
  return o.get_elem(player, 'fsgo-video-layer');
};
/*
  o.state_play = function (player) {
    var video_layer = o.get_video_layer_elem(player);
    
    if (video_layer) {
      elemst.up(video_layer, 'isplay-true');
    }
  };

  o.state_pause = function (player) {
    var video_layer = o.get_video_layer_elem(player);
    
    if (video_layer) {
      elemst.up(video_layer, 'isplay-false');
    }
  };  

  o.state_pause_initial = function (player) {
    var video_layer = o.get_video_layer_elem(player);
    
    if (video_layer) {
      elemst.up(video_layer, 'isplay-pauseinitial');
    }
  };  
    
  o.state_loading = function (player) {
    var video_layer = o.get_video_layer_elem(player);
    
    if (video_layer) {
      elemst.up(video_layer, 'isplay-loading');
    }
  };

  o.refresh_state = function (player) {
    var video_elem = o.get_video_elem(player);

    if (video_elem) {
      if (video_elem.paused) {
        o.state_pause(player);
      } else {
        o.state_play(player);
      }
    }
  };

  o.play = function (player) {
    var video_elem = o.get_video_elem(player);

    if (video_elem) {
      video_elem.play();
      o.state_play(player);
    }
  };
  
  o.pause = function (player) {
    var video_elem = o.get_video_elem(player);
    
    if (video_elem) {
      video_elem.pause();
    }
  };

  o.pause_initial = function (player) {
    var video_elem = o.get_video_elem(player);

    o.state_pause_initial(player);    
    if (video_elem) {
      video_elem.pause();
    }
  };  

  o.isplaying = function (player) {
    var video_elem = o.get_video_elem(player);

    return video_elem && !video_elem.paused;
  };

  o.ispaused = function (player) {
    var video_elem = o.get_video_elem(player);

    return video_elem && video_elem.paused ? true : false;
  };  

  o.isstate_playing = function (player) {
    var video_layer = o.get_video_layer_elem(player);
    
    return video_layer
      && elemst.is(video_layer, 'isplay-true');
  };

  o.isstate_paused = function (player) {
    var video_layer = o.get_video_layer_elem(player);
    
    return video_layer
      && elemst.is(video_layer, 'isplay-false');
  };  
 */
  return o;

}({}));
