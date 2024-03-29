import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./adminSatResults.html";
import XLSX from "xlsx";

Template.adminSatResults.onCreated(function () {
  let template = this;
  document.title = "SAT-IELTS Нәтижелері";
  template.grade = new ReactiveVar("all");
  template.schoolId = new ReactiveVar("all");
  template.showCertified = new ReactiveVar(false);
  template.order = new ReactiveVar([]);
  template.isSat1Hidden = new ReactiveVar(false);
  // template.isSat2Hidden = new ReactiveVar(false);
  template.isIeltsHidden = new ReactiveVar(false);

  template.subscribe("schools");

  template.autorun(() => {
    template.subscribe(
      "schoolSatStudents",
      template.schoolId.get(),
      template.grade.get()
    );
    template.subscribe(
      "adminSatResults",
      template.schoolId.get(),
      template.grade.get()
    );
    template.subscribe(
      "adminIeltsResults",
      template.schoolId.get(),
      template.grade.get()
    );
  });
});

Template.adminSatResults.helpers({
  schools() {
    return Schools.find({}, { sort: { shortName: 1 } }).fetch();
  },
  results() {
    let returnList = [];

    let sat1EnglishTotal = 0;
    let sat1EnglishN = 0;
    let sat1MathTotal = 0;
    let sat1MathN = 0;
    let sat1TotalTotal = 0;
    let sat1TotalN = 0;
    let ieltsListeningTotal = 0;
    let ieltsListeningN = 0;
    let ieltsReadingTotal = 0;
    let ieltsReadingN = 0;
    let ieltsSpeakingTotal = 0;
    let ieltsSpeakingN = 0;
    let ieltsWritingTotal = 0;
    let ieltsWritingN = 0;
    let ieltsTotalTotal = 0;
    let ieltsTotalN = 0;

    Session.set("sat1EnglishAverage", undefined);
    Session.set("sat1MathAverage", undefined);
    Session.set("sat1TotalAverage", undefined);
    Session.set("ieltsWritingAverage", undefined);
    Session.set("ieltsSpeakingAverage", undefined);
    Session.set("ieltsReadingAverage", undefined);
    Session.set("ieltsListeningAverage", undefined);
    Session.set("ieltsTotalAverage", undefined);

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
        name: student.name,
        surname: student.surname,
        sat1english: "",
        sat1math: "",
        sat1total: "",
        // sat2worldhistory: "",
        // sat2math1: "",
        // sat2math2: "",
        // sat2biology: "",
        // sat2chemistry: "",
        // sat2physics: "",
        // sat2total: "",
        // sat2math1: "",
        ieltslistening: "",
        ieltsreading: "",
        ieltswriting: "",
        ieltsspeaking: "",
        ieltstotal: "",
      };

      let satResult = SatResults.findOne({
        academicYear: academicYear.get(),
        studentId: student.studentId,
      });

      let updatedAt;
      if (satResult) {
        isCertified = true;
        returnObject.sat1english = satResult.sat1_english;
        if (satResult.sat1_english || satResult.sat1_english === 0) {
          sat1EnglishTotal += satResult.sat1_english;
          sat1EnglishN++;
        }
        returnObject.sat1math = satResult.sat1_math;
        if (satResult.sat1_math || satResult.sat1_math === 0) {
          sat1MathTotal += satResult.sat1_math;
          sat1MathN++;
        }
        returnObject.sat1total = satResult.sat1_total;
        if (satResult.sat1_total || satResult.sat1_total === 0) {
          sat1TotalTotal += satResult.sat1_total;
          sat1TotalN++;
        }
        // returnObject.sat2worldhistory = satResult.sat2_world_history;
        // returnObject.sat2math1 = satResult.sat2_math1;
        // returnObject.sat2math2 = satResult.sat2_math2;
        // returnObject.sat2biology = satResult.sat2_biology;
        // returnObject.sat2chemistry = satResult.sat2_chemistry;
        // returnObject.sat2physics = satResult.sat2_physics;
        // returnObject.sat2total = satResult.sat2_total;

        if (satResult.updatedAt) updatedAt = satResult.updatedAt;
        else updatedAt = satResult.createdAt;
      }

      let ieltsResult = IeltsResults.findOne({
        academicYear: academicYear.get(),
        studentId: student.studentId,
      });
      if (ieltsResult) {
        isCertified = true;
        returnObject.ieltslistening = ieltsResult.listening;
        if (ieltsResult.listening || ieltsResult.listening === 0) {
          ieltsListeningTotal += ieltsResult.listening;
          ieltsListeningN++;
        }
        returnObject.ieltsreading = ieltsResult.reading;
        if (ieltsResult.reading || ieltsResult.reading === 0) {
          ieltsReadingTotal += ieltsResult.reading;
          ieltsReadingN++;
        }
        returnObject.ieltswriting = ieltsResult.writing;
        if (ieltsResult.writing || ieltsResult.writing === 0) {
          ieltsWritingTotal += ieltsResult.writing;
          ieltsWritingN++;
        }
        returnObject.ieltsspeaking = ieltsResult.speaking;
        if (ieltsResult.speaking || ieltsResult.speaking === 0) {
          ieltsSpeakingTotal += ieltsResult.speaking;
          ieltsSpeakingN++;
        }
        returnObject.ieltstotal = ieltsResult.total;
        if (ieltsResult.total || ieltsResult.total === 0) {
          ieltsTotalTotal += ieltsResult.total;
          ieltsTotalN++;
        }

        if (updatedAt) {
          if (ieltsResult.updatedAt) {
            if (ieltsResult.updatedAt > updatedAt) {
              updatedAt = ieltsResult.updatedAt;
            }
          } else if (ieltsResult.createdAt) {
            if (ieltsResult.createdAt > updatedAt) {
              updatedAt = ieltsResult.createdAt;
            }
          }
        } else {
          if (ieltsResult.updatedAt) updatedAt = ieltsResult.updatedAt;
          else updatedAt = ieltsResult.createdAt;
        }
      }

      if (updatedAt)
        returnObject.updatedAt =
          updatedAt.getUTCDate() +
          "/" +
          (updatedAt.getUTCMonth() + 1) +
          "/" +
          updatedAt.getUTCFullYear();

      if (showCertified) {
        if (isCertified) returnList.push(returnObject);
      } else {
        returnList.push(returnObject);
      }
    });

    if (sat1EnglishN !== 0) {
      Session.set(
        "sat1EnglishAverage",
        (sat1EnglishTotal / sat1EnglishN).toFixed(2)
      );
    }
    if (sat1MathN !== 0) {
      Session.set("sat1MathAverage", (sat1MathTotal / sat1MathN).toFixed(2));
    }
    if (sat1TotalN !== 0) {
      Session.set("sat1TotalAverage", (sat1TotalTotal / sat1TotalN).toFixed(2));
    }
    if (ieltsListeningN !== 0) {
      Session.set(
        "ieltsListeningAverage",
        (ieltsListeningTotal / ieltsListeningN).toFixed(2)
      );
    }
    if (ieltsReadingN !== 0) {
      Session.set(
        "ieltsReadingAverage",
        (ieltsReadingTotal / ieltsReadingN).toFixed(2)
      );
    }
    if (ieltsWritingN !== 0) {
      Session.set(
        "ieltsWritingAverage",
        (ieltsWritingTotal / ieltsWritingN).toFixed(2)
      );
    }
    if (ieltsSpeakingN !== 0) {
      Session.set(
        "ieltsSpeakingAverage",
        (ieltsSpeakingTotal / ieltsSpeakingN).toFixed(2)
      );
    }

    if (ieltsTotalN !== 0) {
      Session.set(
        "ieltsTotalAverage",
        (ieltsTotalTotal / ieltsTotalN).toFixed(2)
      );
    }

    return returnList;
  },
  editing() {
    return Session.equals("editItemId", this.studentId);
  },
  isSat1Hidden() {
    return Template.instance().isSat1Hidden.get();
  },
  // isSat2Hidden() {
  //   return Template.instance().isSat2Hidden.get();
  // },
  isIeltsHidden() {
    return Template.instance().isIeltsHidden.get();
  },
  sat1EnglishAverage() {
    return Session.get("sat1EnglishAverage");
  },
  sat1MathAverage() {
    return Session.get("sat1MathAverage");
  },
  sat1TotalAverage() {
    return Session.get("sat1TotalAverage");
  },
  ieltsListeningAverage() {
    return Session.get("ieltsListeningAverage");
  },
  ieltsReadingAverage() {
    return Session.get("ieltsReadingAverage");
  },
  ieltsWritingAverage() {
    return Session.get("ieltsWritingAverage");
  },
  ieltsSpeakingAverage() {
    return Session.get("ieltsSpeakingAverage");
  },
  ieltsTotalAverage() {
    return Session.get("ieltsTotalAverage");
  },
});

