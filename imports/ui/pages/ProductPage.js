import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import ProductSinlgeItem from '../componants/ProductSinlgeItem';
import {ProductApi} from '../../api/product';
import { Tracker } from 'meteor/tracker';
import './css/ProductPage';
import {Session} from 'meteor/session';
export default class ProductPage  extends Component {
  constructor() {
    super();

    this.state = {
          name: "",
          price:"",
          category:"",
          type:1,
        };

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
    Meteor.call('product.insert', prod);
    this.setState({
      products:[],
      name:'',
      price:'',
      category:'',
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


  render(){
    return(
      <div style={{padding:10,display:"flex",flexWrap:"wrap" }}>


      <div className="mypcontainer">
        <h1 className="myheader">Product Entry</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
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

            <input type="checkbox"  value={this.state.type}  onChange={this.setCheckbox.bind(this)} />
            <label>{this.state.type == 0 ? "perticular" : "overall"}</label>

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
          <button type="submit" className="mybutton"> Submit</button>
          </div>
        </form>
      </div>

      <div style={{display:'flex',flexWrap:'wrap'}}>
      {
        this.state.products.map((product,i)=>{
          return (<ProductSinlgeItem product={product}  key={i} isAdmin={true} />)
        })
      }
      </div>
      </div>
    );
  }
}
