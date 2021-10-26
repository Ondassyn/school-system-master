import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./adminUbtOfficialResults.html";
import XLSX from "xlsx";

Template.adminUbtOfficialResults.onCreated(function () {
  let template = this;
  document.title = "ҰБТ ресми нәтижелері";
  template.schoolId = new ReactiveVar("all");
  template.showCertified = new ReactiveVar(false);
  template.order = new ReactiveVar([]);
  template.period = new ReactiveVar("january");

  template.subscribe("schools");

  template.autorun(() => {
    template.subscribe("schoolUbtStudents", template.schoolId.get());
    template.subscribe(
      "adminUbtOfficialResults",
      academicYear.get(),
      template.schoolId.get(),
      template.period.get()
    );

    template.subscribe(
      "adminUbtOfficialRatings",
      academicYear.get(),
      template.period.get()
    );
  });
});

Template.adminUbtOfficialResults.helpers({
  // schools() {
  //   return Schools.find({}, { sort: { shortName: 1 } }).fetch();
  // },
  isActiveSchool(schoolId) {
    return Template.instance().schoolId.get() === schoolId;
  },
  schoolRatingsBefore() {
    let schoolId = Template.instance().schoolId.get();
    let ratings = UbtOfficialRatings.find({}).fetch();
    let results = [];
    for (let i = 0; i < ratings.length; i++) {
      ratings[i].name = Schools.findOne({
        schoolId: ratings[i].schoolId,
      }).shortName;
      results.push(ratings[i]);
      if (ratings[i].schoolId === schoolId) break;
    }
    return results;
  },
  schoolRatingsAfter() {
    let schoolId = Template.instance().schoolId.get();
    let ratings = UbtOfficialRatings.find({}).fetch();
    let results = [];
    let writeFlag = false;
    for (let i = 0; i < ratings.length; i++) {
      if (writeFlag) {
        ratings[i].name = Schools.findOne({
          schoolId: ratings[i].schoolId,
        }).shortName;
        results.push(ratings[i]);
      }
      if (ratings[i].schoolId === schoolId) writeFlag = true;
    }
    return results;
  },
  results() {
    let returnList = [];

    let students = Students.find(
      {},
      { sort: { division: 1, surname: 1 } }
    ).fetch();

    let showCertified = Template.instance().showCertified.get();

    let order = Template.instance().order.get();
    if (order.length !== 0) {
      let ordered = _.sortBy(students, function (o) {
        let index = _.indexOf(order, o.studentId);
        if (index !== -1) return index;
      });
      students = ordered;
    }

    students.map((student) => {
      let isCertified = false;
      let returnObject = {
        studentId: student.studentId,
        grade: student.grade,
        division: student.division,
        surname: student.surname,
        name: student.name,
      };

      let ubtResult = UbtOfficialResults.findOne({
        academicYear: academicYear.get(),
        studentId: student.studentId,
      });
      if (ubtResult) {
        isCertified = true;
        returnObject["total"] = ubtResult.total;
        returnObject["math_literacy"] = ubtResult.math_literacy;
        returnObject["reading_literacy"] = ubtResult.reading_literacy;
        returnObject["kazakh_history"] = ubtResult.kazakh_history;
        returnObject["algebra"] = ubtResult.algebra;
        returnObject["physics"] = ubtResult.physics;
        returnObject["chemistry"] = ubtResult.chemistry;
        returnObject["biology"] = ubtResult.biology;
        returnObject["geography"] = ubtResult.geography;
        returnObject["foreign_language"] = ubtResult.foreign_language;
        returnObject["world_history"] = ubtResult.world_history;
        returnObject["community_rights"] = ubtResult.community_rights;
        returnObject["kazakh_russian_language"] =
          ubtResult.kazakh_russian_language;
        returnObject["kazakh_russian_literature"] =
          ubtResult.kazakh_russian_literature;
      }

      if (showCertified) {
        if (isCertified) returnList.push(returnObject);
      } else {
        returnList.push(returnObject);
      }
    });

    return returnList;
  },
  editing() {
    return Session.equals("editItemId", this.studentId);
  },
});

var saveItem = function (template) {
  var editItem = {
    total: $("#edit_total").val(),
    math_literacy: $("#edit_math_literacy").val(),
    reading_literacy: $("#edit_reading_literacy").val(),
    kazakh_history: $("#edit_kazakh_history").val(),
    algebra: $("#edit_algebra").val(),
    physics: $("#edit_physics").val(),
    chemistry: $("#edit_chemistry").val(),
    biology: $("#edit_biology").val(),
    geography: $("#edit_geography").val(),
    foreign_language: $("#edit_foreign_language").val(),
    world_history: $("#edit_world_history").val(),
    community_rights: $("#edit_community_rights").val(),
    kazakh_russian_language: $("#edit_kazakh_russian_language").val(),
    kazakh_russian_literature: $("#edit_kazakh_russian_literature").val(),
  };

  Meteor.call(
    "Ubt.updateAdminUbtOfficialResults",
    academicYear.get(),
    template.period.get(),
    template.schoolId.get(),
    Session.get("editItemId"),
    editItem
  );

  Meteor.call(
    "Ubt.calculateRating",
    academicYear.get(),
    template.period.get(),
    template.schoolId.get(),
    (err, res) => {
      if (err) {
        bootbox.alert(err.reason);
      }
    }
  );

  Session.set("editItemId", null);
};

