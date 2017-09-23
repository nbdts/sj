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

  render(){
    return(
       <div style={{padding:10}}>
       <div className="material-card" style={{backgroundImage:`url(${this.props.product.image})` }}>
         <div className="title-row">
           <div className="title-txt">
           <div className="pos">
           <span className="price-txt">₹ {this.props.product.price}</span>
           </div>
            {this.props.product.name}<br />
           </div>
          {

            this.props.isAdmin ?
             <span className="glyphicon glyphicon-trash" onClick={this.deleteProduct.bind(this) }></span>
            :
            null
          }
         </div>


       </div>
       </div>
    );
  }
}
