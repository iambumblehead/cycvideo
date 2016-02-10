// Filename: cycvideo.js  
// Timestamp: 2016.02.09-23:48:07 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import rx from 'rx-dom';
import xdrgo from 'xdrgo';
import {div, span, input, h2, makeDOMDriver} from '@cycle/dom';
import cycvideo_bttngroup from './cycvideo_bttngroup';
import cycvideo_bttngear from './cycvideo_bttngear';
import cycvideo_bttnspeaker from './cycvideo_bttnspeaker';
import cycvideo_bttntheater from './cycvideo_bttntheater';
import cycvideo_slategroup from './cycvideo_slategroup';
import cycvideo_bttngroupminmax from './cycvideo_bttngroupminmax';
import cycvideo_labelindicator from './cycvideo_labelindicator';
import cycvideo_slideseek from './cycvideo_slideseek';
import cycvideo_dropfillmode from './cycvideo_dropfillmode';
import cycvideo_dropvrmode from './cycvideo_dropvrmode';
import cycvideo_buffer from './cycvideo_buffer';
import cycvideo_video from './cycvideo_video';
import cycvideo_req from './cycvideo_req';
import cycvideo_dom from './cycvideo_dom';
import cycvideo_opts from './cycvideo_opts';

// http://staltz.com/unidirectional-user-interface-architectures.html
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/callbacks.md

// * intent() function
//   Purpose: interpret DOM events as user’s intended actions
//   Input: DOM Driver source
//   Output: Action Observables
//
function intent(DOM, opts) {

  var opt$ = rx.Observable.just(opts);    
  
  var bttngroup$ = cycvideo_bttngroup.streams(DOM, opts);
  var minmaxgroup$ = cycvideo_bttngroupminmax.streams(DOM, opts);  

  var fillmode$ = DOM.select('#uidcycvideo_dropfillmode')
        .events('change').pluck('target', 'value');

  var vrmode$ = DOM.select('#uidcycvideo_dropvrmode')
        .events('change').pluck('target', 'value');

  var blob$ = cycvideo_req.getblob$({
    url : opts.srcarr[0]
  });

  /*
  blob$.subscribe(
    function (e) { console.log('blog$ progress ' + e.type === 'progress' ? (e.loaded/e.total) * 100 : e); },
    function (e) { console.log('onError: %s', e); },
    function ()  { console.log('onCompleted'); }
  );
   */
  var progress$ = blob$.map((ev) => {
    return typeof ev === 'object' ? Math.floor((ev.loaded/ev.total) * 100) : 100;
  }).startWith(0).debounce(600).map(v => typeof document === 'object' ? v : 0);

  progress$.subscribe(
    function (e) { console.log('blog$ progress ' + e.type === 'progress' ? (e.loaded/e.total) * 100 : e); },
    function (e) { console.log('onError: %s', e); },
    function ()  { console.log('onCompleted'); }
  );
  

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
    //wharr$      : rx.Observable.just([640, 480])
  };
}

// * model() function
//   Purpose: manage state
//   Input: Action Observables
//   Output: state$ Observable
//
function model(actions) {
  return rx.Observable.combineLatest(
    actions.opt$,
    actions.playstate$.startWith('load'),
    actions.progress$.startWith(0),
    actions.blob$.startWith(''),
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
  );
}


// * view() function
//   Purpose: visually represent state from the Model
//   Input: state$ Observable
//   Output: Observable of VTree as the DOM Driver sink
//
// load cat video
// observe the statestream
function view(state$) {
  return state$.map(({opts, playstate, progress, blob, buffer, seek,  wharr, minmaxgroup, fillmode, vrmode}) => {
    
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

export default DOM => view(model(intent(DOM, cycvideo_opts({
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
  autoplay    : true,
  loop        : true
  //poster : feed.getProgramFittedThumbnail(program, videoelem),
  //fillmode : cyclvideo_opts.fillmode_fill,
  //vrmode   : cyclvideo_opts.vrmode_panorama
  

}))));
