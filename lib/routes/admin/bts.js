import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

var bts = FlowRouter.group({
  prefix: "/admin/bts",
});

bts.route("/keys", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsKeys",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/levels", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsLevels",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/keys/edit/:id", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsKeysEdit_2021_2022",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/levels/edit/:id", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsLevelsEdit_2021_2022",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/keys/new", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      //BlazeLayout.render('mainLayout', {content:'btsKeysNewTemp',menu:'adminMenu'})
      BlazeLayout.render("mainLayout", {
        content: "btsKeysNew_2021_2022",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/levels/new", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsLevelsNew_2021_2022",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/ratingByCategory/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsRatingByCategory_2021_2022",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/rating/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "btsRating_2021_2022",
          menu: "adminMenu",
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
          menu: "adminMenu",
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
      BlazeLayout.render("mainLayout", {
        content: "btsRatingByCategoryBonus",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/allResults/bonus/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "btsAllResultsBonus",
          menu: "adminMenu",
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
          menu: "adminMenu",
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
          menu: "adminMenu",
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
          menu: "adminMenu",
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
          menu: "adminMenu",
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
          menu: "adminMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

// objectives
bts.route("/objectives/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      setTimeout(
        BlazeLayout.render("mainLayout", {
          content: "btsObjectivesList",
          menu: "adminMenu",
        })
      );
    }
  },
  subscriptions: function (params, queryParams) {},
});

// selector
bts.route("/selector/:btsNo", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsSelector",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/objectives/edit/:_id", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsObjectivesEdit",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/objectives/addNew/new", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsObjectivesNew",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/objectives/results/:btsNo/:grade", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsObjectivesAllResults",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/objectives/rating/:btsNo/:grade", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "btsObjectivesGeneralRating",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});

bts.route("/adminUpload", {
  action: function (params, queryParams) {
    if (!Meteor.userId()) {
      FlowRouter.redirect("/signin");
    } else {
      BlazeLayout.render("mainLayout", {
        content: "adminBtsUpload",
        menu: "adminMenu",
      });
    }
  },
  subscriptions: function (params, queryParams) {},
});
