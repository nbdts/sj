import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const ProductApi = new Mongo.Collection('product');

Meteor.methods({
'product.insert'(product){

  ProductApi.insert({
    name:product.name,
    price:product.price,
    category:product.category
    });
},
'product.remove'(product){
  ProductApi.remove(product);
},
'product.update'(){

},
'product.checklogin'(shopname,password){
  const product= ProductApi.find({product:product,password}).fetch();
  return product;
}
});
if (Meteor.isServer) {
  Meteor.publish('product', function userPublication(){
    return  ProductApi.find();
  });
}
