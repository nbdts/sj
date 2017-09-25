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
      username: 'cash',
      usernumber: 'unknown',
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

  createInvoice() {
    if (this.state.billprod.length !== 0) {
      Meteor.call('invoice.insert', Session.get('shop')._id, this.state.username, this.state.usernumber, this.state.billprod)
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
          <div className="main box">
                <div id="MenuOptions">
                <div className="menubox">
                <strong style={{color:'white',paddingLeft:15,backgroundColor:'#444'}}>Juice</strong>
                {juice.map((product, i) => {
                  return (
                    <div style={{
                      width:'23%',paddingRight:2
                    }} onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
                  )
                })
              }
              <strong style={{color:'white',paddingLeft:15,backgroundColor:'#444'}}>Fruit Shake</strong>
                {fruitShake.map((product, i) => {
                  return (
                    <div style={{
                      width:'23%',paddingRight:2
                    }} onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
                  )
                })
              }

                <strong style={{color:'white',paddingLeft:15,backgroundColor:'#444'}}>Chocolate Shake</strong>
                {chocolateShake.map((product, i) => {
                  return (
                    <div style={{
                      width:'23%',paddingRight:2
                    }} onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
                  )
                })
              }

                <strong style={{color:'white',paddingLeft:15,backgroundColor:'#444'}}>Beverages</strong>
                {beverages.map((product, i) => {
                  return (
                    <div style={{
                      width:'23%',paddingRight:2
                    }} onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
                  )
                })
              }
              <strong style={{color:'white',paddingLeft:15,backgroundColor:'#444'}}>Sandwich</strong>
              {Sandwich.map((product, i) => {
                return (
                  <div style={{
                    width:'23%',paddingRight:2
                  }} onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
                )
              })
            }
              <strong style={{color:'white',paddingLeft:15,backgroundColor:'#444'}}>Chocolate Sandwich</strong>
              {chocolateSandwich.map((product, i) => {
                return (
                  <div style={{
                    width:'23%',paddingRight:2
                  }} onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
                )
              })
            }
              <strong style={{color:'white',paddingLeft:15,backgroundColor:'#444'}}>Italian</strong>
              {italian.map((product, i) => {
                return (
                  <div style={{
                    width:'23%',paddingRight:2
                  }} onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>
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
