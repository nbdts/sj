import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const InvoiceApi = new Mongo.Collection('invoice');
Counter = new Mongo.Collection("counter");


Meteor.methods({

'invoice.insert'(shopid,name,phno,products,amount){
  var insert = InvoiceApi.insert({

    seq:getNextSequence("projectId"),
    shopid:shopid,
    name,
    phno,
    products,
    createdAt:new Date(),
    amount,
   });
   return insert;
},
'invoice.remove'(shopid){
  InvoiceApi.remove(shopid);
},
'invoice.update'(){

},
'invoice.invoiceById'(id){
const myInvoice=InvoiceApi.findOne({_id:id})
return myInvoice
},



});
if (Meteor.isServer) {
  Meteor.publish('invoice', function userPublication(){
    return  InvoiceApi.find();
  });
  Meteor.startup(function () {
      Counter._ensureIndex({"type": 1});
      if (Counter.find({type: "projectId"}).count() == 0) Counter.insert({type: "projectId", seq: 0});
  });
}



getNextSequence = function (name) {
    Counter.update({type: name}, {$inc: {seq: 1}});
    var ret = Counter.findOne({type: name});
    return ret.seq;
}
