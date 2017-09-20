import React, { Component } from 'react';
import './css/InvoicePage';
import {InvoiceApi} from '../../api/invoice';
import { Tracker } from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import InvoicePage from './InvoicePage';

export default class InvoiceDetailPage  extends Component {
  constructor() {
    super();
    this.state={
      invoice:{},
      products:[],
      total:'',
    }
  }


  componentWillMount(){
      this.linktracker = Tracker.autorun(()=> {
        Meteor.subscribe("invoice");
         Meteor.call('invoice.invoiceById', this.props.match.params.id,(err,invoice)=>{
           this.setState({invoice});
           this.setState({products:invoice.products})
           console.log(this.state.products);

              });
        });
        }
  componentWillUnmount(){
    this.linktracker.stop();
  }



createInvoice(){}

  render(){
    return(
      <div>
      <div className="mycontainer">
        <div className="invoice">
          <header>
            <section>
              <h1>Sandwich Junction</h1>
              <span>16/02/2016</span>
            </section>

          </header>
          <h2 className="h2">Name:</h2>
          <main>
            <section>
              <span>Product</span>
              <span>Unit</span>
              <span>Price</span>
            </section>

            <section>
              {this.state.products.map((product, i) => {
                return (
                  <div key={i}>
                    <figure>
                      <span>
                        <strong>{product.name}</strong>
                      </span>
                      <span>1</span>
                      <span>{product.price}</span>
                    </figure>
                  </div>
                )
              })}

            </section>

            <section>
              <span>Total</span>
              <span>{this.props.total}</span>
            </section>
          </main>

          </div>
      </div>
      </div>
    );
  }
}
