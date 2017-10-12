import React, {Component} from 'react';
import './css/InvoicePage';
import {Tracker} from 'meteor/tracker';

export default class InvoicePage extends Component {
  constructor(props) {
    super(props);
    this.state={
      products:props.products,
      prodqty:{},
      }
  }
  handleChange(event){
    let object = {};
    object[event.target.id] = event.target.value
    this.setState(object);
    }
  MyInvoiceHandel(){
    if (this.state.uname!='') {
      this.props.MyInvoice()
    }
    else {
      alert('Enter customer name ')
    }
  }
  chnageUsername(e){
    this.props.chnageUsername(e.target.value);
  }
  chnageUserphone(e){
    this.props.chnageUserphone(e.target.value);
  }
  render() {
    let price=0;
    let mytotal= this.props.products.map((product)=>{
          return(price=parseFloat(price)+parseFloat(product.tempprice));
    })
  return (

      <div  className="mybody">
        <div  className="mycontainer">
          <div className="invoice">
                <div style={{position:"relative",top:10}}>
                 <input  id='uname' value={this.props.username} style={{border:'none'}} onChange={this.chnageUsername.bind(this)} type="text" placeholder="NAME"/>
                 <input  id='unumber' value={this.props.userphone} style={{border:'none'}} onChange={this.chnageUserphone.bind(this)} type="number" placeholder="PHONE"/>
                 </div>
            <main style={{position:'relative',bottom:50,top:20,width:'100%',height:'80%'}} >
              <section>
                <span>Product</span>
                <span>Unit</span>
                <span>Price</span>
              </section>

              <section className='invoiceProductList' >
                {this.props.products.map((product, i) => {
                  return (
                    <div key={i}>
                      <figure>
                        <span style={{flex:2,fontSize:'13px'}}>
                      {product.name}
                        </span>
                        <span style={{flex:1,fontSize:'13px'}}>{product.quantity}</span>
                        <span style={{flex:3,fontSize:'13px'}}> ₹ {product.price*product.quantity}</span>
                      </figure>
                      </div>
                  )
                })}

              </section>

              <section>
                <span>Total</span>
                <span><strong style={{color:'#D50000',fontSize:20}}>₹{mytotal[mytotal.length-1]}</strong>
                </span>
              </section>
            </main>

            <footer style={{position:'absolute',bottom:10,right:40}}>
              <span ><a style={{color:'#999'}}  href="">Later</a></span>
              <span><a onClick={this.MyInvoiceHandel.bind(this)} href="#0">Pay Now</a></span>
            </footer>
          </div>
        </div>
      </div>

    );
  }
}
