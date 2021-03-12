import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

var turkishA1 = FlowRouter.group({
  prefix: "/school/turkishA1",
});

turkishA1.route("/results", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA1Results",
        menu: "schoolMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

turkishA1.route("/rating", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA1Rating",
        menu: "schoolMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

turkishA1.route("/upload", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA1Upload",
        menu: "schoolMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});
