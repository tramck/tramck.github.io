var fs = require('fs');
var watchify = require('watchify');
var browserify = require('browserify');

var b = browserify({
  entries: ['../_js/index.js'],
  cache: {},
  packageCache: {},
  plugin: [watchify]
});

b.on('update', bundle);
bundle();

function bundle() {
  b.transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(fs.createWriteStream('output.js'));
}