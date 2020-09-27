import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './mainPage.html';

Template.mainPage.helpers({
    isAdmin: function() {
        return Roles.userIsInRole(Meteor.userId(),['admin'])
    },
    isEdlight: function() {
        return Roles.userIsInRole(Meteor.userId(),['edlight'])
    },
    isSchool: function() {
        return Roles.userIsInRole(Meteor.userId(),['school'])
    },
    isTjo: function() {
        return Roles.userIsInRole(Meteor.userId(),['tjo'])
    },
    isSchoolCoordinator: function() {
        return Roles.userIsInRole(Meteor.userId(),['schoolCoordinator'])
    },
    isGuestSchool: function() {
        return Roles.userIsInRole(Meteor.userId(),['guestSchool'])
    }
});
