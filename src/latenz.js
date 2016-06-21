(() => {
  'use strict';

  const MeasureDNS = require('./measure/dns.js');
  const MeasureResponse = require('./measure/response.js');

  class Latenz {
    constructor() {
      this.dns = new MeasureDNS();
      this.res = new MeasureResponse();
    }

    raw(hostname) {
      var response = [];
      return this.measure(hostname).then((data) => {
        data.forEach((item) => {
          response.push(item.key + ":" + item.time)
        });

        return response.join(' ');
      });
    }

    pretty(hostname) {
      var formatter = require('./formatter/pretty.js');

      return this.measure(hostname).then(
        formatter.action
      ).then(
        (response) => {
          return "\n" + formatter.line('host', hostname) + "\n" + response;
        }
      );
    }

    measure(hostname) {
      return Promise.all([
        this.dns.run(hostname),
        this.res.run(hostname)
      ]).then((data) => {
        return data[0].concat(data[1] || []);
      }).catch((e) => {
        throw e;
      });
    }
  }

  module.exports = Latenz;
})();
