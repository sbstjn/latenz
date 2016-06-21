(() => {
  'use strict';

  const Stopper = require('stopper');
  const handler = {
    http: require('http'),
    https: require('https')
  };

  class MeasureResponse {
    constructor() {
      this.stopper = new Stopper('response');
    }

    runHTTP(hostname) {
      return new Promise((done, fail) => {
        let firstData = false;

        let req = handler.http.request({
          host: hostname,
          port: 80,
          path: '/',
          method: 'GET'
        });

        req.on('error', () => {
          throw new Error('Connection to host failed: ' + hostname);
        });

        req.on('response', (response) => {
          this.stopper.split('response');

          response.on('data', () => {});

          response.on('end', () => {
            this.stopper.split('end');
            this.stopper.stop();

            done(this.stopper.laps().map((item) => {
              return {key: item.name, time: item.measure()};
            }));
          });
        });

        req.on('socket', (socket) => {
          this.stopper.split('socket');
        });

        req.end();
        this.stopper.start();
      });
    }

    run(hostname, options) {
      return this.runHTTP(hostname);
    }
  }

  module.exports = MeasureResponse;
})();
