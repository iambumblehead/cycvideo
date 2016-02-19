// Filename: cycvideo_aspect.js  
// Timestamp: 2016.02.18-16:57:04 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var domwh = require('domwh');

var cycvideo_aspect = module.exports = (function (o) {

  o.whset_19x9 = [
    [256, 144], [384, 216], [512, 288], [640, 360],
    [768, 432], [896, 504], [1024, 576], [1152, 648],
    [1280, 720], [1920, 1080], [2560, 1440]
  ];

  o.whset_4x3 = [
    [320, 240], [400, 300], [512, 384], [640, 480],
    [800, 600], [960, 720], [1024, 768], [1152, 864],
    [1280, 960], [1400, 1050], [1440, 1080],
    [1600, 1200], [1920, 1440]
  ];

  o.whset_2x1 = [
    [640, 320], [1920, 960],
    // below values aren't listed on the internet and may not be true 2x1 values
    [320, 160], [1280, 640], [960, 480]
  ];

  o.iswharr_inwharrset = function (wharr, wharrset) {
    var w = wharr[0],
        h = wharr[1];
    
    return wharrset.some(function (wh) {
      return wh[0] === w && wh[1] === h;
    });
  };

  o.iswharr_true4x3 = function (wharr) {
    return o.iswharr_inwharrset(wharr, o.whset_4x3);
  };

  o.iswharr_true19x9 = function (wharr) {
    return o.iswharr_inwharrset(wharr, o.whset_19x9);
  };

  o.iswharr_true2x1 = function (wharr) {
    return o.iswharr_inwharrset(wharr, o.whset_2x1);
  };  

  o.iswharr_fit = function (wharr, whboundarr) {
    return whboundarr[0] >= wharr[0] && whboundarr[1] >= wharr[1];
  };

  o.iswharr_fitwindow = function (wharr) {
    return o.iswharr_fit(wharr, domwh.window());
  };  

  o.nearestwharr_inwharrset = function (wharr, wharrset) {
    var w = wharr[0],
        h = wharr[1];
    
    return wharrset.filter(function (wh) {
      return wh[0] <= w && wh[1] <= h;
    }).sort(function (awh, bwh) {
      return awh[0] * awh[1] >= bwh[0] * bwh[1] ? -1 : 1;
    })[0] || wharrset[0];
  };

  o.nearest_truewh = function (wharr) {
    if (o.iswharr_true4x3(wharr)) {
      wharr = o.nearestwharr_inwharrset(wharr, o.whset_4x3);
    } else if (o.iswharr_true19x9(wharr)) {
      wharr = o.nearestwharr_inwharrset(wharr, o.whset_19x9);
    } else if (o.iwwharr_true2x1(wharr)) {
      wharr = o.nearestwharr_inwharrset(wharr, o.whset_2x1);
    }

    return wharr;
  };

  o.nearestaspect = function (wharr, windowwharr) {
    if (o.iswharr_true4x3(wharr)) return '4x3';
    if (o.iswharr_true19x9(wharr)) return '19x9';
    if (o.iswharr_true2x1(wharr)) return '2x1';        
  };

  o.nearestwindow_truewh = function (wharr, windowwharr) {
    windowwharr = domwh.window();
    
    if (o.iswharr_true4x3(wharr)) {
      wharr = o.nearestwharr_inwharrset(windowwharr, o.whset_4x3);
    } else if (o.iswharr_true19x9(wharr)) {
      wharr = o.nearestwharr_inwharrset(windowwharr, o.whset_19x9);
    } else if (o.iswharr_true2x1(wharr)) {
      wharr = o.nearestwharr_inwharrset(windowwharr, o.whset_2x1);
    }    

    return wharr;
  };

  o.wharr_scaledtofit = function (wharr, whboundarr, w, h) {
    whboundarr = domwh.window();
    
    w = +whboundarr[0],
    h = Math.floor(wharr[1] * (whboundarr[0] / wharr[0]));

    if (!o.iswharr_fit([w, h], whboundarr)) {
      h = +whboundarr[1];
      w = Math.floor(wharr[0] * (whboundarr[1] / wharr[1]));
    }
    
    return [w, h];
  };

  if (typeof window === 'object') {
    window.aspectd = o;
  }

  return o;

}({}));
