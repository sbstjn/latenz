(() => {
  'use strict';

  const label = {
    'resolve': 'Name Lookup',
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
    return lpad(key, 18) + ": " + value + "\n";
  };

  module.exports = {
    line: line,
    action: function(data) {
      var response = "";
      var sum = 0;

      return new Promise(function(done, fail) {
        data.forEach((item, index) => {
          sum += parseInt(item.time, 10);
          response += line(label[item.key], rpad(item.time + "ms ", 10) + (index > 0 ? lpad("(" + sum + "ms)", 9) : ""));
        });

        response += "\n" + line('total', sum + "ms");

        done(response);
      });
    }
  };
})();
