(() => {
  'use strict';

  const MODE_HTTP = 'http';
  const MODE_HTTPS = 'https';

  const Stopper = require('stopper');

  class MeasureResponse {
    constructor() {
      this.stopper = new Stopper('response');
    }

    request(hostname, handler, port) {
      return new Promise((done, fail) => {
        let firstData = false;

        let req = handler.request({
          host: hostname,
          port: port,
          path: '/',
          method: 'GET'
        });

        req.on('error', (err) => {
          throw new Error('Connection to host failed: ' + err.message);
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

    getHTTP(type) {
      if ([MODE_HTTP, MODE_HTTPS].indexOf(type) > -1) {
        return require(type);
      }

      throw new Error('Unsupported protocol type: ' + type)
    }

    run(hostname, options = {}) {
      return this.request(
        hostname,
        this.getHTTP(options.secure ? MODE_HTTPS : MODE_HTTP),
        options.port ? options.port : options.secure ? 443 : 80
      );
    }
  }

  module.exports = MeasureResponse;
})();
