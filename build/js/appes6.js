'use strict';

// two states btn on/off
//


var pass = '&pass=config';
var event = '/event?port=';
var proxy = 'ba-simple-proxy.php';
var btn = document.getElementById('init');

// console.log(btn !== null);

var parts = {
  pass: '&pass=config',
  event: '/event?port='
};

var sockets = ['u', false, 'u', 'u'];

var socket1 = 'false';
var socket2 = 'u';
var socket3 = 'u';
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
  return (
    //cause there is no initial aurgument
    function () {
      var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return typeof socket === 'string' ? string + socket : socket ? string + '1' : string + '0';
    }
  );
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
var command2 = pipe(makeString2, compose);

var url = command2(sockets);

console.log(url);

//const completeUrl = () => event + '1uuu' + pass;

// console.log(completeUrl());

//const url = completeUrl()

var testBaseUrl1 = '../ba-simple-proxy.php?url=http://172.28.182.248';
var testBaseUrl2 = 'http://172.28.182.248';

var newUrl = testBaseUrl2 + url;

btn.addEventListener('click', function () {

  axios({ method: 'get',
    url: url,
    baseURL: testBaseUrl2,
    withCredentials: true }).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
});

var myHeaders = new Headers();
myHeaders.append("X-Custom-Header", "ProcessThisImmediately");

var myInit = { method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

var myInit2 = { method: 'post',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default',
  body: "port=01uu&pass=config"
};

var nuRequest = new Request('http://172.28.182.248/event', myInit2);

fetch(nuRequest)
/*.then(response => {
  if(response.ok) {
    console.log(response)
  } else {
    console.log('Network response was not ok');
  }
})*/
.catch(function (error) {
  return console.log(error.message);
});