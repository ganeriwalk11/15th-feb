import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Rx from "rxjs";
import { Observable } from 'rxjs/Observable';

import { inputEdit } from '../actions/validations';
import { applyF } from '../actions/index';
import { applyFunc } from '../actions/index';
import rootReducer from '../reducers/index';
import { postData } from '../actions/index';
import { addData } from '../actions/index';
import { addColData } from '../actions/index';
import { checkIntegerAction } from '../actions/index';
import { fetchUserFulfilled } from '../actions/index';
import { fetchUrlData } from '../actions/index';
import { stringColor } from '../actions/index';

require("babel-polyfill");

class ActualData extends Component
{
    constructor(props)
    {
        super(props);
        this.x = [];
        this.fb={};
    }

    componentDidMount()
    {
      //setInterval(() => {this.props.fetchUrlData(this.props.data)},800);    
    }

    checkFocus(event)
    {
        this.x.push(event.target.innerText);
    }

    checkBlur(h,i,j,q,event)
    {
        var dupdata = this.props.data;
        var me = this;
        var head = Object.keys(dupdata[0]);
        let len = head.length;
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var target;
        if(q !== "")
            target = q;
        else
            target = event.target.innerText;
       // Observable.of(target).if(() => target == parseInt(target,10), console.log("Number"),console.log("NO"));
        if(dupdata[i][head[j]]["value"] != target)
        {
            if( this.x[this.x.length - 1] != target)
            {
                if(target == parseInt(target,10))
                {
                    this.props.checkIntegerAction(i,h,target);
                    if(dupdata[i][head[j]]["dep"].length)
                    {
                        var depformula = [];
                        var deep = []; 
                        depformula = dupdata[i][head[j]]["dep"];
                        depformula.map(function(r){
                            deep.push(r);
                        })
                        deep.map(function(depf){
                            var p = parseInt(depf[1],10) - 1;
                            var t = depf[0];
                            var f = dupdata[p][t]["fx"];
                            me.props.applyF(t,f,p,dupdata, "blue");
                        }); 
                        
                    }  
                }
                else
                {
                    if(target[0] == '=' && target[1] == '(' && target[target.length -1]  == ')')
                    {
                        if(target[2] == parseInt(target[2],10))
                        {
                            let z=2,num="";
                            while(target[z] !== '+' || target[z] !== '-' || target[z] !== ')')
                            {
                                console.log(target,z);
                                //num=num+target[z];
                                z = z+1;
                            }
                            num = Number(num);
                            var op1 = num;
                            if(target[z] == ')')
                            {
                                target = num;
                                this.props.stringColor(h.h,i,target);
                            }
                            else
                            {
                                if(target[z] == '+' || target[z] == '-')
                                {
                                    var operator = target[z];
                                    z = z+1;
                                    if(target[z] == parseInt(target[z],10))
                                    {
                                        let c=c+1,numb="";
                                        while(target[c] !== ')')
                                        {
                                            numb=numb+target[c++];
                                        }
                                        numb = Number(numb);
                                        var op2 = numb;
                                        if(operator == '+')
                                            target = op1 + op2;
                                        else
                                            target = op1 - op2;
                                        this.props.stringColor(h.h,i,target);
                                    }
                                    else if(alpha.indexOf(target[z]) >-1 && alpha.indexOf(target[z]) < len )
                                    {
                                        let k=z+1,nu="";
                                        while(target[k] !== ')')
                                        {
                                            nu = nu+target[k++];
                                        }
                                        nu = Number(nu);
                                        if(dupdata[nu - 1])
                                        {
                                            var op2i = nu;
                                            var op2j = alpha.indexOf(target[z]);
                                            this.props.applyFunc(h.h,target,i,this.props.data,"blue",op1,"","","",op2i,op2j,operator);          
                                        }
                                        else
                                        {
                                           this.props.stringColor(h.h,i,target); 
                                        }
                                    }
                                    else
                                    {
                                        this.props.stringColor(h.h,i,target);
                                    }
                                }
                                else
                                {
                                    this.props.stringColor(h.h,i,target);
                                }
                            }
                        }
                        else if(alpha.indexOf(target[2]) >-1 && alpha.indexOf(target[2]) < len )
                        {
                                let z=3,num="";
                                while(target[z] !== '+' || target[z] !== '-' || target[z] !== ')')
                                {
                                    num = num+target[z++];
                                }
                                num = Number(num);
                                if(dupdata[num - 1])
                                {
                                    var op1i = num;
                                    var op1j = alpha.indexOf(target[2]);
                                    if(target[z] == ')')
                                    {
                                        target = this.props.data[op1i][head[op1j]]['value'];
                                        this.props.applyFunc(h.h,target,i,this.props.data,"blue","","",op1i,op1j,"","","");
                                    }
                                    else
                                    {
                                        if(target[z] == '+' || target[z] == '-')
                                        {
                                            var operator = target[z];
                                            z = z+1;
                                            if(target[z] == parseInt(target[z],10))
                                            {
                                                let c=c+1,numb="";
                                                while(target[c] !== ')')
                                                {
                                                    numb=numb+target[c++];
                                                }
                                                numb = Number(numb);
                                                var op2 = numb;
                                                this.props.applyFunc(h.h,target,i,this.props.data,"blue","",op2,op1i,op1j,"","","");
                                            }
                                            else if(alpha.indexOf(target[z]) >-1 && alpha.indexOf(target[z]) < len )
                                            {
                                                let k=z+1,nu="";
                                                while(target[k] !== ')')
                                                {
                                                    nu = nu+target[k++];
                                                }
                                                nu = Number(nu);
                                                if(dupdata[nu - 1])
                                                {
                                                    var op2i = nu;
                                                    var op2j = alpha.indexOf(target[z]);
                                                    this.props.applyF(h.h,target,i,"blue");          
                                                }
                                                else
                                                {
                                                    this.props.stringColor(h.h,i,target);   
                                                }
                                            }
                                            else
                                            {
                                                this.props.stringColor(h.h,i,target);
                                            }
                                        }
                                        else
                                        {
                                            this.props.stringColor(h.h,i,target);
                                        }
                                    }          
                                }
                                else
                                {
                                    this.props.stringColor(h.h,i,target);   
                                }
                        }
                        else
                        {
                            this.props.stringColor(h.h,i,target);
                        }
                }
                else
                {
                    this.props.stringColor(h.h,i,target);  
                }   
            } 
        } 
    }
}
    
