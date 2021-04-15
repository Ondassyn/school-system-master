import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

var sat = FlowRouter.group({
  prefix: "/admin/satIelts",
});

sat.route("/results", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "adminSatResults",
          menu: "adminMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

sat.route("/rating", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "adminSatRating",
          menu: "adminMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});
