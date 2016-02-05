// Filename: cycvideo_req.js  
// Timestamp: 2016.02.04-16:52:50 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>
//
// https://github.com/Reactive-Extensions/RxJS/blob/ \
//   8f12f812d497acf639588e90f74d504a9fc801ec/src/core/linq/observable/fromnodecallback.js

import xdrgo from 'xdrgo';
import rx from 'rx';
import fromnodeprogresscallback from 'fromnodeprogresscallback';

var cycvideo_req = (function (o) {

  o.getblob$ = function (opts) {
    return fromnodeprogresscallback(rx, function (ctx, progressfn, fn) {
      var xhr = xdrgo.newRequest(),
          url = opts.url,
          blob;

      xhr.open("GET", url, true);
      xhr.responseType = 'blob';
      xhr.onreadystatechange = xdrgo.constructReadyState(xhr, function (xhr) {
        if (xdrgo.is2xxRe.test(xhr.status)) {
          blob = (window.webkitURL ? webkitURL : URL).createObjectURL(xhr.response);
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

export default cycvideo_req;
