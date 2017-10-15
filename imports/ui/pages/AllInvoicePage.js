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

  handleClick(event){
    let from=this.state.from;
    let to=this.state.to;
    let invoice = InvoiceApi.find({shopid:event.target.value,createdAt:{$gte:new Date(`${from}`),$lt:new Date(`${to}`) } }).fetch();
    this.setState({invoice});
    console.log(invoice);
  }

  render() {
    return (
      <div className="boxmain" >
      <h1>
      All Invoice
      </h1>
      <div style={{display:'flex',flexFlow:'row',justifyContent:'spaceBetween'}}>


      <div>
      <label htmlFor="from" >From</label><input onChange={this.handleChange.bind(this)} id='from' type="date"/>
      </div>
      <div>
      <label htmlFor="to">To</label><input onChange={this.handleChange.bind(this)} id='to' type="date"/>
      </div>

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
      {this.state.invoice.map((invoices,i)=>{
        return(
        <div onClick={()=>{this.props.history.push(`/admin/allinvoice/${invoices._id}`)}} key={i} className="mainbox">
        <div className="name">{invoices.name}</div>
        <div className="name">{`${invoices.createdAt.getDate()}/${invoices.createdAt.getMonth()+1}/${invoices.createdAt.getFullYear()}`}</div>
        <div className="status">{invoices.status}</div>
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
