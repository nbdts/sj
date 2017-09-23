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




  MyInvoiceHandel(){
    this.props.MyInvoice()  }
  render() {
    let price=0;
    let mytotal= this.props.products.map((product)=>{
          return(price=parseFloat(price)+parseFloat(product.tempprice));
    })
    console.log(mytotal);
    return (

      <div  className="mybody">
        <div  className="mycontainer">
          <div className="invoice">
            <header>
              <section>
              <img style={{height:'20%',width:'100%',borderRadius:20}} src='/sjflex.jpg' alt="flex"/>
              </section>

            </header>
            <div style={{position:"absolute",top:120}}>
            <input style={{border:'none',borderBottom:'2px'}} type="text" placeholder="NAME"/>
            <input style={{border:'none'}} type="number" placeholder="PHONE"/>
            </div>

            <main style={{position:'relative',bottom:50,top:0,width:'80%',height:'60%'}} >
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
                        <span style={{flex:1}}>
                      {product.name}
                        </span>
                        <span style={{flex:1}} >{product.quantity}</span>
                        <span style={{flex:1}}> ₹ {product.price*product.quantity}</span>
                      </figure>
                      </div>
                  )
                })}

              </section>

              <section>
                <span>Total</span>
                <span><strong style={{color:'#D50000',fontSize:20}}>
                ₹ {mytotal[mytotal.length-1]}
                </strong>
                </span>
              </section>
            </main>

            <footer style={{position:'absolute',bottom:10,right:40}}>
              <span ><a style={{color:'#999'}} href="">Later</a></span>
              <span><a onClick={this.MyInvoiceHandel.bind(this)} href="#0">Pay Now</a></span>
            </footer>
          </div>
        </div>
      </div>

    );
  }
}
