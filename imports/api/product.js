import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const ProductApi = new Mongo.Collection('product');

Meteor.methods({
'product.insert'(product){

return  ProductApi.insert({
    name:product.name,
    shopid:product.shopid,
    price:product.price,
    category:product.category,
    status:1,
    createdAt:new Date()
    });
},
'product.remove'(product){
  ProductApi.remove(product);
},
'product.update'(product){
  return ProductApi.update({_id:product.productid},{ $set:{
    name:product.name,
    price:product.price,
    category:product.category,
  }});
}
});
if (Meteor.isServer) {
  Meteor.publish('product', function userPublication(){
    return  ProductApi.find();
  });
  Meteor.publish('productbyshopid', function userPublication(shopid){
    return  ProductApi.find({shopid});
  });
  Meteor.publish('productbytype', function userPublication(type){
    return  ProductApi.find({type:1});
  });
}
