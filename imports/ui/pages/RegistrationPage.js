import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import './css/registcss';
import {ShopsApi} from '../../api/shops';
import { Tracker } from 'meteor/tracker';
import Modal from '../componants/modal';
import moment from 'moment'
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
      shopifsc: "",
      isModalOpen: false,
      update: false,
      shopid:"",
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  closeModal() {
    this.setState({
      update:false,
      isModalOpen: false,
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
      shopadd: "",
    })
  }
  openModal() {
    this.setState({
      update:false,
      isModalOpen: true,
    })
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

  UpdateShop(shop){
    this.setState({
      shopid:shop._id,
      shopname: shop.name,
      shopemail: shop.email,
      shopphno: shop.phno,
      shoppassword: shop.password,
      shopgstin: shop.gstin,
      shopbankname: shop.bankname,
      shopaccname: shop.accName,
      shopacctype: shop.accType,
      shopaccno: shop.accNumber,
      shopifsc: shop.accIfsc,
      shopadd: shop.add,
      update:true,
      isModalOpen:true,
    });
  }

 handleUpdate(event) {
   event.preventDefault();
   const shopid = this.state.shopid;
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
     shopid: shopid,
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
   }
   Meteor.call('shops.update',shop,(err,res)=>{
     if (res) {
       Bert.alert('Shop Updated', 'success', 'growl-top-right')
     }
   })
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
    Meteor.call('shops.insert', shop,(err,res)=>{
      if (res) {
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
          shopifsc: "",
          shopadd: "",
          isModalOpen: false,
        });

      }
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
          <button className="button"   onClick={this.openModal} >Create Shop</button>
          <Modal
             isModalOpen={this.state.isModalOpen}
             closeModal={this.closeModal}
             style={modalStyle}>
             <span style={{fontSize:30,textAlign:'right',color:'red'}} className='glyphicon glyphicon-remove-sign' onClick={this.closeModal}/>
             <div className="page-section-content">
             <h1 className="myheader" style={{marginTop:30}}>{this.state.update ? "Update Shop" : "Create Shop"}</h1>
               <form style={{marginTop:-50}} onSubmit={this.state.update ? this.handleUpdate : this.handleSubmit} method="POST" className="material-form">
                 <Inputs type="text" id="shopname" onChange={this.handleChange} value={this.state.shopname} label="NAME" />
                 <Inputs type="text" id="shopemail" onChange={this.handleChange} value={this.state.shopemail} label="EMAIL" />
                 <Inputs type="password" id="shoppassword" onChange={this.handleChange} value={this.state.shoppassword} label="SHOP PASSWORD" />
                 <Inputs type="text" id="shopphno" onChange={this.handleChange} value={this.state.shopphno} label="PHONE NUMBER" />
                 <Inputs type="text" id="shopadd" onChange={this.handleChange} value={this.state.shopadd} label="ADDRESS" />
                 <Inputs type="text" id="shopgstin" onChange={this.handleChange} value={this.state.shopgstin} label="GSTIN"/>
                 <Inputs type="text" id="shopbankname" onChange={this.handleChange} value={this.state.shopbankname} label="BANK NAME"/>
                 <Inputs type="text" id="shopaccname" onChange={this.handleChange} value={this.state.shopaccname} label="ACCOUNT HOLDER'S NAME"/>
                 <Inputs type="text" id="shopacctype" onChange={this.handleChange} value={this.state.shopacctype} label="ACCOUNT TYPE"/>
                 <Inputs type="text" id="shopaccno" onChange={this.handleChange} value={this.state.shopaccno} label="ACCOUNT NUMBER"/>
                 <Inputs type="text" id="shopifsc" onChange={this.handleChange} value={this.state.shopifsc} label="IFSC CODE"/>
                 <input className="button blue" type="submit" value={this.state.update ? "Update" : "submit"}/>
               </form>
             </div>
           </Modal>




            {
              this.state.shops.map((shop,i)=>{
                return (<div key={i} >
                  <Shops shop={shop} UpdateShop={this.UpdateShop.bind(this)}></Shops>
                  </div>)
                })
              }
              </div>
        </section>


      </div>
    );
  }
}
const modalStyle = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0,0.5)'
	}
};

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
              <input id={this.props.id} required="required" className="material-form-field-input" type={this.props.type} value={this.props.value} onChange={this.props.onChange}/>
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
  UpdateShop(shop){
    this.props.UpdateShop(this.props.shop)
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
      <div style={{display:'flex',flexFlow:'column',flex:1,margin:10,cursor:'pointer',fontSize:'2rem'}} className="list-group-item invoicelistcontainer">
        <span style={{color:'red',textAlign:'right'}} className="glyphicon glyphicon-trash" onClick={this.deleteShop.bind(this,this.props.shop._id) }></span>
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',flexWrap:'wrap',padding:'5px'}} className="fontdamliy">
          <span onClick={this.UpdateShop.bind(this,this.props.shop)} style={{color:'blue'}}>{this.props.shop.email}</span><br/>
          <span>{this.props.shop.password}</span><br/>
          <span>{this.props.shop.add}</span><br/>
          <span>{moment(this.props.shop.createdAt).format('DD/MM/YY') + ' '+ moment(this.props.shop.createdAt).fromNow() }</span><br/>
        </div>
      </div>
    );
  }
}
