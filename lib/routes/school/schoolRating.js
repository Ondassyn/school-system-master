import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var schoolRating = FlowRouter.group({
  prefix: '/school'
});

schoolRating.route('/rating/general', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'generalRating',menu:'schoolMenu'})
        }
    }
})

schoolRating.route('/ubt', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'ubtAssessments',menu:'schoolMenu'})
        }
    }
})

schoolRating.route('/meeting', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'meetingAssessments',menu:'schoolMenu'})
        }
    }
})

schoolRating.route('/seminar', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'seminarAssessments',menu:'schoolMenu'})
        }
    }
})

schoolRating.route('/indoorEvent', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'indoorEventAssessments',menu:'schoolMenu'})
        }
    }
})

schoolRating.route('/pbl', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'pblAssessments',menu:'schoolMenu'})
        }
    }
})

schoolRating.route('/olympiadAssessment', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'olympiadAssessments',menu:'schoolMenu'})
        }
    }
})

schoolRating.route('/subject_week', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'subject_weekAssessments',menu:'schoolMenu'})
        }
    }
})

schoolRating.route('/outdoor_event', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'outdoor_eventAssessments',menu:'schoolMenu'})
        }
    }
})

schoolRating.route('/admin_participate', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'admin_participateAssessments',menu:'schoolMenu'})
        }
    }
})
