bitso-ws
===========

[![npm version](https://badge.fury.io/js/bitso-ws.svg)](http://badge.fury.io/js/bitso-ws)

Simple wrapper for Bitso websocket api.


Install
-------

### Node.js

```shell
npm install --save bitso-ws
```


### Usage

```javascript
var bitsoWs = require('bitso-ws');

bitsoWs(orders: true);

bitsoWs.on('data', function(data) {
  console.log(data);
});
```

License
-------

[MIT](https://github.com/joliveros/bitso-ws/blob/master/LICENSE) (c) [joliveros](https://github.com/joliveros)
