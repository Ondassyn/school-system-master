import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var kbo = FlowRouter.group({
    prefix: '/student/kbo'
});

kbo.route('/results/:kboNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'kboStudentResults',menu:'studentMenu'})
        }
    }
})

kbo.route('/final',{
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'kboStudentFinalResults',menu:'studentMenu'})
        }
    }
})