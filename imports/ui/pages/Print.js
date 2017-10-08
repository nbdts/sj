import React, { Component } from 'react';
import {InvoiceApi} from '../../api/invoice';
import {Tracker} from 'meteor/tracker';
import './css/Print';


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



  render(){
    let price=0
    let mytotal= this.props.products.map((product)=>{
          return(price=parseFloat(price)+parseFloat(product.tempprice));
    })
    return(
    <div>
        <div style={{marginRight:40}} id='header'>
            <u>
              <h3 style={{textAlign:'center',fontSize:15}}>Invoice</h3>
            </u>

            <div style={{textAlign:'center',alignItems:'center',fontWeight:'bold'}}>
              <span style={{fontSize:12}}>Sandwich Junction</span>
              <br/>
              <span style={{fontSize:10 }}>{this.props.shop.add} k aagey wali gali se thoda peeche </span>
            </div>
          <hr/>


    <div style={{display:'flex',flexFlow:'row',flex:1}}>
    <div style={{flex:1}}>
    <span style={{textAlign:'left',fontSize:12}}>{this.props.username}</span><br/>
    <span style={{textAlign:'left',fontSize:12}}>{this.props.userphone}</span>
    </div>
    <div style={{flex:1}}>
    <span style={{textAlign:'left',fontSize:10}}>invoice:001</span><br/>
    <span style={{textAlign:'left',fontSize:12}} >Date:{date}</span><br/>
    </div>
    </div>
    </div>
    <hr/>
     <div id='table' style={{padding:10}}>
            <table style={{textAlign:'left',display:'flex',flex:1,flexFlow:'column'}}>
            <thead >
              <tr style={{display:'flex',flex:1,flexFlow:'row'}}>
              <th style={{textAlign:'left',flex:1,fontSize:13}}> item</th>
              <th style={{textAlign:'left',flex:1,fontSize:13}}> price</th>
              <th style={{textAlign:'left',flex:1,fontSize:13}}> qty</th>
              <th style={{textAlign:'left',flex:1,fontSize:13}}> amount</th>
              </tr>
            </thead>

            <tbody >
            {this.props.products.map((product, i) => {
              return (
                <tr key={i} style={{textAlign:'left',display:'flex',flex:1,flexFlow:'row'}}>
                <td style={{flex:1,fontSize:12}}>{product.name}</td>
                <td style={{flex:1,fontSize:12}}>{product.price}</td>
                <td style={{flex:1,fontSize:12}}>{product.quantity}</td>
                <td style={{flex:1,fontSize:12}}>{product.price*product.quantity}</td>
                </tr>

              )
            })
          }
          </tbody>
          <br/>
            <tfoot >
             <tr style={{display:'flex',flex:1,flexFlow:'row'}}>
             <td style={{flex:1}}></td>
             <td style={{flex:1}}></td>
             <td style={{flex:1,textAlign:'center',fontSize:12}}>Total:</td>
             <td style={{flex:1,fontSize:12}}>₹{mytotal[mytotal.length-1]}</td>
             </tr>
            </tfoot>
            </table>

     </div>
     <hr/>
     <div style={{fontSize:12,textAlign:'center'}}>
     <span>Visit Again :)</span>
     </div>
     <br/>
    </div>


    );
  }
}
