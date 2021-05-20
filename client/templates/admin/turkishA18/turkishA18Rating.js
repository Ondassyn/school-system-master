import { Template } from "meteor/templating";
import { Session } from "meteor/session";
import "./turkishA18Rating.html";
import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import XLSX from "xlsx";

Template.turkishA18Rating.onCreated(function () {
  let template = this;
  Session.setDefault("Sort", { totalAverage: -1 });
  document.title = "Түрік тілі A1 8 сынып рейтинг";
  template.subscribe("schools");
  template.no = new ReactiveVar("");
  template.autorun(() => {
    template.subscribe(
      "turkishA18Ratings",
      academicYear.get(),
      template.no.get()
    );
  });
});

Template.turkishA18Rating.helpers({
  results() {
    let results = TurkishA18Ratings.find(
      {},
      { sort: Session.get("Sort") }
    ).fetch();
    let unregisteredSchools = Schools.find({}).fetch();
    results.map((result) => {
      result["school"] = Schools.findOne({
        schoolId: result.schoolId,
      }).shortName;
      unregisteredSchools = unregisteredSchools.filter(
        (school) => school.schoolId !== result.schoolId
      );
    });
    Session.set("unregisteredSchools", unregisteredSchools);
    return results;
  },
  unregisteredSchools() {
    return Session.get("unregisteredSchools");
  },
});

var sortTotalNumber = -1;
var sortTotalAverage = -1;
var sortListeningAverage = -1;
var sortReadingAverage = -1;

var sortWritingAverage = -1;
var sortSpeakingAverage = -1;

Template.turkishA18Rating.events({
  "change #no"(event, template) {
    template.no.set(event.target.value);
  },
  "click #export"(event, template) {
    document.getElementById("out").innerHTML;
    var data = [];

    var headers = [
      "Мектеп аты",
      "Қатысушылар саны",
      "Жалпы",
      "Dinleme",
      "Okuma",
      "Yazma",
      "Konusma",
    ];

    data.push(headers);
    var ratings = TurkishA18Ratings.find(
      {},
      { sort: Session.get("Sort") }
    ).fetch();

    let dataRow = [];
    ratings.map((rating) => {
      let school = Schools.findOne({ schoolId: rating.schoolId });
      dataRow.push(school ? school.shortName : "");
      dataRow.push(rating.totalNumber ? rating.totalNumber : "");
      dataRow.push(rating.totalAverage ? rating.totalAverage : "");
      dataRow.push(rating.listeningAverage ? rating.listeningAverage : "");
      dataRow.push(rating.readingAverage ? rating.readingAverage : "");
      dataRow.push(rating.writingAverage ? rating.writingAverage : "");
      dataRow.push(rating.speakingAverage ? rating.speakingAverage : "");
    });
    data.push(dataRow);

    if (data.length == 1) {
      alert("Keep calm, there is no data to export");
    } else {
      Meteor.call("download", data, (err, wb) => {
        if (err) throw err;

        let sName = "Turkish A1 rating.xlsx";
        XLSX.writeFile(wb, sName);
      });
    }
  },

  "click #sortTotalNumber"(event, template) {
    sortTotalNumber *= -1;
    Session.set("Sort", { totalNumber: sortTotalNumber });
  },
  "click #sortTotalAverage"(event, template) {
    sortTotalAverage *= -1;
    Session.set("Sort", { totalAverage: sortTotalAverage });
  },
  "click #sortListeningAverage"(event, template) {
    sortListeningAverage *= -1;
    Session.set("Sort", { listeningAverage: sortListeningAverage });
  },
  "click #sortReadingAverage"(event, template) {
    sortReadingAverage *= -1;
    Session.set("Sort", { readingAverage: sortReadingAverage });
  },
  "click #sortWritingAverage"(event, template) {
    sortWritingAverage *= -1;
    Session.set("Sort", { writingAverage: sortWritingAverage });
  },
  "click #sortSpeakingAverage"(event, template) {
    sortSpeakingAverage *= -1;
    Session.set("Sort", { speakingAverage: sortSpeakingAverage });
  },
});
