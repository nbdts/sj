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
      <div className="container-fluid" style={{marginTop:64}}>
      <Header />
      <Route exact path="/admin" component={Report}/>
      <Route exact path="/admin/today" component={Report}/>
       <Route exact path="/admin/allinvoice" component={AllInvoicePage}/>
      <Route exact path="/admin/allinvoice/:id" component={InvoiceDetailPage}/>
      <Route exact path="/admin/registeration" component={RegistrationPage}/>
      </div>
      </Router>
    );
  }
}
