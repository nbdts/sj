import React, { Component } from 'react';
import {InvoiceApi} from '../../api/invoice';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import './css/Print';
import moment from 'moment';
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
        <div style={{justifyContent:'center',alignItems:'center'}} id='header'>
            <u style={{textAlign:'center'}}>
              <h3 style={{textAlign:'center',fontSize:15}}>Invoice</h3>
            </u>
            <div>
              <span style={{fontWeight:'bold',fontSize:12}}>Sandwich Junction</span>
              <br/>
              <span style={{fontWeight:'bold',fontSize:10 }}>{this.props.shop.add}</span>
            </div>
          <hr/>


    <div style={{display:'flex',flexFlow:'row',flex:1}}>
    <div style={{textAlign:'left',flex:1,flexFlow:'column'}}>
    <span style={{textAlign:'left',fontSize:12}}>{this.props.username}</span><br/>
    <span style={{textAlign:'left',fontSize:12}}>{this.props.userphone}</span>
    </div>
    <div style={{textAlign:'left',flex:1,flexFlow:'column'}}>
    <span style={{textAlign:'left',fontSize:12}}>invoice:SJ{this.props.id}</span><br/>
    <span style={{textAlign:'left',fontSize:12}} >Date:{date + '    ' + moment(this.props.today).format("hh:mm:ss a")}</span>
    </div>
    </div>
    </div>
    <hr/>
     <div id='table' style={{padding:1}}>
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
     <span>Visit Again :)</span><br/>
     <span>{this.props.shop.add}</span><br/>
     <span>mail:{this.props.shop.email}</span><br/>
     <span>call on:{this.props.shop.phno}</span>
     </div>
     <br/>
    </div>


    );
  }
}
