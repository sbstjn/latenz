(() => {
  'use strict';

  const dns = require('dns'),
    Stopper = require('stopper');

  class MeasureDNS {
    constructor() {
      this.stopper = new Stopper('dns');
    }

    run(hostname) {
      return new Promise((done, fail) => {
        this.stopper.start();

        dns.lookup(hostname, (err, data) => {
          this.stopper.stop();

          if (err) {
            throw new Error('Lookup for host failed: ' + hostname);
          }

          done([{key: 'resolve', time: this.stopper.measure()}]);
        });
      });
    }
  }

  module.exports = MeasureDNS;
})();
