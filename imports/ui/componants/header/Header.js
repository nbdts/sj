import React, {Component} from 'react';
import './Header.css';
import {Session} from 'meteor/session';
import {withRouter, Redirect,} from 'react-router-dom';

class Header extends Component {
  constructor() {
    super();
  }
  handleLogout() {
    Session.clear();
    <Redirect to = "/login" />
}

render() {
  return (
    <header className="header-banner-top">
    <div style={{flex:5}} className="main-navigation">
        <input type="checkbox" name="mobile-menu-toggle" id="mobile-menu-toggle" className="mobile-menu-box"/>
        <nav className="horizontal-nav primary-wrapper" role='navigation'>
        <div style={{flex:1,height:'100%',width:'100%'}}>
        <img style={{height:55,width:'100%'}} src='/sjflex.jpg' alt="flex"/>
        </div>
          <ul>
          <li className="active-link">
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li className="folder">
              <input type="checkbox" name="folder-toggle-1" id="folder-toggle-1" className="folder-toggle-box hidden"/>
              <label htmlFor="folder-toggle-1" className="folder-toggle-label">
                <a></a>
              </label>
              <ul>
                <li>
                  <a href="#">Link</a>
                </li>
                <li>
                  <a href="#">Linkus</a>
                </li>
                <li>
                  <a href="#">Linkorama</a>
                </li>
                <li>
                  <a href="#">Link</a>
                </li>
              </ul>
            </li>
            <li>
              </li>
          </ul>
        </nav>
        <label htmlFor="mobile-menu-toggle" className="mobile-menu-label hidden"></label>
      </div>

    </header>
  );
}
}
export default withRouter(Header)
