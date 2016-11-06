// MyPlugin.js

function MyPlugin(options) {
  // Configure your plugin with options...
}




MyPlugin.prototype.apply = function(compiler) {
  // ...
  compiler.plugin('compilation', function(compilation) {

    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      var value = '<script language="javascript" src="config.js"></script>';

      htmlPluginData.html = value + htmlPluginData.html;
      callback(null, htmlPluginData);
    });
  });

};

module.exports = MyPlugin;