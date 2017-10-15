import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const BalanceApi = new Mongo.Collection('balance');

Meteor.methods({
'balance.insert'(balance){
  BalanceApi.insert({
    shopid:balance.shopid,
    type:balance.type,
    balance:balance.balance,
    createdAt:new Date()
   });
},
'balance.check'(){
  var today=new Date()
   var day= today.getDate();
   var month= today.getMonth();
   var year= today.getFullYear();
   let mybalance = BalanceApi.find({createdAt:{$gt:new Date(`${year}/${++month}/${day}`)}}).fetch();
   return mybalance;
},
'balance.remove'(balanceid){
  BalanceApi.remove(balanceid);
}
});
if (Meteor.isServer) {
  Meteor.publish('balance', function userPublication(){
    return  BalanceApi.find();
  });
}
