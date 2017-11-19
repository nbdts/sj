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
    handleReset(){
      this.setState({shopid:''})
    }

  render(){
    return(
       <div>
       <center><h1>Balance Sheet Report</h1></center>
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
            <button className="btn btn-primary" onClick={this.handleReset.bind(this)}>Reset</button>
       </div>
       {

        this.state.shopid === '' ? null :  <BalanceSheetForAdmin1 shopid={this.state.shopid} />
       }
       </div>
    );
  }
}
