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

  suite('Usage', function() {
    setup(function() {
      this.latenz = new Latenz();
    });

    test('Measure latency for google.com', function(done) {
      this.latenz.measure('google.com').then((result) => {
        assert.equal(result.constructor.name, 'Array');

        done();
      }).catch((e) => {
        done(e);
      });
    });

    test('Pretty print latency for sbstjn.com', function(done) {
      this.latenz.pretty('sbstjn.com').then((result) => {
        assert.equal(result.constructor.name, 'String');
        assert.notEqual(result.indexOf('sbstjn.com'), -1);

        done();
      }).catch((e) => {
        done(e);
      });
    });

    test('Raw latency for heft.io', function(done) {
      this.latenz.raw('heft.io').then((result) => {
        assert.equal(result.constructor.name, 'String');
        assert.equal(result.indexOf('heft.io'), -1);
        assert.equal(result.indexOf('resolve:'), 0);

        done();
      }).catch((e) => {
        done(e);
      });
    });

  });
})();
