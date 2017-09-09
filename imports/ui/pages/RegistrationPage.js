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


      <body>
      <form action={this.handleSubmit} autocomplete="off">

        <fieldset>
          <input id="first" type="text" name="first" required onChange={this.handleChange} />
          <label for="first">First Name</label>
          <div className="after"></div>
        </fieldset>

        <fieldset>
          <input id="last" type="text" name="last" required onChange={this.handleChange} />
          <label for="last">Last Name</label>
          <div className="after"></div>
        </fieldset>


        <fieldset>
          <button>Submit</button>
        </fieldset>
      </form>
    </body>








      </div>
    );
  }
}