var saveItem = function (template) {
  var editItem = {
    sat1_english: $("#editSat1English").val(),
    sat1_math: $("#editSat1Math").val(),
    sat1_total: $("#editSat1Total").val(),
    // sat2_world_history: $("#editSat2WorldHistory").val(),
    // sat2_math1: $("#editSat2Math1").val(),
    // sat2_math2: $("#editSat2Math2").val(),
    // sat2_biology: $("#editSat2Biology").val(),
    // sat2_chemistry: $("#editSat2Chemistry").val(),
    // sat2_physics: $("#editSat2Physics").val(),
    // sat2_total: $("#editSat2Total").val(),
    ielts_listening: $("#editIeltsListening").val(),
    ielts_reading: $("#editIeltsReading").val(),
    ielts_writing: $("#editIeltsWriting").val(),
    ielts_speaking: $("#editIeltsSpeaking").val(),
    ielts_total: $("#editIeltsTotal").val(),
  };

  Meteor.call(
    "Sat.updateAdminSatResults",
    academicYear.get(),
    Session.get("editItemId"),
    Template.instance().grade.get(),
    editItem,
    template.schoolId.get()
  );
  Meteor.call(
    "Ielts.updateAdminIeltsResults",
    academicYear.get(),
    Session.get("editItemId"),
    Template.instance().grade.get(),
    editItem,
    template.schoolId.get()
  );

  Session.set("editItemId", null);
};

