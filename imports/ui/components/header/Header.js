import React, { Component } from 'react';
import  '../css/Header';
export default class Header  extends Component {
  constructor() {
    super();
  }
  render(){
    return(
      <div className="header-container">
          <div>
       <header>
     <nav>
       <h1>
         <a href="" class="logo">Logo</a>
       </h1>
       <ul>
         <li><a href="">About</a></li>
         <li><a href="">Services </a></li>
         <li><a href="">Portfolio</a></li>
         <li><a href="">Contact</a></li>
       </ul>
       <button class="toggle-menu" aria-label="Responsive Navigation Menu">☰</button>
     </nav>
   </header>



   <div class="counter"></div>
       </div>
       </div>

    );
  }
}