    handleDoubleClick(event)
    { 
            let a = event.target;
            let fxBar = document.getElementById("fbar");
            let rowno = Number(a.className[1]);
            let header = (a.className[0].toLowerCase());
            let head = Object.keys(this.props.data[0]);
            let data;
            var he;
            let stream$ = Observable.fromEvent(a,'dblclick');
            stream$.subscribe((e) => { 
                fxBar.className= a.id;  
                if(this.props.data[rowno -1][header]["fx"])
                {
                    data = this.props.data[rowno -1][header]["fx"];
                }
                else
                {   
                    data = this.props.data[rowno -1][header]["value"];
                }
                this.props.inputEdit(data,a.className);
                fxBar.focus(); 
            });
            var stream1$ = Observable.fromEvent(fxBar,'keyup')
                           .map(function(e){return e.target;})
            stream1$.subscribe((elem) => {
                var p = document.getElementById(elem.className);
                    p.innerText = elem.innerText;
                    this.fb.he = {h:header};
                    this.fb.row = rowno - 1;
                    this.fb.head = head.indexOf(header);
            });          
        }

    fxBlur(event){
        this.checkBlur(this.fb.he,this.fb.row,this.fb.head,event.target.innerText);
        event.target.innerText = "";
    }


    saveData(){
        var dupdata = this.props.data;
        this.props.postData(dupdata);
    }


    addRow = () =>
    {
        var head = Object
        this.props.addData(this.props.data);
    }

    addColumn = () =>
    {
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        let dupdata = this.props.data;
        let head = Object.keys(dupdata[0]);
        let col  = alpha[head.length];
        this.props.addColData(col);
    }

    renderHead = (data) => 
    {
        var dupData = data;
        if(dupData[0])
        {   
            var head = Object.keys(dupData[0]);
            var len = head.length;
            let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var a = [<th key="blank"></th>];
            for(var i=0;i<len;i++)
            {
                a.push(<th key={i}>{alpha[i]}</th>);
            }
            return (<tr key="header">{a}</tr>);
        }
    }

    renderData = (row,i) =>
    {
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var b = [];
        var a = [];
        var q = [];
        var y = [];
        var dupdata = row;
        var head = Object.keys(dupdata);
        let len = dupdata.length;
        if(len != 0)
        {
            a.push(i+1);
            a.push(head.map((h,j) =>
            {
                var s = alpha[j] + (i+1);
                return (
                    <td
                        ref={function(e){if(e) e.contentEditable=true;}}
                        key={s}
                        id={s}
                        style = {{color:dupdata[h]['color']}}
                        className={s}
                        onFocus = {this.checkFocus.bind(this)}
                        onBlur = {this.checkBlur.bind(this,{h},i,j,"")}
                        onClick = {this.handleDoubleClick.bind(this)}
                    >{dupdata[h]['value']}</td>
                );   
            }))
            return (<tr key={i}>{a}</tr>);
        }
    }

    render()
    {
        return(
            <div>
                <button id="save" onClick={this.saveData.bind(this)}>SAVE</button>
                <button id="addRow" onClick={this.addRow.bind(this)}>ADD ROW</button>
                <button id="addCol" onClick={this.addColumn.bind(this)}>ADD COLUMN</button>
                <table><tr><td>fxbar:</td><td contentEditable={true} id="fbar" ref={function(e){if(e != null) e.contentEditable=true;}} onBlur={this.fxBlur.bind(this)}>{this.props.vad}</td></tr></table>
                <table>
                    <thead>{this.renderHead(this.props.data)}</thead>
                    <tbody>{this.props.data.map(this.renderData)}</tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return{
        data: state.data,
        vad : state.vad
    };
}

function mapDispatchToProps(dispatch)
{
    return{
        checkIntegerAction: bindActionCreators(checkIntegerAction, dispatch),
        postData: bindActionCreators(postData,dispatch),
        applyF: bindActionCreators(applyF,dispatch),
        applyFunc: bindActionCreators(applyFunc,dispatch),
        addData: bindActionCreators(addData,dispatch),
        addColData: bindActionCreators(addColData,dispatch),
        inputEdit: bindActionCreators(inputEdit,dispatch),
        fetchUrlData: bindActionCreators(fetchUrlData, dispatch),
        stringColor: bindActionCreators(stringColor, dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ActualData);
