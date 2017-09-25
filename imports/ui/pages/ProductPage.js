import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import ProductSinlgeItem from '../componants/ProductSinlgeItem';
import {ProductApi} from '../../api/product';
import { Tracker } from 'meteor/tracker';
import './css/ProductPage';

export default class ProductPage  extends Component {
  constructor() {
    super();

    this.state = {
          name: "",
          price:"",
          category:"",
          imageLink: '',
        };

  }
  componentWillMount(){
      this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("product");
        let products = ProductApi.find({}).fetch();
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
    let image = this.state.imageLink;
    let prod = {
      name:name,
      price:price,
      category:category,
      image:image,
    }
    Meteor.call('product.insert', prod);
    this.setState({
      products:[],
      name:'',
      price:'',
      category:'',
      imageLink:'',
    });
    }

    uploadWidget(event) {
      event.preventDefault();
      let setImagelinkState = (link)=> {
        this.setState({imageLink:link},()=>{console.log(this.state.imageLink)});
      }

           cloudinary.openUploadWidget({ cloud_name: 'dcr2pfgxy', upload_preset: 'kzkxno3w', tags:['xmas']},
               function(error, result) {
                   setImagelinkState(result[0].secure_url);
               });
       }

       setValue(field, event) {
        let object = {};
        object[field] = event.target.value;
        this.setState(object);
      }



  render(){
    return(
      <div style={{padding:10,display:"flex",flexWrap:"wrap" }}>


      <div className="container">
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
          <div className="group">
              <select  name="MySelect" placeholder="Favourite" value={this.state.category}  onChange={this.setValue.bind(this, 'category')} required>
                <option value="">Select Category</option>
                <option value="1">Juice</option>
                <option value="2">Fruit Shakes</option>
                <option value="3">Chocolate Shakes</option>
                <option value="4">Beverages</option>
                <option value="5">Sandwich</option>
                <option value="6">Chocolate Sandwich</option>
                <option value="7">Italian</option>
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
