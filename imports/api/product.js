import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const ProductApi = new Mongo.Collection('product');

Meteor.methods({
'product.insert'(product){

  ProductApi.insert({
    name:product.name,
    price:product.price,
    category:product.category,
    status:1,
    createdAt:new Date()
    });
},
'product.remove'(product){
  ProductApi.remove(product);
},
'product.update'(){

}
});
if (Meteor.isServer) {
  Meteor.publish('product', function userPublication(){
    return  ProductApi.find();
  });
}
