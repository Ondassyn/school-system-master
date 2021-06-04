import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./olympiadAllRepublicJuniorRating.html";

Template.olympiadAllRepublicJuniorRating.onCreated(function () {
  let template = this;
  Session.setDefault("Sort", { totalPointRepublicJunior: -1 });
  template.subject = new ReactiveVar("all");
  document.title = "Республикалық юниор олимпиада рейтинг";
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

Template.olympiadAllRepublicJuniorRating.helpers({
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
      natJunTotalOlymp: { $gt: 0 },
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
      { grade: "all", subjectId: subject, natJunTotalOlymp: { $gt: 0 } },
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
      totalOfMedals += rating.natJunTotalOlymp;
      totalGold += rating.natJunGoldOlymp;
      totalSilver += rating.natJunSilverOlymp;
      totalBronze += rating.natJunBronzeOlymp;
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
      totalGold += rating.natJunGoldOlymp;
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
      totalSilver += rating.natJunSilverOlymp;
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
      totalBronze += rating.natJunBronzeOlymp;
    });

    return totalBronze;
  },
  schoolNotUploaded() {
    return schoolArray2;
  },
});

Template.olympiadAllRepublicJuniorRating.events({
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
    Session.set("Sort", { natJunTotalOlymp: -1 });
  },
  "click #goldMedal"(event, template) {
    Session.set("Sort", { natJunGoldOlymp: -1 });
  },
  "click #silverMedal"(event, template) {
    Session.set("Sort", { natJunSilverOlymp: -1 });
  },
  "click #bronzeMedal"(event, template) {
    Session.set("Sort", { natJunBronzeOlymp: -1 });
  },
  "click #totalPointRepublicJunior"(event, template) {
    Session.set("Sort", { totalPointRepublicJunior: -1 });
  },
});
