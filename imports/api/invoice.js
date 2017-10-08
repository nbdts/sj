import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const InvoiceApi = new Mongo.Collection('invoice');

Meteor.methods({
'invoice.insert'(shopid,name,phno,products){

  var insert = InvoiceApi.insert({
    shopid:shopid,
    name,
    phno,
    products,
    createdAt:new Date(),
    status:1,
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
}
