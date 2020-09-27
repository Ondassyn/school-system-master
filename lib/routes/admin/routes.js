import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

let admin = FlowRouter.group({
  prefix: '/admin'
});

admin.route( '/', {
  action: function() {
      if (! Meteor.userId()) {
          FlowRouter.redirect('/signin')
      } else {
          BlazeLayout.render('mainPage')
      }
  }
});

admin.route('/ope/results', {
  action: function(params,queryParams) {
      if (! Meteor.userId()) {
          FlowRouter.redirect('/signin')
      } else {
          BlazeLayout.render('mainLayout', {content:'adminOpeResults',menu:'adminMenu'})
      }
  },
  subscriptions: function(params,queryParams) {

    }
})

admin.route('/ope/reportResults', {
  action: function(params,queryParams) {
      if (! Meteor.userId()) {
          FlowRouter.redirect('/signin')
      } else {
          BlazeLayout.render('mainLayout', {content:'adminOpeReportResults',menu:'adminMenu'})
      }
  },
  subscriptions: function(params,queryParams) {

    }
})

admin.route('/ope/reportRatings', {
  action: function(params,queryParams) {
      if (! Meteor.userId()) {
          FlowRouter.redirect('/signin')
      } else {
          BlazeLayout.render('mainLayout', {content:'opeReportRatings',menu:'adminMenu'})
      }
  },
  subscriptions: function(params,queryParams) {

    }
})


admin.route('/lessonObjectives', {
  action: function(params,queryParams) {
      if (! Meteor.userId()) {
          FlowRouter.redirect('/signin')
      } else {
          BlazeLayout.render('mainLayout', {content:'lessonObjectives',menu:'adminMenu'})
      }
  },
  subscriptions: function(params,queryParams) {

    }
})

admin.route('/lessonObjectives/edit/:_id', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'lessonObjectivesEdit',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/lessonObjectives/new', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'lessonObjectivesNew',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/olympiadsRegion', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'olympiadAllRegionResults',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/olympiadsRegionRating', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'olympiadAllRegionRating',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/olympiadsRegionJunior', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'olympiadAllRegionJuniorResults',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/jobaRegion', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'jobaAllRegionResults',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/olympiadsRepublic', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'olympiadAllRepublicResults',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/olympiadsRepublicJunior', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'olympiadAllRepublicJuniorResults',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/jobaRepublic', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'jobaAllRepublicResults',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/olympiadsInter', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'olympiadAllInterResults',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/jobaInter', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'jobaAllInterResults',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/olympiadsRating', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'olympiadsRating',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/olympiadsRatingInter', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'olympiadsRatingInter',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/jobaRating', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'jobaRating',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/schoolRating/:schoolId', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'schoolRating',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

admin.route('/ubt/rating', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'ubtRating',menu:'adminMenu'})
        }
    }
})

admin.route('/ubt/results', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'adminUbtResults',menu:'adminMenu'})
        }
    }
})
