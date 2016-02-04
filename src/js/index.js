// Filename: index.js  
// Timestamp: 2016.02.03-16:19:00 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import { run } from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import cycvideo from './cycvideo';

run(({ DOM }) => ({
	DOM: cycvideo(DOM).skip(1)
}), {
	DOM: makeDOMDriver('#root')
});
