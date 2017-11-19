import React, { Component } from 'react';
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
       <div className='list-group-item' style={{display:'flex',flex:1,margin:10,cursor:'pointer',fontSize:'2rem',justifyContent:'space-around'}} >
           <div style={{color:'blue'}} onClick={this.ProductUpdate.bind(this)}>{this.props.product.name}</div>
           <div>₹{this.props.product.price}</div>
          { this.props.isAdmin ? <span style={{color:'red',paddingTop:7,paddingLeft:3}} className="glyphicon glyphicon-trash" onClick={this.deleteProduct.bind(this) }></span> : null }
       </div>
    );
  }
}
