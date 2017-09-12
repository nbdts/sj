import React, { Component } from 'react';
import RegistrationPage from './RegistrationPage';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import ProductPage from './ProductPage';
import BillPage from './BillPage';
import './css/AdminPage';
export default class AdminPage extends Component {
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
           <li><a href="/admin/bill" id="targeted">Create Bill</a></li>
         </ul>
       </div>


                <div className="main">
                  <Route exact path="/admin/registeration" component={RegistrationPage}/>
                  <Route exact path="/admin/product" component={ProductPage}/>
                  <Route exact path="/admin/bill" component={BillPage}/>

                </div>
     </div>
      </div>
      </Router>
    );
  }
}
