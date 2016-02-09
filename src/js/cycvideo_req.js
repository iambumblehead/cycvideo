// Filename: cycvideo_req.js  
// Timestamp: 2016.02.09-10:33:12 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>
//
// https://github.com/Reactive-Extensions/RxJS/blob/ \
//   8f12f812d497acf639588e90f74d504a9fc801ec/src/core/linq/observable/fromnodecallback.js

import xdrgo from 'xdrgo';
import rx from 'rx';
import fromnodeprogresscallback from 'fromnodeprogresscallback';

var cycvideo_req = (function (o) {

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
          console.log('DONE', blob);
          fn(null, blob);
        } else {
          console.log('ERR ', xhr);
          fn(xhr);
        }
      });

      //xhr.onprogress = progressfn;
      xhr.onprogress = function (a, b, c) {
        console.log('PROG');
        progressfn(a, b, c);
      };
      setTimeout(function () {
        xhr.send();
      }, 2000);
    });
  };

  return o;
  
}({}));

export default cycvideo_req;
