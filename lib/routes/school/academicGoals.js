import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

var academicGoals = FlowRouter.group({
  prefix: "/school/academicGoals",
});

academicGoals.route("/", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "academicGoals",
          menu: "schoolMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});
