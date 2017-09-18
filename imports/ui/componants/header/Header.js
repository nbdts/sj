import React, { Component } from 'react';
import './Header.css';
import {Session} from 'meteor/session';
import {withRouter} from 'react-router-dom';


class Header  extends Component {
  constructor() {
    super();
  }
  // componentDidMount(){
  //   document.getElementById('stickyContent').innerHTML = document.getElementById('main').innerHTML;
  // }
  handleLogout(){
    Session.clear();
      }

  render(){
    return(
      <header className="header-banner-top">

  <div className="main-navigation">
    <input type="checkbox" name="mobile-menu-toggle" id="mobile-menu-toggle" className="mobile-menu-box" />
    <nav className="horizontal-nav primary-wrapper" role='navigation'>
      <ul>
        <li className="active-link"><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li className="folder">
          <input type="checkbox" name="folder-toggle-1" id="folder-toggle-1" className="folder-toggle-box hidden" />
          <label htmlFor="folder-toggle-1" className="folder-toggle-label"><a>Folder</a></label>
          <ul>
            <li><a href="#">Link</a></li>
            <li><a href="#">Linkus</a></li>
            <li><a href="#">Linkorama</a></li>
            <li><a href="#">Link</a></li>
          </ul>
        </li>
        <li>{
          Session.get('shop') ?
          <a onClick={this.handleLogout.bind(this)} href="#">Logout</a>:
          <a href="#"></a>
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
