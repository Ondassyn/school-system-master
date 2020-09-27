import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var tat = FlowRouter.group({
  prefix: '/admin/tat'
});

tat.route('/keys', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'tatKeys',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

tat.route('/keys/edit/:id', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'editTatKey',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

tat.route('/results/:tatNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'tatAllResults',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

tat.route('/rating/:tatNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'tatRating',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {
        //this.register('companyDetails', Meteor.subscribe('companyDetails',params.companyId));
    }
})

tat.route('/final',{
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'tatFinalResults',menu: 'adminMenu'})
        }
    }
})
