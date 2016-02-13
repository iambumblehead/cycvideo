// Filename: cycvideo_req.js  
// Timestamp: 2016.02.11-19:04:56 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>
//
// https://github.com/Reactive-Extensions/RxJS/blob/ \
//   8f12f812d497acf639588e90f74d504a9fc801ec/src/core/linq/observable/fromnodecallback.js

var xdrgo = require('xdrgo');
var rx = require('rx');
var fromnodeprogresscallback = require('fromnodeprogresscallback');

var cycvideo_req = module.exports = (function (o) {

  o.getblob$ = function (opts) {
    if (typeof document !== 'object') {
      return rx.Observable.just('');
    }
    
    return fromnodeprogresscallback(rx, function (ctx, progressfn, fn) {
      var xhr = xdrgo.newRequest(),
          url = opts.url,
          blob;


      xhr.open("GET", url, true);
      xhr.responseType = 'blob';
      xhr.onreadystatechange = xdrgo.constructReadyState(xhr, function (xhr) {
        if (xdrgo.is2xxRe.test(xhr.status)) {
          blob = (window.webkitURL ? window.URL || webkitURL : URL).createObjectURL(xhr.response);
          console.log('complete ', fn);
          fn(null, blob);
        } else {
          fn(xhr);
        }
      });

      xhr.onprogress = progressfn;
        xhr.send();

    });
  };

  return o;
  
}({}));
