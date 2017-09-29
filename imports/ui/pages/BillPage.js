import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {ProductApi} from '../../api/product';
import {Session} from 'meteor/session';
import {InvoiceApi} from '../../api/invoice';
import {Tracker} from 'meteor/tracker';
import InvoicePage from './InvoicePage'
import './css/BillPage';
import Avatar from '../componants/Avatar';
import ProductSinlgeItem from '../componants/ProductSinlgeItem';

export default class BillPage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      billprod: [], 
      total: 0
    }
  }
  componentWillMount() {
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe("product");
      Meteor.subscribe("invoice");
      let products = ProductApi.find({}).fetch();
      this.setState({products});
    });
  }
  componentWillUnmount() {
    this.linktracker.stop();
  }

  handleClick(category) {
    this.setState({category});
  }

  addToBill(newprod) {
    let billprod = this.state.billprod;
    let isavailable = billprod.filter((product) => {
      return (product._id === newprod._id);
    });
    if (isavailable.length == 0) {
      newprod.quantity = 1;
      newprod.tempprice = newprod.price;
      let prodwithqty = newprod;
      billprod.push(prodwithqty);
      this.setState({billprod})
    } else {
      let mynewproduct = isavailable[0];
      let mynewstateproduct = billprod.map((product) => {
        if (product == mynewproduct) {
          product.quantity = product.quantity + 1;
          product.tempprice = product.quantity * product.price;
        }
        return (product);
      })
      this.setState({billprod: mynewstateproduct})
    }
  }

  createInvoice(uname,unumber) {
    if (this.state.billprod.length !== 0) {
      Meteor.call('invoice.insert', Session.get('shop')._id, uname,unumber, this.state.billprod)
      Bert.alert('Done', 'success', 'growl-top-right');
    } else {
      Bert.alert('please add products too invoice', 'danger', 'growl-top-right');
    }
  }



  render() {

    let juice = this.state.products.filter((product) => {
      return (product.category == 1);
      })

    let fruitShake = this.state.products.filter((product) => {
      return (product.category == 2);
      })

    let chocolateShake = this.state.products.filter((product) => {
      return (product.category == 3);
      })

    let beverages = this.state.products.filter((product) => {
      return (product.category == 4);
      })

    let Sandwich = this.state.products.filter((product) => {
      return (product.category == 5);
      })

    let chocolateSandwich = this.state.products.filter((product) => {
      return (product.category == 6);
      })

    let italian = this.state.products.filter((product) => {
      return (product.category == 7);
      })


    return (
          <div className="mainBill box">
                <div id="MenuOptions">
                <div className="menubox">
                <u >
                <strong>Juice</strong>
                </u>

                {juice.map((product, i) => {
                  return (
                    <div id='menuProduct' onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
                  )
                })
              }
              <u>
              <strong>Fruit Shake</strong>
              </u>
                {fruitShake.map((product, i) => {
                  return (
                    <div id='menuProduct' onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
                  )
                })
              }
              <u>
              <strong>Chocolate Shake</strong>
              </u>
                {chocolateShake.map((product, i) => {
                  return (
                    <div id='menuProduct' onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
                  )
                })
              }
                <u>
                <strong>Beverages</strong>
                </u>
                {beverages.map((product, i) => {
                  return (
                    <div id='menuProduct' onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
                  )
                })
              }
              <u>
              <strong>Sandwich</strong>
              </u>
              {Sandwich.map((product, i) => {
                return (
                  <div id='menuProduct' onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
                )
              })
            }

             <u>
              <strong>Chocolate Sandwich</strong>
              </u>

              {chocolateSandwich.map((product, i) => {
                return (
                  <div id='menuProduct' onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
                )
              })
            }
              <u>
              <strong>Italian</strong>
              </u>
              {italian.map((product, i) => {
                return (
                  <div id='menuProduct' onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
                )
              })
            }



              </div>
            </div>
                <div id="Bill">
                  <InvoicePage products={this.state.billprod} total={this.state.total} MyInvoice={this.createInvoice.bind(this)}/>
                </div>

              </div>
    );
  }
}
