import React, { Component } from 'react';
import './Header.css';
export default class Header  extends Component {
  constructor() {
    super();
  }
  render(){
    return(
       <div className='header'>
       <header>
  <div className="container">
    <h1><a href="/">BadAss Co.</a></h1>
    <nav>
      <a href="#">Home</a>
      <a href="#">About Us</a>
      <a href="#">Blog</a>
    </nav>
  </div>
</header>
<div className="container"></div>
       </div>
    );
  }
}
