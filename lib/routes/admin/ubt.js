import { Meteor } from "meteor/meteor";

var ubt = FlowRouter.group({
  prefix: "/admin/ubt",
});

ubt.route("/rating", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "ubtRating",
        menu: "adminMenu",
      });
    }
  },
});

ubt.route("/results", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "adminUbtResults",
        menu: "adminMenu",
      });
    }
  },
});

ubt.route("/officialResults", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "adminUbtOfficialResults",
        menu: "adminMenu",
      });
    }
  },
});
