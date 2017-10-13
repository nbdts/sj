import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import {Session} from 'meteor/session';
import {ExpenseApi} from '../../api/expense';

export default class ExpenseForm  extends Component {
  constructor() {
    super();
    this.state={
      date:'',
      item:'',
      price:'',
      expenses:{}
    }
  }
   setValue(event) {
    let date = event.target.value;
    this.setState({date:date});
  }


  componentWillMount(){
      this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("expense");
        let expenses = ExpenseApi.find({}).fetch();
          this.setState({expenses});
      });
  }
  componentWillUnmount(){
    this.linkracker.stop();
  }


    test(){
      let today=new Date()
       date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      }


    handleChange(event) {

      let object = {};
      object[event.target.id] = event.target.value
      this.setState(object);
    }
    handleClick(event){
      let item=this.state.item
      let price=this.state.price
      let expense={
        shopid:Session.get('shop')._id,
        item:item,
        price:price,
      }
    Meteor.call('expense.insert',expense);
    Bert.alert('Expense Added', 'success', 'growl-top-right');
    }

  render(){
    this.test()
    return(
       <div style={styles.mainBox}>
       <h1 style={{textAlign:'center'}} >Enter Expense</h1>
       <div style={styles.inputs}>
         <input style={{margin:5}} type="text" id='item' placeholder='ITEM' onChange={this.handleChange.bind(this)} />
         <input style={{margin:5}} type="number" id='price' placeholder='PRICE' onChange={this.handleChange.bind(this)} />
         <button className='btn btn-warning' style={{margin:5}} onClick={this.handleClick.bind(this)} >Submit</button>
       </div>
       </div>
    );
  }
}
const styles={
  mainBox:{
    display:'flex',
    flexFlow:'column',
    flex:1,
  },
  inputs:{
    padding:5,
    display:'flex',
    flexFlow:'column',
  }
}
