import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

var turkishA18 = FlowRouter.group({
  prefix: "/school/turkishA18",
});

turkishA18.route("/results", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA18Results",
        menu: "schoolMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

turkishA18.route("/rating", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA18Rating",
        menu: "schoolMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

turkishA18.route("/upload", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA18Upload",
        menu: "schoolMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});
