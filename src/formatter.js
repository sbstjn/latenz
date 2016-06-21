(() => {
  'use strict';

  const STYLE_NONE   = 'none';
  const STYLE_RAW    = 'raw';
  const STYLE_PRETTY = 'pretty';

  class Formatter {
    constructor() {
      this.default = STYLE_NONE;
    }

    get(type) {
      switch (type) {
        case STYLE_NONE:
          return {
            action: (json) => { return json; }
          };
        case STYLE_RAW:
          return require('./styles/raw.js');
        case STYLE_PRETTY:
          return require('./styles/pretty.js');

          break;
      }
    }
  }

  module.exports = Formatter;
})();
