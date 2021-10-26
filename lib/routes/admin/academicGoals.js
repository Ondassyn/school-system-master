import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

var academicGoals = FlowRouter.group({
  prefix: "/admin/academicGoals",
});

academicGoals.route("/", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "adminAcademicGoals",
          menu: "adminMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});
