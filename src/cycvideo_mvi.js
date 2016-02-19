// Filename: cycvideo_mvi.js  
// Timestamp: 2016.02.19-14:04:18 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var rx = require('rx-dom');
var winurl = require('winurl');
var cycledom = require('@cycle/dom');
var rxcombinelatestobj = require('rx-combine-latest-obj');
var cycvideo_aspect = require('./cycvideo_aspect');
var cycvideo_bttnplaystate = require('./cycvideo_bttnplaystate');
var cycvideo_bttngear = require('./cycvideo_bttngear');
var cycvideo_bttnspeaker = require('./cycvideo_bttnspeaker');
var cycvideo_bttntheater = require('./cycvideo_bttntheater');
var cycvideo_bttncc = require('./cycvideo_bttncc');
var cycvideo_bttnvr = require('./cycvideo_bttnvr');
var cycvideo_slategroup = require('./cycvideo_slategroup');
var cycvideo_bttngroupminmax = require('./cycvideo_bttngroupminmax');
var cycvideo_labelindicator = require('./cycvideo_labelindicator');
var cycvideo_slideseek = require('./cycvideo_slideseek');
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
  function intent(sources, opts) {

    var opt$ = rx.Observable.just(opts);    
    
    var bttnplaystate$ = cycvideo_bttnplaystate.streams(sources.DOM, opts);
    var ismaximized$ = cycvideo_bttngroupminmax.streams(sources.DOM, opts);
    var istheatered$ = cycvideo_bttntheater.streams(sources.DOM, opts);
    var isvrmode$ = cycvideo_bttnvr.streams(sources.DOM, opts);

    var progress$ = rx.Observable.just('');
    var blob$ = rx.Observable.just('');

    if (typeof document === 'object') {
      const BLOB_URL = 'http://d8d913s460fub.cloudfront.net/videoserver/';
      const blobhttp$ = sources.HTTP.mergeAll()
              .filter(e => ~e.request.url.indexOf(BLOB_URL));
      
      blob$ = blobhttp$
        .filter(e => e.xhr && e.xhr.response)
        .map(e => winurl.createObjectURL(e.xhr.response))
        .startWith('');
      
      progress$ = blobhttp$
        .filter(e => typeof e.total === 'number')
        .map(e => e.total && e.loaded / e.total * 100);
    }

    var timeupdate$ = cycvideo_video.streams(sources.DOM, opts).timeupdate$;
    var slideseekstreams = cycvideo_slideseek.streams(sources.DOM, opts);
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

    var buffer$ = rx.Observable
          .merge(timeupdate$, seek$)
          .filter(cycvideo_dom.is_doc)
          .map(e => cycvideo_dom.get_video_elem(opts))
          .map(cycvideo_buffer.get_buffer_state);

    var slate$ = cycvideo_slategroup.streams(sources.DOM, opts);

    var playstate$ = rx.Observable
          .merge(slate$, seekfocus$, bttnplaystate$, blob$.map(e => e.length ? 'pause' : 'load'));

    // should observe an event upon which video element src attribute is updated
    // then wharr should be modified to read video element
    var wharr$ = rx.Observable.just(opts.wharr);

    return {
      opt$        : opt$,
      buffer$     : buffer$,
      playstate$  : playstate$,
      progress$   : progress$,
      blob$       : blob$,
      seek$       : seek$,
      ismaximized$ : ismaximized$,
      istheatered$ : istheatered$,
      isvrmode$    : isvrmode$,
      wharr$ : wharr$ 
    };
  }

  function model(actions) {
    var opts$ =  actions.opt$,
        playstate$ = actions.playstate$.startWith('load'),
        actions$ = actions.progress$.startWith(0),
        blob$ = actions.blob$,
        buffer$ = actions.buffer$.startWith({
          load_percent : 0.0,
          seek_percent : 0.0,
          timess_duration : 0,
          timess_current  : 0
        }),
        seek$ = actions.seek$.startWith(''),
        wharr$ = actions.wharr$,
        ismaximized$ = actions.ismaximized$.startWith(false),
        istheatered$ = actions.istheatered$.startWith(false),
        isvrmode$ = actions.isvrmode$.startWith(false);
    
    return rxcombinelatestobj({
      opts$, playstate$, actions$, blob$, buffer$, seek$,
      wharr$, ismaximized$, istheatered$, isvrmode$
    });
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
          ismaximized = o.ismaximized,
          istheatered = o.istheatered,
          isvrmode = o.isvrmode;

      // simple for now
      var maximizeClassName = '.ismaximized-' + ismaximized;
      var fittedClassName = '.isfitted-' + true;      
      var aspectClassName = '.isaspect-' + cycvideo_aspect.nearestaspect(o.wharr);

      var minmaxgroup = ismaximized;

      return div('#cycvideo' + opts.uid + '.cycvideo' + maximizeClassName + fittedClassName + aspectClassName, [
        cycvideo_video.view(opts, playstate, blob, ismaximized, istheatered, wharr),
        cycvideo_slategroup.view(opts, playstate, progress),
        
        div('.cycvideo_ctrls', [
          cycvideo_slideseek.view(state$, buffer, progress),
          div('.cycvideo_ctrls_col', [
            div('.cycvideo_ctrls_colleft', [                  
              cycvideo_bttnplaystate.view(state$, playstate),
              //cycvideo_dropvrmode.view(state$, isvrmode),    
              cycvideo_labelindicator.view(state$, buffer)
            ]),
            div('.cycvideo_ctrls_colright', [
              cycvideo_bttnvr.view(state$, minmaxgroup),
              cycvideo_bttncc.view(state$, minmaxgroup),              
              cycvideo_bttnspeaker.view(state$, minmaxgroup),
              cycvideo_bttngear.view(state$, minmaxgroup),            
              cycvideo_bttntheater.view(state$, minmaxgroup),
              cycvideo_bttngroupminmax.view(state$, ismaximized)
            ])
          ])
        ])
      ]);
    });
  }

  //export default DOM => view(model(intent(DOM, cycvideo_opts({
  return {

    DOM : sources => {
      return view(model(intent(sources, cycvideo_opts({
        uid : 1,
        wharr : [
          // http://stackoverflow.com/questions/4129102/html5-video-dimensions
          // ^^^ would be preferable
          
          // 1280, 720 // Sample.mp4
          //640, 320 // for testdrive 2:1 format
          640, 480 // cat video
        ],
        srcarr : [
          'http://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4'
          //'./testdrive.mp4' + '?' + Date.now
        ],
        ismaximized : false,
        istheatered : false,
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
    },
    HTTP : function (sources) {
      return rx.Observable.just({
        url : 'http://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4',
        type : '',          
        method : 'GET',
        progress : true,
        responseType : 'blob'
      });
    }
  }; 

  return o;  

}({}));
