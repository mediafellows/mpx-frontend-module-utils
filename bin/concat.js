var glob = require('glob');
var concat = require('concat');

glob('dist/*.js', {}, function (error, files) {
  if (error) {
    console.log(error);
    return;
  }

  concat(files, 'index.js', function (error) {
    if (error) console.log(error);
  });
});
