import React, { Component } from 'react';
import BalanceSheetForAdmin1 from './BalanceSheetForAdmin1';
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
       <h4> To see the other shop report first Press Ctrl + R  or You can REFRESH the page  and then select other shop from list <strong>We Are extreamly Sorry for this difficulty we will try to resolve this problem very soon</strong></h4>
       <div style={{display:'flex',flex:1,justifyContent:'center',marginTop:70}}>
           <select onChange={this.setValue.bind(this)} className="form-control" style={{display:'flex',flexBasis:300}}>
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

        this.state.shopid === '' ? null :  <BalanceSheetForAdmin1 shopid={this.state.shopid} />
       }
       </div>
    );
  }
}
