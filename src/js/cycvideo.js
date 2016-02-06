// Filename: cycvideo.js  
// Timestamp: 2016.02.05-18:08:25 (last modified)
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

// http://staltz.com/unidirectional-user-interface-architectures.html
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/callbacks.md

function renderSlider(label, value, unit, id, min, max) {
  return div([
    '' + label + ' ' + value + unit,
    input('#' + id, {type: 'range', min, max, value})
  ]);
}

function renderWeightSlider(weight) {
  return renderSlider('Weight', weight, 'kg', 'weight', 40, 140);
}

function renderHeightSlider(height) {
  return renderSlider('Height', height, 'cm', 'height', 140, 210);
}

function getSliderEvent(DOM, id) {
  return DOM.select('#' + id).events('input').map(ev => ev.target.value);
}

// * intent() function
//   Purpose: interpret DOM events as user’s intended actions
//   Input: DOM Driver source
//   Output: Action Observables
//
function intent(DOM) {

  //   Cold observables start running upon subscription, i.e., the observable
  // sequence only starts pushing values to the observers when Subscribe is
  // called. Values are also not shared among subscribers. This is different
  // from hot observables such as mouse move events or stock tickers which are
  // already producing values even before a subscription is active. When an
  // observer subscribes to a hot observable sequence, it will get the current
  // value in the stream. The hot observable sequence is shared among all
  // subscribers, and each subscriber is pushed the next value in the sequence.
  // For example, even if no one has subscribed to a particular stock ticker,
  // the ticker will continue to update its value based on market movement.
  var playstate$ = Rx.Observable.merge(
    DOM.select('#uidcycvideo_bttnplay').events('click').map(ev => 'play'),
    DOM.select('.cycvideo_bttnpause').events('click').map(ev => 'pause'),
    DOM.select('.cycvideo_bttnload').events('click').map(ev => 'load')      
  );

  var fillmode$ =  Rx.Observable.merge(
    DOM.select('#uidcycvideo_dropfillmode').events('change').pluck('target','value')//.map(ev => 'fill')
  );

  var vrmode$ =  Rx.Observable.merge(
    DOM.select('#uidcycvideo_dropvrmode').events('change').pluck('target', 'value')
  );

  // indicator, includes fulltime and seek time
  var indicator$ = Rx.Observable.just('');    

  var blob$;
  if (typeof document === 'object') {
    blob$ = cycvideo_req.getblob$({
      url :'http://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4'
    });
    // use slider...
    //blob$ = blob$.publish();
    
    blob$.subscribe(
      function (e) { console.log('blog$ progress ' + e.type === 'progress' ? (e.loaded/e.total) * 100 : e); },
      function (e) { console.log('onError: %s', e); },
      function ()  { console.log('onCompleted'); }
    );

  } else {
    blob$ = Rx.Observable.just('');
  }

  var progress$ = Rx.Observable.merge(
    blob$
  ).map((ev) => {
    return typeof ev === 'object' ? (ev.loaded/ev.total) * 100 : 100;
  }).filter(ev => ev).map(ev => typeof ev === 'number' ? ev : 100);

  // 'progress', 'timeupdate', 'canplay', 'play', 'pause'
  // seek, includes progress and seek area

  var timeupdate$ = Rx.Observable.merge(
    typeof document === 'object' ?
      Rx.DOM.fromEvent(document.getElementById('cycvideo_video'), 'timeupdate') :
      DOM.select('#cycvideo_video').events('timeupdate')
  ).map((ev) => {
    console.log('timeupdate$');
    
    return ev;
  });
  
  var seek$ = Rx.Observable.just('');

  
  var buffer$ = Rx.Observable.merge(
    timeupdate$
  ).pluck('target').map(function (videoelem) {
    var videobuff = cycvideo_buffer.get_buffer_state(videoelem);

    console.log('buffer', videobuff);
    
    return videobuff;
  });
//  ).map(function (e) {
//  });
  
  /*
    //DOM.select('#cycvideo_video').events('timeupdate').pluck('target', 'value')
    DOM.select('#cycvideo_video').events('timeupdate').map(function (e) {
        var videoelem = o.get_video_elem(player),
            videobuff = fsgoplayer_buffer.player_get_buffer_state(videoelem),
            fulltimeelem = o.get_video_layer_control_fulltime_elem(player),
            seektimeelem = o.get_video_layer_control_seektime_elem(player),
    })
*/
//  );
  

  // add load circle??
  // seek comes from
  
  
  playstate$.subscribe(function (s) {
    if (s === 'play') {
      document.getElementsByTagName('video')[0].play();
    } else if (s === 'pause') {
      document.getElementsByTagName('video')[0].pause();
    }
    return s;
  });

  // load should change to 'pause'  
  return {
    //.pluck('target','value')
    fillmode$: fillmode$,
    vrmode$: vrmode$,    
    //changeWeight$: getSliderEvent(DOM, 'weight'),
    //changeHeight$: getSliderEvent(DOM, 'height'),
    buffer$ : buffer$,
    playstate$ : Rx.Observable.merge(
      playstate$,
      blob$.map(e => e.length ? 'pause' : 'load')),
    progress$ : progress$,
    blob$ : blob$,
    seek$ : seek$,
    indicator$ : indicator$,    
    wharr$ : Rx.Observable.just([640, 480])
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
    actions.playstate$.startWith('load'),
    actions.progress$.startWith(0),    
    actions.blob$.startWith(''),
    actions.buffer$.startWith({
      load_percent : 0.0,
      seek_percent : 0.0
    }),
    actions.seek$.startWith(''),
    actions.indicator$.startWith(''),
    
    actions.wharr$,
    actions.fillmode$.startWith('fitted'),
    actions.vrmode$.startWith('flat'),
    //actions.w$.startsWith(640),
    //(weight, height, playstate, blob, seek, indicator, wharr, fillmode, vrmode) => {
    //  return {weight, height, playstate, blob, seek, indicator, wharr, fillmode, vrmode};
    (playstate, progress, blob, buffer, seek, indicator, wharr, fillmode, vrmode) => {
      return {playstate, progress, blob, buffer, seek, indicator, wharr, fillmode, vrmode};    
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
  //return state$.map(({weight, height, playstate, blob, seek, indicator, wharr, fillmode, vrmode}) => div('#cyclevideo .cyclevideo', [
  return state$.map(({playstate, progress, blob, buffer, seek, indicator, wharr, fillmode, vrmode}) => div('#cyclevideo .cyclevideo', [
    //renderWeightSlider(weight),
    //renderHeightSlider(height),
    
    cycvideo_bttngroup.view(state$, playstate),
    cycvideo_dropfillmode.view(state$, fillmode),
    cycvideo_dropvrmode.view(state$, vrmode),    
    cycvideo_video.view(state$, blob, wharr),
    cycvideo_labelindicator.view(state$, indicator),
    cycvideo_slideseek.view(state$, buffer, progress, seek),    

    
    h2('State is ' + playstate)
  ]));
}

export default DOM => view(model(intent(DOM)));
