import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './css/AllInvoicePage';
import {InvoiceApi} from '../../api/invoice';
import { Tracker } from 'meteor/tracker';

 class AllInvoicePage extends Component {
  constructor() {
    super();
    this.state={
      invoice:[],
    }

  }

  componentDidMount(){
      this.linktracker = Tracker.autorun(()=> {
        Meteor.subscribe("invoice");
        let invoice = InvoiceApi.find({}).fetch();
          this.setState({invoice});

      });
  }
  componentWillUnmount(){
    this.linktracker.stop();
  }



  render() {

    return (
      <div className="boxmain" >
      <h1>
      All Invoice
      </h1>
      {this.state.invoice.map((invoices,i)=>{return
         (
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
