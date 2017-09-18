import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {ProductApi} from '../../api/product';
import {InvoiceApi} from '../../api/invoice';
import {Tracker} from 'meteor/tracker';
import './css/BillPage';
import Avatar from '../componants/Avatar';
import ProductSinlgeItem from '../componants/ProductSinlgeItem';

export default class BillPage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      category: 0,
      bill: 0,
      billprod: [],
      username: 'cash'
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
    billprod.push(newprod);
    this.setState({
      billprod
    }, () => {
      console.log(this.state.billprod)
    })
  }

  createInvoice() {
    if (this.state.billprod.length !== 0) {
      Meteor.call('invoice.insert', this.state.username, this.state.billprod)
    } else {
      Bert.alert('please add products too invoice', 'danger', 'growl-top-right');
    }
  }

  render() {
    let products = this.state.products.filter((product) => {
      return (product.category == this.state.category);
    })
    return (
      <Router>
        <div>
          <div className="admin-panel clearfix">
            <div className="slidebar">
              <ul>
                <li onClick={this.handleClick.bind(this, 3)}>
                  <a href="#" id="targeted"><Avatar image="https://image.flaticon.com/icons/svg/167/167247.svg" text="Juice"/></a>
                </li>
                <li onClick={this.handleClick.bind(this, 2)}>
                  <a href="#" id="targeted"><Avatar image="http://www.italysgr.com/images/icon/Pizza-icon.png" text="Pizza"/></a>
                </li>
                <li onClick={this.handleClick.bind(this, 1)}>
                  <a href="#" id="targeted"><Avatar image="http://icons.iconarchive.com/icons/dapino/beach/256/icecream-icon.png" text="Icecream"/></a>
                </li>
              </ul>
            </div>

            <div className="main box">
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
              }}>

                <div id="MenuOptions" style={{
                  display: 'flex',
                  flex: 5,
                  flexWrap: 'wrap',
                }}>
                  {products.map((product, i) => {
                    return (
                      <div onClick={this.addToBill.bind(this, product)} key={i}><ProductSinlgeItem product={product}/></div>

                    )
                  })
}
                </div>

                <div id="Bill" style={{
                  display: 'flex',
                  flex: 2,
                  backgroundColor: "yellow",
                  flexWrap: 'wrap',
                  flexFlow: "column",
                }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.billprod.map((bill, i) => {
                        return (
                          <tr key={i}>
                            <td>{bill.name}</td>
                            <td>{bill.price}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <a href="/invoice">
                  <button onClick={this.createInvoice.bind(this)}>invoice</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
