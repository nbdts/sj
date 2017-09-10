import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const CategoryApi = new Mongo.Collection('category');

Meteor.methods({
'catgory.insert'(category){

  CategoryApi.insert({
    category:category.newcategory,

   });
},
'category.remove'(category){
  CategoryApi.remove(category);
},
'category.update'(){

},
'category.checklogin'(shopname,password){
  const category= CategoryApi.find({category:category,password}).fetch();
  return category;
}
});
if (Meteor.isServer) {
  Meteor.publish('category', function userPublication(){
    return  CategoryApi.find();
  });
}
