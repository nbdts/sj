import React, { Component } from 'react';
import './Header.css';

export default class Header  extends Component {
  constructor() {
    super();
  }
  // componentDidMount(){
  //   document.getElementById('stickyContent').innerHTML = document.getElementById('main').innerHTML;
  // }

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
          <label for="folder-toggle-1" className="folder-toggle-label"><a>Folder</a></label>
          <ul>
            <li><a href="#">Link</a></li>
            <li><a href="#">Linkus</a></li>
            <li><a href="#">Linkorama</a></li>
            <li><a href="#">Link</a></li>
          </ul>
        </li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </nav>
    <label for="mobile-menu-toggle" className="mobile-menu-label hidden"></label>
  </div>

</header>
    );
  }
}
