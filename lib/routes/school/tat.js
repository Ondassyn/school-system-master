import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var tat = FlowRouter.group({
    prefix: '/school/tat'
});

tat.route('/upload', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'tatUpload',menu:'schoolMenu'})
        }
    }
})

tat.route('/rating/:tatNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'tatRating',menu:'schoolMenu'})
        }
    },
    subscriptions: function(params,queryParams) {
    }
})

tat.route('/results/:tatNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'tatResults',menu:'schoolMenu'})
        }
    }
})

tat.route('/top10/:tatNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'tatTop10Results',menu:'schoolMenu'})
        }
    }
})