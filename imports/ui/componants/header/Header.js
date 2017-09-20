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

      <div className="main-navigation">
        <input type="checkbox" name="mobile-menu-toggle" id="mobile-menu-toggle" className="mobile-menu-box"/>
        <nav className="horizontal-nav primary-wrapper" role='navigation'>
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
                <a>Folder</a>
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
              {Session.get('shop')
                ? <a id="login" onClick={this.handleLogout.bind(this)} href="/login">Logout</a>
                : Session.get('admin')
                  ? <a id="login" onClick={this.handleLogout.bind(this)} href="/login">Logout</a>
                  : <a id="login" href="/login">Login</a>
}</li>
          </ul>
        </nav>
        <label htmlFor="mobile-menu-toggle" className="mobile-menu-label hidden"></label>
      </div>

    </header>
  );
}
}
export default withRouter(Header)
