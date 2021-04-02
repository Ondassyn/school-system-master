import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { Meteor } from "meteor/meteor";
import "./turkishA1AdminResults.html";
import XLSX from "xlsx";

Template.turkishA1AdminResults.onCreated(function () {
  let template = this;
  Session.setDefault("Sort", { total: -1 });
  document.title = "Түрік тілі A1 7 сынып нәтижелері";
  template.state = new ReactiveVar("results");
  template.school = new ReactiveVar("all");
  template.subscribe("schools");
  template.autorun(() => {
    template.subscribe(
      "turkishA1AdminResults",
      academicYear.get(),
      template.school.get()
    );
  });
});

Template.turkishA1AdminResults.helpers({
  schools() {
    return Schools.find({}, { sort: { shortName: 1 } });
  },
  results() {
    let results = TurkishA1Results.find(
      {},
      { sort: Session.get("Sort") }
    ).fetch();
    results.map((result) => {
      result["school"] = Schools.findOne({
        schoolId: result.schoolId,
      }).shortName;
    });
    return results;
  },
});

var sortTotal = -1;
var sortListening = -1;
var sortReading = -1;
var sortWriting = -1;
var sortSpeaking = -1;

Template.turkishA1AdminResults.events({
  "change #school"(event, template) {
    template.school.set(event.target.value);
  },
  "click #export"(event, template) {
    const html = document.getElementById("out").innerHTML;
    var resultStore = TurkishA1Results.find(
      {},
      { sort: Session.get("Sort") }
    ).fetch();
    var data = [];
    let okuJyly = academicYear.get();
    headers = [
      "Оқушы ID",
      "Сынып",
      "Аты Жөні",
      "Жалпы",
      "Dinleme",
      "Okuma",
      "Yazma",
      "Konusma",
    ];
    data.push(headers);
    for (var i = 0; i < resultStore.length; i++) {
      let studentInfo =
        resultStore[i].surname + " " + resultStore[i].name.trim();
      let classN = resultStore[i].grade + " " + resultStore[i].division;
      let studentId = resultStore[i].studentId;
      let total = resultStore[i].total;
      let listening = resultStore[i].listening
        ? resultStore[i].listening
        : resultStore[i].listening_preliminary;
      let reading = resultStore[i].reading
        ? resultStore[i].reading
        : resultStore[i].reading_preliminary;
      let writing = resultStore[i].writing;
      let speaking = resultStore[i].speaking;
      let content = [
        studentId,
        classN,
        studentInfo,
        total,
        listening,
        reading,
        writing,
        speaking,
      ];
      data.push(content);
    }
    Meteor.call("download", data, (err, wb) => {
      if (err) throw err;
      let sName = "Turkish A1 results grade " + okuJyly + ".xlsx";
      XLSX.writeFile(wb, sName);
    });
  },

  "click #total"(event, template) {
    sortTotal *= -1;
    Session.set("Sort", { total: sortTotal });
  },
  "click #reading"(event, template) {
    sortReading *= -1;
    Session.set("Sort", { reading: sortReading });
  },
  "click #writing"(event, template) {
    sortWriting *= -1;
    Session.set("Sort", { writing: sortWriting });
  },
  "click #listening"(event, template) {
    sortListening *= -1;
    Session.set("Sort", { listening: sortListening });
  },
  "click #speaking"(event, template) {
    sortSpeaking *= -1;
    Session.set("Sort", { speaking: sortSpeaking });
  },
});
