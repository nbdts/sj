import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const ShopsApi = new Mongo.Collection('shops');

Meteor.methods({
'shops.insert'(shop){

  ShopsApi.insert({
    Name:shop.shopname,
    Email: shop.shopemail
    Phno:shop.shopphno,
    Password:shop.shoppassword,
    Gstin:shop.shopgstin,
    Bankname:shop.shopbankname,
    AccName:shop.shopaccname,
    AccType:shop.shopacctype,
    AccNumber:shop.shopaccno,
    AccIfsc:shop.shopifsc,
    CreatedAt:shop.shopcreatedat,
    Status:shop.shopstatus
   });
},
'shops.remove'(shopid){
  ShopsApi.remove(shopid);
},
'shops.update'(){

}
});

if (Meteor.isServer) {
  Meteor.publish('shop', function userPublication(){
    return  ShopsApi.find();
  });
}
