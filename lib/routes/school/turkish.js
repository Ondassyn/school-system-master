import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var ope = FlowRouter.group({
    prefix: '/school/ope'
});

ope.route('/results', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'opeResults',menu:'schoolMenu'})
        }
    }
})

ope.route('/reportRatings', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'opeReportRatings',menu:'schoolMenu'})
        }
    }
})

ope.route('/reportUpload', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'opeReportUpload',menu:'schoolMenu'})
        }
    }
})

ope.route('/reportResults', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'opeReportResults',menu:'schoolMenu'})
        }
    }
})
