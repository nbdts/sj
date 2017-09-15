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
       <div style={{padding:10 , marginBottom:10}}>
       <div className="material-card">
         <div className="title-row">
           <div className="title-txt">
            {this.props.product.name}<br />
             <span className="date-txt">{`${this.props.product.createdAt.getDate()}/${this.props.product.createdAt.getMonth()}/${this.props.product.createdAt.getYear()}`}</span>
           </div>
           <span className="glyphicon glyphicon-trash" onClick={this.deleteProduct.bind(this) }>X</span>
         </div>

         <div className="sales-row" >
         <img src={this.props.product.image}  width="184px" height="80px" className="myimage"/>
         </div>
       </div>
       </div>
    );
  }
}
