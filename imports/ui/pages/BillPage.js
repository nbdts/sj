import React, { Component } from 'react';
export default class BillPage extends Component {
  constructor() {
    super();
  }
  render(){
    return(
      <Router>
      <div>
      <div className="admin-panel clearfix">
       <div className="slidebar">
       <div className="logo">
           <a href='#'/>

       </div>
         <ul>
           <li><a href="/admin/registeration" id="targeted">Add Shop</a></li>
           <li><a href="/admin/product" id="targeted">Add Product</a></li>
         </ul>
       </div>


                <div className="main">

                </div>
     </div>
      </div>
      </Router>
    );
  }
}
