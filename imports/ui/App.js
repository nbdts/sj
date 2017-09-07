import React, {Component} from 'react';
import {Route, Navkink} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
export default class extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
      <Route exact path = "/" component = {HomePage} />
      <Route exact path = "/home" component = {HomePage} />
      <Route exact path = "/login" component = {LoginPage} />
      <Route exact path = "/registration" component = {RegistrationPage} />
      </div>
      );
  }
}
