import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import {BalanceApi} from '../../api/balance';

export default class BalanceForm  extends Component {
  constructor() {
    super();
    this.state={
      balanceapi:[],
      balance:0,
      type:0,
    }
  }
  componentWillMount(){
      this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("balance");
        let balanceapi = BalanceApi.find({}).fetch();
          this.setState({balanceapi});
      });
  }
  componentWillUnmount(){
    this.linkracker.stop();
  }



    handleChange(event) {
      let object = {};
      object[event.target.id] = event.target.value
      this.setState(object);
    }
    handleClick(event){
      this.setState({type:event.target.value})
      console.log(event.target.value);
    }
    handleSubmit(event){
      let type=this.state.type
      let balance=this.state.balance
      balanceobj={
        type:type,
        balance:balance
      }
      console.log(balanceobj);
      Meteor.call('balance.insert',balanceobj);
      Bert.alert('Balance Added', 'success', 'growl-top-right');
    }


    render(){
    return(
       <div style={styles.mainBox}>
       <h1 style={{textAlign:'center'}} >Enter Balance</h1>
       <div style={styles.inputs}>

     <select onChange={this.handleClick.bind(this)} style={{margin:5}}>
        <option value="1">OPENING</option>
        <option value="0">CLOSING</option>
      </select>


         <input required style={{margin:5}} type="number" id='balance' placeholder='BALANCE' onChange={this.handleChange.bind(this)} />
         <button className='btn btn-danger' style={{margin:5}} onClick={this.handleSubmit.bind(this)} >Submit</button>
       </div>
       </div>
    );
  }
}
const styles={
  mainBox:{
    display:'flex',
    flexFlow:'column',
    flex:1,
  },
  inputs:{
    padding:5,
    display:'flex',
    flexFlow:'column',
  }
}
