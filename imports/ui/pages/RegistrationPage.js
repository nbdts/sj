import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import './css/registcss';
import {ShopsApi} from '../../api/shops';
import { Tracker } from 'meteor/tracker';

export default class RegistrationPage extends Component {
  constructor() {
    super();

    this.state = {
      shops:[],
      shopname: "",
      shopemail: "",
      shopphno: "",
      shoppassword: "",
      shopgstin: "",
      shopbankname: "",
      shopaccname: "",
      shopacctype: "",
      shopaccno: "",
      shopadd: "",
      shopifsc: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }



componentDidMount(){
    this.linkracker = Tracker.autorun(()=> {
      Meteor.subscribe("shop");
      let shops = ShopsApi.find({}).fetch();
      this.setState({shops})
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
    const shopadd = this.state.shopadd;

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
      shopadd: shopadd,
      shopstatus: 1,
      shopcreatedat: new Date()
    }
    Meteor.call('shops.insert', shop);
    Bert.alert('Shop Added', 'success', 'growl-top-right')
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
            <h1 className="myheader" style={{marginTop:30}}>Shop Entry</h1>
              <form style={{marginTop:-50}} onSubmit={this.handleSubmit} method="POST" className="material-form">
                <Inputs type="text" id="shopname" onChange={this.handleChange} label="NAME" />
                <Inputs type="text" id="shopemail" onChange={this.handleChange} label="EMAIL"/>
                <Inputs type="password" id="shoppassword" onChange={this.handleChange} label="SHOP PASSWORD"/>
                <Inputs type="text" id="shopphno" onChange={this.handleChange} label="PHONE NUMBER"/>
                <Inputs type="text" id="shopadd" onChange={this.handleChange} label="ADDRESS"/>
                <Inputs type="text" id="shopgstin" onChange={this.handleChange} label="GSTIN"/>
                <Inputs type="text" id="shopbankname" onChange={this.handleChange} label="BANK NAME"/>
                <Inputs type="text" id="shopaccname" onChange={this.handleChange} label="ACCOUNT HOLDER'S NAME"/>
                <Inputs type="text" id="shopacctype" onChange={this.handleChange} label="ACCOUNT TYPE"/>
                <Inputs type="text" id="shopaccno" onChange={this.handleChange} label="ACCOUNT NUMBER"/>
                <Inputs type="text" id="shopifsc" onChange={this.handleChange} label="IFSC CODE"/>
                <input className="button blue" type="submit" value="submit"/>
              </form>

            </div>


            <div style={{display:'flex',flexWrap:'wrap'}}>
            {
              this.state.shops.map((shop,i)=>{
                return (<div key={i} >
                  <Shops shop={shop}></Shops>
                  </div>)
                })
              }
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
              <input id={this.props.id} required="required" className="material-form-field-input" type={this.props.type} onChange={this.props.onChange}/>
              <label htmlFor={this.props.id} className="material-form-field-label">{this.props.label}</label>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

class Shops extends Component {
  constructor() {
    super();
  }
  deleteShop(id){
  let result = confirm("Want to delete?");
  if (result) {
    Meteor.call('shops.remove',id);
    Bert.alert('Shop Removed', 'Danger', 'growl-top-right')
  }
  }

  render() {
    return (
      <div style={{display:'flex',flexFlow:'column',flex:1,padding:'5px',marginBottom:'5px',border:'groove'}}>
      <span style={{color:'red',textAlign:'right'}} className="glyphicon glyphicon-trash" onClick={this.deleteShop.bind(this,this.props.shop._id) }></span>
      <div style={{textAlign:'left'}}>
      <span>Email:{this.props.shop.email}</span><br/>
      <span>Password:{this.props.shop.password}</span><br/>
      <span>Address:{this.props.shop.add}</span><br/>
      </div>
      </div>
    );
  }
}
