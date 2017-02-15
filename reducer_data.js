import Rx from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';

import { FETCH_DATA } from '../actions/index';
import { FETCH_FUL } from '../actions/index';
import { ADD_DATA } from '../actions/index';
import { ADD_COL } from '../actions/index';
import { CHECK_INTEGER } from '../actions/index';
import { APPLY_FUN } from '../actions/index';
import { applyF } from '../actions/index';



const rxFetch = require('rxjs-fetch');

export default function(state = [], action) {
  
  switch (action.type) {
      
    case FETCH_DATA:
      return state;
      break;

       case FETCH_FUL:{
         console.log("here");
         var head = Object.keys(action.payload[0]);
          var len = head.length;
          var data = action.payload;
          var q = [];
          data.map(function(row){
             for(var i=0;i<len;i++){
                  if(i == 2 )
                  {
                    var urla = row[head[i]]["url"];
                    var stockStream$ = rxFetch(urla).json();
                    var stream2$ = stockStream$
                    .subscribe(
                      response => {
                        row['c']['c'] = response["cod"];
                        // var x = {};
                        // x['c']=row['c']; 
                        // row['c'] = x; 
                        console.log("row=>",row);
                      }
                     );
                    
                       // row['c']['c'] = row['c']['c'];
                  }
                else{
                  var t = head[i];
                  var b = row[head[i]];
                  var x = {};
                  x[t] = b;
                  row[head[i]] = x;
                
                }
            } 
          });
        return (data);
        break;
      }

      

      case ADD_DATA:{ 
        state = state.concat(action.payload);
        return state;
      }

      case ADD_COL:{
        var data = [...state];
        data.map(function(row){
          row[action.payload.toLowerCase()] = "";
        }); 
        //console.log(data);
        return data;
      }

       case CHECK_INTEGER:
       {
            var row = action.payload.i;
            var column = action.payload.j;
            var head = action.payload.h["h"];
            var data = [...state];
            data[row][head][head] = action.payload.target;
            data[row][head]['color'] = action.payload.color;

              // if(action.payload.color == 'green'){
              //   if(data[row][head]["dep"])
              //       applyF(data[row]["d"]["fx"],data[row][head]["dep"],data,"red" );
              //       console.log(data[row]["d"]["fx"],data[row][head]["dep"],data,"red");
              //  }
          //  console.log(data);
            return data;
      }

      case APPLY_FUN:
       {
           var i = action.payload.i;
           var op1i = action.payload.op1i;
           var op1j = action.payload.op1j;
           var op2i = action.payload.op2i;
           var op2j = action.payload.op2j;
           var head = action.payload.head;
           var ans = action.payload.ans;
           var color = action.payload.color;
           var header = action.payload.header;
           var data = [...state];
           data[op2i][head[op1j]]["dep"] = i;
           data[op2i][head[op2j]]["dep"] = i;
           data[i][header] = {  "fx": action.payload.a,"color": color};
           data[i][header][header] = ans;
           console.log(data);
           return data;
      }
  }

  return state;
}


function returnCallback(data){
       return (data);
}
