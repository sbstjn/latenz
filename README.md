# latenz

[![Travis](https://img.shields.io/travis/sbstjn/latenz.svg?maxAge=60000)](https://travis-ci.org/sbstjn/latenz) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](https://github.com/sbstjn/latenz/commits/master) [![npm](https://img.shields.io/npm/dt/latenz.svg?maxAge=60000)](https://www.npmjs.com/package/latenz) [![npm](https://img.shields.io/npm/v/latenz.svg?maxAge=60000)](https://www.npmjs.com/package/latenz)

A JavaScript latency analyzer like [updown.io](https://updown.io) or [ping.apex.sh](https://ping.apex.sh).

```bash
$ > latenz sbstjn.com

             host: sbstjn.com

      Name Lookup: 10ms     
       Connection: 3ms        (13ms)
         Response: 63ms       (76ms)
         Received: 5ms        (81ms)

            total: 81ms
```

Or if you need the result as a JSON inside JavaScript:

```javascript
const Latenz = require('latenz');
const l = new Latenz();

l.measure('sbstjn.com').then((result) => {
  console.log(result);
}).catch((e) => {
  throw e;
});
```

### ToDo
 * HTTP / HTTPS
 * Error handling
 * Support redirects
 * Analyze if numbers are correct
