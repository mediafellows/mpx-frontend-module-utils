var glob = require('glob');
var concat = require('concat');
var _ = require('lodash');

glob('dist/*.js', {}, function (error, files) {
  if (error) {
    console.log(error);
    return;
  }

  files = _.filter(files, function (file) {
    console.log(file);
    if (file !== 'dist/module.js')
      return file;
  })

  files.unshift('dist/module.js');

  concat(files, 'index.js', function (error) {
    if (error) console.log(error);
  });
});
