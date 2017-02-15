import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Rx from "rxjs";
import { Observable } from 'rxjs/Observable';

import { inputEdit } from '../actions/validations';
import { applyF } from '../actions/index';
import rootReducer from '../reducers/index';
import { postData } from '../actions/index';
import { addData } from '../actions/index';
import { addColData } from '../actions/index';
import { checkIntegerAction } from '../actions/index';
import { fetchUserFulfilled } from '../actions/index';
import { fetchUrlData } from '../actions/index';

require("babel-polyfill");


class ActualData extends Component {
    constructor(props) {
        super(props);
        this.x = [];
    }

    componentDidMount(){
        setInterval(() => {this.props.fetchUrlData(this.props.data)},5000);
    }

    checkFocus(event){
        this.x.push(event.target.innerText);
    }

    checkBlur(h,i,j,event){
        var head = Object.keys(this.props.data[0]);
        let l = head.indexOf(h.h);
        var target = event.target.innerText;
        if(l <2 )
        {
            var a = event.target.innerText;
            var head = h.h;
            if(this.props.data[i][head][head] !== a)
            {
                if( this.x[this.x.length - 1] != a)
                {
                    this.props.checkIntegerAction(i,j,h,this.props.data,a);
                }
                if(this.props.data[i][head]["dep"] >-1)
                {
                    this.props.applyF(this.props.data[i]["d"]["fx"],this.props.data[i][head]["dep"],this.props.data,"red");
                }       
            }
        }
    
    else{
        this.checkFormulaBlur(h,i,target);
    }
    }

        checkFormulaBlur(h,i,target){
        var a = target;
        if(a == "")
        return;
        //console.log(a,i);
        var color;
        let alpha  = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            if(a[0]!= '=' || a[1] != '(' || a[a.length - 1]!=')' )
            {
                console.log("Invalid format, the valid format is: =(op1 operand op2)");
            }
            else if( alpha.indexOf(a[2])>1 || alpha.indexOf(a[2]) == -1 || alpha.indexOf(a[5])>1 || alpha.indexOf(a[5])==-1 || a[3]-1>this.props.data.length || a[6]-1>this.props.data.length){
                console.log("Operands are out of bounds");
            }
            else{
                color = "red";
                this.tempfunc(h.h,a,i,this.props.data,color);
               // setTimeout((this.props.applyF(a,i,this.props.data,"black")),3000);
                
            }
    }

    tempfunc(h,a,b,c,d){
        //console.log(h,a,b,c,d);
          this.props.applyF(h,a,b,c,d);  
    }

   

 refCallback(item) {
    if (item) {  
     //ReactDOM.findDOMNode(item).ondblclick = this.handleDoubleClick;
     var a = ReactDOM.findDOMNode(item);
     var fxBar = this.refs.theInput;
     a.contentEditable = true;
     var stream$ = Observable.fromEvent(a,'dblclick');
     stream$.subscribe((e) => {
          var rowno = Number(e.target.className[1]);
          var header = (e.target.className[0].toLowerCase());
          if(this.props.data[rowno -1][header]["fx"]) 
            var data = this.props.data[rowno -1][header]["fx"];
          else
              var data = this.props.data[rowno -1][header][header];
          this.props.inputEdit(data);
        });
    }
  }

    saveData(){
        var dats = this.props.data;
        this.props.postData(dats[0]);
    }


    addRow = () => {
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        let dupdata = this.props.data;
        let head = Object.keys(dupdata[0]);
        let add = {};
        head.map(function(header){
            if(header == 'd')
            add[header] = {};
            else
            add[header] =  "";
        })
        this.props.addData(add);
    }

    addColumn = () => {
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        let dupdata = this.props.data;
        let head = Object.keys(dupdata[0]);
        let col  = alpha[head.length];
        this.props.addColData(col);
    }

    handleChange(event){
       // this.props.vad = event.target.innerText;
       this.props.data
    }
    
    // submitForm = (e) => {
    //     e.preventDefault();
    //     var fx = ReactDOM.findDOMNode(this.refs.theInput).value;
    //     var head = Object.keys(this.props.data);
    //     var l = head.length;
    //     this.props.applyF(fx,l);
    // }

 renderHead = (data) => {
        var dupData = data;
        if(dupData[0])
        {
        var head = Object.keys(dupData[0]);
        var len = head.length;
        if(len>0)
        {
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var a = [<th key="blank"></th>];
        for(var i=0;i<len;i++){
                a.push(<th key={i}>{alpha[i]}</th>);
        }
        // this.x.push(1);
             return (<tr key="header">{a}</tr>);
        }
        }
    }

    renderData = (data,i) => {
        console.log("data=>",data);
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var b = [];
        var a = [];
        var q = [];
        var y = [];
        var dupdata = data;
        var head = Object.keys(dupdata);
        let len = dupdata.length;
        if(len != 0)
        {
            a.push(i+1);
            a.push(head.map((h,j) => {
            var s = alpha[j] + (i+1);
            if(dupdata[h] != "")
                y = dupdata[h][h];
                else{
                    q = h;
                    var z = {};
                    z[h] = "";
                    dupdata[h] = z;
                    y = dupdata[h][h];
                }      
                //console.log(h,y);
                return (<td
                ref={function(e){if(e) e.contentEditable=true;}}
                key={s}
                ref={this.refCallback.bind(this)}
                style = {{color:dupdata[h]['color']}}
                 className={s}
                onFocus = {this.checkFocus.bind(this)}
                onBlur = {this.checkBlur.bind(this,{h},i,j)}
            >{y}</td>);   
        }))

        return (<tr key={i}>{a}</tr>);
    }
}


    render() {
        return (
            <div>
                <button id="save" onClick={this.saveData.bind(this)}>SAVE</button>
                <button id="addRow" onClick={this.addRow.bind(this)}>ADD ROW</button>
                <button id="addCol" onClick={this.addColumn.bind(this)}>ADD COLUMN</button>
                <form onSubmit={this.submitForm}>
                    <input ref="theInput" placeholder="=fx" value= {this.props.vad} onChange={this.handleChange.bind(this)}/>
                    <button type="Submit">Submit</button>
                </form>
                <table>
                    <thead>{this.renderHead(this.props.data)}</thead>
                    <tbody>{this.props.data.map(this.renderData)}</tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data,
        vad : state.vad
    };
}

function mapDispatchToProps(dispatch) {
    return {
        checkIntegerAction: bindActionCreators(checkIntegerAction, dispatch),
        postData: bindActionCreators(postData,dispatch),
        applyF: bindActionCreators(applyF,dispatch),
        addData: bindActionCreators(addData,dispatch),
        addColData: bindActionCreators(addColData,dispatch),
        inputEdit: bindActionCreators(inputEdit,dispatch),
        fetchUserFulfilled: bindActionCreators(fetchUserFulfilled,dispatch),
        fetchUrlData: bindActionCreators(fetchUrlData, dispatch)
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(ActualData);
