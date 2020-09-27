import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var bts = FlowRouter.group({
    prefix: '/school/bts'
});

bts.route('/upload', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'btsUpload',menu:'schoolMenu'})
        }
    }
})

bts.route('/rating/:btsNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'btsRating',menu:'schoolMenu'}))

        }
    },
    subscriptions: function(params,queryParams) {
    }
})

bts.route('/ratingByQuaility/:btsNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'btsRatingByQuaility',menu:'schoolMenu'}))

        }
    },
    subscriptions: function(params,queryParams) {
    }
})

bts.route('/ratingByCount/:btsNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'btsRatingByCount',menu:'schoolMenu'}))

        }
    },
    subscriptions: function(params,queryParams) {
    }
})

bts.route('/ratingByCategory/:btsNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'btsRatingByCategory',menu:'schoolMenu'}))

        }
    },
    subscriptions: function(params,queryParams) {
    }
})

bts.route('/results/:btsNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            setTimeout(BlazeLayout.render('mainLayout', {content:'btsResults',menu:'schoolMenu'}))

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
            setTimeout(BlazeLayout.render('mainLayout', {content:'btsAllResults',menu:'schoolMenu'}))

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
            setTimeout(BlazeLayout.render('mainLayout', {content:'bts100Results',menu:'schoolMenu'}))

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
            setTimeout(BlazeLayout.render('mainLayout', {content:'bts10Results',menu:'schoolMenu'}))

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
            BlazeLayout.render('mainLayout', {content:'btsObjectivesResults',menu:'schoolMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

bts.route('/objectives/rating/:btsNo', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'btsObjectivesRating',menu:'schoolMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})
