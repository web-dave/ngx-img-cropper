
/**
 * @tests vows
 */

var vows = require('vows')
  , assert = require('assert')
  , version = require('../lib/version');

vows.describe('Self package.json Fetching').addBatch({
  'when fetching this packages version with no parameters but a callback':{
    topic:function(){ 
      version.fetch(this.callback);
    },
    'we should receive no error back and receive a version in string format':function(error, version) {
      assert.equal(error, null);
      assert.notEqual(version, null);
      assert.equal(typeof(version), 'string');
    }
  }
}).export(module);

/* EOF */