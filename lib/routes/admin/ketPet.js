import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

var ketPet = FlowRouter.group({
  prefix: "/admin/ketPet",
});

ketPet.route("/rating", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "ketPetRatings",
        menu: "adminMenu",
      });
    }
  },
});

ketPet.route("/results", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "adminKetPetResults",
        menu: "adminMenu",
      });
    }
  },
});

ketPet.route("/top10", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "ketPet10Results",
        menu: "adminMenu",
      });
    }
  },
});

ketPet.route("/ratingByLevel", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "adminKetPetRatingByLevel",
        menu: "adminMenu",
      });
    }
  },
});

ketPet.route("/compare", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "ketPetCompare",
        menu: "adminMenu",
      });
    }
  },
});

//
// turkish.route('/keys', {
//     action: function(params,queryParams) {
//         if (!Meteor.userId()) {
//             FlowRouter.redirect('/signin')
//         } else {
//             BlazeLayout.render('mainLayout', {content:'turkishKeys',menu:'adminMenu'})
//         }
//     },
//     subscriptions: function(params,queryParams) {
//
//     }
// })
//
// turkish.route('/keys/new', {
//     action: function(params,queryParams) {
//         if (!Meteor.userId()) {
//             FlowRouter.redirect('/signin')
//         } else {
//             BlazeLayout.render('mainLayout', {content:'turkishKeysNew',menu:'adminMenu'})
//         }
//     },
//     subscriptions: function(params,queryParams) {
//
//     }
// })
//
// turkish.route('/keys/edit/:id', {
//     action: function(params,queryParams) {
//     	if (!Meteor.userId()) {
// 	    FlowRouter.redirect('/signin')
// 	} else {
// 	    BlazeLayout.render('mainLayout', {content:'editTurkishKeys',menu:'adminMenu'})
// 	   }
//     },
//     subscriptions: function(params,queryParams) {
//     }
// })
