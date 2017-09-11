import React, { Component } from 'react';
import RegistrationPage from './RegistrationPage';
import CategoryPage from './CategoryPage';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import ProductPage from './ProductPage';
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
<<<<<<< HEAD
=======
         </div>
         <ul>
           <li><a href="#RegistrationPage" id="targeted">New Branch</a></li>
           <li><a href="#CategoryPage" id="targeted">New Category</a></li>
           <li><a href="#ProductPage" id="targeted">New Product</a></li>
            </ul>
       </div>
>>>>>>> product



       </div>
         <ul>
           <li><a href="/admin/registeration" id="targeted">Add Shop</a></li>
           <li><a href="/admin/category" id="targeted">Add Category</a></li>
           <li><a href="/admin/product" id="targeted">Add Product</a></li>
         </ul>
       </div>


                <div className="main">
                  <Route exact path="/admin/registeration" component={RegistrationPage}/>
                  <Route exact path="/admin/product" component={ProductPage}/>
                  <Route exact path="/admin/category" component={CategoryPage}/>
                  
                </div>
     </div>
      </div>
      </Router>
    );
  }
}