Template.adminUbtOfficialResults.events({
  "click .bg-info": function (event, template) {
    event.preventDefault();
    if (template.schoolId.get() === event.target.id) {
      template.schoolId.set("all");
    } else {
      template.schoolId.set(event.target.id);
    }
  },
  "click .par": function (event, template) {
    console.log(event.target);
    if (template.schoolId.get() === event.target.id) {
      template.schoolId.set("all");
    } else {
      template.schoolId.set(event.target.id);
    }
    console.log(template.schoolId.get());
  },
  "click .editItem": function () {
    Session.set("editItemId", this.studentId);
  },
  "click .cancelItem": function () {
    Session.set("editItemId", null);
  },
  "click .saveItem": function (event, template) {
    saveItem(template);
  },
  "change #school"(event, template) {
    template.schoolId.set(event.target.value);
  },
  "change #period"(event, template) {
    template.period.set(event.target.value);
  },
  "change #showCertified"(event, template) {
    template.showCertified.set(event.target.checked);
  },
  "click #total"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      { sort: { total: -1 }, fields: { studentId: 1, total: 1, _id: 0 } }
    ).fetch();
    let order = ubtResults
      .filter((ubtResult) => ubtResult.total || ubtResult.total === 0)
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #math_literacy"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      {
        sort: { math_literacy: -1 },
        fields: { studentId: 1, math_literacy: 1, _id: 0 },
      }
    ).fetch();
    let order = ubtResults
      .filter(
        (ubtResult) => ubtResult.math_literacy || ubtResult.math_literacy === 0
      )
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #reading_literacy"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      {
        sort: { reading_literacy: -1 },
        fields: { studentId: 1, reading_literacy: 1, _id: 0 },
      }
    ).fetch();
    let order = ubtResults
      .filter(
        (ubtResult) =>
          ubtResult.reading_literacy || ubtResult.reading_literacy === 0
      )
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #kazakh_history"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      {
        sort: { kazakh_history: -1 },
        fields: { studentId: 1, kazakh_history: 1, _id: 0 },
      }
    ).fetch();
    let order = ubtResults
      .filter(
        (ubtResult) =>
          ubtResult.kazakh_history || ubtResult.kazakh_history === 0
      )
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #algebra"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      { sort: { algebra: -1 }, fields: { studentId: 1, algebra: 1, _id: 0 } }
    ).fetch();
    let order = ubtResults
      .filter((ubtResult) => ubtResult.algebra || ubtResult.algebra === 0)
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #physics"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      { sort: { physics: -1 }, fields: { studentId: 1, physics: 1, _id: 0 } }
    ).fetch();
    let order = ubtResults
      .filter((ubtResult) => ubtResult.physics || ubtResult.physics === 0)
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #chemistry"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      {
        sort: { chemistry: -1 },
        fields: { studentId: 1, chemistry: 1, _id: 0 },
      }
    ).fetch();
    let order = ubtResults
      .filter((ubtResult) => ubtResult.chemistry || ubtResult.chemistry === 0)
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #biology"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      { sort: { biology: -1 }, fields: { studentId: 1, biology: 1, _id: 0 } }
    ).fetch();
    let order = ubtResults
      .filter((ubtResult) => ubtResult.biology || ubtResult.biology === 0)
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #geography"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      {
        sort: { geography: -1 },
        fields: { studentId: 1, geography: 1, _id: 0 },
      }
    ).fetch();
    let order = ubtResults
      .filter((ubtResult) => ubtResult.geography || ubtResult.geography === 0)
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #foreign_language"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      {
        sort: { foreign_language: -1 },
        fields: { studentId: 1, foreign_language: 1, _id: 0 },
      }
    ).fetch();
    let order = ubtResults
      .filter(
        (ubtResult) =>
          ubtResult.foreign_language || ubtResult.foreign_language === 0
      )
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #world_history"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      {
        sort: { world_history: -1 },
        fields: { studentId: 1, world_history: 1, _id: 0 },
      }
    ).fetch();
    let order = ubtResults
      .filter(
        (ubtResult) => ubtResult.world_history || ubtResult.world_history === 0
      )
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #community_rights"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      {
        sort: { community_rights: -1 },
        fields: { studentId: 1, community_rights: 1, _id: 0 },
      }
    ).fetch();
    let order = ubtResults
      .filter(
        (ubtResult) =>
          ubtResult.community_rights || ubtResult.community_rights === 0
      )
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #kazakh_russian_language"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      {
        sort: { kazakh_russian_language: -1 },
        fields: { studentId: 1, kazakh_russian_language: 1, _id: 0 },
      }
    ).fetch();
    let order = ubtResults
      .filter(
        (ubtResult) =>
          ubtResult.kazakh_russian_language ||
          ubtResult.kazakh_russian_language === 0
      )
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #kazakh_russian_literature"(event, template) {
    let ubtResults = UbtOfficialResults.find(
      {},
      {
        sort: { kazakh_russian_literature: -1 },
        fields: { studentId: 1, kazakh_russian_literature: 1, _id: 0 },
      }
    ).fetch();
    let order = ubtResults
      .filter(
        (ubtResult) =>
          ubtResult.kazakh_russian_literature ||
          ubtResult.kazakh_russian_literature === 0
      )
      .map((ubtResult) => ubtResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #download"(event, template) {
    //let grade = Template.instance().grade.get();
    let schoolId = Template.instance().schoolId.get();
    let students = Students.find(
      {},
      { sort: { division: 1, surname: 1 } }
    ).fetch();

    let data = [];

    let headers = [
      "Grade",
      "Name",
      "Total",
      "Math literacy",
      "Reading literacy",
      "Kazakh history",
      "Math",
      "Physics",
      "Chemistry",
      "Biology",
      "Geography",
      "Foreign language",
      "World history",
      "Community rights",
      "Kazakh/russian language",
      "Kazakh/russian literature",
      "Creative exam-1",
      "Creative exam-2",
    ];
    data.push(headers);

    let showCertified = Template.instance().showCertified.get();

    students.map((student) => {
      let isCertified = false;
      let studentId = student.studentId;
      let grade = student.grade;

      let ubtResult = UbtOfficialResults.findOne({
        academicYear: academicYear.get(),
        studentId,
      });

      let dataRow = [
        grade + "" + student.division,
        student.surname + "" + student.name,
      ];

      if (ubtResult) {
        isCertified = true;
        if (ubtResult.total || ubtResult.total === 0)
          dataRow.push(ubtResult.total);
        else dataRow.push("");
        if (ubtResult.math_literacy || ubtResult.math_literacy === 0)
          dataRow.push(ubtResult.math_literacy);
        else dataRow.push("");
        if (ubtResult.reading_literacy || ubtResult.reading_literacy === 0)
          dataRow.push(ubtResult.reading_literacy);
        else dataRow.push("");
        if (ubtResult.kazakh_history || ubtResult.kazakh_history === 0)
          dataRow.push(ubtResult.kazakh_history);
        else dataRow.push("");
        if (ubtResult.algebra || ubtResult.algebra === 0)
          dataRow.push(ubtResult.algebra);
        else dataRow.push("");
        if (ubtResult.physics || ubtResult.physics === 0)
          dataRow.push(ubtResult.physics);
        else dataRow.push("");
        if (ubtResult.chemistry || ubtResult.chemistry === 0)
          dataRow.push(ubtResult.chemistry);
        else dataRow.push("");
        if (ubtResult.biology || ubtResult.biology === 0)
          dataRow.push(ubtResult.biology);
        else dataRow.push("");
        if (ubtResult.geography || ubtResult.geography === 0)
          dataRow.push(ubtResult.geography);
        else dataRow.push("");
        if (ubtResult.foreign_language || ubtResult.foreign_language === 0)
          dataRow.push(ubtResult.foreign_language);
        else dataRow.push("");
        if (ubtResult.world_history || ubtResult.world_history === 0)
          dataRow.push(ubtResult.world_history);
        else dataRow.push("");
        if (ubtResult.community_rights || ubtResult.community_rights === 0)
          dataRow.push(ubtResult.community_rights);
        else dataRow.push("");
        if (
          ubtResult.kazakh_russian_language ||
          ubtResult.kazakh_russian_language === 0
        )
          dataRow.push(ubtResult.kazakh_russian_language);
        else dataRow.push("");
        if (
          ubtResult.kazakh_russian_literature ||
          ubtResult.kazakh_russian_literature === 0
        )
          dataRow.push(ubtResult.kazakh_russian_literature);
        else dataRow.push("");
      }

      if (showCertified) {
        if (isCertified) data.push(dataRow);
      } else {
        data.push(dataRow);
      }
    });

    Meteor.call("download", data, (err, wb) => {
      if (err) throw err;

      let sName = academicYear.get() + "_UBT_" + schoolId + ".xlsx";
      XLSX.writeFile(wb, sName);
    });
  },

  "click #calculate"(event, template) {
    SUIBlock.block("Жүктелуде...");
    Meteor.call(
      "Ubt.calculateRating",
      academicYear.get(),
      template.period.get(),
      template.schoolId.get(),
      (err, res) => {
        if (err) {
          bootbox.alert(err.reason);
          SUIBlock.unblock();
        } else {
          SUIBlock.unblock();
          bootbox.alert("Сақталды");
        }
      }
    );
  },
});

Template.adminUbtOfficialResults.onRendered(function () {
  this.$('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
});
