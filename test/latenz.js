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

    suite('Measure', function() {
      test('http://google.com:80', function(done) {
        this.latenz.measure('google.com').then((result) => {
          assert.equal(result.constructor.name, 'Array');

          done();
        }).catch((e) => {
          done(e);
        });
      });

      test('http://google.com:443', function(done) {
        this.latenz.measure('google.com', {port: 443}).then((result) => {
          assert.equal(result.constructor.name, 'Array');

          done();
        }).catch((e) => {
          done(e);
        });
      });

      test('https://google.com:443', function(done) {
        this.latenz.measure('google.com', {secure: true}).then((result) => {
          assert.equal(result.constructor.name, 'Array');

          done();
        }).catch((e) => {
          done(e);
        });
      });

      test('https://google.com:80', function(done) {
        this.latenz.measure('google.com', {secure: true, port: 80}).then((result) => {
          assert.equal(result.constructor.name, 'Array');

          done();
        }).catch((e) => {
          done(e);
        });
      });


      test('https://sbstjn.com:8443', function(done) {
        this.latenz.measure('google.com', {secure: true, port: 8443}).then((result) => {
          assert.equal(result.constructor.name, 'Array');

          done();
        }).catch((e) => {
          done(e);
        });
      });
    })

    suite('Formatter', function() {
      test('Pretty', function(done) {
        let formatter = this.latenz.formatter('pretty').action;
        let values = [
          {key: 'socket', time: 10},
          {key: 'lookup', time: 20}
        ];

        formatter(values).then(function(result) {
          //       Connection: 10ms
          //      Name Lookup: 20ms       (30ms)
          //
          //            total: 30ms

          assert.typeOf(result, 'String');

          assert.include(result, 'Connection: 10ms', 'Connection');
          assert.include(result, 'Name Lookup: 20ms', 'Name Lookup');
          assert.include(result, 'total: 30ms', 'Total');
          assert.include(result, '(30ms)', 'Split Sum');

          done();
        }).catch((e) => {
          done(e);
        });
      });

      test('Raw', function(done) {
        let formatter = this.latenz.formatter('raw').action;
        let values = [
          {key: 'socket', time: 10},
          {key: 'lookup', time: 20}
        ];

        formatter(values).then(function(result) {
          // 30 socket:10 lookup:20

          assert.typeOf(result, 'String');

          assert.include(result, 'socket:10', 'Connection');
          assert.include(result, 'lookup:20', 'Name Lookup');
          assert.include(result, '30', 'Total');

          assert.isOk(result.indexOf('30') === 0);

          done();
        }).catch((e) => {
          done(e);
        });
      });
    });
  });
})();
