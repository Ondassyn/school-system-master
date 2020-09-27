import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var students = FlowRouter.group({
    prefix: '/admin/students'
});

students.route('/all/:grade', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'allStudents',menu: 'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {
    }
})

students.route('/transfer', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'allStudentTransferList',menu: 'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {
    }
})
