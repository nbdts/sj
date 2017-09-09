import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const ShopsApi = new Mongo.Collection('shops');

Meteor.methods({
'shops.insert'(ShopName){

  ShopsApi.insert({
      Name: ShopName,
     createdAt: new Date()
   });
},
'shops.remove'(shopid){
  ShopsApi.remove(shopid);
},
'shops.update'(){

}
});

if (Meteor.isServer) {
  Meteor.publish('publlishallmyshops', function userPublication(){
    return  ShopsApi.find();
  });
}
