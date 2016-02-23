// Filename: cycvideo_opts.js  
// Timestamp: 2016.02.22-18:06:54 (last modified)
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

  o.get = function (opt) {
    var finopt = {};

    opt = opt || {};

    finopt.uid = opt.uid || ++o.incr;
    finopt.elem = opt.elem;
    
    finopt.vrmode = opt.vrmode || o.vrmode_flat;
    finopt.fillmode = o.getasstring(opt.fillmode, o.fillmode_fitted);
    finopt.poster = o.getasstring(opt.poster, '');    
    
    finopt.srcarr = o.getasarr(opt.srcarr, []);
    
    finopt.isstats      = o.getasbool(opt.isstats, false);    
    finopt.istesting    = o.getasbool(opt.istesting, true);
    finopt.iscaptions   = o.getasbool(opt.iscaptions, true);
    finopt.iscontrols   = o.getasbool(opt.iscontrols, true);
    finopt.ismaximized  = o.getasbool(opt.ismaximized, false);
    finopt.istheatered  = o.getasbool(opt.istheatered, false);    
    finopt.autoplay     = o.getasbool(opt.autoplay, true);
    finopt.loop         = o.getasbool(opt.loop, true);

    if (typeof window === 'object') {
      if (finopt.istheatered) {
        finopt.wharr = o.getasarr(opt.wharr && cycvideo_aspect.nearestwindow_truewh(opt.wharr), [640,480]);
      } else {
        finopt.wharr = o.getasarr(opt.wharr, [640, 480]);
      }

      finopt.isxhrloaded  = o.getasbool(opt.isxhrloaded, ismobilejs.apple.phone);
    } else {
      finopt.wharr = o.getasarr(opt.wharr, [640, 480]);
      finopt.isxhrloaded  = false;
    }

    
    return finopt;
  };
  
  return o;
  
}({}));
