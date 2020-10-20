import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var settings = FlowRouter.group({
  prefix: '/teacher'
});

settings.route('/settings', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'teacherSettings',menu:'teacherMenu'})
        }
    }
})
