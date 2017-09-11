import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import './css/registcss';
import {ShopsApi} from '../../api/shops';
import { Tracker } from 'meteor/tracker';

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
      shopifsc: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

componentDidMount(){
    this.linkracker = Tracker.autorun(()=> {
      Meteor.subscribe("shop");
      let shops = ShopsApi.find({}).fetch();
      
    });
}
componentWillUnmount(){
  this.linkracker.stop();
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
      shopcreatedat: new Date()
    }
    Meteor.call('shops.insert', shop);
    this.setState({
      shopname: "",
      shopemail: "",
      shopphno: "",
      shoppassword: "",
      shopgstin: "",
      shopbankname: "",
      shopaccname: "",
      shopacctype: "",
      shopaccno: "",
      shopifsc: ""

    });
  }

  handleChange(event) {

    let object = {};
    object[event.target.id] = event.target.value
    this.setState(object);
  }

  render() {
    return (
      <div className="mainbody">
        <section className="page-section">
          <div className="page-section-wrapper">
                        <div className="page-section-content">
              <form onSubmit={this.handleSubmit} method="POST" className="material-form">
                <Inputs type="text" id="shopname" onChange={this.handleChange} label="NAME" />
                <Inputs type="text" id="shopemail" onChange={this.handleChange} label="EMAIL"/>
                <Inputs type="text" id="shopphno" onChange={this.handleChange} label="PHONE NUMBER"/>
                <Inputs type="password" id="shoppassword" onChange={this.handleChange} label="PASSWORD"/>
                <Inputs type="text" id="shopgstin" onChange={this.handleChange} label="GSTIN"/>
                <Inputs type="text" id="shopbankname" onChange={this.handleChange} label="BANK NAME"/>
                <Inputs type="text" id="shopaccname" onChange={this.handleChange} label="ACCOUNT HOLDER'S NAME"/>
                <Inputs type="text" id="shopacctype" onChange={this.handleChange} label="ACCOUNT TYPE"/>
                <Inputs type="text" id="shopaccno" onChange={this.handleChange} label="ACCOUNT NUMBER"/>
                <Inputs type="text" id="shopifsc" onChange={this.handleChange} label="IFSC CODE"/>
                <input className="button blue" type="submit" value="submit"/>
              </form>
              <h4><a style={{color:'white'}} href="/login">Login ?</a></h4>
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
              <input id={this.props.id} required="required" placeholder={this.props.label} className="material-form-field-input" type={this.props.type} onChange={this.props.onChange}/>
              <label htmlFor={this.props.id} className="material-form-field-label">{this.props.label}</label>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
