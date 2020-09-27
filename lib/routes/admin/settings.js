import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var settings = FlowRouter.group({
  prefix: '/admin'
});

settings.route('/settings', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'adminSettings',menu:'adminMenu'})
        }
    }
})

settings.route('/tjoSettings', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'adminTardieSettings',menu:'adminMenu'})
        }
    }
})

settings.route('/guestSettings', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'gSchoolSettings',menu:'adminMenu'})
        }
    }
})
