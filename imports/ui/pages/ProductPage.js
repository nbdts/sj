import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import ProductSinlgeItem from '../componants/ProductSinlgeItem';
import {ProductApi} from '../../api/product';
import { Tracker } from 'meteor/tracker';
import './css/ProductPage';
import {Session} from 'meteor/session';
import Modal from '../componants/modal';

export default class ProductPage  extends Component {
  constructor() {
    super();

    this.state = {
          productid:'',
          name: "",
          price:"",
          category:"",
          type:1,
          isModalOpen: false,
          update: false,
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

  }
  componentWillMount(){
      this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("product");
        let productsbyshop = ProductApi.find({shopid:Session.get('shop')._id}).fetch();
        let productsbytype = ProductApi.find({shopid:1}).fetch();
        const products = [...productsbyshop, ...productsbytype];
          this.setState({products});
      });
  }
  componentWillUnmount(){
    this.linkracker.stop();
  }


  handleUpdate(event) {
    event.preventDefault();
    const productid = this.state.productid;
    const name = this.state.name;
    const price = this.state.price;
    const category = this.state.category;
    let prod = {
    productid:productid,
    name:name,
    price:price,
    category:category,
        }
        Meteor.call('product.update', prod,(err,res)=>{
          if (res) {
            Bert.alert('Updated Successfully', 'success', 'growl-top-right');
            this.setState({
              productid:'',
              name:'',
              price:'',
              category:'',
              isModalOpen:false,
            });
          }
        })
      }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const price = this.state.price;
    const category = this.state.category;
    const type = this.state.type;
    let id = null;
    if (type == 1) {
      id = type;
    }else {
      id =   Session.get('shop')._id;
    }
    if (!id) {
      return false ;
      Bert.alert('product type is no defined', 'danger', 'growl-top-right');
    }
      let prod = {
      name:name,
      shopid:id,
      price:price,
      category:category,
          }
    Meteor.call('product.insert', prod,(err,res)=>{
      if (res) {
        Bert.alert('Entry successfull', 'success', 'growl-top-right');
        this.setState({
          productid:'',
          name:'',
          price:'',
          category:'',
          isModalOpen:false,
        });

      }
    });
    }

         setValue(field, event) {
        let object = {};
        object[field] = event.target.value;
        this.setState(object);
      }
      setCheckbox(){
        if (this.state.type == 0) {
          this.setState({type:1});
        }else {
          this.setState({type:0});
        }
      }

      ProductUpdate(product){
        this.setState({
          productid:product._id,
          name:product.name,
          price:product.price,
          category:product.category,
          update:true,
          isModalOpen:true,
        })
      }

      openModal() {
        this.setState({
          isModalOpen: true,
          update:false,
        })
      }

      closeModal() {
        this.setState({
          isModalOpen: false,
          update:false,
        })
      }

  render(){
    return(
      <div style={{padding:10,display:"flex",flexWrap:"wrap",flex:1,justifyContent:'center',flexFlow:'column'}}>
      <button className="button"   onClick={this.openModal} >Add Product</button>
      <Modal
         isModalOpen={this.state.isModalOpen}
         closeModal={this.closeModal}
         style={modalStyle}>
         <span style={{fontSize:30,textAlign:'right',color:'red'}} className='glyphicon glyphicon-remove-sign' onClick={this.closeModal}/>

         <div className="mypcontainer">
           <h1 className="myheader">{this.state.update ? "Product Update" : "Product Entry" }</h1>
           <form onSubmit={this.state.update ? this.handleUpdate : this.handleSubmit.bind(this)}>
             <div className="group">
               <input type="text" value={this.state.name}  onChange={this.setValue.bind(this, 'name')} autoFocus required />
               <span className="highlight"></span>
               <span className="bar"></span>
               <label>Name</label>
             </div>
             <div className="group">
               <input type="number"  value={this.state.price}  onChange={this.setValue.bind(this, 'price')} required/>
               <span className="highlight"></span>
               <span className="bar"></span>
               <label>Price</label>
             </div>

             { this.state.update ? null :<div>
               <input type="checkbox"  value={this.state.type}  onChange={this.setCheckbox.bind(this)} />
               <label>{this.state.type == 0 ? "perticular" : "overall"}</label></div>
             }

             <div className="group">
                 <select  name="MySelect"  value={this.state.category}  onChange={this.setValue.bind(this, 'category')} required>
                   <option value="">Select Category</option>
                   <option value="1">Sandwich</option>
                   <option value="2">Chocolate Sandwich</option>
                   <option value="3">Beverages</option>
                   <option value="4">Pasta</option>
                   <option value="5">Chocolate Shakes</option>
                   <option value="6">Juice Shakes</option>
                   <option value="7">Fruit Shakes</option>
                   <option value="8">Italian</option>
                  </select>
             </div>
             <div className="group">
             <button type="submit" className="mybutton"> {this.state.update ? "Update" : "Submit" }</button>
             </div>
           </form>
         </div>

         </Modal>


      <div style={{display:'flex',flexWrap:'wrap',flexFlow:'column'}}>
      {
        this.state.products.map((product,i)=>{
          return (<ProductSinlgeItem product={product}  key={i} isAdmin={true} ProductUpdate={this.ProductUpdate.bind(this)}/>)
        })
      }
      </div>
      </div>
    );
  }
}
const modalStyle = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0,0.5)'
	}
};
