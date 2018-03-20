import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const ExpenseApi = new Mongo.Collection('expense');

Meteor.methods({
'expense.insert'(expense){

  ExpenseApi.insert({
    shopid:expense.shopid,
    item:expense.item,
    price: expense.price,
    expensetype: expense.expensetype,
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
  Meteor.publish('expenseByShopIdAndDateWise', function userPublication(shopid,date){
    return  ExpenseApi.find({shopid,createdAt:{$gte:date}},{sort: {createdAt: -1}});
  });
}
