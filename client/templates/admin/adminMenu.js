import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminMenu.html';
Template.adminMenu.onCreated(function() {
    let template = this

})

Template.adminMenu.helpers({
    isNotEdlight() {
        return !Roles.userIsInRole(Meteor.userId(),['edlight'])
    },
    isAdmin() {
        return Roles.userIsInRole(Meteor.userId(),['admin']) || Roles.userIsInRole(Meteor.userId(),['edlight'])
    },
});

Template.adminMenu.events({

})
