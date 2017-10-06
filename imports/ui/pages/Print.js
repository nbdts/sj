import React, { Component } from 'react';
import {InvoiceApi} from '../../api/invoice';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';


export default class Print  extends Component {
  constructor() {
    super();
    this.state={
      billprod:[],
      total:0,
      name:'',
      phno:'',
      products:[],
        }
  }

  componentWillMount() {
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe("invoice");
      let billprod = InvoiceApi.find({}).fetch();
      billprod=billprod[billprod.length -1]
      this.setState({billprod});
            if (billprod!=null) {
        this.setState({products:billprod.products});
        this.setState({name:billprod.name});
        this.setState({phno:billprod.phno});
      }

    });
  }
  componentWillUnmount() {
    this.linktracker.stop();
  }


  render(){
    let price=0
    let mytotal= this.state.products.map((product)=>{
          return(price=parseFloat(price)+parseFloat(product.tempprice));
    })
    console.log(Session.get('shop'));
    return(<div id='print' style={{display:'',positon:'absolute',top:70,left:0,zIndex:999,backgroundColor:'white'}}>
    <div id='header' style={{padding:10}}>
    <u>
    <h1 style={{textAlign:'center'}}>Sandwich Junction</h1>
    <h3 style={{textAlign:'center'}}>Invoice</h3>
    </u>


    <div style={{display:'flex',flex:1}}>
    <div style={{flex:1}}>
    <span style={{textAlign:'left'}} >{date}</span><br/>
    <span>Name: {this.state.name}</span><br/>
    <span>PhNo: {this.state.phno}</span>
    </div>
    <div style={{flex:1}}>
    <span style={{textAlign:'center'}}>Address</span><br/>
    <span >{Session.get('shop').add }</span>
    </div>
    </div>
    </div>
    <hr/>
     <div id='table' style={{padding:10}}>
            <table style={{display:'flex',flex:1,flexFlow:'column'}}>
            <thead >
              <tr style={{display:'flex',flex:1,flexFlow:'row'}}>
              <th style={{flex:1}}> item</th>
              <th style={{flex:1}}> price</th>
              <th style={{flex:1}}> qty</th>
              <th style={{flex:1}}> amount</th>
              </tr>
            </thead>

            <tbody >
            {this.state.products.map((product, i) => {
              return (
                <tr key={i} style={{display:'flex',flex:1,flexFlow:'row'}}>
                <td style={{flex:1}}>{product.name}</td>
                <td style={{flex:1}}>{product.price}</td>
                <td style={{flex:1}}>{product.quantity}</td>
                <td style={{flex:1}}>{product.price*product.quantity}</td>
                </tr>

              )
            })
          }
          </tbody>

            <br/>

            <tbody >
             <tr style={{display:'flex',flex:1,flexFlow:'row'}}>
             <td style={{flex:1}}></td>
             <td style={{flex:1}}></td>
             <td style={{flex:1,textAlign:'center'}}>Total:</td>
             <td style={{flex:1}}>₹{mytotal[mytotal.length-1]}</td>
             </tr>
            </tbody>

            </table>
     </div>
     <hr/>

    </div>


    );
  }
}
