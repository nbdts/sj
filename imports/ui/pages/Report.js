import React, { Component } from 'react';
import BalanceSheetForAdmin from './BalanceSheetForAdmin';
import { Tracker } from 'meteor/tracker';
import {ShopsApi} from '../../api/shops';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class Report  extends Component {

  constructor() {
    super();
    this.state={
      shops:[],
      shopid:null,
      startDate: moment(),
      from: moment()._d,
      endDate:moment(),
      to:moment()._d,
      go:false,
      date: new Date(),
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
    setSelectValue(event){
      this.setState({shopid:event.target.value})
    }
    handleReset(){
      this.setState({go:false})
    }
    handleSubmit(){
      const shopid = this.state.shopid;
      if (shopid == null) {
        Bert.alert('Please Select Shop', 'danger', 'growl-top-right');
        return false;
      }
      if (this.state.from == null) {
        Bert.alert('Please Select Start Date', 'danger', 'growl-top-right');
        return false;
      }
      if (this.state.to == null) {
        Bert.alert('Please Select End Date', 'danger', 'growl-top-right');
        return false;
      }
      this.setState({go:true})
    }
    setValue(field, date) {
   let object = {};
   object[field] = date;
   if (field === 'startDate') {
     object["from"] = date._d;
   }
   if (field === 'endDate') {
     object["to"] = date._d;
   }
   this.setState(object);
 }

  render(){
    return(
       <div>
       <center><h1>Report</h1></center>
       <div style={{display:'flex',flexFlow:'column',flexWrap:'wrap',flex:1,marginTop:70}}>
       <center>
          <h4>From</h4>
          <DatePicker style={{width:3000}} selected={this.state.startDate} onChange={this.setValue.bind(this,'startDate')} className="form-control"  placeholderText="From" dateFormat="L" style={{flexBasis:300,margin:10}}/>
          <h4>To</h4>
          <DatePicker selected={this.state.endDate} onChange={this.setValue.bind(this,'endDate')} className="form-control"  placeholderText="From" dateFormat="L"  style={{flexBasis:300,margin:10}}/>
          <h4>Shop</h4>
          <select onChange={this.setSelectValue.bind(this)} className="form-control"  style={{maxWidth:300,margin:10}}>
           <option >Select Shop</option>
           {this.state.shops.map((shop,i)=>{
             return(
               <option key={i} value={shop._id}>{shop.name}</option>
               )
             })
           }
            </select>
            <button className="btn btn-primary" onClick={this.state.go ? this.handleReset.bind(this) : this.handleSubmit.bind(this)}  style={{flexBasis:300,margin:10}}>{this.state.go ? "Reset" :"Submit"}</button>
            {this.state.go ? <BalanceSheetForAdmin shopid={this.state.shopid} from={this.state.from} to={this.state.to}/> :  null}

        </center>
       </div>
       </div>
    );
  }
}
