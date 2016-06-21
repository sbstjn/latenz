(() => {
  'use strict';


  module.exports = {
    action: function(data) {
      let response = "";
      let sum = 0;

      return new Promise(function(done, fail) {
        let response = [];
        let sum = 0;

        data.forEach((item) => {
          sum += parseInt(item.time, 10);
          response.push(item.key + ":" + item.time)
        });

        response.unshift(sum);

        done(response.join(' '));
      });
    }
  };
})();
