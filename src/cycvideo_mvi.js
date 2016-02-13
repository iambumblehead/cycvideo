// Filename: cycvideo_mvi.js  
// Timestamp: 2016.02.12-14:42:29 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var rx = require('rx-dom');
var cycledom = require('@cycle/dom');
var cycvideo_bttngroup = require('./cycvideo_bttngroup');
var cycvideo_bttngear = require('./cycvideo_bttngear');
var cycvideo_bttnspeaker = require('./cycvideo_bttnspeaker');
var cycvideo_bttntheater = require('./cycvideo_bttntheater');
var cycvideo_slategroup = require('./cycvideo_slategroup');
var cycvideo_bttngroupminmax = require('./cycvideo_bttngroupminmax');
var cycvideo_labelindicator = require('./cycvideo_labelindicator');
var cycvideo_slideseek = require('./cycvideo_slideseek');
var cycvideo_dropfillmode = require('./cycvideo_dropfillmode');
var cycvideo_dropvrmode = require('./cycvideo_dropvrmode');
var cycvideo_buffer = require('./cycvideo_buffer');
var cycvideo_video = require('./cycvideo_video');
var cycvideo_req = require('./cycvideo_req');
var cycvideo_dom = require('./cycvideo_dom');
var cycvideo_opts = require('./cycvideo_opts');

// http://staltz.com/unidirectional-user-interface-architectures.html
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/callbacks.md

