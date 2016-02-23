// Filename: cycvideo_mvi.js  
// Timestamp: 2016.02.22-18:03:05 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

const rx = require('rx-dom'),
      winurl = require('winurl'),
      cycledom = require('@cycle/dom'),
      rxcombinelatestobj = require('rx-combine-latest-obj'),

      cycvideo_req = require('./cycvideo_req'),
      cycvideo_dom = require('./cycvideo_dom'),
      cycvideo_opts = require('./cycvideo_opts'),
      cycvideo_video = require('./cycvideo_video'),
      cycvideo_aspect = require('./cycvideo_aspect'),
      cycvideo_bttncc = require('./cycvideo_bttncc'),
      cycvideo_bttnvr = require('./cycvideo_bttnvr'),
      cycvideo_buffer = require('./cycvideo_buffer'),
      cycvideo_bttngear = require('./cycvideo_bttngear'),
      cycvideo_slideseek = require('./cycvideo_slideseek'),
      cycvideo_slategroup = require('./cycvideo_slategroup'),
      cycvideo_dropvrmode = require('./cycvideo_dropvrmode'),
      cycvideo_bttnspeaker = require('./cycvideo_bttnspeaker'),
      cycvideo_bttntheater = require('./cycvideo_bttntheater'),
      cycvideo_bttnplaystate = require('./cycvideo_bttnplaystate'),
      cycvideo_labelindicator = require('./cycvideo_labelindicator'),
      cycvideo_bttngroupminmax = require('./cycvideo_bttngroupminmax');


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

          // removed this, but could be re-added, removed focus from slider
          // document.getElementById('uidcycvideo_dropfillmode').focus();          
          seektime$ = slideseekstreams.change$
            .map(e => e.target)
            .map(seekelem => cycvideo_video.setseekposition(opts, seekelem.value)),

          buffer$ = rx.Observable
            .merge(timeupdate$, seektime$)
            .map(e => cycvideo_dom.get_video_elem(opts))
            .map(cycvideo_buffer.get_buffer_state_videoelem),

          slate$ = cycvideo_slategroup.streams(sources.DOM, opts),

          playstate$ = rx.Observable
            .merge(
              slate$,
              slideseekstreams.focus$.map(e => 'pause'),              
              bttnplaystate$, blob$.map(e => e.length ? 'pause' : 'load')),

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
        buffer$      = actions.buffer$.startWith(cycvideo_buffer.get_buffer_state()),
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
      var opts        = o.opts,
          playstate   = o.playstate,
          progress    = o.progress,
          blob        = o.blob,
          buffer      = o.buffer,
          wharr       = o.wharr,
          ismaximized = o.ismaximized,
          istheatered = o.istheatered,
          isvrmode    = o.isvrmode;

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
