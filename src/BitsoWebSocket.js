import EventEmitter from 'events';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const debug = require('debug')('bitso-ws');

const TRADES = 'trades';
const DIFF_ORDERS = 'diff-orders';
const ORDERS = 'orders';


export default function BitsoWebSocket(opts) {
  const {
    orders = false,
    diffOrders = false,
    trades = false,
  } = opts;

  const events = new EventEmitter();
  const websocket = new W3CWebSocket('wss://ws.bitso.com');

  const subscribeArgs = {
    action: 'subscribe',
    book: 'btc_mxn',
    type: ORDERS,
  };

  websocket.onopen = () => {
    debug('#### websocket is open ###');

    if (orders) {
      websocket.send(JSON.stringify(subscribeArgs));
    }

    if (diffOrders) {
      websocket.send(JSON.stringify({ type: DIFF_ORDERS, ...subscribeArgs }));
    }

    if (trades) {
      websocket.send(JSON.stringify({ type: TRADES, ...subscribeArgs }));
    }
  };

  websocket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    debug(data);

    if (data.action === 'subscribe') {
      switch (data.type) {
        case TRADES:
          debug('### subscribed to trades channel.');
          break;
        case DIFF_ORDERS:
          debug('### subscribed to diff-orders channel.');
          break;
        case ORDERS:
          debug('### subscribed to orders channel.');
          break;
        default:

      }
    }

    events.emit('data', data);
  };

  websocket.onerror = err => events.emit('error', err);

  return events;
}
