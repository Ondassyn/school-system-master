import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./btsSchoolResultsBonus.html";
import { Meteor } from "meteor/meteor";
import XLSX from "xlsx";
Template.btsSchoolResultsBonus.onCreated(function () {
  let template = this;
  template.grade = new ReactiveVar("7");
  document.title = "БТС Бонус Нәтижелері";
  template.schoolId_select = new ReactiveVar("");
  template.subscribe(
    "btsResultsForSelection",
    academicYear.get(),
    FlowRouter.getParam("btsNo")
  );
});
Template.btsSchoolResultsBonus.helpers({
  grade7() {
    return "7" == Template.instance().grade.get();
  },
  grade10() {
    return "10" == Template.instance().grade.get();
  },
  grade8() {
    return "8" == Template.instance().grade.get();
  },
  grade9() {
    return "9" == Template.instance().grade.get();
  },
  btsNo1_or_2_or_3() {
    return (
      "2" == FlowRouter.getParam("btsNo") ||
      "1" == FlowRouter.getParam("btsNo") ||
      "3" == FlowRouter.getParam("btsNo")
    );
  },
  btsNo() {
    return FlowRouter.getParam("btsNo");
  },
  results() {
    let grade = Template.instance().grade.get();
    return BtsResults.find({ grade }, { sort: { total: -1 } });
  },
});

Template.btsSchoolResultsBonus.events({
  "change #select"(event, template) {
    template.grade.set(template.find("[name=grade]").value);
  },

  "click #export"(event, template) {
    document.getElementById("out").innerHTML;
    var data = [];
    let btsNo = FlowRouter.getParam("btsNo");
    let grade = template.grade.get();

    var headers = [];
    var btsStore = BtsResults.find({ grade }, { sort: { total: -1 } }).fetch();
    // console.log(btsStore);

    if (btsStore.length != 0) {
      var curGrade = btsStore[0].grade;
      let okuJyly = academicYear.get();
      if (curGrade == "7") {
        headers = [
          "#",
          "Оқу жылы",
          "Оқушы ID",
          "Сынып",
          "Аты Жөні",
          "Жалпы",
          "Математика",
          "Қазақ тілі",
          "География",
        ];

        data.push(headers);
        for (var i = 0; i < btsStore.length; i++) {
          let idN = i + 1;
          let studentInfo = btsStore[i].surname + " " + btsStore[i].name.trim();
          let classN = btsStore[i].grade + " " + btsStore[i].division;
          let total = btsStore[i].totalBonus;
          let studentId = btsStore[i].studentId;
          let mathematic = btsStore[i].mathematicBonus;
          let kazakh_lang = btsStore[i].kazakh_langBonus;
          // let russian_lang = btsStore[i].russian_lang;
          let geography = btsStore[i].geographyBonus;

          let content = [
            idN,
            okuJyly,
            studentId,
            classN,
            studentInfo,
            total,
            mathematic,
            kazakh_lang,
            // russian_lang,
            geography,
          ];

          data.push(content);
        }
      } else if (curGrade == "8") {
        headers = [
          "#",
          "Оқу жылы",
          "Оқушы ID",
          "Сынып",
          "Аты Жөні",
          "Жалпы",
          "Математика",
          "Физика",
          "Биология",
        ];

        data.push(headers);
        for (var i = 0; i < btsStore.length; i++) {
          let idN = i + 1;
          let studentInfo = btsStore[i].surname + " " + btsStore[i].name.trim();
          let classN = btsStore[i].grade + " " + btsStore[i].division;
          let total = btsStore[i].totalBonus;
          let studentId = btsStore[i].studentId;
          let mathematic = btsStore[i].mathematicBonus;
          // let kazakh_lang = btsStore[i].kazakh_lang;
          // let turkish_lang = btsStore[i].turkish_lang;
          // let kazakh_history = btsStore[i].kazakh_history;
          // let geography = btsStore[i].geography;
          let physics = btsStore[i].physicsBonus;
          // let chemistry = btsStore[i].chemistry;
          let biology = btsStore[i].biologyBonus;

          let content = [
            idN,
            okuJyly,
            studentId,
            classN,
            studentInfo,
            total,
            mathematic,
            physics,
            biology,
          ];

          data.push(content);
        }
      } else if (curGrade == "9") {
        headers = [
          "#",
          "Оқу жылы",
          "Оқушы ID",
          "Сынып",
          "Аты Жөні",
          "Жалпы",
          "Математика",
          "Физика",
          "Химия",
        ];

        data.push(headers);
        for (var i = 0; i < btsStore.length; i++) {
          let idN = i + 1;
          let studentInfo = btsStore[i].surname + " " + btsStore[i].name.trim();
          let classN = btsStore[i].grade + " " + btsStore[i].division;
          let total = btsStore[i].totalBonus;
          let studentId = btsStore[i].studentId;
          let mathematic = btsStore[i].mathematicBonus;
          // let kazakh_lang = btsStore[i].kazakh_lang;
          // let turkish_lang = btsStore[i].turkish_lang;
          // let kazakh_history = btsStore[i].kazakh_history;
          // let geography = btsStore[i].geography;
          let physics = btsStore[i].physicsBonus;
          let chemistry = btsStore[i].chemistryBonus;
          // let biology = btsStore[i].biology;

          let content = [
            idN,
            okuJyly,
            studentId,
            classN,
            studentInfo,
            total,
            mathematic,
            physics,
            chemistry,
          ];

          data.push(content);
        }
      } else if (curGrade == "10") {
        headers = [
          "#",
          "Оқу жылы",
          "Оқушы ID",
          "Сынып",
          "Аты Жөні",
          "Жалпы",
          "Математика",
          "География",
          "Физика",
          "Химия",
          "Биология",
        ];

        data.push(headers);
        for (var i = 0; i < btsStore.length; i++) {
          let idN = i + 1;
          let studentInfo = btsStore[i].surname + " " + btsStore[i].name.trim();
          let classN = btsStore[i].grade + " " + btsStore[i].division;
          let total = btsStore[i].totalBonus;
          let studentId = btsStore[i].studentId;
          let mathematic = btsStore[i].mathematicBonus;
          // let kazakh_lang = btsStore[i].kazakh_lang;
          // let kazakh_history = btsStore[i].kazakh_history;

          let geography = btsStore[i].geographyBonus
            ? btsStore[i].geographyBonus
            : "-";
          let physics = btsStore[i].physicsBonus
            ? btsStore[i].physicsBonus
            : "-";

          let chemistry = btsStore[i].chemistryBonus
            ? btsStore[i].chemistryBonus
            : "-";
          let biology = btsStore[i].biologyBonus
            ? btsStore[i].biologyBonus
            : "-";

          let content = [
            idN,
            okuJyly,
            studentId,
            classN,
            studentInfo,
            total,
            mathematic,
            geography,
            physics,
            chemistry,
            biology,
          ];

          data.push(content);
        }
      }

      Meteor.call("download", data, (err, wb) => {
        if (err) throw err;
        let sName =
          "BTS-" + btsNo + " all bonus results grade:" + curGrade + " .xlsx";
        XLSX.writeFile(wb, sName);
      });
    } else {
      alert("Keep calm, there is no data to export");
    }
  },
});
