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
  handleClick(event){
    let invoice = InvoiceApi.find({shopid:event.target.value}).fetch();
    this.setState({invoice});
  }

  render() {
    return (
      <div className="boxmain" >
      <h1>
      All Invoice
      </h1>
      <select id='id' onChange={this.handleClick.bind(this)} style={{margin:5}}>
      <option >Select Shop</option>
      {this.state.shops.map((shop,i)=>{
        return(
          <option key={i} value={shop._id}>{shop.name}</option>
          )
        })
      }
       </select>
      {this.state.invoice.map((invoices,i)=>{
        return(
        <div onClick={()=>{this.props.history.push(`/admin/allinvoice/${invoices._id}`)}} key={i} className="mainbox">
        <div className="name">{invoices.name}</div>
        <div className="name">{`${invoices.createdAt.getDay()}/${invoices.createdAt.getMonth()}/${invoices.createdAt.getFullYear()}`}</div>
        <div className="status">{invoices.status}</div>
        <div className="x"><span className="glyphicon glyphicon-remove "></span></div>
        </div>
        )
        })
      }
      </div>
    );
  }
}
export default withRouter(AllInvoicePage)
