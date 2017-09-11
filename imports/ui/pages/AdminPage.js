import React, { Component } from 'react';
import RegistrationPage from './RegistrationPage';
import CategoryPage from './CategoryPage';
import ProductPage from './ProductPage';
import './css/AdminPage';
export default class AdminPage extends Component {
  constructor() {
    super();
  }
  render(){
    return(
      <div>

      <div className="admin-panel clearfix">
       <div className="slidebar">
         <div className="logo">
           <a href='#'/>
         </div>
         <ul>
           <li><a href="#RegistrationPage" id="targeted">Add Branch</a></li>
           <li><a href="#CategoryPage" id="targeted">Add Category</a></li>
           <li><a href="#ProductPage" id="targeted">Add Product</a></li>
           <li><a href="#ReportPage" id="targeted">Report</a></li>
            </ul>
       </div>


       <div className="main">
         <ul className="topbar clearfix">
           <li><a href="#">q</a></li>
           <li><a href="#">p</a></li>
           <li><a href="#">o</a></li>
           <li><a href="#">f</a></li>
           <li><a href="#">n</a></li>
         </ul>


         <div className="mainContent clearfix">
           <div id="RegistrationPage">
            <RegistrationPage id="RegistrationPage" />
           </div>

           <div id="CategoryPage">
            <CategoryPage/>
           </div>
           <div id="ProductPage">
            <ProductPage/>
           </div>
           <div id="ReportPage">
            <h1>Report Page</h1>
           </div>

           </div>
         </div>
     </div>

      </div>
    );
  }
}
