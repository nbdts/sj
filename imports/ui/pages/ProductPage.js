import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import './css/ProductPage.css';
import {ProductApi} from '../../api/product';
import { Tracker } from 'meteor/tracker';

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
      <div style={{padding:10}}>


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
              <select name="MySelect" placeholder="Favourite" value={this.state.category}  onChange={this.setValue.bind(this, 'category')} required>
                <option value="">Select Category</option>
                <option value="1">Ice Cream</option>
                <option value="2">Sandwich</option>
                <option value="3">Juice</option>
                <option value="4">Shakes</option>
                <option value="5">Energy Drink</option>
               </select>
          </div>
          <div className="group">
          <button onClick={this.uploadWidget.bind(this)} className="mybutton" >Add Image</button>
          </div>
          <div className="group">
          <button type="submit" className="mybutton"> Submit</button>
          </div>
        </form>
      </div>

      <div style={{display:'flex',flexWrap:'wrap'}}>
      {
        this.state.products.map((product,i)=>{
          return (<ProductSinlgeItem product={product}  key={i} />)
        })
      }
      </div>
      </div>
    );
  }
}

class ProductSinlgeItem  extends Component {
  constructor() {
    super();
  }
  deleteProduct(){
let result = confirm("Want to delete?");
if (result) {
  Meteor.call('product.remove',this.props.product._id);  //Logic to delete the item
  }
}

  render(){
    return(
       <div style={{padding:10}}>
       <div className="material-card">
         <div className="title-row">
           <div className="title-txt">
            {this.props.product.name}<br />
             <span className="date-txt">{`${this.props.product.createdAt.getDate()}/${this.props.product.createdAt.getMonth()}/${this.props.product.createdAt.getYear()}`}</span>
           </div>
           <span className="glyphicon glyphicon-trash" onClick={this.deleteProduct.bind(this) }>X</span>
         </div>

         <div className="sales-row" >
         <img src={this.props.product.image}  width="284px" height="180px" className="myimage"/>
         </div>
       </div>
       </div>
    );
  }
}
