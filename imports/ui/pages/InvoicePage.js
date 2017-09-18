import React, {Component} from 'react';
import './css/InvoicePage';
export default class InvoicePage extends Component {
  constructor(props) {
    super(props);
    this.state={
      products:props.products,
      }
  }
  MyInvoiceHandel(){
    this.props.MyInvoice()  }
  render() {
    return (

      <div className="mybody">
        <div className="mycontainer">
          <div className="invoice">
            <header>
              <section>
                <h1>Sandwich Junction</h1>
                <span>16/02/2016</span>
              </section>

            </header>
            <h2 className="h2">Name:</h2>
            <main>
              <section>
                <span>Product</span>
                <span>Unit</span>
                <span>Price</span>
              </section>

              <section>
                {this.state.products.map((product, i) => {
                  return (
                    <div key={i}>
                      <figure>
                        <span>
                          <strong>{product.name}</strong>
                        </span>
                        <span>1</span>
                        <span>{product.price}</span>
                      </figure>
                    </div>
                  )
                })}

              </section>

              <section>
                <span>Total</span>
                <span>{this.props.total}</span>
              </section>
            </main>

            <footer>
              <a href="#0">Later</a>
              <a onClick={this.MyInvoiceHandel.bind(this)} href="#0">Pay Now</a>
            </footer>
          </div>
        </div>
      </div>

    );
  }
}
