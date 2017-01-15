import BitsoWebSocket from '../src';

const debug = require('debug')('bitso-ws:example');

const bitso = BitsoWebSocket({
  orders: true,
});

bitso.on('data', data => debug(data));
