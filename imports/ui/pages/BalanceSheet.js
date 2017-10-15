import React, { Component } from 'react';
import Header from '../componants/header/Header';
import { Tracker } from 'meteor/tracker';
import {ExpenseApi} from '../../api/expense';
import {BalanceApi} from '../../api/balance';
import {InvoiceApi} from '../../api/invoice';
export default class BalanceSheet extends Component {
  constructor() {
    super();
    this.state={
      expenses:[],
      balances:[],
      invoices:[],
      date:'',

    }
  }

  componentWillMount(){
    var today=new Date()
     var day= today.getDate();
     var month= today.getMonth()+1;
     var year= today.getFullYear();
     this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("expense");
        Meteor.subscribe("balance");
        Meteor.subscribe("invoice");
        let expenses = ExpenseApi.find({shopid:this.props.match.params.id}).fetch();
        let balances = BalanceApi.find({createdAt:{$gte:new Date(`${year}/${month}/${day}`)}}).fetch();
        let invoices = InvoiceApi.find({createdAt:{$gte:new Date(`${year}/${month}/${day}`)}}).fetch();
        this.setState({expenses});
        this.setState({invoices});
        this.setState({balances});
      });
    }
  componentWillUnmount(){
    this.linkracker.stop();
  }



  render(){
    return(
<div>
<Header/>
        <div style={{display:'flex',justifyContent:'center',flex:1,position:'relative',top:65}}>
      <h1>hi ll</h1>

      </div>
      <div id="expense" style={{flex:1}}>
      <h1>hi ll</h1>
      </div>
</div>
    );
  }
}
