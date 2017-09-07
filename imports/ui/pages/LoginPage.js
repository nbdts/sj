import React, { Component } from 'react';
import './LoginPage.css';
export default class LoginPage extends Component {
  constructor() {
    super();
  }
  render(){
    return(


       <div className="login-form-wrapper">
         <h1>
             Log In
         </h1>
         <div className="form-body">
           <form name="auth-form"  method="POST">

             <div className="fieldset">
               <input id="email" name="email" type="text" required />
               <label for="email">
                   Email
               </label>
               <div className="highlighter"></div>

             </div>

             <div className="fieldset">
               <input id="password" name="password" type="password" required />
               <label for="password">
                   Password
               </label>
               <div className="highlighter"></div>

          </div>

             <div className="fieldset button-set">
               <input type="submit" value="Enter"/>
             </div>
           </form>
         </div>
       </div>

    );
  }
}
