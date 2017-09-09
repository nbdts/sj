import React, {Component} from 'react';
import './mycss';
export default class RegistrationPage extends Component {
  constructor() {
    super();

this.state={
  shopname:"",
  shopemail:"",
  shopphno:"",
  shoppassword:"",
  shopgstin:"",
  shopbankname:"",
  shopaccname:"",
  shopacctype:"",
  shopaccno:"",
  shopifsc:"",
  };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const shopname= this.state.shopname;
    const shopemail= this.state.shopemail;
    const shopphno= this.state.shopphno;
    const shoppassword= this.state.shoppassword;
    const shopgstin= this.state.shopgstin;
    const shopbankname= this.state.shopbankname;
    const shopaccname= this.state.shopaccname;
    const shopacctype= this.state.shopacctype;
    const shopaccno= this.state.shopaccno;
    const shopifsc= this.state.shopifsc;

    let shop={
        shopname:shopname,
        shopemail:shopemail,
        shopphno:shopphno,
        shoppassword:shoppassword,
        shopgstin:shopgstin,
        shopbankname:shopbankname,
        shopaccname:shopaccname,
        shopacctype:shopacctype,
        shopaccno:shopaccno,
        shopifsc:shopifsc,
        shopstatus:1,
        shopcreatedat:new Date(),
        }
        Meteor.call('shops.insert',shop);
  }



  handleChange(event) {
    let object = {};
    object[event.target.id] = event.target.value
    console.log(event.target.value);
    this.setState(object, () => {});
  }

  render() {
    return (
      <div>

      <div className="page-holder">
        <form >
          <label className="note">fill all fields & click on Register button</label>

          <label className="input-holder">
            <span className="input-title">Name*</span>
            <input id='shop_name' type="text" onChange={this.handleChange}/>
          </label>

          <label className="input-holder">
            <span className="input-title">E-mail*</span>
            <input id="shop_email" type="text" onChange={this.handleChange}/>
          </label>

          <label className="input-holder">
            <span className="input-title">Phone-number*</span>
            <input id="shop_phno" type="text" onChange={this.handleChange}/>
          </label>

          <label className="input-holder">
            <span className="input-title">GSTIN*</span>
            <input id="shop_gstin" type="text" onChange={this.handleChange}/>
          </label>

          <label className="input-holder">
            <span className="input-title">Password*</span>
            <input id="shop_password" type="password" onChange={this.handleChange}/>
          </label>

          <label className="input-holder">
            <span className="input-title">Confirm Password*</span>
            <input id="" type="shop_password" onChange={this.handleChange}/>
          </label>

          <label className="note">ACCOUNT DETAILS</label>

          <label className="input-holder">
            <span className="input-title">Bank name*</span>
            <input id="shop_bankname" type="text" onChange={this.handleChange}/>
          </label>

          <label className="input-holder">
            <span className="input-title">account holder name*</span>
            <input id="shop_accname" type="text" onChange={this.handleChange}/>
          </label>

          <label className="input-holder">
            <span className="input-title">account type*</span>
            <input id="shop_acctype" type="text" onChange={this.handleChange}/>
          </label>

          <label className="input-holder">
            <span className="input-title">account number*</span>
            <input id="shop_accno" type="text" onChange={this.handleChange}/>
          </label>

          <label className="input-holder">
            <span className="input-title">account IFSC*</span>
            <input id="shop_ifsc" type="text" onChange={this.handleChange}/>
          </label>

          <input id="" type="submit" value="Register"/>
        </form>

      </div>

      </div>
    );
  }
}
