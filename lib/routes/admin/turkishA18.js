import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

var turkishA18 = FlowRouter.group({
  prefix: "/admin/turkishA18",
});

turkishA18.route("/keys", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA18Keys",
        menu: "adminMenu",
      });
    }
  },
});

turkishA18.route("/keys/new", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA18KeysNew",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

turkishA18.route("/keys/edit/:id", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA18KeysEdit",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

turkishA18.route("/results", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "turkishA18AdminResults",
        menu: "adminMenu",
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
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});
