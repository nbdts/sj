import React, { Component } from 'react';
import './css/InvoicePage';
export default class InvoicePage  extends Component {
  constructor() {
    super();
  }
  render(){
    return(

<div className="body" >
<div className="container">
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
    <figure>
      <span><strong>Espresso</strong> (large)</span>
      <span>1</span>
      <span>2.90</span>
    </figure>

    <figure>
      <span><strong>Cappuccino</strong> (small)</span>
      <span>2</span>
      <span>7.00</span>
    </figure>
  </section>

  <section>
    <span>Total</span>
    <span>9.90</span>
  </section>
</main>

<footer>
  <a href="#0">Later</a>
  <a href="#0">Pay Now</a>
</footer>
</div>
</div>
</div>


    );
  }
}
