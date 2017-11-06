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
      addOpenBal:0,
      addOpenBalId:0,
      date:'',
    }
  }

  componentWillMount(){
    Meteor.call('balance.getlastnightclosingbalance',this.props.shopid,(err,res)=>{
      if (res[0]) {
        this.setState({openBal:res[0].balance,openBalId:res[0]._id})
      }
      })
      Meteor.call('balance.check',this.props.shopid,(err,res)=>{
        if (res) {
          res.map((fb)=>{
            if (fb.type === "1") {
              this.setState({addOpenBal:fb.balance,addOpenBalId:fb._id})
            }
            if (fb.type === "0") {
              this.setState({closeBal:fb.balance,closeBalID:fb._id})
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
        let expenses = ExpenseApi.find({createdAt:{$gte:new Date(`${year}/${month}/${date}`)},shopid:this.props.shopid}).fetch();
        let invoices = InvoiceApi.find({createdAt:{$gte:new Date(`${year}/${month}/${date}`)},shopid:this.props.shopid}).fetch();
        this.setState({expenses});
        this.setState({invoices});
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
  render(){
    let price=0;
    let mytotal= this.state.invoices.map((invoice)=>{
          return(price=parseFloat(price)+parseFloat(invoice.amount));
    })

    let paytmsales=0;
    let paytmsales1= this.state.invoices.map((invoice)=>{
          if (invoice.paymenttype === "paytm") {
            return(paytmsales=parseFloat(paytmsales)+parseFloat(invoice.amount));
          }
    })

    let cashsales=0;
    let cashsales1= this.state.invoices.map((invoice)=>{
          if (invoice.paymenttype === "cash") {
            return(cashsales=parseFloat(cashsales)+parseFloat(invoice.amount));
          }
    })
    let udharisales=0;
    let udharisales1= this.state.invoices.map((invoice)=>{
          if (invoice.paymenttype === "borrow") {
            return(udharisales=parseFloat(udharisales)+parseFloat(invoice.amount));
          }
    })
    let mtexpense=0;
    let mtrexpense= this.state.expenses.map((exp)=>{
      if (parseFloat(exp.expensetype) == 0) {
        return(mtexpense=parseFloat(mtexpense)+parseFloat(exp.price));
      }
    })
    let miexpense=0;
    let miscexpense= this.state.expenses.map((exp)=>{
      if (parseFloat(exp.expensetype) == 1) {
        return(miexpense=parseFloat(miexpense)+parseFloat(exp.price));
      }
    })
    let totalearning = parseFloat(this.state.openBal) + parseFloat(this.state.addOpenBal) + parseFloat(mytotal[mytotal.length-1])
    let totalexpense = parseFloat(mtrexpense[mtrexpense.length-2]) + parseFloat(miscexpense[miscexpense.length-1])
    let availablebalance = totalearning - totalexpense;
    return(
      <div>
      <Header/>
            <div style={{marginTop:60}}>
            <div style={{display:'flex',flex:1,marginTop:10}}>

                <div style={{flex:1,borderRight:'groove',flexFlow:'column',justifyContent:'center'}}>

                    <div style={{display:'flex',margin:10,justifyContent:'center',alignItems:'center'}}>
                        <div style={{display:'flex',flex:1}}>Opening Balance</div>
                        <div style={{display:'flex',flex:1}}>{this.state.openBal}</div>
                    </div>


                    <div style={{display:'flex',margin:10,justifyContent:'center',alignItems:'center'}}>
                        <div style={{display:'flex',flex:1}}>Added Balance</div>
                        <div style={{display:'flex',flex:1}}>{this.state.addOpenBal}</div>
                    </div>


                    <div style={{display:'flex',margin:10,justifyContent:'center',alignItems:'center'}}>
                        <div style={{display:'flex',flex:1}}> Sales </div>
                        <div style={{display:'flex',flex:1}}>{mytotal[mytotal.length-1]}</div>
                    </div>
                    <hr />

                    <div style={{display:'flex',margin:10,justifyContent:'center',alignItems:'center'}}>
                        <div style={{display:'flex',flex:1}}> Total </div>
                        <div style={{display:'flex',flex:1}}>{parseFloat(this.state.openBal) + parseFloat(this.state.addOpenBal) + parseFloat(mytotal[mytotal.length-1])}</div>
                    </div>

                </div>

                <div style={{flex:1,flexFlow:'column',justifyContent:'center'}}>

                    <div style={{display:'flex',margin:10,justifyContent:'center',alignItems:'center'}}>
                        <div style={{display:'flex',flex:1}}>Material expense</div>
                        <div style={{display:'flex',flex:1}}>{mtrexpense[mtrexpense.length-2]}</div>
                    </div>


                    <div style={{display:'flex',margin:10,justifyContent:'center',alignItems:'center'}}>
                        <div style={{display:'flex',flex:1}}>Misc Expense</div>
                        <div style={{display:'flex',flex:1}}>{miscexpense[miscexpense.length-1]}</div>
                    </div>
                    <hr />

                    <div style={{display:'flex',margin:10,justifyContent:'center',alignItems:'center'}}>
                        <div style={{display:'flex',flex:1}}>Total</div>
                        <div style={{display:'flex',flex:1}}>{parseFloat(mtrexpense[mtrexpense.length-2]) + parseFloat(miscexpense[miscexpense.length-1])}</div>
                    </div>

                </div>

            </div>
            <p>available balance at counter is {availablebalance}</p>
            <p>paytm sales is {paytmsales1[paytmsales1.length -1]}</p>
            <p>cash sales is {cashsales1[cashsales1.length - 2]}</p>
            <p>Udhari sales is {udharisales1[udharisales1.length - 3]}</p>
          </div>
        </div>

    );
  }
}
