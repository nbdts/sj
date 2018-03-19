import React, { Component } from 'react';
import Header from '../componants/header/Header';
import { Tracker } from 'meteor/tracker';
import {ExpenseApi} from '../../api/expense';
import {BalanceApi} from '../../api/balance';
import {InvoiceApi} from '../../api/invoice';
import moment from 'moment';
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
      expensetype:0,
    }
  }

  componentWillMount(){
    Meteor.call('balance.getlastnightclosingbalance',this.props.match.params.id,(err,res)=>{
      if (res[0]) {
        this.setState({openBal:res[0].balance,openBalId:res[0]._id})
      }
      })
      Meteor.call('balance.check',this.props.match.params.id,"0",(err,res)=>{
        if (res.length > 0) {
          this.setState({closeBal:res[res.length-1].balance,closeBalID:res[res.length-1]._id})
        }
        })
      Meteor.call('balance.check',this.props.match.params.id,"1",(err,res)=>{

        if (res.length > 0) {
          this.setState({addOpenBal:res[res.length-1].balance,addOpenBalId:res[res.length-1]._id})
        }
        })

    var today=new Date()
     var date= today.getDate();
     var month= today.getMonth()+1;
     var year= today.getFullYear();
     this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("expenseByShopIdAndDateWise",this.props.match.params.id,new Date(`${year}/${month}/${date}`));
        Meteor.subscribe("invoiceByShopIdAndDateWise",this.props.match.params.id,new Date(`${year}/${month}/${date}`));
        let expenses = ExpenseApi.find({createdAt:{$gte:new Date(`${year}/${month}/${date}`)},shopid:this.props.match.params.id}).fetch();
        let invoices = InvoiceApi.find().fetch();
        // let invoices = InvoiceApi.find({createdAt:{$gte:new Date(`${year}/${month}/${date}`)},shopid:this.props.match.params.id}).fetch();
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
 handleResettinglastnighclosingbaalnce(event){
   event.preventDefault();
   Bert.alert('Nt allowed to change yet', 'danger', 'growl-top-right');

 }
 handleResettingopenBal(event) {
   event.preventDefault();
   if (!this.state.addOpenBal || !this.state.addOpenBalId) {
     Bert.alert('set Opening Balance First', 'danger', 'growl-top-right');
     return false;
   }
   let addOpenBal=this.state.addOpenBal.trim();
   let addOpenBalId=this.state.addOpenBalId.trim();
   Meteor.call('balance.update',addOpenBalId,addOpenBal,(err,res)=>{
     if (res) {
       Bert.alert('successfully update', 'success', 'growl-top-right');
       location.reload();
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
       location.reload();
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
 handleCheckBOx(){
   if (this.state.expensetype == 0) {
     this.setState({expensetype:1})
   }else {
     this.setState({expensetype:0})
   }
 }
  render(){
    if (this.state.invoices.length === 0 && this.state.expenses.length === 0 ) {
      return (
        <div className="progress">
          <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{width:'45%'}}>
            <span className="sr-only">45% Complete</span>
          </div>
        </div>
      )
    }else {
    let mytotal= this.state.invoices.reduce((sum,invoice)=>{
          return parseFloat(sum)+ parseFloat(invoice.amount)
    },0)
    let myexpense= this.state.expenses.reduce((sum,exp)=>{
          return parseFloat(sum) + parseFloat(exp.price)
    },0)
    return(
      <div>
      <Header/>
            <div style={{marginTop:70}}>
            <div style={{display:'flex'}}>
            <div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center',fontSize:20}}>
                  <form onSubmit={this.handleResettinglastnighclosingbaalnce.bind(this)} style={{display:'flex',flexFlow:'column',justifyContent:'center',alignItems:'center'}}>
                  <label className="text-primary" style={{marginRight:3}}>Todays Opening Balance</label>
                  <input type="text" value={this.state.openBal} className="form-control" onChange={this.setValue.bind(this, 'openBal')} required />
                    <input type="submit" value="reset" className="btn btn-primary"  style={{margin:5}} />
                  </form>
            </div>
            <div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center',fontSize:20}}>
                  <form onSubmit={this.handleResettingopenBal.bind(this)} style={{display:'flex',flexFlow:'column',justifyContent:'center',alignItems:'center'}}>
                  <label className="text-primary" style={{marginRight:3}}>Todays Added Balance</label>
                  <input type="text" value={this.state.addOpenBal} className="form-control" onChange={this.setValue.bind(this, 'addOpenBal')} required />
                    <input type="submit" value="reset" className="btn btn-primary"  style={{margin:5}}/>
                  </form>
            </div>
            <div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center',fontSize:20}} >
                  <form onSubmit={this.handleResettingcloseBal.bind(this)} style={{display:'flex',flexFlow:'column',justifyContent:'center',alignItems:'center'}}>
                  <label className="text-primary" style={{marginRight:3}}>Todays Closing Balnce</label>
                  <input type="text" value={this.state.closeBal} className="form-control" onChange={this.setValue.bind(this, 'closeBal')} required />
                    <input type="submit" value="reset" className="btn btn-primary"  style={{margin:5}}/>
                  </form>
            </div>
            </div>

            <div style={{display:'flex',flex:1,marginTop:10,flexWrap:'wrap'}}>

                <div style={{flex:1,borderRight:'groove',flexFlow:'column',minWidth:400}}>
                    <div  style={{display:'flex',flex:1,height:50,justifyContent:'space-between',alignItems:'center',fontSize:20,padding:8}}><div className="text-info text-uppercase">Invoices List</div> <div className="text-primary">Total : {mytotal}</div></div>
                      <div className="panel panel-default" style={{display:'flex',flex:1,height:30,justifyContent:'center',alignItems:'center',borderTop:'groove',borderBottom:'groove'}}>
                          <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Sr. No.</div>
                          <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Name</div>
                          <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Time</div>
                          <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Amount</div>
                      </div>
                    {
                      this.state.invoices.map((exp,i)=>{
                        return(
                          <div key={i} className="panel-group" style={{padding:0,margin:0}}>
                            <div className="panel panel-default">
                              <div className="panel-heading">
                                <h4 className="panel-title">
                                  <a data-toggle="collapse" href={`#collapse${i}`}>
                                  <div key={i} style={{display:'flex',flex:1,height:30,justifyContent:'center',alignItems:'center'}}>
                                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>{i+1}</div>
                                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>{exp.name}</div>
                                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>{ moment(exp.createdAt).format("hh:mm:ss a")}</div>
                                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>{exp.amount}<div style={{padding:10,color:'blue'}}>{exp.paymenttype[0]}</div></div>
                                  </div>
                                  </a>
                                </h4>
                              </div>
                              <div id={`collapse${i}`} className="panel-collapse collapse">
                                <ul className="list-group">
                                  {
                                    exp.products.map((prod,i)=>
                                      <li key={i} className="list-group-item">
                                        <div  style={{display:'flex',flex:1,height:30,justifyContent:'center',alignItems:'center'}}>
                                            <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',}}>{prod.name}</div>
                                            <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',}}>{prod.price}</div>
                                            <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',}}>{prod.quantity}</div>
                                        </div>
                                      </li>
                                    )
                                  }
                                </ul>
                              </div>
                            </div>
                          </div>                        )
                      })
                    }
                    </div>

                <div style={{flex:1,flexFlow:'column',minWidth:400}}>
                <input type="checkbox"  onChange={this.handleCheckBOx.bind(this)}/>{this.state.expensetype == 0 ? "material" : "misc"}
                <div style={{display:'flex',flex:1,height:50,justifyContent:'space-between',alignItems:'center',fontSize:20,padding:8}}><div className="text-info text-uppercase">Expenses List</div> <div className="text-primary">Total : {myexpense}</div></div>
                  <div className="panel panel-default" style={{display:'flex',flex:1,height:30,justifyContent:'center',alignItems:'center',borderTop:'groove',borderBottom:'groove'}}>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Sr. No.</div>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Item</div>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Time</div>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Amount</div>
                  </div>
                    {
                      this.state.expenses.map((exp,i)=>{
                        if (parseFloat(exp.expensetype) == this.state.expensetype) {
                          return(
                            <div key={i} className="panel-group">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a data-toggle="collapse" href={`#collapsee${i}`}>
                                    <div key={i} style={{display:'flex',flex:1,height:30,justifyContent:'center',alignItems:'center'}}>
                                        <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>{i+1}</div>
                                        <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>{exp.item}</div>
                                        <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>{ moment(exp.createdAt).format("hh:mm:ss a")}</div>
                                        <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>{exp.price}</div>
                                    </div>
                                    </a>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      })
                    }
              </div>
            </div>
          </div>
        </div>

    );
   }
  }
}
