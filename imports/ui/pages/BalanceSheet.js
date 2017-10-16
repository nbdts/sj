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
 deleteExpence(id){
   let result = confirm("Want to delete?");
 if (result) {
   Meteor.call('expense.remove',id);
   }
 }
 deleteInvoice(id){
   let result = confirm("Want to delete?");
  if (result) {
    Meteor.call('invoice.remove',id);
    }
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
            <div style={{display:'flex',height:70,}}>
            <div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center',fontSize:20}}>
                  <form onSubmit={this.handleResettingopenBal.bind(this)} >
                  <label style={{marginRight:3}}>Todays Opening Balance</label>
                  <input type="text" value={this.state.openBal} onChange={this.setValue.bind(this, 'openBal')} required />
                    <input type="submit" value="reset" />
                  </form>
            </div>
            <div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center',fontSize:20}} >
                  <form onSubmit={this.handleResettingcloseBal.bind(this)}>
                  <label style={{marginRight:3}}>Todays Closing Balnce</label>
                  <input type="text" value={this.state.closeBal} onChange={this.setValue.bind(this, 'closeBal')} required />
                    <input type="submit" value="reset" />
                  </form>
            </div>
            </div>

            <div style={{display:'flex',flex:1,marginTop:10,height:'100vh'}}>

                <div style={{flex:1,borderRight:'groove',flexFlow:'column'}}>
                    <div style={{display:'flex',flex:1,height:50,justifyContent:'center',alignItems:'center',fontSize:20,}}>Invoices List : Total : {mytotal[mytotal.length-1]}</div>
                      <div  style={{display:'flex',flex:1,height:30,justifyContent:'center',alignItems:'center',borderTop:'groove',borderBottom:'groove'}}>
                          <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18,borderRight:'groove'}}>Sequence</div>
                          <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18,borderRight:'groove'}}>Name</div>
                          <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18,borderRight:'groove'}}>Amount</div>
                          <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18}}>Action</div>
                      </div>
                    {
                      this.state.invoices.map((exp,i)=>{
                        return(
                          <div key={i} style={{display:'flex',flex:1,height:30,justifyContent:'center',alignItems:'center'}}>
                              <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18}}>{exp.seq}</div>
                              <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18}}>{exp.name}</div>
                              <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18}}>{exp.amount}</div>
                              <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18,color:'red',cursor:'pointer'}} onClick={this.deleteInvoice.bind(this,exp._id)}>Remove</div>
                          </div>
                        )
                      })
                    }
                    </div>

                <div style={{flex:1,flexFlow:'column'}}>
                <div style={{display:'flex',flex:1,height:50,justifyContent:'center',alignItems:'center',fontSize:20}}>Expenses List : Total : {myexpense[myexpense.length-1]}</div>
                  <div  style={{display:'flex',flex:1,height:30,justifyContent:'center',alignItems:'center',borderTop:'groove',borderBottom:'groove'}}>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18,borderRight:'groove'}}>Sr. No.</div>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18,borderRight:'groove'}}>Item</div>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18,borderRight:'groove'}}>Amount</div>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18}}>Action</div>
                  </div>
                    {
                      this.state.expenses.map((exp,i)=>{
                        return(
                          <div key={i} style={{display:'flex',flex:1,height:30,justifyContent:'center',alignItems:'center'}}>
                              <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18}}>{++i}</div>
                              <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18}}>{exp.item}</div>
                              <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18}}>{exp.price}</div>
                              <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:18,color:'red',cursor:'pointer'}}onClick={this.deleteExpence.bind(this,exp._id)}>Remove</div>
                          </div>
                        )
                      })
                    }
              </div>
            </div>
          </div>
        </div>

    );
  }
}
