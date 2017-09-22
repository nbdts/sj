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
    <div style={{backgroundColor:'#272727'}} >
    <img style={{padding:'5px',borderRadius:'1em', height:'70px',width:'200px'}} src='/sjflex.jpg' alt="flex"/>
    </div>
    <div style={{flex:5}} className="main-navigation">
        <nav className="horizontal-nav primary-wrapper" role='navigation'>
          <ul style={{marginRight:'20px'}}>
            <li className="folder">
              <label htmlFor="folder-toggle-1" className="folder-toggle-label">
                <a className="glyphicon glyphicon-cog"> Check</a>
              </label>
              <ul>
              <li>
                { Session.get('shop')
                ? <a id="login" onClick={this.handleLogout.bind(this)} href="/login">Logout</a>
                : Session.get('admin')
                  ? <a id="login" onClick={this.handleLogout.bind(this)} href="/login">Logout</a>
                  : <a id="login" href="/login">Login</a>

              }
              </li>

                <li>
                  <a href="#">Linkus</a>
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
