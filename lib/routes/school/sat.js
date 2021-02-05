import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var bts = FlowRouter.group({
    prefix: '/school/satIelts'
});

bts.route('/results', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'satResults',menu:'schoolMenu'}))
        }
    },
    subscriptions: function(params,queryParams) {
    }
})