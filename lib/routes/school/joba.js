import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var joba = FlowRouter.group({
    prefix: '/school/joba'
});

joba.route('/results/region', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'jobaRegionResults',menu:'schoolMenu'})
        }
    }
})

joba.route('/results/republic', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'jobaRepublicResults',menu:'schoolMenu'})
        }
    }
})

joba.route('/results/inter', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'jobaInterResults',menu:'schoolMenu'})
        }
    }
})

joba.route('/rating', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'jobaSchoolRating',menu:'schoolMenu'})
        }
    }
})