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
            <div className="slidebar">
              <ul>
                <li><TestPage link="/admin/registeration" text="Add Shop" image="http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/black-white-pearls-icons-business/078053-black-white-pearl-icon-business-home6.png"/></li>
                <li><TestPage link="/admin/product" text="Add Product" image="http://aceautomation.eu/wp-content/uploads/2016/02/shoppingcart.png"/></li>
                <li><TestPage link="/admin/bill" text="Create Bill" image="http://www.scotiabank.com/digitalcentre/images/advice-hub/icons/icon-managing-bills.svg"/></li>
                <li><TestPage link="/admin/report" text="Report" image="https://www.bsr.org/images/icons/bsr-reports-icon.svg"/></li>
                <li><TestPage link="/admin/allinvoice" text="All Invoice" image="http://www.entypo.com/images/fingerprint.svg"/></li>
              </ul>
            </div>

            <div className="main">
              <Route exact path="/admin/registeration" component={RegistrationPage}/>
              <Route exact path="/admin/product" component={ProductPage}/>
              <Route exact path="/admin/report" component={Report}/>
              <Route exact path="/admin/allinvoice" component={AllInvoicePage}/>
              <Route exact path="/admin/allinvoice/:id" component={InvoiceDetailPage}/>
              <Route exact path="/admin/bill" component={BillPage}/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
