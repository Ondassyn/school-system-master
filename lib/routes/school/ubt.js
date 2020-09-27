import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var ubt = FlowRouter.group({
    prefix: '/school/ubt'
});

ubt.route('/upload', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'ubtUpload',menu:'schoolMenu'})
        }
    }
})

ubt.route('/results', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'ubtResults',menu:'schoolMenu'})
        }
    }
})

ubt.route('/rating', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'ubtRating',menu:'schoolMenu'})
        }
    }
})
