// Filename: cycvideo_mvi.js  
// Timestamp: 2016.02.22-17:09:54 (last modified)
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

    const opts$ = rx.Observable.just(opts),
          bttnplaystate$ = cycvideo_bttnplaystate.streams(sources.DOM, opts),
          ismaximized$ = cycvideo_bttngroupminmax.streams(sources.DOM, opts),
          istheatered$ = cycvideo_bttntheater.streams(sources.DOM, opts),
          isvrmode$ = cycvideo_bttnvr.streams(sources.DOM, opts),
          blobhttp$ = sources.HTTP.mergeAll()
            .filter(e => ~e.request.url.indexOf(opts.srcarr[0])),
          blob$ = blobhttp$
            .filter(e => e.xhr && e.xhr.response)
            .map(e => winurl.createObjectURL(e.xhr.response))
            .startWith(''),
          progress$ = blobhttp$
            .filter(e => typeof e.total === 'number')
            .map(e => e.total && e.loaded / e.total * 100),
          timeupdate$ = cycvideo_video.streams(sources.DOM, opts).timeupdate$,
          slideseekstreams = cycvideo_slideseek.streams(sources.DOM, opts),
          seekfocus$ = slideseekstreams.focus$.map(ev => 'pause'),

          // removed this, but could be readded, removed focus from slider
          // document.getElementById('uidcycvideo_dropfillmode').focus();          
          seektime$ = slideseekstreams.change$
            .map(ev => ev.target)
            .map(seekelem => cycvideo_video.setseekposition(opts, seekelem.value)),

          buffer$ = rx.Observable
            .merge(timeupdate$, seektime$)
            .map(e => cycvideo_dom.get_video_elem(opts))
            .map(cycvideo_buffer.get_buffer_state_videoelem),

          slate$ = cycvideo_slategroup.streams(sources.DOM, opts),

          playstate$ = rx.Observable
            .merge(slate$, seekfocus$, bttnplaystate$, blob$.map(e => e.length ? 'pause' : 'load')),

          // should observe an event upon which video element src attribute is updated
          // then wharr should be modified to read video element
          wharr$ = rx.Observable.just(opts.wharr);

    
    return {
      opts$        : opts$,
      buffer$      : buffer$,
      playstate$   : playstate$,
      progress$    : progress$,
      blob$        : blob$,
      seektime$    : seektime$,
      ismaximized$ : ismaximized$,
      istheatered$ : istheatered$,
      isvrmode$    : isvrmode$,
      wharr$       : wharr$ 
    };
  }

  function model(actions) {
    var opts$        = actions.opts$,
        playstate$   = actions.playstate$.startWith('load'),
        actions$     = actions.progress$.startWith(0),
        blob$        = actions.blob$,
        buffer$      = actions.buffer$.startWith(cycvideo_video.get_buffer_state()),
        wharr$       = actions.wharr$,        
        seektime$    = actions.seektime$.startWith(0),
        ismaximized$ = actions.ismaximized$.startWith(false),
        istheatered$ = actions.istheatered$.startWith(false),
        isvrmode$    = actions.isvrmode$.startWith(false);
    
    return rxcombinelatestobj({
      opts$, playstate$, actions$, blob$, buffer$, seektime$,
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
          //seektime = o.seektime,
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

  return {

    DOM : sources => view(model(intent(sources, cycvideo_opts({
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
    })))),

    HTTP : sources => rx.Observable.just({
      url : 'http://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4',
      type : '',          
      method : 'GET',
      progress : true,
      responseType : 'blob'
    })
  }; 

  return o;  

}({}));
