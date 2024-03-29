import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

var bts = FlowRouter.group({
  prefix: "/school/bts",
});

bts.route("/upload", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsUpload_2021_2022",
        menu: "schoolMenu",
      });
    }
  },
});

bts.route("/rating/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "btsRating_2021_2022",
          menu: "schoolMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/rating/bonus/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "btsRatingBonus",
          menu: "schoolMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/ratingByCategory/bonus/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "btsRatingByCategoryBonus",
          menu: "schoolMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/results/bonus/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "btsSchoolResultsBonus",
          menu: "schoolMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/results/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "btsResults_2021_2022",
          menu: "schoolMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/ratingByQuaility/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "btsRatingByQuaility_2021_2022",
          menu: "schoolMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/ratingByCount/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "btsRatingByCount_2021_2022",
          menu: "schoolMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/ratingByCategory/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "btsRatingByCategory_2021_2022",
          menu: "schoolMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/allResults/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "btsAllResults_2021_2022",
          menu: "schoolMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/top100/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "bts100Results",
          menu: "schoolMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/top10/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "bts10Results",
          menu: "schoolMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/objectives/results/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsObjectivesResults",
        menu: "schoolMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/objectives/rating/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsObjectivesRating",
        menu: "schoolMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

// selected
bts.route("/selected/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsSelected",
        menu: "schoolMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

// selected
bts.route("/selectedExtra/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsSelectedExtra",
        menu: "schoolMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});
