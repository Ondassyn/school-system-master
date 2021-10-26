import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

var calc = FlowRouter.group({
  prefix: "/teacher",
});

calc.route("/calculator", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "calculator_v2",
        menu: "teacherMenu",
      });
    }
  },
});
