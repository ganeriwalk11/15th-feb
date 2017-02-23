import Rx from 'rxjs';
import 'rxjs/add/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';

export const POST_DATA = 'POST_DATA';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_FUL = 'FETCH_USER_FULFILLED';
export const FETCH_FULL = 'FETCH_USER_F';
export const ADD_DATA = 'ADD_DATA';
export const DELETE_ROW = 'DELETE_ROW';
export const ADD_COL = 'ADD_COL';
export const CHECK_INTEGER = 'CHECK_INTEGER';
export const APPLY_FUN = 'APPLY_FUN';
export const APPLY_FUNCTION = 'APPLY_FUNCTION';
export const S_COLOR = 'S_COLOR';
export const INSERTUrl = 'INSERTUrl';
export const RUN_URL = 'RUN_URL';

const url = 'src/jsonData/mainData.json';
const urla = 'http://localhost:5000/';

export const fetchUserEpic = action$ =>
  action$.ofType(FETCH_DATA)
    .mergeMap(action =>
      Observable.ajax.getJSON(url)
        .map(response => fetchUserFulfilled(response))
    );

export const fetchUserFulfilled = payload => (
{ 
  type: FETCH_FUL,
  payload 
});

export function fetchData()
{
  return{
    type: FETCH_DATA
  }
};

export function fetchUrlData(data) {
  return {
    type: FETCH_FULL, 
    payload: data
  };
};

 
export function postData(data) {
  const request = axios.post(urla,data);
     return {
    type: POST_DATA
  }
};

export function deleteRow(rowno)
{
 return {
    type: DELETE_ROW,
    payload : rowno
  };
};

export function addData(dupdata) {
 return {
    type: ADD_DATA,
    payload: dupdata
  };
};

export function addColData(add)
{
  var addColumn = add;
  return{
    type: ADD_COL,
    payload: addColumn
  };
};

export function checkIntegerAction(i,h,target) 
{
  return {
    type: CHECK_INTEGER,
    payload: {
      i:i,
      h:h,
      target: target
    }
  };
};

export function stringColor(h,i,target,color) 
{
  return {
    type: S_COLOR,
    payload: {
      i:i,
      h:h,
      target:target,
      color: color
    }
  };
};

export function writeUrl(i,h,urlTest,timer) 
{
  return {
    type:INSERTUrl,
    payload: {
      i:i,
      h:h,
      urlTest:urlTest,
      timer:timer
    }
  };
};

export function runUrl(i,h) 
{
  return {
    type:RUN_URL,
    payload: {
      i:i,
      h:h
    }
  };
};


// export const applyFunctionEpic = action$ =>
//   action$.ofType(APPLY_FORMULA)
//     .map(function(action)
//       {
//         let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
//         var a = action.payload.a;
//         var i = action.payload.i;
//         var data = action.payload.data;
//         var head = Object.keys(data[0]);
//         var len = head.length;
//         var op1i = a[3] - 1;
//         var op2i = a[6] - 1;
//         var op1j = alpha.indexOf(a[2]) +1;
//         var op2j = alpha.indexOf(a[5]) +1;
//         var operator = a[4];
//         var ans;
//         if(operator == '+'){
//           ans = parseInt(data[op1i][head[op1j]][head[op1j]],10) + parseInt(data[op2i][head[op2j]][head[op2j]],10);
//         }
//         else{
//           ans = parseInt(data[op1i][head[op1j]][head[op1j]],10) - parseInt(data[op2i][head[op2j]][head[op2j]],10);
//         }
//         var color = action.payload.color;
//         var response = {
//           op1i: op1i,
//           op1j:op1j,
//           op2i: op2i,
//           op2j:op2j,
//           ans: ans,
//           data:data,
//           head,head,
//           i:i,
//           a:a,
//           color:color
//         };
//         return applyFunc(response);
//       });
//       // .subscribe(function(data){applyFunc(data);});
      

// export function applyFunc(response) 
// {
//   return {
//     type: APPLY_FUNC,
//     payload : response
//   }
// };


export function applyF(h,a,i,data,color) 
{
  var a = a;
  var data = data;
  var header = h;
  var color = color;
  let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var i = i;
  var head = Object.keys(data[0]);
  var len = head.length;
  var op1i = a[3] - 1;
  var op2i = a[6] - 1;
  var op1j = alpha.indexOf(a[2]);
  var op2j = alpha.indexOf(a[5]);
  var operator = a[4];
  var ans;
  if(operator == '+')
  {
    ans = parseInt(data[op1i][head[op1j]]['value'],10) + parseInt(data[op2i][head[op2j]]['value'],10);
  }
  else
  {
    ans = parseInt(data[op1i][head[op1j]]['value'],10) - parseInt(data[op2i][head[op2j]]['value'],10);
  }
  var response = {
          op1i: op1i,
          op1j:op1j,
          op2i: op2i,
          op2j:op2j,
          ans: ans,
          data:data,
          head,head,
          i:i,
          a:a,
          color:color,
          header: header
    };
    return {type:APPLY_FUN,payload:response};
};


export function applyFunc(h,a,i,data,color,op1,op2,op1i,op1j,op2i,op2j,operator) 
{
  var a = a;
  var data = data;
  var header;
  if(typeof(h) === 'object')
  header = h.t;
  else
  header = h;
  var color = color;
  let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var i = i;
  var head = Object.keys(data[0]);
  var len = head.length;
  var op1i = op1i;
  var op1j = op1j;
  var op2i = op2i;
  var op2j = op2j;
  var operator = operator;
  var op1 = op1;
  var op2 = op2;
  var ans;
  if(op1 !== "")
  {
    if(operator == '+')
    {
      if(parseInt(data[op2i][head[op2j]]['value'],10))
        ans = op1 + parseInt(data[op2i][head[op2j]]['value'],10);
      else
         ans = op1 + 0;
    }
    else
    {
      if(parseInt(data[op2i][head[op2j]]['value'],10))
        ans = op1 - parseInt(data[op2i][head[op2j]]['value'],10);
      else
         ans = op1 - 0;
    }
  }

  else if(op2 !== "")
  {
    if(operator == '+')
    {
      if(parseInt(data[op1i][head[op1j]]['value'],10))
        ans = op2 + parseInt(data[op1i][head[op1j]]['value'],10);
      else
         ans = op2 + 0;
    }  
    else
    {
      if(parseInt(data[op1i][head[op1j]]['value'],10))
        ans = parseInt(data[op1i][head[op1j]]['value'],10) - op2;
      else
         ans = 0 - op2;
    }
  }

  else if(op2i === "" )
  {
      if(parseInt(data[op1i][head[op1j]]['value'],10))
        ans = parseInt(data[op1i][head[op1j]]['value'],10)
      else
        ans = 0;
  }
  else
  {
    var operator1,operator2;
    if(parseInt(data[op1i][head[op1j]]['value'],10))
      operator1  = parseInt(data[op1i][head[op1j]]['value'],10);
    else
      operator1 = 0;
    if(parseInt(data[op2i][head[op2j]]['value'],10))
      operator2  = parseInt(data[op2i][head[op2j]]['value'],10);
    else
      operator2 = 0;
    if(operator == '+')
    {
      ans = operator1 + operator2;
    }
    else
    {
      ans = operator1 - operator2;
    }
  }
  
  var response = {
          op1i: op1i,
          op1j:op1j,
          op2i: op2i,
          op2j:op2j,
          ans: ans,
          data:data,
          head,head,
          i:i,
          a:a,
          color:"blue",
          header: header
    };
    return {type:APPLY_FUNCTION,payload:response};
};
