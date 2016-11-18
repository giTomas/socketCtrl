// two states btn on/off
// 


const pass = '&pass=config';
const event = '/event?port=';

const parts = {
  pass: '&pass=config',
  event: '/event?port='
}

let sockets = [false, 'u', true, 'u'];

let socket1 = false;
let socket2 = 'u';
let socket3 = false;
let socket4 = 'u';

const pipe = (...fns) => (value) => fns.reduce((v, fn) => fn(v), value);

const makeString = socket =>
                  (string='') =>
                    typeof socket === 'string' ?
                    string + socket : socket ?
                    string + '1' : string + '0';

const makeString2 = (arr) =>
                      arr.map(x =>
                        typeof x === 'string' ? x :
                        x ? '1' : '0'
).join('');

console.log(makeString2(sockets));

const composeUrl = ({pass, event}) =>
                    string => event + string + pass;



const socketState1 = makeString(socket1);
const socketState2 = makeString(socket2);
const socketState3 = makeString(socket3);
const socketState4 = makeString(socket4);
const compose = composeUrl(parts);

const command = pipe(socketState1, socketState2, socketState3, socketState4, compose);

const url = command();

console.log(url);

//const completeUrl = () => event + '1uuu' + pass;

// console.log(completeUrl());

//const url = completeUrl()

axios({method: 'get',
       url: url,
       baseURL: 'http://172.28.182.248',
       withCredentials: true});
