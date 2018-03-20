import React, { Component } from 'react';
import {Session} from 'meteor/session';

export default class ProductSinlgeItem  extends Component {
  constructor() {
    super();
  }
  deleteProduct(){
let result = confirm("Want to delete?");
if (result) {
  Meteor.call('product.remove',this.props.product._id);  //Logic to delete the item
  }
}
ProductUpdate(){
  this.props.ProductUpdate(this.props.product)
}

  render(){
    return(
       <div className='list-group-item' style={{display:'flex',width:"70%",fontSize:'1.5rem',alignItems:"center",border:this.props.product.shopid  === Session.get('shop')._id ? '3px solid #FF9800' : ''}} >
           <div style={{color:'blue',flex:1,cursor:'pointer'}} onClick={this.ProductUpdate.bind(this)}>{this.props.product.name}</div>
           <div style={{marginLeft:10,marginRight:10}}>₹{this.props.product.price}</div>
          { this.props.isAdmin ? <span style={{color:'red',paddingTop:7,paddingLeft:3,marginLeft:10,marginRight:10,cursor:'pointer'}} className="glyphicon glyphicon-trash" onClick={this.deleteProduct.bind(this) }></span> : null }
       </div>
    );
  }
}
