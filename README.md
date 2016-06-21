# latenz

[![Travis](https://img.shields.io/travis/sbstjn/latenz.svg?maxAge=600)](https://travis-ci.org/sbstjn/latenz) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](https://github.com/sbstjn/latenz/commits/master) [![npm](https://img.shields.io/npm/dt/latenz.svg?maxAge=600)](https://www.npmjs.com/package/latenz) [![npm](https://img.shields.io/npm/v/latenz.svg?maxAge=600)](https://www.npmjs.com/package/latenz)

A JavaScript latency analyzer like [updown.io](https://updown.io) or [ping.apex.sh](https://ping.apex.sh). Get information about DNS lookup, connection time to your HTTP server and how long it takes to receive the response.

```bash
$ > npm install latenz -g
$ > latenz sbstjn.com

             host: sbstjn.com

      Name Lookup: 10ms     
       Connection: 3ms        (13ms)
         Response: 63ms       (76ms)
         Received: 5ms        (81ms)

            total: 81ms
```

If you plan to use the result for further scripting, you might a friend of the `raw` result mode, which can be enabled by using `--raw` parameter:

```bash
$ > latenz sbstjn.com --raw
985 lookup:443 socket:3 response:534 end:5
```

Or if you need the result as a JSON inside JavaScript:

```javascript
const Latenz = require('latenz');
const l = new Latenz();

l.measure('sbstjn.com').then(result => {
  console.log(result);

  /*
    [
      { key: 'resolve', time: 139 },
      { key: 'socket', time: 2 },
      { key: 'response', time: 286 },
      { key: 'firstdata', time: 1 },
      { key: 'end', time: 2 }
    ]
  */
}).catch((e) => {
  throw e;
});
```

You can pass an **options object** to `measure` in order to enable a secure connection, change the used port or set the result mode:

```javascript
l.measure('sbstjn.com',
  {
    secure: true,
    port: 8443,
    mode: 'pretty'
  }
);
```

### ToDo
 * Error handling
 * Support redirects
 * Check numbers
