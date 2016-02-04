// Filename: mvi.js  
// Timestamp: 2016.02.03-18:59:49 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import Rx from 'rx-dom';
import { h } from '@cycle/dom';
import {div, span, input, h2, makeDOMDriver} from '@cycle/dom';

import cycvideo_bttnplay from './cycvideo_bttnplay';
import cycvideo_bttnpause from './cycvideo_bttnpause';
import cycvideo_bttnload from './cycvideo_bttnload';
import cycvideo_video from './cycvideo_video';

function renderSlider(label, value, unit, id, min, max) {
  return div([
    '' + label + ' ' + value + unit,
    input('#' + id, {type: 'range', min, max, value})
  ]);
}

function renderWeightSlider(weight) {
  console.log('render it');
  return renderSlider('Weight', weight, 'kg', 'weight', 40, 140);
}

function renderHeightSlider(height) {
  return renderSlider('Height', height, 'cm', 'height', 140, 210);
}

function getSliderEvent(DOM, id) {
  return DOM.select('#' + id).events('input').map(ev => ev.target.value);
}

function intent(DOM) {
  return {
    changeWeight$: getSliderEvent(DOM, 'weight'),
    changeHeight$: getSliderEvent(DOM, 'height'),
    playstate$ : Rx.Observable.merge(
      DOM.select('.cycvideo_bttnplay').events('click').map(ev => 'play'),
      DOM.select('.cycvideo_bttnpause').events('click').map(ev => 'pause'),
      DOM.select('.cycvideo_bttnload').events('click').map(ev => 'load')      
    )
  };
}

function model(actions) {
  return Rx.Observable.combineLatest(
    actions.changeWeight$.startWith(70),
    actions.changeHeight$.startWith(170),
    actions.playstate$.startWith('load'),
    (weight, height, playstate) => {
      return {weight, height, playstate};
    }
  );
}

// load cat video
// observe the statestream
function view(state$) {
  return state$.map(({weight, height, playstate}) => div('#cyclevideo .cyclevideo', [
    renderWeightSlider(weight),
    renderHeightSlider(height),
    cycvideo_bttnplay.view(state$),
    cycvideo_bttnpause.view(state$),
    cycvideo_bttnload.view(state$),
    cycvideo_video.view(state$),
    
    h2('State is ' + playstate)
  ]));
}

typeof document === 'object' && (function () {
  console.log('go!');
}());

export default DOM => view(model(intent(DOM)));
