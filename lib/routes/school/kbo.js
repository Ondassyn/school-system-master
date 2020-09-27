import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var kbo = FlowRouter.group({
    prefix: '/school/kbo'
});

kbo.route('/upload', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'kboUpload',menu:'schoolMenu'})
        }
    }
})

kbo.route('/rating/:kboNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'kboRating',menu:'schoolMenu'})
        }
    }
})

kbo.route('/results/:kboNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'kboResults',menu:'schoolMenu'})
        }
    }
})

kbo.route('/final',{
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'kboFinalResults',menu:'schoolMenu'})
        }
    }
})