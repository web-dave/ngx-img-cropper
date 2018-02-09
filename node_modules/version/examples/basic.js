
/**
 * @example basic
 * @description fetch current version of express  
 */

var version = require('../lib/version');

version.fetch('express', function(error, version) {
  if (error) {
    console.error(error);
  } else {
    console.log('express current version:', version);
  };
});

/* EOF */