// * intent() function
//   Purpose: interpret DOM events as user’s intended actions
//   Input: DOM Driver source
//   Output: Action Observables
//
// * model() function
//   Purpose: manage state
//   Input: Action Observables
//   Output: state$ Observable
//
// * view() function
//   Purpose: visually represent state from the Model
//   Input: state$ Observable
//   Output: Observable of VTree as the DOM Driver sink
//
var cycvideo = module.exports = (function (o) {

  // https://github.com/Reactive-Extensions/RxJS-DOM/blob/master/src/ajax/ajax.js
  // https://github.com/Reactive-Extensions/RxJS-DOM/blob/master/doc/operators/ajax.md
  //
  function intent(DOM, opts) {
    var opt$ = rx.Observable.just(opts);    
    
    var bttngroup$ = cycvideo_bttngroup.streams(DOM, opts);
    var minmaxgroup$ = cycvideo_bttngroupminmax.streams(DOM, opts);  

    var fillmode$ = DOM.select('#uidcycvideo_dropfillmode')
          .events('change').pluck('target', 'value');

    var vrmode$ = DOM.select('#uidcycvideo_dropvrmode')
          .events('change').pluck('target', 'value');


    var progress$ = rx.Observer.create(
      function (x) {
        console.log('Next: ' + x);
      },
      function (err) {
        console.log('Error: ' + err);
      },
      function () {
        console.log('Completed');
      }
    );


    var blob$ = rx.Observable.just('');    
/*
    var blob$ = rx.DOM.ajax({
      url: opts.srcarr[0],
      crossDomain : true,
      responseType: 'blob',
      progressObserver : progress$
    });
    */


    if (typeof document === 'object') {
      var ajax$ = rx.DOM.ajax({
        url              : 'http://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4',
        crossDomain      : true,
        responseType     : 'blob',
        progressObserver : progress$
      }).subscribe(
        function (data) {
          console.log('next ', data);
        },
        function (error) {
          // Log the error
        },
        function (complete) {
          console.log('complete');
        }
      );

      console.log('ajax$ is ', ajax$);
    }    
/*
    var blob$ = cycvideo_req.getblob$({
      url : opts.srcarr[0]
    }).map(function (v) {
      console.log('emitted blobv', v);
      
      return v;
    });
*/

    console.log('attached?');

    

    // You are subscribing to some of your streams inside your application code.
    // I assume this is for debugging but you should shareReplay() those
    // streams. otherwise the driver might miss some items that happen before
    // it has a chance to subscribe
    //blob$.subscribe(
    //  function (e) { console.log('blog$ next ' + e); },
    //  function (e) { console.log('blog$ error %s', e); },
    //  function (e) { console.log('blog$ complete ', e); }
    //);

    /*
    var progress$ = blob$.map((ev) => {
      return typeof ev === 'object' ? Math.floor((ev.loaded/ev.total) * 100) : 100;
      //}).startWith(0).debounce(600).map(v => typeof document === 'object' ? v : 0);
      //}).startWith(0).throttle(600).map(v => typeof document === 'object' ? v : 0);    
    }).startWith(0).map(v => typeof document === 'object' ? v : 0);
     */

    //progress$ = rx.Observable.startWith(0);
    //progress$.subscribe(blob$);
    
//    var progress$ = blob$.map((ev) => {
//      return 0;
//    });
//      return typeof ev === 'object' ? Math.floor((ev.loaded/ev.total) * 100) : 100;
      //}).startWith(0).debounce(600).map(v => typeof document === 'object' ? v : 0);
      //}).startWith(0).throttle(600).map(v => typeof document === 'object' ? v : 0);    
//    }).startWith(0).map(v => typeof document === 'object' ? v : 0);
    

    // 'progress', 'timeupdate', 'canplay', 'play', 'pause'
    // seek, includes progress and seek area
    var timeupdate$ = rx.Observable.merge(
      typeof document === 'object' ?
        rx.DOM.fromEvent(cycvideo_dom.get_video_elem(opts), 'timeupdate') :
        DOM.select('#cycvideo_video').events('timeupdate')
    ).filter(ev => ev && ev.target);

    var slideseekstreams = cycvideo_slideseek.streams(DOM, opts);
    var seekfocus$ = slideseekstreams.focus$.map(ev => 'pause');

    // when slideseek is changed, update buffer stream
    var seek$ = slideseekstreams.change$.map(function (ev) {
      var videoelem = cycvideo_dom.get_video_elem(opts),
          seekelem = ev.target,
          seektime = cycvideo_buffer.gettimeatposition(videoelem, seekelem.value);

      videoelem.currentTime = seektime;
      
      document.getElementById('uidcycvideo_dropfillmode').focus();
      return ev;
    });

    var buffer$ = rx.Observable.merge(timeupdate$, seek$)
          .filter(cycvideo_dom.is_doc)
          .map(e => cycvideo_dom.get_video_elem(opts))
          .map(cycvideo_buffer.get_buffer_state);


    var playstate$ = rx.Observable.merge(
      cycvideo_slategroup.streams(DOM, opts),
      seekfocus$,
      bttngroup$,
      blob$.map(e => e.length ? 'pause' : 'load'));

    // should observe an event upon which video element src attribute is updated
    // then wharr should be modified to read video element
    var wharr$ = rx.Observable.just(opts.wharr);

    return {
//      progress$   : progress$,
      blob$       : blob$,
      opt$        : opt$      
    };

    return {
      opt$        : opt$,
      fillmode$   : fillmode$,
      vrmode$     : vrmode$,    
      buffer$     : buffer$,
      playstate$  : playstate$,
      progress$   : progress$,
      blob$       : blob$,
      seek$       : seek$,
      minmaxgroup$ : minmaxgroup$,
      wharr$ : wharr$ 
    };
  }

  function model(actions) {

    //const mergedQuery$ = intent$.apiQuery$.map((x) => {
    //  const url = NLP_API + '?s=' + encodeURIComponent(x)
    //  return {
    //    url: url,
    //    method: 'GET',
    //  };
    //})
    //.skip(1)    

    //const HTTPres$ = sources.HTTP.flatMap(x => x)
    //        .map(res => '/' + res.text)
    //        .startWith('/')
    //        .shareReplay(1);

    
    
    return rx.Observable.combineLatest(
      /*
      actions.opt$,
      actions.playstate$.startWith('load'),
      actions.progress$.startWith(0),
      actions.blob$,
      //actions.blob$.startWith(''),
      actions.buffer$.startWith({
        load_percent : 0.0,
        seek_percent : 0.0,
        timess_duration : 0,
        timess_current  : 0
      }),
      actions.seek$.startWith(''),
      actions.wharr$,
      actions.minmaxgroup$.startWith('minimized'),    
      actions.fillmode$.startWith('fitted'),
      actions.vrmode$.startWith('flat'),

      (opts, playstate, progress, blob, buffer, seek,  wharr, minmaxgroup, fillmode, vrmode) => {
        return {opts, playstate, progress, blob, buffer, seek,  wharr, minmaxgroup, fillmode, vrmode};    
      }
       */
      actions.opt$,
      //actions.progress$.startWith(0),
      actions.blob$.startWith(''),
      (opts, blob) => { return {opts, blob}; }
    );
  }



  // load cat video
  // observe the statestream
  function view(state$) {
    var div = cycledom.div;

    return state$.map(function (o) {
      var opts = o.opts,
          playstate = o.playstate,
          progress = o.progress,
          blob = o.blob,
          buffer = o.buffer,
          seek = o.seek,
          wharr = o.wharr,
          minmaxgroup = o.minmaxgroup,
          fillmode = o.fillmode,
          vrmode = o.vrmode;

      console.log('state map', blob);
      
      return div('.cycvideo', [
        cycvideo_video.view(opts, playstate, blob),
        cycvideo_slategroup.view(opts, playstate, 0)
      ]);
        
      return div('.cycvideo', [
        cycvideo_video.view(state$, opts, playstate, blob, wharr),
        cycvideo_slategroup.view(state$, opts, playstate, progress),
        
        div('.cycvideo_ctrls', [
          cycvideo_slideseek.view(state$, buffer, progress),
          div('.cycvideo_ctrls_col', [
            div('.cycvideo_ctrls_colleft', [                  
              cycvideo_bttngroup.view(state$, playstate),
              cycvideo_dropfillmode.view(state$, fillmode),
              cycvideo_dropvrmode.view(state$, vrmode),    
              cycvideo_labelindicator.view(state$, buffer)
            ]),
            div('.cycvideo_ctrls_colright', [
              cycvideo_bttnspeaker.view(state$, minmaxgroup),
              cycvideo_bttngear.view(state$, minmaxgroup),            
              cycvideo_bttntheater.view(state$, minmaxgroup),
              cycvideo_bttngroupminmax.view(state$, minmaxgroup)
            ])
          ])
        ])
      ]);
    });
  }

  //export default DOM => view(model(intent(DOM, cycvideo_opts({
  return DOM => view(model(intent(DOM, cycvideo_opts({
    uid : 1,
    wharr : [
      // http://stackoverflow.com/questions/4129102/html5-video-dimensions
      // ^^^ would be preferable
      
      // 1280, 720 // Sample.mp4
      640, 320 // for testdrive 2:1 format
    ],
    srcarr : [
      'http://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4'
      //'./testdrive.mp4' + '?' + Date.now
    ],
    istesting   : true,
    isstats     : true,
    isxhrloaded : true,
    iscontrols  : false,
    autoplay    : false,
    loop        : true
    //poster : feed.getProgramFittedThumbnail(program, videoelem),
    //fillmode : cyclvideo_opts.fillmode_fill,
    //vrmode   : cyclvideo_opts.vrmode_panorama
  })))); 

  return o;  

}({}));
