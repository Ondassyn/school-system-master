import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./adminMainPage.html";
Template.adminMainPage.onCreated(function () {
  let template = this;
  template.month_select_general = new ReactiveVar("annual");

  document.title = "Басты бет";
  template.subscribe("subjects");
  template.subscribe("schools");
  template.subscribe("examinationActivityLog");
  template.autorun(() => {
    template.subscribe("allSchoolPerformaRatings", academicYear.get());
  });
});

Template.adminMainPage.helpers({
  allSchoolResults() {
    let month_select_general = new RegExp(
      Template.instance().month_select_general.get()
    );

    return SchoolPerformaRatings.find(
      { month: month_select_general },
      { sort: { total_points: -1 } }
    );
  },
  subjects() {
    return Subjects.find({}, { sort: { subjectId: 1 } });
  },
  schools() {
    return Schools.find({}, { sort: { schoolId: 1 } });
  },
  isEdlight() {
    return Roles.userIsInRole(Meteor.userId(), ["edlight"]);
  },
  examActivityLogs() {
    let logs = ExaminationActivityLog.find()
      .sort({ $natural: -1 })
      .limit(20)
      .fetch();

    let returnList = [];
    logs.map((log) => {
      let returnString = "";

      if (log.userRole) {
        if (log.userRole === "admin") {
          returnString += "Админ ";
        }
        if (log.userRole === "school") {
          returnString += "Мектеп ";
        }
      }

      let school = Schools.findOne({ schoolId: log.schoolId });
      if (school) returnObject;
    });
  },
});

Template.adminMainPage.events({
  "change #select"(event, template) {
    template.month_select_general.set(
      template.find("[name=month_select_general]").value
    );

    let month_select_general = FlowRouter.getParam("id");
  },
  "click #calculateSchoolRating"(event, template) {
    Meteor.call("calculateSchoolRating", (err, res) => {
      if (err) {
        alert(err.reason);
      } else {
        alert("calculation done!");
      }
    });
  },
});
