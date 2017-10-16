import React, { Component } from 'react';
import BalanceSheetForAdmin from './BalanceSheetForAdmin';
import { Tracker } from 'meteor/tracker';
import {ShopsApi} from '../../api/shops';

export default class Report  extends Component {

  constructor() {
    super();
    this.state={
      shops:[],
      shopid:'',
    }
  }
  componentWillMount(){
     this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("shop");
        let shops = ShopsApi.find().fetch();
        this.setState({shops});
    });
    }

    componentWillUnmount(){
      this.linkracker.stop();
    }
    setValue(event){
      this.setState({shopid:event.target.value})
    }

  render(){
    return(
       <div>
       <div style={{display:'flex',flex:1,justifyContent:'center',marginTop:70}}>
           <select onChange={this.setValue.bind(this)}>
           <option >Select Shop</option>
           {this.state.shops.map((shop,i)=>{
             return(
               <option key={i} value={shop._id}>{shop.name}</option>
               )
             })
           }
            </select>
       </div>
       {

        this.state.shopid === '' ? null :  <BalanceSheetForAdmin shopid={this.state.shopid} />
       }
       </div>
    );
  }
}
