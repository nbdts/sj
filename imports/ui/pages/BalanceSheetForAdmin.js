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

     var from= this.props.from
     var fromdate= from.getDate();
     var frommonth= from.getMonth()+1;
     var fromyear= from.getFullYear();

     var to= this.props.to
     var todate= to.getDate();
     var tomonth= to.getMonth()+1;
     var toyear= to.getFullYear();

     this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("expense");
        Meteor.subscribe("balance");
        Meteor.subscribe("invoice");
        let expenses = ExpenseApi.find({createdAt:{$gte:new Date(`${fromyear}/${frommonth}/${fromdate}`),$lte:new Date(`${toyear}/${tomonth}/${todate}`)},shopid:this.props.shopid}).fetch();
        let invoices = InvoiceApi.find({createdAt:{$gte:new Date(`${fromyear}/${frommonth}/${fromdate}`),$lte:new Date(`${toyear}/${tomonth}/${todate}`)},shopid:this.props.shopid}).fetch();
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
  render(){
    let price=0;
    let mytotal= this.state.invoices.map((invoice)=>{
          return(price=parseFloat(price)+parseFloat(invoice.amount));
    })
    let expense=0;
    let myexpense= this.state.expenses.map((exp)=>{
          return(expense=parseFloat(expense)+parseFloat(exp.price));
    })
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
                    <div  style={{display:'flex',flex:1,height:50,justifyContent:'space-between',alignItems:'center',fontSize:20,padding:8}}><div className="text-info text-uppercase">Invoices List</div> <div className="text-primary">Total : {mytotal[mytotal.length-1]}</div></div>
                      <div className="panel panel-default" style={{display:'flex',flex:1,height:30,justifyContent:'center',alignItems:'center',borderTop:'groove',borderBottom:'groove'}}>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Sr. No.</div>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Name</div>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Time</div>
                          <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Amount</div>
                          <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Action</div>
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
                                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>{exp.amount}</div>
                                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',color:'red',cursor:'pointer'}} onClick={this.deleteInvoice.bind(this,exp._id)}>Remove</div>
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
                <div style={{display:'flex',flex:1,height:50,justifyContent:'space-between',alignItems:'center',fontSize:20,padding:8}}><div className="text-info text-uppercase">Expenses List</div> <div className="text-primary">Total : {myexpense[myexpense.length-1]}</div></div>
                  <div className="panel panel-default" style={{display:'flex',flex:1,height:30,justifyContent:'center',alignItems:'center',borderTop:'groove',borderBottom:'groove'}}>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Sr. No.</div>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Item</div>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Time</div>
                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Amount</div>
                       <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>Action</div>
                  </div>
                    {
                      this.state.expenses.map((exp,i)=>{
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
                                      <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',color:'red',cursor:'pointer'}}onClick={this.deleteExpence.bind(this,exp._id)}>Remove</div>                                  </div>
                                  </a>
                                </h4>
                              </div>
                              <div id={`collapsee${i}`} className="panel-collapse collapse">
                                <ul className="list-group">
                                  <li className="list-group-item">One</li>
                                  <li className="list-group-item">Two</li>
                                  <li className="list-group-item">Three</li>
                                </ul>
                                <div className="panel-footer">Footer</div>
                              </div>
                            </div>
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
