(() => {
  'use strict';

  const MeasureDNS = require('./measure/dns.js');
  const MeasureResponse = require('./measure/response.js');
  const Formatter = require('./formatter');

  class Latenz {
    constructor() {
      this.dns = new MeasureDNS();
      this.res = new MeasureResponse();
      this.frm = new Formatter();
    }

    formatter(type) {
      return this.frm.get(type);
    }

    measure(hostname, options = {}) {
      return Promise.all([
        this.dns.run(hostname),
        this.res.run(hostname)
      ]).then(data => {
        return data[0].concat(data[1] || []);
      }).then(
        this.formatter(options.mode || this.frm.default).action
      ).catch(e => {
        throw e;
      });
    }
  }

  module.exports = Latenz;
})();
