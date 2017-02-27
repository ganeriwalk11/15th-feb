import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Rx from "rxjs";
import { Observable } from 'rxjs/Observable';

import { inputEdit } from '../actions/validations';
import { applyFunc } from '../actions/index';
import rootReducer from '../reducers/index';
import { postData } from '../actions/index';
import { addData } from '../actions/index';
import { deleteRow } from '../actions/index';
import { deleteCol } from '../actions/index';
import { addColData } from '../actions/index';
import { checkIntegerAction } from '../actions/index';
import { fetchUserFulfilled } from '../actions/index';
import { fetchUrlData } from '../actions/index';
import { writeUrl } from '../actions/index';
import { runUrl } from '../actions/index';
import { stringColor } from '../actions/index';
import { fetchData } from '../actions/index';

require("babel-polyfill");

class ActualData extends Component {
    constructor(props) {
        super(props);
        this.x = [];
        this.fb = {};
        this.flag;
    }

    componentWillMount() {
        this.props.fetchData();
    }

    componentDidUpdate() {
        var me = this;
        if (!(me.flag)) {
            var dupdata = this.props.data;
            dupdata.map(function (row, i) {
                row.map(function (col, j) {
                    if (row[j]["url"].length > 0) {
                        me.checkBlur(i, j, row[j]["url"]);
                    }
                });
            });
        }
        me.flag = 1;
    }

    checkFocus(event) {
        this.x.push(event.target.innerText);
    }