Template.adminSatResults.events({
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
  "change #grade"(event, template) {
    template.grade.set(event.target.value);
  },
  "change #showCertified"(event, template) {
    template.showCertified.set(event.target.checked);
  },
  "click #sat1-hide"(event, template) {
    template.isSat1Hidden.set(true);
  },
  "click #sat1-expand"(event, template) {
    template.isSat1Hidden.set(false);
  },
  // "click #sat2-hide"(event, template) {
  //   template.isSat2Hidden.set(true);
  // },
  // "click #sat2-expand"(event, template) {
  //   template.isSat2Hidden.set(false);
  // },
  "click #ielts-hide"(event, template) {
    template.isIeltsHidden.set(true);
  },
  "click #ielts-expand"(event, template) {
    template.isIeltsHidden.set(false);
  },
  "click #sat-1_english"(event, template) {
    let satResults = SatResults.find(
      {},
      {
        sort: { sat1_english: -1 },
        fields: { studentId: 1, sat1_english: 1, _id: 0 },
      }
    ).fetch();
    let order = satResults
      .filter(
        (satResult) => satResult.sat1_english || satResult.sat1_english === 0
      )
      .map((satResult) => satResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #sat-1_math"(event, template) {
    let satResults = SatResults.find(
      {},
      {
        sort: { sat1_math: -1 },
        fields: { studentId: 1, sat1_math: 1, _id: 0 },
      }
    ).fetch();
    let order = satResults
      .filter((satResult) => satResult.sat1_math || satResult.sat1_math === 0)
      .map((satResult) => satResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #sat-1_total"(event, template) {
    let satResults = SatResults.find(
      {},
      {
        sort: { sat1_total: -1 },
        fields: { studentId: 1, sat1_total: 1, _id: 0 },
      }
    ).fetch();
    let order = satResults
      .filter((satResult) => satResult.sat1_total || satResult.sat1_total === 0)
      .map((satResult) => satResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  // "click #sat-2_world-history"(event, template) {
  //   let satResults = SatResults.find(
  //     {},
  //     {
  //       sort: { sat2_world_history: -1 },
  //       fields: { studentId: 1, sat2_world_history: 1, _id: 0 },
  //     }
  //   ).fetch();
  //   let order = satResults
  //     .filter(
  //       (satResult) =>
  //         satResult.sat2_world_history || satResult.sat2_world_history === 0
  //     )
  //     .map((satResult) => satResult.studentId);
  //   let oldOrder = template.order.get();

  //   if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
  //     template.order.set(order.reverse());
  //   } else {
  //     template.order.set(order);
  //   }
  // },
  // "click #sat-2_math-1"(event, template) {
  //   let satResults = SatResults.find(
  //     {},
  //     {
  //       sort: { sat2_math1: -1 },
  //       fields: { studentId: 1, sat2_math1: 1, _id: 0 },
  //     }
  //   ).fetch();
  //   let order = satResults
  //     .filter((satResult) => satResult.sat2_math1 || satResult.sat2_math1 === 0)
  //     .map((satResult) => satResult.studentId);
  //   let oldOrder = template.order.get();

  //   if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
  //     template.order.set(order.reverse());
  //   } else {
  //     template.order.set(order);
  //   }
  // },
  // "click #sat-2_math-2"(event, template) {
  //   let satResults = SatResults.find(
  //     {},
  //     {
  //       sort: { sat2_math2: -1 },
  //       fields: { studentId: 1, sat2_math2: 1, _id: 0 },
  //     }
  //   ).fetch();
  //   let order = satResults
  //     .filter((satResult) => satResult.sat2_math2 || satResult.sat2_math2 === 0)
  //     .map((satResult) => satResult.studentId);
  //   let oldOrder = template.order.get();

  //   if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
  //     template.order.set(order.reverse());
  //   } else {
  //     template.order.set(order);
  //   }
  // },
  // "click #sat-2_biology"(event, template) {
  //   let satResults = SatResults.find(
  //     {},
  //     {
  //       sort: { sat2_biology: -1 },
  //       fields: { studentId: 1, sat2_biology: 1, _id: 0 },
  //     }
  //   ).fetch();
  //   let order = satResults
  //     .filter(
  //       (satResult) => satResult.sat2_biology || satResult.sat2_biology === 0
  //     )
  //     .map((satResult) => satResult.studentId);
  //   let oldOrder = template.order.get();

  //   if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
  //     template.order.set(order.reverse());
  //   } else {
  //     template.order.set(order);
  //   }
  // },
  // "click #sat-2_chemistry"(event, template) {
  //   let satResults = SatResults.find(
  //     {},
  //     {
  //       sort: { sat2_chemistry: -1 },
  //       fields: { studentId: 1, sat2_chemistry: 1, _id: 0 },
  //     }
  //   ).fetch();
  //   let order = satResults
  //     .filter(
  //       (satResult) =>
  //         satResult.sat2_chemistry || satResult.sat2_chemistry === 0
  //     )
  //     .map((satResult) => satResult.studentId);
  //   let oldOrder = template.order.get();

  //   if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
  //     template.order.set(order.reverse());
  //   } else {
  //     template.order.set(order);
  //   }
  // },
  // "click #sat-2_physics"(event, template) {
  //   let satResults = SatResults.find(
  //     {},
  //     {
  //       sort: { sat2_physics: -1 },
  //       fields: { studentId: 1, sat2_physics: 1, _id: 0 },
  //     }
  //   ).fetch();
  //   let order = satResults
  //     .filter(
  //       (satResult) => satResult.sat2_physics || satResult.sat2_physics === 0
  //     )
  //     .map((satResult) => satResult.studentId);
  //   let oldOrder = template.order.get();

  //   if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
  //     template.order.set(order.reverse());
  //   } else {
  //     template.order.set(order);
  //   }
  // },
  // "click #sat-2_total"(event, template) {
  //   let satResults = SatResults.find(
  //     {},
  //     {
  //       sort: { sat2_total: -1 },
  //       fields: { studentId: 1, sat2_total: 1, _id: 0 },
  //     }
  //   ).fetch();
  //   let order = satResults
  //     .filter((satResult) => satResult.sat2_total || satResult.sat2_total === 0)
  //     .map((satResult) => satResult.studentId);
  //   let oldOrder = template.order.get();

  //   if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
  //     template.order.set(order.reverse());
  //   } else {
  //     template.order.set(order);
  //   }
  // },
  "click #ielts_listening"(event, template) {
    let ieltsResults = IeltsResults.find(
      {},
      {
        sort: { listening: -1 },
        fields: { studentId: 1, listening: 1, _id: 0 },
      }
    ).fetch();
    let order = ieltsResults
      .filter(
        (ieltsResult) => ieltsResult.listening || ieltsResult.listening === 0
      )
      .map((ieltsResult) => ieltsResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #ielts_reading"(event, template) {
    let ieltsResults = IeltsResults.find(
      {},
      { sort: { reading: -1 }, fields: { studentId: 1, reading: 1, _id: 0 } }
    ).fetch();
    let order = ieltsResults
      .filter((ieltsResult) => ieltsResult.reading || ieltsResult.reading === 0)
      .map((ieltsResult) => ieltsResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #ielts_writing"(event, template) {
    let ieltsResults = IeltsResults.find(
      {},
      { sort: { writing: -1 }, fields: { studentId: 1, writing: 1, _id: 0 } }
    ).fetch();
    let order = ieltsResults
      .filter((ieltsResult) => ieltsResult.writing || ieltsResult.writing === 0)
      .map((ieltsResult) => ieltsResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #ielts_speaking"(event, template) {
    let ieltsResults = IeltsResults.find(
      {},
      { sort: { speaking: -1 }, fields: { studentId: 1, speaking: 1, _id: 0 } }
    ).fetch();
    let order = ieltsResults
      .filter(
        (ieltsResult) => ieltsResult.speaking || ieltsResult.speaking === 0
      )
      .map((ieltsResult) => ieltsResult.studentId);
    let oldOrder = template.order.get();

    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #ielts_total"(event, template) {
    let ieltsResults = IeltsResults.find(
      {},
      { sort: { total: -1 }, fields: { studentId: 1, total: 1, _id: 0 } }
    ).fetch();
    let order = ieltsResults
      .filter((ieltsResult) => ieltsResult.total || ieltsResult.total === 0)
      .map((ieltsResult) => ieltsResult.studentId);
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
      "Сынып",
      "Аты-жөні",
      "Reading & Writing (SAT-1)",
      "Math (SAT-1)",
      "Total (SAT-1)",
      // "Math-1 (SAT-2)",
      // "Math-2 (SAT-2)",
      // "Physics (SAT-2)",
      // "Chemistry (SAT-2)",
      // "Biology (SAT-2)",
      // "World History (SAT-2)",
      // "Total (SAT-2)",
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
      let grade = student.grade;

      let satResult = SatResults.findOne({
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

        // if (satResult.sat2_math1 || satResult.sat2_math1 === 0)
        //   dataRow.push(satResult.sat2_math1);
        // else dataRow.push("");
        // if (satResult.sat2_math2 || satResult.sat2_math2 === 0)
        //   dataRow.push(satResult.sat2_math2);
        // else dataRow.push("");
        // if (satResult.sat2_physics || satResult.sat2_physics === 0)
        //   dataRow.push(satResult.sat2_physics);
        // else dataRow.push("");
        // if (satResult.sat2_chemistry || satResult.sat2_chemistry === 0)
        //   dataRow.push(satResult.sat2_chemistry);
        // else dataRow.push("");
        // if (satResult.sat2_biology || satResult.sat2_biology === 0)
        //   dataRow.push(satResult.sat2_biology);
        // else dataRow.push("");
        // if (satResult.sat2_world_history || satResult.sat2_world_history === 0)
        //   dataRow.push(satResult.sat2_world_history);
        // else dataRow.push("");

        // if (satResult.sat2_total || satResult.sat2_total === 0)
        //   dataRow.push(satResult.sat2_total);
        // else dataRow.push("");
      } else {
        dataRow.push("", "", "");
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

      let sName =
        academicYear.get() +
        "_SAT-IELTS_" +
        schoolId +
        "_" +
        template.grade.get() +
        ".xlsx";
      XLSX.writeFile(wb, sName);
    });
  },
});

Template.adminSatResults.onRendered(function () {
  this.$('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
});
