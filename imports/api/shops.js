import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const ShopsApi = new Mongo.Collection('shops');

Meteor.methods({
'shops.insert'(shop){

  return ShopsApi.insert({
    name:shop.shopname,
    email: shop.shopemail,
    phno:shop.shopphno,
    password:shop.shoppassword,
    gstin:shop.shopgstin,
    bankname:shop.shopbankname,
    accName:shop.shopaccname,
    accType:shop.shopacctype,
    accNumber:shop.shopaccno,
    accIfsc:shop.shopifsc,
    createdAt:shop.shopcreatedat,
    status:shop.shopstatus,
    add:shop.shopadd,
   });
},
'shops.remove'(shopid){
  ShopsApi.remove(shopid);
},
'shops.update'(){

},
'checklogin'(shopname,password){
  const shop= ShopsApi.find({email:shopname,password}).fetch();
  return shop;
}
});
if (Meteor.isServer) {
  Meteor.publish('shop', function userPublication(){
    return  ShopsApi.find();
  });
}
