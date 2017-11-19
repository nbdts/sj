import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import {Session} from 'meteor/session';
import {BalanceApi} from '../../api/balance';

export default class BalanceForm  extends Component {
  constructor() {
    super();
    this.state={
      balanceapi:[],
      balance:'',
      type:'',
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
    }
    handleSubmit(){

      if (this.state.type === '') {
        Bert.alert('Select Balance Type', 'warning', 'growl-top-right')
        return false;
      }
      let type=this.state.type
      let balance=this.state.balance
      balanceobj={
        shopid:Session.get('shop')._id,
        type:type,
        balance:balance
      }
        Meteor.call('balance.check',Session.get('shop')._id,type,(err,res)=>{
          if (!err) {
            if(res.length > 0){
                Bert.alert('Already added', 'warning', 'growl-top-right')
                this.setState({balance:0})
            }
            else{
                Meteor.call('balance.insert',balanceobj,(err,res)=>{
                  Bert.alert('Balance Added', 'success', 'growl-top-right')
                  this.setState({balance:0})
                  location.reload();
                })
              }
          }


        })
    }


    render(){
      return(
       <div style={styles.mainBox}>
       <h1 style={{textAlign:'center'}} >Enter Balance</h1>
       <h3 style={{textAlign:'center'}} >{date}</h3>

       <div style={styles.inputs}>

     <select onChange={this.handleClick.bind(this)} style={{margin:5}}>
        <option value="">Select Balance Type</option>
        <option value={'0'}>CLOSING</option>
        <option value={'1'}>ADD TO OPENING</option>
      </select>

         <input required style={{margin:5}} value={this.state.balance} type="number" id='balance' placeholder='BALANCE' onChange={this.handleChange.bind(this)} />
         <button className='btn btn-warning' style={{margin:5}} onClick={this.handleSubmit.bind(this)} >Submit</button>
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
