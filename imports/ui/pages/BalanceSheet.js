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
      closebal:[],
      openbal:[],
      addOpenBal:[],
      date:'',

    }
  }

  componentWillMount(){
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
        let closeBal = BalanceApi.find({type:"0",createdAt:{$gte:new Date(`${year}/${month}/${date}`)},shopid:this.props.match.params.id}).fetch();
        let addOpenBal = BalanceApi.find({type:"1",createdAt:{$gte:new Date(`${year}/${month}/${date}`)},shopid:this.props.match.params.id}).fetch();
        let openBal = BalanceApi.find({type:"0",createdAt:{$gte:new Date(`${year}/${month}/${--date}`),$lt:new Date(`${year}/${month}/${++date}`)},shopid:this.props.match.params.id}).fetch();
        this.setState({expenses});
        this.setState({invoices});
        this.setState({openBal});
        this.setState({closeBal});
        this.setState({addOpenBal});
        console.log(openBal);
    });
    }
  componentWillUnmount(){
    this.linkracker.stop();
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
    let openBal=0;
    myopenbal= this.state.openBal.map((exp)=>{
          return(openBal=parseFloat(openBal)+parseFloat(exp.balance));
    })
    let closeBal=0;
    myclosebal= this.state.closeBal.map((exp)=>{
          return(closeBal=parseFloat(closeBal)+parseFloat(exp.balance));
    })
    let addOpenBal=0;
    myaddedbal= this.state.addOpenBal.map((exp)=>{
          return(addOpenBal=parseFloat(addOpenBal)+parseFloat(exp.balance));
    })
    return(
      <div>
      <Header/>
            <div style={{display:'flex',flex:1,position:'relative',top:65,height:'70vh'}}>


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
                          <h4>{openBal}</h4>
                          <h4>{addOpenBal}</h4>
                          <h4>{parseFloat(addOpenBal)+parseFloat(price)+parseFloat(openBal)}</h4>
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
                 <h4>{closeBal}</h4>
                 <h4>{expense}</h4>
                 <h4>{parseFloat(closeBal)+parseFloat(expense)}</h4>
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

    );
  }
}