    checkBlur(i, j, q, event) {
        var dupdata = this.props.data;
        var me = this;
        let len = dupdata[0].length;
        var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var target;
        if (q != "zaq")
            target = q;
        else
            target = event.target.innerText;
        // Observable.of(target).if(() => target == parseInt(target,10), console.log("Number"),console.log("NO"));
        if (dupdata[i][j]["value"] != target) {
            if (this.x[this.x.length - 1] != target) {
                if (target == parseInt(target, 10) || target == "") {
                    this.props.checkIntegerAction(i, j, target);
                    if (dupdata[i][j]["dep"].length) {
                        var depformula = [];
                        var deep = [];
                        depformula = dupdata[i][j]["dep"];
                        depformula.map(function (r) {
                            deep.push(r);
                        })
                        deep.map(function (depf) {
                            var p = depf["row"];
                            var t = depf["column"];
                            var f = dupdata[p][t]["fx"]["formula"];
                            me.checkBlur(p, t, f);
                        });
                    }
                }
                else {
                    if (target[0] == '=' && target[1] == '(' && target[target.length - 1] == ')') {
                        if (target[2] == parseInt(target[2], 10)) {
                            var z = 2, num = "";
                            for (z = 2; z < target.length; z++) {
                                if (target[z] != '+' && target[z] != '-' && target[z] != ')') {
                                    num = num + target[z];
                                }
                                else
                                    break;
                            }
                            num = Number(num);
                            var op1 = num;
                            if (target[z] == ')') {
                                target = num;
                                this.props.stringColor(i, j, target, "blue");
                                var me = this;
                                setTimeout(function () { me.props.stringColor(i, j, target, "black"); }, 500);
                            }
                            else {
                                if (target[z] == '+' || target[z] == '-') {
                                    var operator = target[z];
                                    z = z + 1;
                                    if (target[z] == parseInt(target[z], 10)) {
                                        let c = z, numb = "";
                                        while (target[c] != ')') {
                                            numb = numb + target[c++];
                                        }
                                        numb = Number(numb);
                                        var op2 = numb;
                                        if (operator == '+')
                                            target = op1 + op2;
                                        else
                                            target = op1 - op2;
                                        this.props.stringColor(i, j, target, "blue");
                                        var me = this;
                                        setTimeout(function () { me.props.stringColor(i, j, target, "black"); }, 500);
                                    }
                                    else if (alpha.indexOf(target[z]) > -1 && alpha.indexOf(target[z]) < len) {
                                        let k = z + 1, nu = "";
                                        while (target[k] !== ')') {
                                            nu = nu + target[k++];
                                        }
                                        nu = Number(nu);
                                        if (dupdata[nu - 1]) {
                                            var op2i = nu - 1;
                                            var op2j = alpha.indexOf(target[z]);
                                            this.props.applyFunc(j, target, i, this.props.data, "blue", op1, "", "", "", op2i, op2j, operator);
                                            //var me = this;
                                            setTimeout(function () { this.props.applyFunc(j, target, i, this.props.data, "black", op1, "", "", "", op2i, op2j, operator); }, 500);
                                        }
                                        else {
                                            this.props.stringColor(i, j, target, "red");
                                        }
                                    }
                                    else {
                                        this.props.stringColor(i, j, target, "red");
                                    }
                                }
                                else {
                                    this.props.stringColor(i, j, target, "red");
                                }
                            }
                        }
                        else if (alpha.indexOf(target[2]) > -1 && alpha.indexOf(target[2]) < len) {
                            let z = 3, num = "";
                            for (z = 3; z < target.length; z++) {
                                if ((target[z] !== '+') && (target[z] !== '-') && (target[z] !== ')')) {
                                    num = num + target[z];
                                }
                                else
                                    break;
                            }
                            num = Number(num);
                            if (dupdata[num - 1]) {
                                var op1i = num - 1;
                                var op1j = alpha.indexOf(target[2]);
                                if (target[z] == ')') {
                                    this.props.applyFunc(j, target, i, this.props.data, "blue", "", "", op1i, op1j, "", "", "");
                                }
                                else {
                                    if (target[z] == '+' || target[z] == '-') {
                                        var operator = target[z];
                                        z = z + 1;
                                        if (target[z] == parseInt(target[z], 10)) {
                                            let c = z, numb = "";
                                            while (target[c] !== ')') {
                                                numb = numb + target[c++];
                                            }
                                            numb = Number(numb);
                                            var op2 = numb;
                                            this.props.applyFunc(j, target, i, this.props.data, "blue", "", op2, op1i, op1j, "", "", operator);
                                        }
                                        else if (alpha.indexOf(target[z]) > -1 && alpha.indexOf(target[z]) < len) {
                                            let k = z + 1, nu = "";
                                            while (target[k] !== ')') {
                                                nu = nu + target[k++];
                                            }
                                            nu = Number(nu);
                                            if (dupdata[nu - 1]) {
                                                var op2i = nu - 1;
                                                var op2j = alpha.indexOf(target[z]);
                                                this.props.applyFunc(j, target, i, this.props.data, "blue", "", "", op1i, op1j, op2i, op2j, operator);
                                            }
                                            else {
                                                this.props.stringColor(i, j, target, "red");
                                            }
                                        }
                                        else {
                                            this.props.stringColor(i, j, target, "red");
                                        }
                                    }
                                    else {
                                        this.props.stringColor(i, j, target, "red");
                                    }
                                }
                            }
                            else {
                                this.props.stringColor(i, j, target, "red");
                            }
                        }
                        else {
                            this.props.stringColor(i, j, target, "red");
                        }
                    }
                    else if (target[0] == 'u' && target[1] == 'r' && target[2] == 'l') {
                        var regex = new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$");

                        var urlTest = target.slice(4, target.indexOf(','));
                        var timer = target.slice(target.indexOf(',') + 1, target.indexOf(')'));
                        if (regex.test(urlTest)) {
                            this.props.writeUrl(i, j, target, timer);
                            this.props.runUrl(i, j);
                            setInterval(() => { this.props.runUrl(i, j) }, timer);
                        }
                        else
                            console.log("BOoo");
                    }
                    else {
                        this.props.stringColor(i, j, target, "red");
                    }
                }
            }
        }
    }

