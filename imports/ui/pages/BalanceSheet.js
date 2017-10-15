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
      closebal:0,
      openbal:0,
      addOpenBal:0,

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
        let balances = BalanceApi.find({createdAt:{$gte:new Date(`${year}/${month}/${date}`)},shopid:this.props.match.params.id}).fetch();
        let invoices = InvoiceApi.find({createdAt:{$gte:new Date(`${year}/${month}/${date}`)},shopid:this.props.match.params.id}).fetch();
        let closeBal = BalanceApi.find({type:'0',createdAt:{$gte:new Date(`${year}/${month}/${date}`)},shopid:this.props.match.params.id}).fetch();
        let openBal = BalanceApi.find({type:'0',createdAt:{$gte:new Date(`${year}/${month}/${date-1}`)},shopid:this.props.match.params.id}).fetch();
        let addOpenBal = BalanceApi.find({type:'1',createdAt:{$gte:new Date(`${year}/${month}/${date-1}`)},shopid:this.props.match.params.id}).fetch();
        this.setState({expenses});
        this.setState({invoices});
        this.setState({balances});
        this.setState({openBal});
        this.setState({closeBal});
        this.setState({addOpenBal});
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
    return(
      <div>
      <Header/>
            <div style={{display:'flex',flex:1,position:'relative',top:65,height:'70vh'}}>
              <div id="expense"  style={{textAlign:'center',flex:1,borderRight:'groove'}}>
                <h1>LEFT</h1>
                <div style={{display:'flex',flexFlow:'row'}}>
                        <div id="attributes" style={{flex:3,textAlign:'right'}}>
                          <h3>Day sales:</h3>
                          <h3>Opening bal:</h3>
                          <h3>Added bal:</h3>
                          </div>
                       <div id="values" style={{flex:1,textAlign:'left'}}>
                          <h3>{price}</h3>
                          <h3>{this.state.openBal}</h3>
                          <h3>{this.state.addOpenBal}</h3>
                        </div>
                </div>
            </div>
            <div id="expense" style={{textAlign:'center',flex:1}}>
            <h1>RIGHT</h1>
            <div style={{display:'flex',flexFlow:'row'}}>
            <div id="attributes" style={{flex:1,textAlign:'right'}}>
            <h3>Closing Bal:</h3>
            <h3>Opening bal:</h3>
            <h3></h3>
            <h3>Total:</h3>
            </div>
            <div id="values" style={{flex:1,textAlign:'left'}}>
            <h3>{this.state.closeBal}</h3>
            <h3>{this.state.expenses}</h3>
            <h3></h3>
            </div>
            </div>

            </div>
            </div>
            </div>

    );
  }
}
