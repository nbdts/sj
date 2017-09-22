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
      category: 0,
      billprod: [],
      username: 'cash',
      total:0,
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
    let isavailable= billprod.filter((product)=>{
          return (product._id===newprod._id);
    });
    if (isavailable.length == 0) {
      newprod.quantity=1;
      newprod.tempprice=newprod.price;
      let prodwithqty =newprod;
      billprod.push(prodwithqty);
      this.setState({billprod})
    }else {
      let mynewproduct= isavailable[0];
      let  mynewstateproduct= billprod.map((product)=>{
        if (product==mynewproduct) {
           product.quantity=product.quantity+1;
           product.tempprice=product.quantity*product.price;
        }
        return(product);
      })
      this.setState({billprod:mynewstateproduct})
    }
  }


  createInvoice() {
    if (this.state.billprod.length !== 0) {
      Meteor.call('invoice.insert', Session.get('shop')._id, this.state.username, this.state.billprod)
      Bert.alert('Done', 'success', 'growl-top-right');
    } else {
      Bert.alert('please add products too invoice', 'danger', 'growl-top-right');
    }
  }

  render(){
    let products = this.state.products.filter((product) => {
      if (this.state.category==0) {
        return (product);
      }else {
        return (product.category == this.state.category);
      }
    })
return (
      <Router>
        <div>
          <div className="admin-panel clearfix">
            <div className="slidebar" id="slidebar">
              <ul>
                <li onClick={this.handleClick.bind(this, 1)}>

                  <a href="#" id="targeted"><Avatar image="/juice3.svg" text="Juice"/></a>
                </li>
                <li onClick={this.handleClick.bind(this, 2)}>
                  <a href="#" id="targeted"><Avatar image="http://www.italysgr.com/images/icon/Pizza-icon.png" text="Fruit Shakes"/></a>
                </li>
                <li onClick={this.handleClick.bind(this, 3)}>
                  <a href="#" id="targeted"><Avatar image="http://icons.iconarchive.com/icons/dapino/beach/256/icecream-icon.png" text="Chocolate Shakes"/></a>
                </li>
                <li onClick={this.handleClick.bind(this, 4)}>
                  <a href="#" id="targeted"><Avatar image="http://icons.iconarchive.com/icons/dapino/beach/256/icecream-icon.png" text="Beverages"/></a>
                </li>
                <li onClick={this.handleClick.bind(this, 5)}>
                  <a href="#" id="targeted"><Avatar image="http://icons.iconarchive.com/icons/dapino/beach/256/icecream-icon.png" text="Sandwich"/></a>
                </li>
                <li onClick={this.handleClick.bind(this, 6)}>
                  <a href="#" id="targeted"><Avatar image="http://icons.iconarchive.com/icons/dapino/beach/256/icecream-icon.png" text="Chocolate Sandwich"/></a>
                </li>
                <li onClick={this.handleClick.bind(this, 7)}>
                  <a href="#" id="targeted"><Avatar image="http://icons.iconarchive.com/icons/dapino/beach/256/icecream-icon.png" text="Italian"/></a>
                </li>
              </ul>
            </div>

            <div className="main box">
              <div style={{display: 'flex',flex:1}}>

              <div id="MenuOptions">
                  {products.map((product, i) => {
                    return (
                      <div onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product} isAdmin={false}/></div>

                    )
                  })
}
                </div>

                <div id="Bill">
                <InvoicePage products={this.state.billprod} total={this.state.total} MyInvoice={this.createInvoice.bind(this)}/>

                </div>

              </div>



            </div>
          </div>
        </div>
      </Router>
    );
  }
}
