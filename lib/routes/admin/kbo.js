import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var kbo = FlowRouter.group({
  prefix: '/admin/kbo'
});

kbo.route('/keys', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'kboKeys',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

kbo.route('/keys/edit/:id', {
    action: function(params,queryParams) {
    	if (!Meteor.userId()) {
	    FlowRouter.redirect('/signin')
	} else {
	    BlazeLayout.render('mainLayout', {content:'editKboKey',menu:'adminMenu'})
	   }
    },
    subscriptions: function(params,queryParams) {
    }
})

kbo.route('/rating/:kboNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'kboRating',menu:'adminMenu'})
        }
    }
})

kbo.route('/results/:kboNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'kboResults',menu:'adminMenu'})
        }
    }
})

kbo.route('/final',{
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'kboFinalResults',menu:'adminMenu'})
        }
    }
})
