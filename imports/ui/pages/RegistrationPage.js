import React, {Component} from 'react';
import Meteor from 'meteor/meteor';
import './registcss';
export default class RegistrationPage extends Component {
  constructor() {
    super();

    this.state = {
      shopname: "",
      shopemail: "",
      shopphno: "",
      shoppassword: "",
      shopgstin: "",
      shopbankname: "",
      shopaccname: "",
      shopacctype: "",
      shopaccno: "",
      shopifsc: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    Meteor.subscribe('shop');
  }

  handleSubmit(event) {
    event.preventDefault();
    const shopname = this.state.shopname;
    const shopemail = this.state.shopemail;
    const shopphno = this.state.shopphno;
    const shoppassword = this.state.shoppassword;
    const shopgstin = this.state.shopgstin;
    const shopbankname = this.state.shopbankname;
    const shopaccname = this.state.shopaccname;
    const shopacctype = this.state.shopacctype;
    const shopaccno = this.state.shopaccno;
    const shopifsc = this.state.shopifsc;

    let shop = {
      shopname: shopname,
      shopemail: shopemail,
      shopphno: shopphno,
      shoppassword: shoppassword,
      shopgstin: shopgstin,
      shopbankname: shopbankname,
      shopaccname: shopaccname,
      shopacctype: shopacctype,
      shopaccno: shopaccno,
      shopifsc: shopifsc,
      shopstatus: 1,
      shopcreatedat: new Date(),
    }
    Meteor.call('shops.insert',shop);
  }

  handleChange(event) {
    Bert.alert( 'Yes, I do Mind!', 'danger', 'growl-top-right' );
    let object = {};
    object[event.target.id] = event.target.value
    console.log(event.target.value);
    this.setState(object, () => {});
  }

  render() {
    return (
      <div>
        <section className="page-section">
          <div className="page-section-wrapper">
            <header className="page-section-header">
              <h1 className="page-section-header-title">Sandwich Junction Shop Registration</h1>
            </header>
            <div className="page-section-content">
              <form onSubmil={this.handleSubmit} method="POST" className="material-form">
                <Inputs type="text" id="shopname" label="NAME"/>
                <Inputs type="text" id="shopemail" label="EMAIL"/>
                <Inputs type="text" id="shopphno" label="PHONE NUMBER"/>
                <Inputs type="password" id="shoppassword" label="PASSWORD"/>
                <Inputs type="text" id="shopgstin" label="GSTIN"/>
                <Inputs type="text" id="shopbankname" label="BANK NAME"/>
                <Inputs type="text" id="shopaccname" label="ACCOUNT HOLDER'S NAME"/>
                <Inputs type="text" id="shopacctype" label="ACCOUNT TYPE"/>
                <Inputs type="text" id="shopaccno" label="ACCOUNT NUMBER"/>
                <Inputs type="text" id="shopifsc" label="IFSC CODE"/>


                <div className="wrap">
                <input className="button blue" type="submit" value="submit"/>
                </div>



              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

class Inputs extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <section className="material-form-field space">
          <div className="material-form-field-controls">
            <div className="form-field-controls-group">
              <input id={this.props.id} required="required" placeholder={this.props.label} className="material-form-field-input" type={this.props.type} onChange={this.handleChange}/>
              <label htmlFor={this.props.id} className="material-form-field-label">{this.props.label}</label>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
