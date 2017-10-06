import React, { Component } from 'react';
import './css/Report';
import { Tracker } from 'meteor/tracker';
import {ExpenseApi} from '../../api/expense';
import {BalanceApi} from '../../api/balance';
export default class Report extends Component {
  constructor() {
    super();
    this.state={
      expenses:[],
      balances:[],
      date:'',

    }
  }

  componentWillMount(){
    var today=new Date()
     var day= today.getDay();
     var month= today.getMonth();
     var year= today.getFullYear();
      this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("expense");
        let expenses = ExpenseApi.find({createdAt:{$gte:new Date(`${year}/${month}/${day}`)}}).fetch();
          this.setState({expenses});
        Meteor.subscribe("balance");
        let balances = BalanceApi.find({createdAt:{$gte:new Date(`${year}/${month}/${day}`)}}).fetch();
          this.setState({balances});
      });
      --month;
      --day;
  }
  componentWillUnmount(){
    this.linkracker.stop();
  }



  render(){
    return(

      <div style={{display:'flex',flex:1}}>
      <div id="expense"  style={{textAlign:'center',flex:1}}>
      <h1>Report</h1>
      {this.state.balances.map((exp, i) =>{
        let today=exp.createdAt
        tareekh = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +today.getDate()

        return (
          <div key={i} style={{padding:20,backgroundColor:'black',display:'flex',flex:1,flexFlow:'row'}} >

              <div style={{flex:1,backgroundColor:'white'}}>
              Type::{(exp.type)?<span>Opening</span>:<span> Closing</span>}
              </div>
              <div  style={{flex:1,backgroundColor:'white'}}>
              PRICE::{exp.balance}
              </div>
              <div style={{flex:1,backgroundColor:'white'}}>
              DATE::{tareekh}
              </div>

          </div>
        )
      })
    }

      </div>
      <div id="expense" style={{textAlign:'center',flex:1}}>
      <h1>Expense</h1>
      {this.state.expenses.map((exp, i) =>{
        let today=exp.createdAt
        tareekh = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +today.getDate()

        return (
          <div key={i} style={{padding:20,backgroundColor:'black',display:'flex',flex:1,flexFlow:'row'}} >

              <div style={{flex:1,backgroundColor:'white'}}>
              ITEM::{exp.item}
              </div>
              <div  style={{flex:1,backgroundColor:'white'}}>
              PRICE::{exp.price}
              </div>
              <div style={{flex:1,backgroundColor:'white'}}>
              DATE::{tareekh}
              </div>

          </div>
        )
      })
    }
      </div>
      </div>
    );
  }
}
