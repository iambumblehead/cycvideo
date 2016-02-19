// Filename: cycvideo_opts.js  
// Timestamp: 2016.02.19-11:05:50 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var cycvideo_aspect = require('./cycvideo_aspect');
var ismobilejs = require('ismobilejs');

var cycvideo_opts = module.exports = (function (o) {

  o = function (opts) {
    return o.get(opts);
  };

  o.incr = 0;

  o.getasbool = function (val, defval) {
    if (String(val) === 'true')  defval = true;
    if (String(val) === 'false') defval = false;    

    return defval ? true : false;    
  };

  o.getasstring = function (val, defval) {
    if (typeof val === 'string' && val) defval = val;

    return String(defval);
  };

  o.getasarr = function (val, defval) {
    if (Array.isArray(val))      defval = val;
    if (typeof val === 'string') defval = val.split(',');

    return defval;
  };
/*
  o.fillmodearr = [
    o.fillmode_fitted = "fillmode-fitted",
    o.fillmode_full   = "fillmode-full",
    o.fillmode_fill   = "fillmode-fill"    
  ];  

  o.vrmodearr = [
    o.vrmode_flat = {
      id    : 'vrmode_flat',
      label : 'flat',
      type  : 'flat'
    },
    o.vrmode_panorama = {
      id    : 'vrmode_panorama',
      label : 'sphere', // narrow label, sphere vs panorama
      type  : 'vr',
      scene : fsgoplayer_webvrscene.panorama
    },
    o.vrmode_cube = {
      id    : 'vrmode_cube',
      label : 'cube',      
      type  : 'vr',
      scene : fsgoplayer_webvrscene.cube
    },
    o.vrmode_block = {
      id    : 'vrmode_block',
      label : 'block',
      type  : 'vr',
      scene : fsgoplayer_webvrscene.block
    },
    o.vrmode_light = {
      id    : 'vrmode_light',
      label : 'light',
      type  : 'vr',
      scene : fsgoplayer_webvrscene.lightmap
    },
    o.vrmode_blend = {
      id    : 'vrmode_blend', // blender
      label : 'blend',
      type  : 'vr',
      scene : fsgoplayer_webvrscene.blend
    },
    o.vrmode_three = {
      id    : 'vrmode_three', // blender
      label : 'three',
      type  : 'vr',
      scene : fsgoplayer_webvrscene.three
    },
    o.vrmode_scene = {
      id    : 'vrmode_scene', // blender, a full scene
      label : 'scene',
      type  : 'vr',
      scene : fsgoplayer_webvrscene.scene
    }
  ];

  o.getvrmodebyid = function (id) {
    for (var arr = o.vrmodearr, x = arr.length; x--;) {
      if (arr[x].id === id) return arr[x];
    }
    //return fsgoplayer_webvrscene[id.split('vrmode-')[1]];
  };
*/  
  o.get = function (opt) {
    var finopt = {};

    opt = opt || {};

    finopt.uid = opt.uid || ++o.incr;
    finopt.elem = opt.elem;
    
    finopt.vrmode = opt.vrmode || o.vrmode_flat;
    finopt.fillmode = o.getasstring(opt.fillmode, o.fillmode_fitted);
    finopt.poster = o.getasstring(opt.poster, '');    
    
    finopt.srcarr = o.getasarr(opt.srcarr, []);
      
    if (typeof window === 'object') {
      finopt.wharr = o.getasarr(opt.wharr && cycvideo_aspect.nearestwindow_truewh(opt.wharr), [640,480]);              
      finopt.isxhrloaded  = o.getasbool(opt.isxhrloaded, ismobilejs.apple.phone);
    } else {
      finopt.wharr = o.getasarr(opt.wharr, [640, 480]);
      finopt.isxhrloaded  = false;
    }
    
    finopt.isstats      = o.getasbool(opt.isstats, false);    
    finopt.istesting    = o.getasbool(opt.istesting, true);
    finopt.iscaptions   = o.getasbool(opt.iscaptions, true);
    finopt.iscontrols   = o.getasbool(opt.iscontrols, true);
    //finopt.isfullscreen = o.getasbool(opt.isfullscreen, false);
    finopt.ismaximized  = o.getasbool(opt.ismaximized, false);
    finopt.istheatered  = o.getasbool(opt.istheatered, false);    
    finopt.autoplay     = o.getasbool(opt.autoplay, true);
    finopt.loop         = o.getasbool(opt.loop, true);        
    
    return finopt;
  };
  
  return o;
  
}({}));