    handleDoubleClick(event) {
        let a = event.target;
        var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let fxBar = document.getElementById("fbar");
        let rowno = Number(a.className.substring(1, a.className.length));
        let colNo = alpha.indexOf(a.className[0]);
        let data;
        let stream$ = Observable.fromEvent(a, 'dblclick');
        stream$.subscribe((e) => {
            fxBar.className = a.id;
            if (Object.keys(this.props.data[rowno - 1][colNo]["fx"]).length > 0) {
                data = this.props.data[rowno - 1][colNo]["fx"]["formula"];
            }
            else if (this.props.data[rowno - 1][colNo]["url"]) {
                data = this.props.data[rowno - 1][colNo]["url"];
            }
            else {
                data = this.props.data[rowno - 1][colNo]["value"];
            }
            this.props.inputEdit(data);
            fxBar.focus();
            this.fb.col = colNo;
            this.fb.row = rowno - 1;
        });
        var stream1$ = Observable.fromEvent(fxBar, 'keyup')
            .map(function (e) { return e.target; })
        stream1$.subscribe((elem) => {
            var p = document.getElementById(elem.className);
            p.innerText = elem.innerText;
        });
    }

    fxBlur(event) {
        if (this.fb.col !== "undefined") {
            this.checkBlur(this.fb.row, this.fb.col, event.target.innerText);
        }
        event.target.innerText = "";
    }

    saveData() {
        var dupdata = this.props.data;
        this.props.postData(dupdata);
    }

    delRow = (i) => {
        this.props.deleteRow(i);
    }

    delCol = (i) => {
        this.props.deleteCol(i);
    }

    addRow = () => {
        this.props.addData();
    }

    addColumn = () => {
        this.props.addColData();
    }

    renderHead = (data) => {
        var dupData = data;
        if (dupData[0]) {
            var len = dupData[0].length;
            let alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            var a = [<th key="blank"></th>];
            var me = this;
            dupData[0].map(function (col, i) {
                a.push(<th key={i}>{alpha[i]} <button style={{ color: 'red' }} id={i} onClick={() => { me.delCol(i) }}>X</button> </th>);
            });
            return (<tr key="header">{a}</tr>);
        }
    }

    renderData = (row, i) => {
        let alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var dupdata = row;
        let len = dupdata.length;
        var a = [];
        a.push(i + 1);
        a.push(dupdata.map((col, j) => {
            var s = alpha[j] + (i + 1);
            return (
                <td
                    ref={function (e) { if (e) e.contentEditable = true; }}
                    key={s}
                    id={s}
                    style={{ color: dupdata[j]['color'] }}
                    className={s}
                    onFocus={this.checkFocus.bind(this)}
                    onBlur={this.checkBlur.bind(this, i, j, "zaq")}
                    onClick={this.handleDoubleClick.bind(this)}
                >{dupdata[j]['value']}</td>
            );
        }));
        a.push(<button style={{ color: 'red' }} onClick={() => { this.delRow(i) }}>X</button>);
        return (<tr key={i}>{a}</tr>);
    }

    render() {
        return (
            <div>
                <button id="save" onClick={this.saveData.bind(this)}>SAVE</button>
                <button id="addRow" onClick={this.addRow.bind(this)}>ADD ROW</button>
                <button id="addCol" onClick={this.addColumn.bind(this)}>ADD COLUMN</button>
                <table><tbody><tr><td>fxbar:</td><td contentEditable={true} id="fbar" ref={function (e) { if (e != null) e.contentEditable = true; }} onBlur={this.fxBlur.bind(this)}>{this.props.vad}</td></tr></tbody></table>
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
        vad: state.vad
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: bindActionCreators(fetchData, dispatch),
        checkIntegerAction: bindActionCreators(checkIntegerAction, dispatch),
        postData: bindActionCreators(postData, dispatch),
        applyFunc: bindActionCreators(applyFunc, dispatch),
        addData: bindActionCreators(addData, dispatch),
        deleteRow: bindActionCreators(deleteRow, dispatch),
        deleteCol: bindActionCreators(deleteCol, dispatch),
        addColData: bindActionCreators(addColData, dispatch),
        inputEdit: bindActionCreators(inputEdit, dispatch),
        fetchUrlData: bindActionCreators(fetchUrlData, dispatch),
        writeUrl: bindActionCreators(writeUrl, dispatch),
        runUrl: bindActionCreators(runUrl, dispatch),
        stringColor: bindActionCreators(stringColor, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActualData);
