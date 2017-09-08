import React, { Component } from 'react';
import './LoginPage.css';
import  { withRouter } from 'react-router-dom';
 class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      ShopeName: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(arg,event) {
               let object ={}
               object[arg]=event.target.value;
               this.setState(object);
               }

  handleSubmit(event) {
    event.preventDefault();
     if(this.state.ShopeName==='admin' && this.state.password==='admin'){
        this.props.history.push('/admin')
        return false ;
      }
      this.props.history.push('/home')
    }

  render(){
    return(

       <div className="login-form-wrapper">
         <h1>
             Log In
         </h1>
         <div className="form-body">
           <form name="auth-form"  method="POST" onSubmit={this.handleSubmit}>
             <div className="fieldset">
               <input id="ShopeName" name="ShopeName" type="text" value={this.state.ShopeName} onChange={this.handleChange.bind(this, 'ShopeName')} required />
               <label for="ShopeName">
                   ShopeName
               </label>
               <div className="highlighter"></div>

             </div>

             <div className="fieldset">
               <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange.bind(this, 'password')}required />
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
export default withRouter (LoginPage);
