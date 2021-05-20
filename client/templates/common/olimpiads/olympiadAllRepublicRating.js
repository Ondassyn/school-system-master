import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./olympiadAllRepublicRating.html";

Template.olympiadAllRepublicRating.onCreated(function () {
  let template = this;
  Session.setDefault("Sort", { totalPointRepublic: -1 });
  template.subject = new ReactiveVar("all");
  document.title = "Республикалық олимпиада рейтинг";
  template.subscribe("schools");
  template.subscribe("subjects");
  // template.subscribe('olympiads')
  template.autorun(() => {
    template.subscribe("olympiadRatings", academicYear.get());
  });
});

var schoolArray2 = [];
var totalOfMedals = 0;
var totalGold = 0;
var totalSilver = 0;
var totalBronze = 0;

Template.olympiadAllRepublicRating.helpers({
  schools() {
    return Schools.find({}, { sort: { schoolId: 1 } });
  },

  subjects() {
    return Subjects.find({}, { sort: { subjectId: 1 } });
  },
  olympiads() {
    return Olympiads.find();
  },
  results() {
    var schoolStore = new Map();
    var schoolArray = [];

    let schools = Schools.find().fetch();
    let cursorKboRatings = OlympiadRatings.find({
      grade: "all",
      subjectId: "all",
      natTotalOlymp: { $gt: 0 },
    }).fetch();

    schools.forEach((school) => {
      schoolStore.set(school.schoolId, school.shortName);
    });
    for (var i = 0; i < cursorKboRatings.length; i++) {
      schoolStore.delete(cursorKboRatings[i].schoolId);
    }

    for (const [key, value] of schoolStore.entries()) {
      schoolArray.push(value);
    }

    schoolArray2 = schoolArray;

    let subject = new RegExp(Template.instance().subject.get());

    return OlympiadRatings.find(
      { grade: "all", subjectId: subject, natTotalOlymp: { $gt: 0 } },
      { sort: Session.get("Sort") }
    );
  },

  totalOfMedals() {
    totalOfMedals = 0;
    totalGold = 0;
    totalSilver = 0;
    totalBronze = 0;

    let subject = new RegExp(Template.instance().subject.get());
    var olympiadRatings = OlympiadRatings.find(
      { grade: "all", subjectId: subject },
      { sort: Session.get("Sort") }
    ).fetch();

    olympiadRatings.forEach((rating) => {
      totalOfMedals += rating.natTotalOlymp;
      totalGold += rating.natGoldOlymp;
      totalSilver += rating.natSilverOlymp;
      totalBronze += rating.natBronzeOlymp;
    });

    return totalOfMedals;
  },
  totalGold() {
    totalGold = 0;

    let subject = new RegExp(Template.instance().subject.get());
    var olympiadRatings = OlympiadRatings.find(
      { grade: "all", subjectId: subject },
      { sort: Session.get("Sort") }
    ).fetch();

    olympiadRatings.forEach((rating) => {
      totalGold += rating.natGoldOlymp;
    });
    return totalGold;
  },
  totalSilver() {
    totalSilver = 0;

    let subject = new RegExp(Template.instance().subject.get());
    var olympiadRatings = OlympiadRatings.find(
      { grade: "all", subjectId: subject },
      { sort: Session.get("Sort") }
    ).fetch();

    olympiadRatings.forEach((rating) => {
      totalSilver += rating.natSilverOlymp;
    });
    return totalSilver;
  },
  totalBronze() {
    totalBronze = 0;

    let subject = new RegExp(Template.instance().subject.get());
    var olympiadRatings = OlympiadRatings.find(
      { grade: "all", subjectId: subject },
      { sort: Session.get("Sort") }
    ).fetch();

    olympiadRatings.forEach((rating) => {
      totalBronze += rating.natBronzeOlymp;
    });

    return totalBronze;
  },
  schoolNotUploaded() {
    return schoolArray2;
  },
});

Template.olympiadAllRepublicRating.events({
  "change #select"(event, template) {
    template.subject.set(event.target.value);
  },
  "click .collapsible"(event, template) {
    event.preventDefault();
    var content = template.find("[name = divContent]");
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  },
  "click #totalMedal"(event, template) {
    Session.set("Sort", { natTotalOlymp: -1 });
  },
  "click #goldMedal"(event, template) {
    Session.set("Sort", { natGoldOlymp: -1 });
  },
  "click #silverMedal"(event, template) {
    Session.set("Sort", { natSilverOlymp: -1 });
  },
  "click #bronzeMedal"(event, template) {
    Session.set("Sort", { natBronzeOlymp: -1 });
  },
  "click #totalPointRepublic"(event, template) {
    Session.set("Sort", { totalPointRepublic: -1 });
  },
});
