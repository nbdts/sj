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
      invoices:[],
      openBal:0,
      openBalId:0,
      closeBal:0,
      closeBalID:0,
      addOpenBal:[],
      date:'',
    }
  }

  componentWillMount(){
    Meteor.call('balance.check',(err,res)=>{
      if (res) {
        res.map((fb)=>{
          if (fb.type === "1") {
            this.setState({openBal:fb.balance,openBalId:fb._id})
            this.setState({openBal:fb.balance,openBalId:fb._id})
          }
          if (fb.type === "0") {
            this.setState({closeBal:fb.balance,closeBalID:fb._id},()=>{console.log(this.state.closeBal)})
          }
        })
      }
      })
    var today=new Date()
     var date= today.getDate();
     var month= today.getMonth()+1;
     var year= today.getFullYear();
     this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("expense");
        Meteor.subscribe("balance");
        Meteor.subscribe("invoice");
        let expenses = ExpenseApi.find({createdAt:{$gte:new Date(`${year}/${month}/${date}`)},shopid:this.props.match.params.id}).fetch();
        let invoices = InvoiceApi.find({createdAt:{$gte:new Date(`${year}/${month}/${date}`)},shopid:this.props.match.params.id}).fetch();
        let addOpenBal = BalanceApi.find({type:"1",createdAt:{$gte:new Date(`${year}/${month}/${date}`)},shopid:this.props.match.params.id}).fetch();
        this.setState({expenses});
        this.setState({invoices});
        this.setState({addOpenBal});
    });
    }
  componentWillUnmount(){
    this.linkracker.stop();
  }


  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
 handleResettingopenBal(event) {
   event.preventDefault();
   if (!this.state.openBal || !this.state.openBalId) {
     Bert.alert('set Opening Balance First', 'danger', 'growl-top-right');
     return false;
   }
   let openBal=this.state.openBal.trim();
   let openBalId=this.state.openBalId.trim();
   Meteor.call('balance.update',openBalId,openBal,(err,res)=>{
     if (res) {
       Bert.alert('successfully update', 'success', 'growl-top-right');
     }
   })
 }
 handleResettingcloseBal(event) {
   event.preventDefault();
   if (!this.state.closeBal || !this.state.closeBalID) {
     Bert.alert('set Closing Balance First', 'danger', 'growl-top-right');
     return false;
   }
   let closeBal=this.state.closeBal.trim();
   let closeBalID=this.state.closeBalID.trim();
   Meteor.call('balance.update',closeBalID,closeBal,(err,res)=>{
     if (res) {
       Bert.alert('successfully update', 'success', 'growl-top-right');
     }
   })
 }
  render(){
    let price=0;
    let mytotal= this.state.invoices.map((invoice)=>{
          return(price=parseFloat(price)+parseFloat(invoice.amount));
    })
    let expense=0;
    let myexpense= this.state.expenses.map((exp)=>{
          return(expense=parseFloat(expense)+parseFloat(exp.price));
    })
    let addOpenBal=0;
    myaddedbal= this.state.addOpenBal.map((exp)=>{
          return(addOpenBal=parseFloat(addOpenBal)+parseFloat(exp.balance));
    })
    return(
      <div>
      <Header/>
            <div style={{marginTop:60}}>
            <div style={{display:'flex',height:60,}}>
            <div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center',fontSize:20}}>
                  <form onSubmit={this.handleResettingopenBal.bind(this)} >
                  <label style={{marginRight:3}}>Opening Balance</label>
                  <input type="text" value={this.state.openBal} onChange={this.setValue.bind(this, 'openBal')} required />
                    <input type="submit" value="reset" />
                  </form>
            </div>
            <div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center',fontSize:20}} >
                  <form onSubmit={this.handleResettingcloseBal.bind(this)}>
                  <label style={{marginRight:3}}>Closing Balnce</label>
                  <input type="text" value={this.state.closeBal} onChange={this.setValue.bind(this, 'closeBal')} required />
                    <input type="submit" value="reset" />
                  </form>
            </div>
            </div>

            <div style={{display:'flex',flex:1}}>
              <div id="expense"  style={{textAlign:'center',flex:1,borderRight:'groove'}}>
                <h1>LEFT</h1>
                <div style={{display:'flex',flexFlow:'row'}}>
                        <div id="attributes" style={{flex:2,textAlign:'right'}}>
                          <h4>Day sales:</h4>
                          <h4>Opening bal:</h4>
                          <h4>Added bal:</h4>
                          <h4>Total Amount:</h4>
                        </div>
                       <div id="values" style={{flex:1,textAlign:'left'}}>
                          <h4>{price}</h4>
                          <h4>{this.state.openBal}</h4>
                          <h4>{addOpenBal}</h4>
                          <h4>{parseFloat(addOpenBal)+parseFloat(price)+parseFloat(this.state.openBal)}</h4>
                        </div>
                </div>
            </div>

            <div id="expense" style={{textAlign:'center',flex:1,borderRight:'groove'}}>
            <h1>RIGHT</h1>
            <div style={{display:'flex',flexFlow:'row'}}>
              <div id="attributes" style={{flex:1,textAlign:'right',paddingLeft:20}}>
                <h4>Closing Bal:</h4>
                <h4>Expenses:</h4>
                <h4></h4>
                <h4>Total Amount:</h4>
              </div>
              <div id="values" style={{flex:1,textAlign:'left'}}>
                 <h4>{this.state.closeBal}</h4>
                 <h4>{expense}</h4>
                 <h4>{parseFloat(this.state.closeBal)+parseFloat(expense)}</h4>
               </div>
             </div>
            </div>

            <div id="expense"  style={{textAlign:'center',flex:1,borderRight:'groove'}}>
              <h1>EXPENSES</h1>
              {

              this.state.expenses.map((exp,i)=>{
                    return(
                      <div key={i} style={{display:'flex',flexFlow:'row',flex:1}}>
                      <h4 style={{flex:1}} >{i+1})</h4>
                       <h4 style={{flex:1}} > {exp.item}</h4>
                        <h4 style={{flex:1}} >{exp.price}</h4>
                      </div>
                    );
              })
            }

          </div>

            </div>
            </div>
            </div>

    );
  }
}
