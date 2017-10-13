import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const ExpenseApi = new Mongo.Collection('expense');

Meteor.methods({
'expense.insert'(expense){

  ExpenseApi.insert({
    shopid:expense.shopid,
    item:expense.item,
    price: expense.price,
    createdAt:new Date()
   });
},
'expense.remove'(expenceid){
  ExpenseApi.remove(expenceid);
}
});
if (Meteor.isServer) {
  Meteor.publish('expense', function userPublication(){
    return  ExpenseApi.find();
  });
}
