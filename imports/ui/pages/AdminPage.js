import React, { Component } from 'react';
import RegistrationPage from './RegistrationPage'
import './css/AdminPage'
export default class AdminPage extends Component {
  constructor() {
    super();
  }
  render(){
    return(
      <div>

      <div className="admin-panel clearfix">
       <div className="slidebar">
         <div className="logo">
           <a href/>
         </div>
         <ul>
           <li><a href="#dashboard" id="targeted">New Branch</a></li>
            </ul>
       </div>


       <div className="main">
         <ul className="topbar clearfix">
           <li><a href="#">q</a></li>
           <li><a href="#">p</a></li>
           <li><a href="#">o</a></li>
           <li><a href="#">f</a></li>
           <li><a href="#">n</a></li>
         </ul>
         <div className="mainContent clearfix">

           <div id="dashboard">
            <RegistrationPage/>
           </div>


          </div>
         </div>
     </div>

      </div>
    );
  }
}
