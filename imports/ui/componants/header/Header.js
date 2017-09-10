import React, { Component } from 'react';
import './Header.css';
export default class Header  extends Component {

  constructor() {
    super();
  }
  render(){
    return(

      <div className="header-container header-body">
      <header className="header">
         <div className="wrap">
          <h1 className="headerh1">SANDWICH JUNCTIONS</h1>

        </div>
      </header>
      <nav className="nav">
        <div className="wrap">
          <ul className="navbar ul">
            <li className="li"><a className="active header-a" href="#">About</a></li >
            <li className="li"><a className="active header-a" href="#">Home</a></li >
            <li className="li"><a className="active header-a" href="#">Clients</a></li>
            <li className="li"><a className="active header-a" href="#">Contact Us</a></li>
          </ul>
        </div>
      </nav>
</div>
    );
  }
}
