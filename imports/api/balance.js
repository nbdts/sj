import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const BalanceApi = new Mongo.Collection('balance');

Meteor.methods({
'balance.insert'(balance){

  BalanceApi.insert({
    type:balance.type,
    balance:balance.balance,
    createdAt:new Date()
   });
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
