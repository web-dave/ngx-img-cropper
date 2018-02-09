
/**
 * @module version
 * @author Edward Hotchkiss <edwardhotchkiss@me.com>
 * @description Node.js package.json version number fetcher
 * @license MIT
 */

var fs = require('fs')
  , path = require('path')
  , request = require('request');

/**
 * @method fetch
 * @param {String} npm module name
 * @param {Function} callback
 * @param {Object} _optional options
 * @returns {Object} error {String} version
 */

exports.fetch = function(name, options, callback) {
  // self
  if (arguments[1] === undefined) {
    var callback = name;
    fs.readFile(process.cwd()+"/package.json", 'utf8', function(error, data) {
      if (error) {
        callback(error, null);
      } else {
        var pkg = JSON.parse(data);
        var _version = pkg['version'];
        callback(null, _version);
      }
    });
  // external  
  } else {
    callback = callback || options;
    request('http://registry.npmjs.org/' + name + '/latest', function(error, response, body) {
      if (error) {
        callback(error, null);
      } else if (response.statusCode === 404) {
        callback(new Error('module not found in registry!'), null);
      } else {
        try {
          data = JSON.parse(body);
          var _version = data['version'];
          if (options && options.from && options.to) {
            _version = _version.replace(options.from, options.to);
            callback(null, _version);
          } else {
            callback(null, _version);
          };
        } catch(error) {
          callback(error, null);
        }
     }
    });
  }
};

/* EOF */