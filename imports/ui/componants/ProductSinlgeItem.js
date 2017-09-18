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
       <div style={{padding:5 , marginBottom:5 }}>
       <div className="material-card" style={{backgroundImage:`url(${this.props.product.image})` }}>
         <div className="title-row">
           <div className="title-txt">
            {this.props.product.name}<br />
            <div className="pos">
             <span className="price-txt">₹ {this.props.product.price}</span>
             </div>
           </div>
           <span className="glyphicon glyphicon-trash" onClick={this.deleteProduct.bind(this) }></span>
         </div>


       </div>
       </div>
    );
  }
}
