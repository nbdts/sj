import React, { Component } from 'react';
import './css/InvoicePage';
import {InvoiceApi} from '../../api/invoice';
import { Tracker } from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
export default class InvoiceDetailPage  extends Component {
  constructor() {
    super();
    this.state={
      invoice:{},
      products:[],
    }
  }


  componentWillMount(){
      this.linktracker = Tracker.autorun(()=> {
        Meteor.subscribe("invoice");
         Meteor.call('invoice.invoiceById', this.props.match.params.id,(err,invoice)=>{
           this.setState({invoice});
           console.log(invoice.products);
           this.setState({products:invoice.products})

              });
        });
        }
  componentWillUnmount(){
    this.linktracker.stop();
  }





  render(){
    return(

      <div className="body">

      	<div id="page-wrap">

      		<textarea id="header">INVOICE</textarea>

      		<div id="identity">

                  <textarea id="address">Chris Coyier
      123 Appleseed Street
      Appleville, WI 53719

      Phone: (555) 555-5555</textarea>

                  <div id="logo">

                    <div id="logoctr">

                    </div>

                    <div id="logohelp">
                      <input id="imageloc" type="text" size="50" value="" /><br />
                      (max width: 540px, max height: 100px)
                    </div>
                    <img id="image" className="img-responsive" src="http://img1.ak.crunchyroll.com/i/spire1/06152008/b/9/c/1/b9c12af70b9420_full.png" alt="logo" />
                  </div>

	</div>

          <div id="customer">

                      <table id="meta">
                      <tbody>
                          <tr>
                              <td className="meta-head">Invoice no:</td>
                              <td><textarea>000123</textarea></td>
                          </tr>
                          <tr>

                              <td className="meta-head">Date:</td>
                              <td><textarea id="date">December 15, 2009</textarea></td>
                          </tr>
                          <tr>
                              <td className="meta-head">Amount:</td>
                              <td><div className="due">€900.00</div></td>
                          </tr>

                        </tbody>
                      </table>

          		</div>



      		<table id="items">
          <thead>
      		  <tr>
      		      <th>Item</th>
      		      <th>Description</th>
      		      <th>Unit Cost</th>
      		      <th>Quantity</th>
      		      <th>Price</th>
      		  </tr>
            </thead>
            <tbody>



                  {this.state.products.map((prod,i)=>{return (

                    <tr key={i} className="item-row">
              		      <td className="item-name"><textarea>{prod.name}</textarea></td>
              		      <td className="description"><textarea>{prod.status}</textarea></td>
              		      <td><textarea className="cost">{prod.price}</textarea></td>
              		      <td><textarea className="qty">1</textarea></td>
              		      <td><span className="price">€25.00</span></td>
              		  </tr>

                    )
                    })
                  }


      		  <tr className="item-row">
      		      <td className="item-name"><textarea>VAT</textarea></td>

      		      <td className="description"><textarea>Value-Added Tax</textarea></td>
      		      <td><textarea className="cost">€25.00</textarea></td>
      		      <td><textarea className="qty">1</textarea></td>
      		      <td><span className="price">€25.00</span></td>
      		  </tr>



      		  <tr>
      		      <td colspan="2" className="blank"> </td>
      		      <td colspan="2" className="total-line">Subtotal</td>
      		      <td className="total-value"><div id="subtotal">€900.00</div></td>
      		  </tr>
      		  <tr>

      		      <td colspan="2" className="blank"> </td>
      		      <td colspan="2" className="total-line">Total</td>
      		      <td className="total-value"><div id="total">€900.00</div></td>
      		  </tr>
      		  <tr>
      		      <td colspan="2" className="blank"> </td>
      		      <td colspan="2" className="total-line">Amount Paid</td>

      		      <td className="total-value"><textarea id="paid">€0.00</textarea></td>
      		  </tr>
      		  <tr>
      		      <td colspan="2" className="blank"> </td>
      		      <td colspan="2" className="total-line balance">Balance Due</td>
      		      <td className="total-value balance"><div className="due">€900.00</div></td>
      		  </tr>
            </tbody>

      		</table>

      		<div id="terms">
      		  <h5>Terms</h5>
      		  <textarea>NET 30 Days. Finance Charge of 1.5% will be made on unpaid balances after 30 days.</textarea>
      		</div>

      	</div>

      </div>


    );
  }
}
