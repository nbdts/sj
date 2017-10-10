import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {ProductApi} from '../../api/product';
import {Session} from 'meteor/session';
import {InvoiceApi} from '../../api/invoice';
import {Tracker} from 'meteor/tracker';
import InvoicePage from './InvoicePage'
import './css/BillPage';
import Print from './Print';
import Avatar from '../componants/Avatar';
import ProductSinlgeItem from '../componants/ProductSinlgeItem';

export default class BillPage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      billprod: [],
      total: 0,
      username:'',
      userphone:'',
      id:'',
      counterno:0,
    }
  }
  componentWillMount() {
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe("product");
      Meteor.subscribe("invoice");
      let products = ProductApi.find({}).fetch();
      this.setState({counterno:InvoiceApi.find({}).count()})
      this.setState({products});
    });
  }
  componentWillUnmount() {
    this.linktracker.stop();
  }

  handleClick(category) {
    this.setState({category});
  }
  chnageUsername(username){
    this.setState({username})
  }
  chnageUserphone(userphone){
    this.setState({userphone})

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
    function getNextSequenceValue(sequenceName){

       var sequenceDocument = CountersApi.findAndModify({
          query:{'_id': sequenceName },
          update: {$inc:{sequence_value:1}},
          new:true
       });

       return sequenceDocument.sequence_value;
    }

     if (this.state.billprod.length !== 0) {
 Meteor.call('invoice.insert',Session.get('shop')._id, uname,unumber, this.state.billprod,(err,res)=>{
   const myInvoice=InvoiceApi.findOne({_id:res})
        this.setState({id:myInvoice.seq})
    if (err) {
      Bert.alert('ERROR', 'danger', 'growl-top-right');

    }else {
      Bert.alert('Done', 'success', 'growl-top-right');
      var content = document.getElementById('divContents');
      var pri = document.getElementById('myiframe').contentWindow;
      pri.document.open();
      pri.document.write(content.innerHTML);
      pri.document.close();
      pri.focus();
      pri.print();
    }
  })
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

        let today=new Date()
        date = today.getDate()+ '/' + (today.getMonth() + 1) + '/' +today.getFullYear()

        let price=0;
        let mytotal= this.state.billprod.map((product)=>{
              return(price=parseFloat(price)+parseFloat(product.tempprice));
        })


    return (
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


                <div id="Bill">
                  <InvoicePage products={this.state.billprod}  MyInvoice={this.createInvoice.bind(this)} username={this.state.username} userphone={this.state.userphone} chnageUsername={this.chnageUsername.bind(this)} chnageUserphone={this.chnageUserphone.bind(this)}/>
                </div>

                <div id="divContents" style={{display:'none'}}>
                <Print id={this.state.counterno} products={this.state.billprod} shop={Session.get('shop')} username={this.state.username} userphone={this.state.userphone} chnageUsername={this.chnageUsername.bind(this)} chnageUserphone={this.chnageUserphone.bind(this)}/>
                </div>

                <iframe id="myiframe" style={{position:"absolute",top:"-100vh"}}></iframe>
            </div>
    );
  }
}
