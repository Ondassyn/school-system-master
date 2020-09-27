import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var teachers = FlowRouter.group({
  prefix: '/school'
});

teachers.route('/teachers', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'schoolTeachers',menu:'schoolMenu'})
        }
    }
})

teachers.route('/teacher/edit/:_id', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'teacherDetail',menu:'schoolMenu'})
        }
    }
})

teachers.route('/teacher/add', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'newTeacher',menu:'schoolMenu'})
        }
    }
})

teachers.route('/teachers/transfer', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'teacherTransferList',menu:'schoolMenu'})
        }
    }
})

teachers.route('/teachers/teachersRating', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'teachersRating',menu:'schoolMenu'})
        }
    }
})

teachers.route('/teachers/classTeacherRating', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'classTeacherRating',menu:'schoolMenu'})
        }
    }
})

