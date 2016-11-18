'use strict';

// two states btn on/off
// 


var pass = '&pass=config';
var event = '/event?port=';

var parts = {
  pass: '&pass=config',
  event: '/event?port='
};

var sockets = [false, 'u', true, 'u'];

var socket1 = false;
var socket2 = 'u';
var socket3 = false;
var socket4 = 'u';

var pipe = function pipe() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (value) {
    return fns.reduce(function (v, fn) {
      return fn(v);
    }, value);
  };
};

var makeString = function makeString(socket) {
  return function () {
    var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return typeof socket === 'string' ? string + socket : socket ? string + '1' : string + '0';
  };
};

var makeString2 = function makeString2(arr) {
  return arr.map(function (x) {
    return typeof x === 'string' ? x : x ? '1' : '0';
  }).join('');
};

console.log(makeString2(sockets));

var composeUrl = function composeUrl(_ref) {
  var pass = _ref.pass,
      event = _ref.event;
  return function (string) {
    return event + string + pass;
  };
};

var socketState1 = makeString(socket1);
var socketState2 = makeString(socket2);
var socketState3 = makeString(socket3);
var socketState4 = makeString(socket4);
var compose = composeUrl(parts);

var command = pipe(socketState1, socketState2, socketState3, socketState4, compose);

var url = command();

console.log(url);

//const completeUrl = () => event + '1uuu' + pass;

// console.log(completeUrl());

//const url = completeUrl()

axios({ method: 'get',
  url: url,
  baseURL: 'http://172.28.182.248',
  withCredentials: true });