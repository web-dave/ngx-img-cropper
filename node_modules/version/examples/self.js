
/**
 * @example self
 * @description get version of active package
 */

var version = require('../lib/version');

version.fetch(function(error, version) {
  if (error) {
    console.error(error);
  } else {
    console.log('`version` package current version:', version);
  };
});

/* EOF */