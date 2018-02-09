
/**
 * @tests vows
 */

var vows = require('vows')
  , assert = require('assert')
  , version = require('../lib/version');

vows.describe('General Module Tests').addBatch({
  'when instantiating version':{
    topic:function(){ 
      return version;
    },
    'version should be an object and version.fetch and should be a function':function(topic) {
      assert.equal(typeof(version), 'object');
      assert.equal(typeof(version.fetch), 'function');
    }
  },
  'when fetching this packages version without any other formal parameters':{
    topic:function(){ 
      version.fetch('version', this.callback);
    },
    'we should receive no error back and receive a version in string format':function(error, version) {
      assert.equal(error, null);
      assert.notEqual(version, null);
      assert.equal(typeof(version), 'string');
    }
  }
}).export(module);

/* EOF */