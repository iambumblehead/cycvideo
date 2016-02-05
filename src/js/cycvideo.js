// Filename: cycvideo.js  
// Timestamp: 2016.02.04-18:49:12 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import Rx from 'rx-dom';
import { h } from '@cycle/dom';
import xdrgo from 'xdrgo';
import {div, span, input, h2, makeDOMDriver} from '@cycle/dom';

import cycvideo_bttnplay from './cycvideo_bttnplay';
import cycvideo_bttnpause from './cycvideo_bttnpause';
import cycvideo_bttnload from './cycvideo_bttnload';
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

  var playstate$ = Rx.Observable.merge(
    DOM.select('#uidcycvideo_bttnplay').events('click').map(ev => 'play'),
    DOM.select('.cycvideo_bttnpause').events('click').map(ev => 'pause'),
    DOM.select('.cycvideo_bttnload').events('click').map(ev => 'load')      
  );

  if (typeof document === 'object') {
    cycvideo_req.getblob$({
      url :'http://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4'
    }).subscribe(
      function (e) { console.log(e.type === 'progress' ? (e.loaded/e.total) * 100 : e); },
      function (e) { console.log('onError: %s', e); },
      function ()  { console.log('onCompleted'); });
  }  
  
  
  playstate$.subscribe(function (s) {
    console.log('subscriber... ', s);
    if (s === 'play') {
      document.getElementsByTagName('video')[0].play();
    } else if (s === 'pause') {
      document.getElementsByTagName('video')[0].pause();
    }
    return s;
  });
    
  return {
    changeWeight$: getSliderEvent(DOM, 'weight'),
    changeHeight$: getSliderEvent(DOM, 'height'),
    playstate$ : playstate$,
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
    actions.changeWeight$.startWith(70),
    actions.changeHeight$.startWith(170),
    actions.playstate$.startWith('load'),
    actions.wharr$,
    //actions.w$.startsWith(640),
    (weight, height, playstate, wharr) => {
      return {weight, height, playstate, wharr};
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
  return state$.map(({weight, height, playstate, wharr}) => div('#cyclevideo .cyclevideo', [
    renderWeightSlider(weight),
    renderHeightSlider(height),
    cycvideo_bttnplay.view(state$),
    cycvideo_bttnpause.view(state$),
    cycvideo_bttnload.view(state$),
    cycvideo_video.view(state$, wharr),
    
    h2('State is ' + playstate)
  ]));
}

typeof document === 'object' && (function () {
  console.log('go!');
}());

export default DOM => view(model(intent(DOM)));
