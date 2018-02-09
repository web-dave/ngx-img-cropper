
/**
 * @example pattern/string formating
 * @description fetch current version of express, and use a 
 * RegExp with a string to format the result before returning it 
 */

var version = require('../lib/version');

version.fetch('express', { from : /^/gi, to : "v" }, function(error, version) {
  if (error) {
    console.error(error);
  } else {
    console.log('express current version with formating:', version);
  };
});

/* EOF */