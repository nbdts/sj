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
      Meteor.call('balance.check',this.props.shopid,"0",(err,res)=>{
        if (res.length > 0) {
          this.setState({closeBal:res[0].balance,closeBalID:res[0]._id})
        }
        })
      Meteor.call('balance.check',this.props.shopid,"1",(err,res)=>{
        if (res.length > 0) {
          this.setState({addOpenBal:res[0].balance,addOpenBalId:res[0]._id})
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
    let paytmsales=0;
    let cashsales=0;
    let udharisales=0;

    let mytotal= this.state.invoices.filter((invoice)=>{
          if (invoice.amount) {
            price = price + parseFloat(invoice.amount)
          }
          if (invoice.paymenttype === "paytm") {
            paytmsales = paytmsales + parseFloat(invoice.amount)
          }
          if (invoice.paymenttype === "cash") {
            cashsales = cashsales + parseFloat(invoice.amount)
          }
          if (invoice.paymenttype === "borrow") {
            udharisales = parseFloat(udharisales) + parseFloat(invoice.amount)
          }

    })


    let mtexpense=0;
    let miexpense=0;

    let mtrexpense= this.state.expenses.filter((exp)=>{
      if (parseFloat(exp.expensetype) == 0) {
        mtexpense = parseFloat(mtexpense) + parseFloat(exp.price)
      }
      if (parseFloat(exp.expensetype) == 1) {
        miexpense = parseFloat(miexpense) + parseFloat(exp.price)
      }
    })
    let totalearning = parseFloat(this.state.openBal) + parseFloat(this.state.addOpenBal) + parseFloat(price)
    let totalexpense = parseFloat(mtexpense) + parseFloat(miexpense)
    let availablebalance = totalearning - totalexpense;
    return(
      <div>
      <Header/>
            <div style={{marginTop:70,fontSize:15}}>
            <div style={{display:'flex',flex:1,marginTop:10,borderBottom:'groove',}}>

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
                        <div style={{display:'flex',flex:1}}>{price}</div>
                    </div>
                    <hr />

                    <div style={{display:'flex',margin:10,justifyContent:'center',alignItems:'center'}}>
                        <div style={{display:'flex',flex:1}}> Total </div>
                        <div style={{display:'flex',flex:1}}>{totalearning}</div>
                    </div>

                </div>

                <div style={{flex:1,flexFlow:'column',justifyContent:'center'}}>

                    <div style={{display:'flex',margin:10,justifyContent:'center',alignItems:'center'}}>
                        <div style={{display:'flex',flex:1}}>Material expense</div>
                        <div style={{display:'flex',flex:1}}>{mtexpense}</div>
                    </div>


                    <div style={{display:'flex',margin:10,justifyContent:'center',alignItems:'center'}}>
                        <div style={{display:'flex',flex:1}}>Misc Expense</div>
                        <div style={{display:'flex',flex:1}}>{miexpense}</div>
                    </div>
                    <hr />

                    <div style={{display:'flex',margin:10,justifyContent:'center',alignItems:'center'}}>
                        <div style={{display:'flex',flex:1}}>Total</div>
                        <div style={{display:'flex',flex:1}}>{parseFloat(mtexpense) + parseFloat(miexpense)}</div>
                    </div>

                </div>

            </div>
            <p>available balance at counter is {availablebalance}</p>
            <p>paytm sales is {paytmsales}</p>
            <p>cash sales is {cashsales}</p>
            <p>Udhari sales is {udharisales}</p>
          </div>
        </div>

    );
  }
}
