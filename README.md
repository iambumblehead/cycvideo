cycvideo
========

Experimental video player using trendy reactive programming, es6, Rx.js, and cycle.js.

nothing to see here yet.

<!--
https://github.com/tc39/ecma262

While ES6 provides syntax for import/export, it currently *does nothing*,
anywhere, because the loader spec is not finished
( https://github.com/whatwg/loader ). ES6 Modules are not yet a thing; they do
not yet exist. !babel simply transpiles import/export to `require`, which is not
guaranteed to work once the loader is finished. Use CommonJS modules for now.



iambumblehead Feb 12 11:57
Reactive-Extensions/RxJS-DOM#109

Cmdv Feb 12 12:05
ah ok, if you have a look at [this][0] I've put it in my model.

In this case my [intent][1] listens to the DOM input bar and when Enter is pressed
it sends the stream to [index.js][2] from there it goes into the model as `intent$`

I use what has been inputed and use it to create an http request [here][3]. From
there I send it back to index.js and out to HTTP driver with `mergedQuery$`.

So it goes off to the driver does the HTTP request comes back to the component
via the `sources.HTTP` which again I pass into my [model][4] and deal with the response
and set it up to how I want it to look, then back out to index.js and from
there into my view with `HTTPres$`.

now in view I can map over [HTTPres$][5].

This just shows you how the data and streams get passed around the app, always
look at the sources then the returns/sinks and usually in the index is where I
do my piping.

iambumblehead Feb 12 14:33
@Cmdv thank you so much

Cmdv Feb 12 14:37
no worries @iambumblehead hopefully that gives you an insight into how things
are passed around a cycle app, took me a while to understand that. The next
issue is controlling those streams in terms of who they are shared to and if
they need to be cold or hot observable.


[0]: https://github.com/Cmdv/cycle-natural-language-search/blob/master/src/client/dialogue/components/search-bar/searchbar-model.js#L5-L12
[1]: https://github.com/Cmdv/cycle-natural-language-search/blob/master/src/client/dialogue/components/search-bar/searchbar-intent.js#L7-L16
[2]: https://github.com/Cmdv/cycle-natural-language-search/blob/master/src/client/dialogue/components/search-bar/searchbar-index.js#L8
[3]: https://github.com/Cmdv/cycle-natural-language-search/blob/master/src/client/dialogue/components/search-bar/searchbar-model.js#L5-L12
[4]: https://github.com/Cmdv/cycle-natural-language-search/blob/master/src/client/dialogue/components/search-bar/searchbar-model.js#L14-L17
[5]: https://github.com/Cmdv/cycle-natural-language-search/blob/master/src/client/dialogue/components/search-bar/searchbar-view.js#L4
-->

