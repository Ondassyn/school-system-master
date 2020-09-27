import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var bts = FlowRouter.group({
    prefix: '/student/bts'
});

bts.route('/results/:btsNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'btsStudentResults',menu:'studentMenu'}))

        }
    },
    subscriptions: function(params,queryParams) {
    }
})

bts.route('/allResults/:btsNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'btsAllResults',menu:'studentMenu'}))

        }
    },
    subscriptions: function(params,queryParams) {
    }
})

bts.route('/top100/:btsNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'bts100Results',menu:'studentMenu'}))

        }
    },
    subscriptions: function(params,queryParams) {
    }
})

bts.route('/top10/:btsNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'bts10Results',menu:'studentMenu'}))

        }
    },
    subscriptions: function(params,queryParams) {
    }
})

bts.route('/objectives/results/:btsNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'btsStudentObjectivesResults',menu:'studentMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})
