// Filename: cycvideo_format.js  
// Timestamp: 2016.02.05-21:20:20 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var cycvideo_format = module.exports = (function (o) {

  // timess_duration = 170.859
  // timess_current = 0.95027
  o.numpad = function (num) {
    return (String(num).length > 1 ? '' : '0') + num;    
  };

  o.get_best_format = function (ssnum) {
    var format = 'ss';
    
    //if (ssnum >= 3600) {
    if (ssnum >= 36000) { // 10 hours
      format = 'hh:mm:ss';
    } else if (ssnum >= 3600) {
      format = 'h:mm:ss'; // lt 10 hours
    } else if (ssnum >= 600) {
      format = 'mm:ss';  // 10 min                             
    } else if (ssnum >= 60) {
      format = 'm:ss';  // lt 10 min    
    }

    return format;
  };
  
  o.format = function (ssnum, timeformat) {
    var hh, mm, ss;

    hh = Math.floor(ssnum / 3600);
    ssnum -= hh * 3600;      
    mm = Math.floor(ssnum / 60);
    ssnum -= mm * 60;
    ss = Math.floor(ssnum);

    return timeformat
      .replace(/hh/, o.numpad(hh))
      .replace(/h/, hh)    
      .replace(/mm/, o.numpad(mm))
      .replace(/m/, mm)
      .replace(/ss/, o.numpad(ss));
  };

  return o;
  
}({}));
