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
      expenses:{},
      expensetype:0,
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
      let expensetype = this.state.expensetype
      let expense={
        shopid:Session.get('shop')._id,
        item:item,
        price:price,
        expensetype,
      }
    Meteor.call('expense.insert',expense,(err,res)=>{
      Bert.alert('Expense Added', 'success', 'growl-top-right');
      this.setState({item:''})
      this.setState({price:''})
      location.reload();
    });
    }

  render(){
    this.test()
    return(
       <div style={styles.mainBox}>
       <h1 style={{textAlign:'center'}} >Enter Expense</h1>
       <div style={styles.inputs}>
         <input style={{margin:5}} type="text" value={this.state.item} id='item' placeholder='ITEM' onChange={this.handleChange.bind(this)} />

         <select onChange={this.handleChange.bind(this)} style={{margin:5}} id="expensetype">
            <option value="0">Material</option>
            <option value="1">misc</option>
          </select>

         <input style={{margin:5}} type="number" value={this.state.price} id='price' placeholder='PRICE' onChange={this.handleChange.bind(this)} />
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
