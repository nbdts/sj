import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const CategoryApi = new Mongo.Collection('category');

Meteor.methods({
'category.insert'(category){

  CategoryApi.insert({
    name:category.name,

   });
},
'category.remove'(shopid){
  CategoryApi.remove(shopid);
},
'category.update'(){

},
'category.checklogin'(shopname,password){
  const shop= CategoryApi.find({name:shopname,password}).fetch();
  return shop;
}
});
if (Meteor.isServer) {
  Meteor.publish('category', function userPublication(){
    return  CategoryApi.find();
  });
}
