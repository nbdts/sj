import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './css/AllInvoicePage';
import {InvoiceApi} from '../../api/invoice';
import {ShopsApi} from '../../api/shops';
import { Tracker } from 'meteor/tracker';

 class AllInvoicePage extends Component {
  constructor() {
    super();
    this.state={
      invoice:[],
      shops:[],
      from:new Date()-new Date(),
      to:new Date(),
      phno:'',
    }

  }

  componentDidMount(){
      this.linktracker = Tracker.autorun(()=> {
        Meteor.subscribe("invoice");
        Meteor.subscribe("shop");
        let shops = ShopsApi.find().fetch();
        this.setState({shops});
      });
  }
  componentWillUnmount(){
    this.linktracker.stop();
  }
  handleChange(event){
    let object = {};
    object[event.target.id] = event.target.value
    this.setState(object);
    }
    noInvoice(event){
      if(event.target.value>9999999999)
      {
        Bert.alert('Invalid Phone Number', 'danger', 'growl-top-right');
      }
      let invoice = InvoiceApi.find({phno:event.target.value}).fetch();
      this.setState({invoice});
      this.setState({phno:event.target.value})

    }

  handleClick(event){
    let from=this.state.from;
    let to=this.state.to;
    let invoice = InvoiceApi.find({shopid:event.target.value,createdAt:{$gte:new Date(`${from}`),$lt:new Date(`${to}`) } }).fetch();
    this.setState({invoice,phno:''});
    }

  render() {
    return (
      <div className="boxmain" style={{display:'fkex',flexFlow:'column'}} >
      <h1>
      All Invoice
      </h1>
      <div style={{display:'flex',flexFlow:'row',border:'groove',justifyContent:'center',alignItems:'center',width:'100%'}}>

      <div style={{display:'flex',flex:1,flexFlow:'column',padding:5,alignItems:'center'}}>
      <label style={{padding:5}}>Phno</label>
      <input value={this.state.phno} onChange={this.noInvoice.bind(this)} type="number"/>
      </div>


      <div style={{display:'flex',flex:1,flexFlow:'column',alignItems:'center',borderRight:'groove',borderLeft:'groove',padding:5}}>

      <label htmlFor="from" style={{paddingRight:5}}>From</label><input onChange={this.handleChange.bind(this)} id='from' type="date"/>
      <label htmlFor="to" style={{padding:5}}>To</label><input onChange={this.handleChange.bind(this)} id='to' type="date"/>
      <select id='id' onChange={this.handleClick.bind(this)} style={{margin:5}}>
      <option >Select Shop</option>
      {this.state.shops.map((shop,i)=>{
        return(
          <option key={i} value={shop._id}>{shop.name}</option>
          )
        })
      }
       </select>
       </div>
       <div style={{display:'flex',flex:1,flexFlow:'column',padding:5,alignItems:'center'}}>
       <label style={{padding:5}}>Invoice No</label><div>
       SJ<input value={this.state.phno} onChange={this.noInvoice.bind(this)} type="number"/>
       </div>
       </div>
       </div>

      {this.state.invoice.map((invoices,i)=>{
        return(
        <div onClick={()=>{this.props.history.push(`/admin/allinvoice/${invoices._id}`)}} key={i} className="mainbox">
        <div className="name">{invoices.seq}</div>
        <div className="name">{invoices.name}</div>
        <div className="name">{`${invoices.createdAt.getDate()}/${invoices.createdAt.getMonth()+1}/${invoices.createdAt.getFullYear()}`}</div>
        <div className="status">₹ {invoices.amount}</div>
        <div className="x" style={{color:'red'}}><span className="glyphicon glyphicon-remove "></span></div>
        </div>
        )
        })
      }
      </div>
    );
  }
}
export default withRouter(AllInvoicePage)
