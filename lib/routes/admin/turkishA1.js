import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

var turkishA1 = FlowRouter.group({
  prefix: "/admin/turkishA1",
});

turkishA1.route("/keys", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA1Keys",
        menu: "adminMenu",
      });
    }
  },
});

turkishA1.route("/keys/new", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA1KeysNew",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

turkishA1.route("/keys/edit/:id", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA1KeysEdit",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

turkishA1.route("/results", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA1Results",
        menu: "adminMenu",
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
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});
