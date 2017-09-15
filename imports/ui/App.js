import React, {Component} from 'react';
import {Route, Navkink,Redirect} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import BillPage from "./pages/BillPage";
import InvoicePage from "./pages/InvoicePage";
import Report from "./pages/Report";
import {Session} from 'meteor/session';
import RegistrationPage from "./pages/RegistrationPage";
export default class App extends Component {
  constructor() {
    super();
  }

  authentication(props){
    const shop = Session.get('shop')
    if (shop) {
        return <HomePage />
    }else {
      Bert.alert('Loggin in to continue', 'success', 'growl-top-right');
      return <Redirect to="/login" />
    }
  }


  render() {
    return (
      <div>
      <Route exact path = "/" render={this.authentication.bind(this)} />
      <Route exact path = "/home" render={this.authentication.bind(this)} />
      <Route exact path = "/login" component = {LoginPage} />
      <Route exact path = "/admin" component = {AdminPage} />
      <Route exact path = "/admin/product" component = {AdminPage} />
      <Route exact path = "/admin/bill" component = {AdminPage} />
      <Route exact path = "/bill" component = {BillPage} />
      <Route exact path = "/admin/registeration" component = {AdminPage} />
      <Route exact path = "/registeration" component = {RegistrationPage} />
      <Route exact path = "/invoice" component = {InvoicePage} />
      <Route exact path = "/report" component = {Report} />
      </div>
      );
  }
}
