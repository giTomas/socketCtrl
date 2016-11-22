// two states btn on/off
//


const pass = '&pass=config';
const event = '/event?port=';
const proxy = 'ba-simple-proxy.php';
const btn = document.getElementById('init');

// console.log(btn !== null);

const parts = {
  pass: '&pass=config',
  event: '/event?port=',
  // proxy: 'ba-simple-proxy.php'
}

let sockets = ['u', false, 'u', 'u'];

let socket1 = 'false';
let socket2 = 'u';
let socket3 = 'u';
let socket4 = 'u';

const pipe = (...fns) => (value) => fns.reduce((v, fn) => fn(v), value);

const makeString = socket =>
//cause there is no initial aurgument
                  (string='') =>
                    typeof socket === 'string' ?
                    string + socket : socket ?
                    string + '1' : string + '0';

const makeString2 = (arr) =>
                      arr.map(x =>
                            typeof x === 'string' ? x :
                            x ? '1' : '0')
                         .join('');

console.log(makeString2(sockets));

const composeUrl = ({pass, event}) =>
                    string => event + string + pass;

const socketState1 = makeString(socket1);
const socketState2 = makeString(socket2);
const socketState3 = makeString(socket3);
const socketState4 = makeString(socket4);
const compose = composeUrl(parts);

const command = pipe(socketState1, socketState2, socketState3, socketState4, compose);
const command2 = pipe(makeString2, compose);

const url = command2(sockets);

console.log(url);

//const completeUrl = () => event + '1uuu' + pass;

// console.log(completeUrl());

//const url = completeUrl()

var testBaseUrl1 = '../ba-simple-proxy.php?url=http://172.28.182.248';
var testBaseUrl2 = 'http://172.28.182.248';

const newUrl  = testBaseUrl2 + url;

btn.addEventListener('click', function(){

axios({ method: 'get',
  url: url,
  baseURL: testBaseUrl2,
  withCredentials: true })
  .then(function(response){
    console.log(response);
  })
  .catch(function(error){
    console.log(error);
  })
});

const myHeaders = new Headers;
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

const nuRequest = new Request('http://172.28.182.248/event', myInit2);

fetch(nuRequest)
  /*.then(response => {
    if(response.ok) {
      console.log(response)
    } else {
      console.log('Network response was not ok');
    }
  })*/
    .catch(error => console.log(error.message));
