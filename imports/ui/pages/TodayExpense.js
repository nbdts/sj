import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import {ExpenseApi} from '../../api/expense';

export default class TodayExpense extends Component {
  constructor() {
    super();
    this.state={
      expenses:[],
      date:'',

    }
  }

  setValue(event) {
   let date = event.target.value;
   this.setState({date:date});
 }

     handleChange(event) {
       let object = {};
       today=event.target.value
       tareekh = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +today.getDate()
       object[event.target.id] = tareekh
       this.setState(object);
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
     });
     --month;
     --day;
 }
 componentWillUnmount(){
   this.linkracker.stop();
 }


  render(){

    let nowexpense = this.state.expenses.filter((expense) => {
      let today = expense.createdAt
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +today.getDate()
      return (1);
      })
      return(
       <div>
       <h1>Todays Expense</h1>
       <input onChange={this.handleChange.bind(this)} type="date" id='date'/>


       {this.state.expenses.map((exp, i) =>{
            let today=exp.createdAt
            tareekh = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +today.getDate()

         return (
           <div key={i}>
            ITEM::{exp.item}   PRICE::{exp.price}   DATE::{tareekh}
            </div>
         )
       })
     }

     </div>
    );
  }
}
