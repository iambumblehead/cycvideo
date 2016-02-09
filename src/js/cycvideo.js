// Filename: cycvideo.js  
// Timestamp: 2016.02.08-18:17:19 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import Rx from 'rx-dom';
import { h } from '@cycle/dom';
import xdrgo from 'xdrgo';
import {div, span, input, h2, makeDOMDriver} from '@cycle/dom';
import cycvideo_bttngroup from './cycvideo_bttngroup';
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

  var opt$ = Rx.Observable.just(opts);    
  
  var bttngroup$ = cycvideo_bttngroup.streams(DOM, opts);

  var fillmode$ = DOM.select('#uidcycvideo_dropfillmode')
        .events('change').pluck('target', 'value');

  var vrmode$ = DOM.select('#uidcycvideo_dropvrmode')
        .events('change').pluck('target', 'value');

  //var blob$ = Rx.Observable.just('');
  //if (typeof document === 'object') {
 var blob$ = cycvideo_req.getblob$({
      url : opts.srcarr[0]
    });
    blob$.subscribe(
      function (e) { console.log('blog$ progress ' + e.type === 'progress' ? (e.loaded/e.total) * 100 : e); },
      function (e) { console.log('onError: %s', e); },
      function ()  { console.log('onCompleted'); }
    );
  //}

  var progress$ = blob$.map((ev) => {
    return typeof ev === 'object' ? (ev.loaded/ev.total) * 100 : 100;
  }).filter(ev => ev).map(ev => typeof ev === 'number' ? ev : 100);

  // 'progress', 'timeupdate', 'canplay', 'play', 'pause'
  // seek, includes progress and seek area
  var timeupdate$ = Rx.Observable.merge(
    typeof document === 'object' ?
      //Rx.DOM.fromEvent(document.getElementById('cycvideo_video'), 'timeupdate') :
      Rx.DOM.fromEvent(cycvideo_dom.get_video_elem(opts), 'timeupdate') :
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

  var buffer$ = Rx.Observable.merge(timeupdate$, seek$)
        .filter(cycvideo_dom.is_doc)
        .map(e => cycvideo_dom.get_video_elem(opts))
        .map(cycvideo_buffer.get_buffer_state);


  var playstate$ = Rx.Observable.merge(
    seekfocus$,
    bttngroup$,
    blob$.map(e => e.length ? 'pause' : 'load'));

  return {
    opt$        : opt$,
    fillmode$   : fillmode$,
    timeupdate$ : timeupdate$,
    vrmode$     : vrmode$,    
    buffer$     : buffer$,
    playstate$  : playstate$,
    progress$   : progress$,
    blob$       : blob$,
    seek$       : seek$,
    wharr$      : Rx.Observable.just([640, 480])
  };
}

// * model() function
//   Purpose: manage state
//   Input: Action Observables
//   Output: state$ Observable
//
function model(actions) {
  //return Rx.Observable.merge(
  return Rx.Observable.combineLatest(
    //actions.changeWeight$.startWith(70),
    //actions.changeHeight$.startWith(170),
    actions.opt$,
    actions.playstate$.startWith('load'),
    actions.timeupdate$.startWith({}),
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
    actions.fillmode$.startWith('fitted'),
    actions.vrmode$.startWith('flat'),

    (opts, playstate, timeupdate, progress, blob, buffer, seek,  wharr, fillmode, vrmode) => {
      return {opts, playstate, timeupdate, progress, blob, buffer, seek,  wharr, fillmode, vrmode};    
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
  return state$.map(({opts, playstate, timeupdate, progress, blob, buffer, seek,  wharr, fillmode, vrmode}) => {
    return div('.cycvideo', [
      cycvideo_video.view(state$, opts, playstate, blob, wharr),
      
      div('.cycvideo_ctrls', [    
        cycvideo_bttngroup.view(state$, playstate),
        cycvideo_dropfillmode.view(state$, fillmode),
        cycvideo_dropvrmode.view(state$, vrmode),    
        cycvideo_labelindicator.view(state$, buffer),
        cycvideo_slideseek.view(state$, buffer, progress)
      ])
      //h2('State is ' + playstate)
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
  ],
  istesting : true,
  isstats : true,
  isxhrloaded : true,
  iscontrols : false,
  autoplay : true,
  loop : true
  //poster : fsgovrpg_feed.getProgramFittedThumbnail(program, videoelem),
  //fillmode : fsgoplayer.fillmode_fill,
  //vrmode   : fsgoplayer.vrmode_panorama
  

}))));
