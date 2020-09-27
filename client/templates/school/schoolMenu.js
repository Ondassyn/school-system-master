import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './schoolMainPage.html';
Template.schoolMenu.onCreated(function() {
    let template = this

})
Template.schoolMenu.helpers({
  isSchoolAccount() {
      return Roles.userIsInRole(Meteor.userId(),['school'])
  }
});
