(() => {
  'use strict';

  const label = {
    'lookup': 'Name Lookup',
    'socket': 'Connection',
    'response': 'Response',
    'firstdata': 'First Data',
    'end': 'Received'
  };

  const lpad = function(str, len) {
    return Array(len - str.length).join(' ') + str;
  }

  const rpad = function(str, len) {
    return str + Array(len - str.length).join(' ');
  }

  const line = function(key, value) {
    return lpad(key, 18) + ": " + value;
  };

  module.exports = {
    line: line,
    action: function(data) {
      let response = "";
      let sum = 0;

      return new Promise(function(done, fail) {
        data.forEach((item, index) => {
          sum += parseInt(item.time, 10);
          response += line(label[item.key], rpad(item.time + "ms ", 10) + (index > 0 ? lpad("(" + sum + "ms)", 9) : "")) + "\n";
        });

        response += "\n" + line('total', sum + "ms");

        done(response);
      });
    }
  };
})();
