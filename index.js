var less = require('less'),
  path = require('path');

hexo.extend.renderer.register('less', 'css', function(data, options, callback){
  var themeConfig = hexo.theme.config.less || {};
  var cwd = process.cwd();
    var paths = (themeConfig.paths || []).map(function(filepath){
    return path.join(cwd, filepath);    // assuming paths are relative from the root of the project
  });

  var parser = new less.Parser({
    paths: paths.concat(path.dirname(data.path)),
    filename: path.basename(data.path)
  });

  parser.parse(data.text, function(err, tree){
    if (err) return callback(err);
    callback(null, tree.toCSS(options));
  });
});
