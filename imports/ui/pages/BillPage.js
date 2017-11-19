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
      paymenttype:'cash',
      }
  }
  componentWillMount() {
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe("product");
      Meteor.subscribe("invoicebyshopid",Session.get('shop')._id);
      let productsbyshop = ProductApi.find({shopid:Session.get('shop')._id}).fetch();
      let productsbytype = ProductApi.find({shopid:1}).fetch();
      const products = [...productsbyshop, ...productsbytype];
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
  minusproduct(newprod){
    let billprod = this.state.billprod;
    let isavailable = billprod.filter((product) => {
      return (product._id === newprod._id);
    });
    if (isavailable.length == 0) {
      console.log("not availble");
    }else {
      let mynewproduct = isavailable[0];
      if (parseFloat(isavailable[0].quantity) > 1) {
        let mynewstateproduct = billprod.map((product) => {
          if (product == mynewproduct) {
            product.quantity = product.quantity - 1;
            product.tempprice = product.quantity * product.price;
          }
          return (product);
        })
        this.setState({billprod: mynewstateproduct})
      }else {
        johnRemoved = billprod.filter(function(el) {
          return el._id !== mynewproduct._id;
        });
        let mynewstateproducts = this.state.products.map((product) => {
          if (product._id === mynewproduct._id) {
            product.quantity = null ;
          }
          return (product);
        })
        this.setState({billprod: johnRemoved,products:mynewstateproducts})

      }

    }
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
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }

  createInvoice(amount) {

    if (this.state.billprod.length !== 0) {
      if ( this.state.username === '') {
        Bert.alert('Enter user name', 'danger', 'growl-top-right');
        return false;
      }
      if ( this.state.paymenttype === '') {
        Bert.alert('Select Pyament Method', 'danger', 'growl-top-right');
        return false;
      }
  Meteor.call('invoice.insert',Session.get('shop')._id, this.state.username,this.state.userphone, this.state.billprod,amount,this.state.paymenttype,(err,res)=>{
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

      let mynewstateproducts1 = this.state.products.map((product) => {
          let mynewbillproducts = this.state.billprod.map((billp)=>{
            if (product._id === billp._id) {
              product.quantity = null ;
            }
          })
          return (product);
      })

      this.setState({  billprod: [],username:'',userphone:'',id:'',products:mynewstateproducts1})
    }
  })

     } else {
       Bert.alert('Please add products', 'danger', 'growl-top-right');
   }

  }



  render() {
    let categories =[
      {id:1,name:'sandwich'},
      {id:2,name:'chocolate sandwich'},
      {id:3,name:'beverages'},
      {id:4,name:'pasta'},
      {id:5,name:'chocolate Shake'},
      {id:6,name:'juice shake'},
      {id:7,name:'fruit shake'},
      {id:8,name:'italian'},
    ]

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
      <div  >
          <div className="row" style={{margin:20}} >
              <div  className="col-sm-3"><input type="text" className="form-control" placeholder="User Name" onChange={this.setValue.bind(this,'username')} value={this.state.username} /></div>
              <div  className="col-sm-3"><input type="number" className="form-control" placeholder="User Number" onChange={this.setValue.bind(this,'userphone')} value={this.state.userphone} /></div>
              <div  className="col-sm-3" style={{display:'flex'}}>
                 <div  className="selectprocuct">{this.state.billprod.length}</div>
                 <div  className="totalofproduct">Total : {mytotal[mytotal.length-1]}</div>
              </div>
              <div  className="col-sm-3" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <select className="group" style={{flexBasis:100}}  onChange={this.setValue.bind(this,'paymenttype')}>
                <option value="cash">Cash</option>
                <option value="paytm">Paytm</option>
                <option value="borrow">Out Standing</option>
                </select>
               <div  className="btn btn-info" onClick={this.createInvoice.bind(this,mytotal[mytotal.length-1])}>Pay Now</div> </div>
          </div>
          <div className="row"  >
          {
            categories.map((cat,i)=>{
              return(
                <div key={i} className="col-sm-3 mycolumn">
                <div className="mycategories btn" >{cat.name}</div>
                {
                  this.state.products.map((product,i)=>{
                    if (parseFloat(product.category) == cat.id) {
                      return(
                        <div key={i} className="myproducts btn">
                        <div className='myproductname' onClick={this.addToBill.bind(this,product)}>{product.name}</div>
                        <div className='myproductquantity'>{product.quantity ? product.quantity : null}</div>
                        {  product.quantity == null  ? null :<span className="glyphicon glyphicon-minus-sign myproducticon"  onClick={this.minusproduct.bind(this,product)}></span>}
                        <div className='myproductprice' onClick={this.addToBill.bind(this,product)}> ₹{product.price}</div>
                        </div>
                      )
                    }
                  })
                }
                </div>
              )
            })
          }
          </div>
          <div id="divContents" style={{display:'none'}}>
          <Print id={this.state.id} today={today} products={this.state.billprod} shop={Session.get('shop')} username={this.state.username} userphone={this.state.userphone} chnageUsername={this.chnageUsername.bind(this)} chnageUserphone={this.chnageUserphone.bind(this)}/>
          </div>

          <iframe id="myiframe" style={{position:"absolute",top:"-100vh"}}></iframe>

        </div>
    );
  }
}
