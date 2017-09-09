import React, {Component} from 'react';
import './mycss';
export default class RegistrationPage extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>

        <div className="page-holder">
          <form onSubmit={null}>
            <label className="note">fill all fields & click on Register button</label>

            <label className="input-holder">
              <span className="input-title">Name*</span>
              <input type="text"/>
            </label>

            <label className="input-holder">
              <span className="input-title">E-mail*</span>
              <input type="text"/>
            </label>


            <label className="input-holder">
              <span className="input-title">Phone-number*</span>
              <input type="text"/>
            </label>



            <label className="input-holder">
              <span className="input-title">GSTIN*</span>
              <input type="text"/>
            </label>






            <label className="input-holder">
              <span className="input-title">Password*</span>
              <input type="password"/>
            </label>

            <label className="input-holder">
              <span className="input-title">Confirm Password*</span>
              <input type="password"/>
            </label>




  <label className="note">ACCOUNT DETAILS</label>

  <label className="input-holder">
    <span className="input-title">Bank name*</span>
    <input type="text"/>
  </label>


  <label className="input-holder">
    <span className="input-title">account holder name*</span>
    <input type="text"/>
  </label>


  <label className="input-holder">
    <span className="input-title">account type*</span>
    <input type="text"/>
  </label>


  <label className="input-holder">
    <span className="input-title">account number*</span>
    <input type="text"/>
  </label>


  <label className="input-holder">
    <span className="input-title">account IFSC*</span>
    <input type="text"/>
  </label>





            <input type="submit" value="Register"/>
          </form>

        </div>
      </div>
    );
  }
}
