import React, {Component} from 'react';
import RegistrationPage from './RegistrationPage';
import {BrowserRouter as Router, Route,} from 'react-router-dom';
import ProductPage from './ProductPage';
import Header from '../componants/header/Header';
import BillPage from './BillPage';
import Report from "./Report";
import AllInvoicePage from "./AllInvoicePage";
import InvoiceDetailPage from "./InvoiceDetailPage";
import './css/AdminPage';

import TestPage from "./TestPage";

export default class AdminPage extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Router>
        <div>
        <Header/>
          <div  className="admin-panel clearfix">
            <div className="slidebar" >
              <ul>
                <li><TestPage link="/admin/registeration" text="Add Shop" image="/shop.png"/></li>
                <li><TestPage link="/admin/product" text="Add Product" image="/addProduct.png"/></li>
                <li><TestPage link="/admin/report" text="Report" image="/bar-chart.png"/></li>
                <li><TestPage link="/admin/allinvoice" text="All Invoice" image="/addall.png"/></li>
              </ul>
            </div>

            <div className="main">
              <Route exact path="/admin" component={Report}/>
              <Route exact path="/admin/registeration" component={RegistrationPage}/>
              <Route exact path="/admin/product" component={ProductPage}/>
              <Route exact path="/admin/report" component={Report}/>
              <Route exact path="/admin/allinvoice" component={AllInvoicePage}/>
              <Route exact path="/admin/allinvoice/:id" component={InvoiceDetailPage}/>
              </div>
          </div>
        </div>
      </Router>
    );
  }
}
