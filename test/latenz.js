(() => {
  'use strict';

  const assert = require('chai').assert;
  const Latenz = require('../');

  suite('Structure', function() {
    setup(function() {
      this.latenz = new Latenz();
    });

    suite('Object', function() {
      test('constructor returns Latenz object', function() {
        assert.equal(this.latenz.constructor.name, 'Latenz');
      });
    });
  });
})();
