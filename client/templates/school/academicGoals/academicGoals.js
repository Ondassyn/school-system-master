import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./academicGoals.html";

import XLSX from "xlsx";

Template.academicGoals.onCreated(function () {
  let template = this;
  document.title = "Академиялық мақсаттар";

  template.subscribe("schoolAcademicGoals", academicYear.get());
  template.subscribe("schools");
});

Template.academicGoals.helpers({
  goalObject(id) {
    const goals = AcademicGoals.findOne();

    if (!goals) return { id, completed: "", target: "" };

    const completed = goals["goal" + id + "_completed"];
    const target = goals["goal" + id + "_target"];

    return { id, completed, target };
  },

  editing(id) {
    return Session.equals("editItemId", id);
  },
});

var saveItem = function () {
  var editItem = {
    completed: $("#editCompleted").val(),
    target: $("#editTarget").val(),
  };

  const goalId = Session.get("editItemId");

  Meteor.call(
    "AcademicGoals.updateSchoolAcademicGoals",
    academicYear.get(),
    goalId,
    editItem
  );

  Session.set("editItemId", null);
};

Template.academicGoals.events({
  "click .editItem": function (e) {
    Session.set("editItemId", e.target.name);
  },
  "click .cancelItem": function () {
    Session.set("editItemId", null);
  },
  "click .saveItem": function () {
    saveItem();
  },
  "keypress input": function (e) {
    if (e.keyCode === 13) {
      saveItem();
    } else if (e.keyCode === 27) {
      Session.set("editItemId", null);
    }
  },

  "click #download"(event, template) {
    let grade = Template.instance().grade.get();
    let students = Students.find(
      { grade },
      { sort: { division: 1, surname: 1 } }
    ).fetch();

    let data = [];

    let headers = [
      "Сынып",
      "Аты-жөні",
      "Reading & Writing (SAT-1)",
      "Math (SAT-1)",
      "Total (SAT-1)",
      "Math-1 (SAT-2)",
      "Math-2 (SAT-2)",
      "Physics (SAT-2)",
      "Chemistry (SAT-2)",
      "Biology (SAT-2)",
      "World History (SAT-2)",
      "Total (SAT-2)",
      "Listening (IELTS)",
      "Reading (IELTS)",
      "Writing (IELTS)",
      "Speaking (IELTS)",
      "Total (IELTS)",
    ];
    data.push(headers);

    let showCertified = Template.instance().showCertified.get();

    students.map((student) => {
      let isCertified = false;
      let studentId = student.studentId;

      let satResult = AcademicGoals.findOne({
        academicYear: academicYear.get(),
        studentId,
      });
      let ieltsResult = IeltsResults.findOne({
        academicYear: academicYear.get(),
        studentId,
      });

      let dataRow = [
        grade + "" + student.division,
        student.surname + "" + student.name,
      ];

      if (satResult) {
        isCertified = true;
        if (satResult.sat1_english || satResult.sat1_english === 0)
          dataRow.push(satResult.sat1_english);
        else dataRow.push("");
        if (satResult.sat1_math || satResult.sat1_math === 0)
          dataRow.push(satResult.sat1_math);
        else dataRow.push("");
        if (satResult.sat1_total || satResult.sat1_total === 0)
          dataRow.push(satResult.sat1_total);
        else dataRow.push("");

        if (satResult.sat2_math1 || satResult.sat2_math1 === 0)
          dataRow.push(satResult.sat2_math1);
        else dataRow.push("");
        if (satResult.sat2_math2 || satResult.sat2_math2 === 0)
          dataRow.push(satResult.sat2_math2);
        else dataRow.push("");
        if (satResult.sat2_physics || satResult.sat2_physics === 0)
          dataRow.push(satResult.sat2_physics);
        else dataRow.push("");
        if (satResult.sat2_chemistry || satResult.sat2_chemistry === 0)
          dataRow.push(satResult.sat2_chemistry);
        else dataRow.push("");
        if (satResult.sat2_biology || satResult.sat2_biology === 0)
          dataRow.push(satResult.sat2_biology);
        else dataRow.push("");
        if (satResult.sat2_world_history || satResult.sat2_world_history === 0)
          dataRow.push(satResult.sat2_world_history);
        else dataRow.push("");
        if (satResult.sat2_total || satResult.sat2_total === 0)
          dataRow.push(satResult.sat2_total);
        else dataRow.push("");
      } else {
        dataRow.push[("", "", "", "", "", "", "", "", "", "")];
      }

      if (ieltsResult) {
        isCertified = true;
        if (ieltsResult.listening || ieltsResult.listening === 0)
          dataRow.push(ieltsResult.listening);
        else dataRow.push("");
        if (ieltsResult.reading || ieltsResult.reading === 0)
          dataRow.push(ieltsResult.reading);
        else dataRow.push("");
        if (ieltsResult.writing || ieltsResult.writing === 0)
          dataRow.push(ieltsResult.writing);
        else dataRow.push("");
        if (ieltsResult.speaking || ieltsResult.speaking === 0)
          dataRow.push(ieltsResult.speaking);
        else dataRow.push("");
        if (ieltsResult.total || ieltsResult.total === 0)
          dataRow.push(ieltsResult.total);
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

      let sName = academicYear.get() + "_SAT-IELTS_" + grade + ".xlsx";
      XLSX.writeFile(wb, sName);
    });
  },
});

Template.academicGoals.onRendered(function () {
  this.$('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
});
