import React, { Component } from 'react';
import './css/invoice';
export default class Invoice  extends Component {
  constructor() {
    super();
  }
  render(){
    return(
       <div>

       <div className="container">
               <div className="row">
                 <div className="span4">
                   <img src="http://www.brandsroller.com/img/br_logo.png" className="img-rounded logo" />
                   <address>
                     <strong>Webivorous Web services Pvt. Ltd.</strong><br />
                     35, Lajpat Nagar<br />
                     Gurugram, Haryana-122001 (India)
                   </address>
                 </div>
                 <div className="span4 well">
                   <table className="invoice-head">
                     <tbody>
                       <tr>
                         <td className="pull-right"><strong>Customer #</strong></td>
                         <td>21398324797234</td>
                       </tr>
                       <tr>
                         <td className="pull-right"><strong>Invoice #</strong></td>
                         <td>2340</td>
                       </tr>
                       <tr>
                         <td className="pull-right"><strong>Date</strong></td>
                         <td>10-08-2013</td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>
               <div className="row">
                 <div className="span8">
                   <h2>Invoice</h2>
                 </div>
               </div>
               <div className="row">
                 <div className="span8 well invoice-body">
                   <table className="table table-bordered">
                     <thead>
                       <tr>
                         <th>Product</th>
                         <th>Description</th>
                         <th>Month/Quantity</th>
                         <th>Amount</th>
                       </tr>
                     </thead>
                     <tbody>
                       <tr>
                         <td>SEO Bronze</td>
                         <td>www.swaransoft.com</td>
                         <td>8 Months</td>
                         <td>$1000</td>
                       </tr>
                       <tr><td colSpan={4} /></tr>
                       <tr>
                         <td colSpan={2}>&nbsp;</td>
                         <td><strong>Total</strong></td>
                         <td><strong>$1000.00</strong></td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>
               <div className="row">
                 <div className="span8 well invoice-thank">
                   <h5 style={{textAlign: 'center'}}>Thank You!</h5>
                 </div>
               </div>
               <div className="row">
                 <div className="span3">
                   <strong>Phone:</strong>+91-124-111111
                 </div>
                 <div className="span3">
                   <strong>Email:</strong> <a href="web@webivorous.com">web@webivorous.com</a>
                 </div>
                 <div className="span3">
                   <strong>Website:</strong> <a href="http://webivorous.com">http://webivorous.com</a>
                 </div>
               </div>
             </div>


       </div>
    );
  }
}
