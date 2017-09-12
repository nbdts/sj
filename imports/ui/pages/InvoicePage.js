import React, { Component } from 'react';
import './css/InvoicePage';
export default class InvoicePage  extends Component {
  constructor() {
    super();
  }
  render(){
    return(

      <body className="body">

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
                    <img id="image" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/9325/logo.png" alt="logo" />
                  </div>

	</div>

          <div id="customer">

                      <table id="meta">
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

                      </table>

          		</div>



      		<table id="items">

      		  <tr>
      		      <th>Item</th>
      		      <th>Description</th>
      		      <th>Unit Cost</th>
      		      <th>Quantity</th>
      		      <th>Price</th>
      		  </tr>

      		  <tr className="item-row">
      		      <td className="item-name"><textarea>Web Updates</textarea> </td>
      		      <td className="description"><textarea>Monthly web updates </textarea></td>
      		      <td><textarea className="cost"> €650.00 </textarea></td>
      		      <td><textarea className="qty">1</textarea></td>
      		      <td><span className="price">€650.00</span></td>
      		  </tr>

      		  <tr className="item-row">
      		      <td className="item-name"><textarea>SSL Renewals</textarea></td>
      		      <td className="description"><textarea>Yearly renewals of SSL certificates on mai</textarea></td>
      		      <td><textarea className="cost">€75.00</textarea></td>
      		      <td><textarea className="qty">3</textarea></td>
      		      <td><span className="price">€225.00</span></td>
      		  </tr>

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

      		</table>

      		<div id="terms">
      		  <h5>Terms</h5>
      		  <textarea>NET 30 Days. Finance Charge of 1.5% will be made on unpaid balances after 30 days.</textarea>
      		</div>

      	</div>

      </body>


    );
  }
}
