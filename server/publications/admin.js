import { Meteor } from "meteor/meteor";

Meteor.publish("userList", function () {
  return Meteor.users.find({});
});

Meteor.publish("configAccounts", function () {
  return Configs.find({ _id: "accounts" });
});

Meteor.publish("guestSchools", function () {
  return GuestSchools.find();
});

Meteor.publish("currentGuestSchools", function (userId) {
  return GuestSchools.find({ userId: userId });
});

Meteor.publish(
  "opeAdminReports",
  function (academicYear, schoolId, reportPeriod) {
    if (this.userId) {
      let cursor = OpeReports.find({
        academicYear: academicYear,
        reportPeriod: reportPeriod,
        schoolId: schoolId,
      });
      return cursor;
    }
    return this.ready();
  }
);

Meteor.publish("ubtAdminResults", function (academicYear, schoolId) {
  if (this.userId) {
    let cursor = UhdResults.find({
      academicYear: academicYear,
      schoolId: schoolId,
    });
    return cursor;
  } else {
    return this.ready();
  }
});

Meteor.publish("btsKeys", function (academicYear, quarter) {
  if (this.userId) {
    return BtsAnswerKeys.find({ academicYear: academicYear, quarter: quarter });
  }
  return this.ready();
});

Meteor.publish("turkishKeys", function (academicYear) {
  if (this.userId) {
    return TurkishAnswerKeys.find({ academicYear: academicYear });
  }
  return this.ready();
});

Meteor.publish("turkishA1Keys", function (academicYear, no) {
  if (this.userId) {
    if (no) return TurkishA1Keys.find({ academicYear, no });
    return TurkishA1Keys.find({ academicYear });
  }
  return this.ready();
});

Meteor.publish("turkishA1AdminResults", function (academicYear, schoolId, no) {
  if (!schoolId) return;
  if (this.userId) {
    if (schoolId === "all") return TurkishA1Results.find({ academicYear, no });
    return TurkishA1Results.find({ academicYear, schoolId, no });
  }
  return this.ready();
});

Meteor.publish("turkishA1Ratings", function (academicYear, no) {
  if (this.userId) {
    return TurkishA1Ratings.find({ academicYear, no });
  }
  return this.ready();
});

Meteor.publish("turkishA18Keys", function (academicYear, no) {
  if (this.userId) {
    if (no) return TurkishA18Keys.find({ academicYear, no });
    return TurkishA18Keys.find({ academicYear });
  }
  return this.ready();
});

Meteor.publish("turkishA18AdminResults", function (academicYear, schoolId, no) {
  if (!schoolId) return;
  if (this.userId) {
    if (schoolId === "all") return TurkishA18Results.find({ academicYear, no });
    return TurkishA18Results.find({ academicYear, schoolId, no });
  }
  return this.ready();
});

Meteor.publish("turkishA18Ratings", function (academicYear, no) {
  if (this.userId) {
    return TurkishA18Ratings.find({ academicYear, no });
  }
  return this.ready();
});

Meteor.publish("btsLevels", function (academicYear, quarter) {
  if (this.userId) {
    return BtsLevels.find({ academicYear: academicYear, quarter: quarter });
  }
  return this.ready();
});

Meteor.publish("btsSchoolKeys", function (academicYear) {
  if (this.userId) {
    return BtsAnswerKeys.find({ academicYear: academicYear });
  }
  return this.ready();
});

Meteor.publish("turkishSchoolKeys", function (academicYear) {
  if (this.userId) {
    return TurkishAnswerKeys.find({ academicYear: academicYear });
  }
  return this.ready();
});

Meteor.publish("btsSchoolLevels", function (academicYear) {
  if (this.userId) {
    return BtsLevels.find({ academicYear: academicYear });
  }
  return this.ready();
});

Meteor.publish("btsKey", function (keyId) {
  if (this.userId) {
    return BtsAnswerKeys.find({ _id: keyId });
  }
  return this.ready();
});

Meteor.publish("turkishKey", function (keyId) {
  if (this.userId) {
    return TurkishAnswerKeys.find({ _id: keyId });
  }
  return this.ready();
});

Meteor.publish("btsLevel", function (keyId) {
  if (this.userId) {
    return BtsLevels.find({ _id: keyId });
  }
  return this.ready();
});

Meteor.publish("btsObjectivesList", function (academicYear, quarter) {
  if (this.userId) {
    return BtsObjectivesList.find({
      academicYear: academicYear,
      quarter: quarter,
    });
  }
  return this.ready();
});

Meteor.publish("btsObjective", function (objectiveId) {
  if (this.userId) {
    return BtsObjectivesList.find({ _id: objectiveId });
  }
  return this.ready();
});

Meteor.publish("lessonObjectives", function () {
  if (this.userId) {
    return LessonObjectives.find();
  }
  return this.ready();
});

Meteor.publish("lessonObjective", function (objectiveId) {
  if (this.userId) {
    return LessonObjectives.find({ _id: objectiveId });
  }
  return this.ready();
});

Meteor.publish("tatKeys", function (academicYear, tatNo) {
  if (this.userId) {
    return TatAnswerKeys.find({ academicYear: academicYear, tatNo: tatNo });
  }
  return this.ready();
});

Meteor.publish("tatSchoolKeys", function (academicYear) {
  if (this.userId) {
    return TatAnswerKeys.find({ academicYear: academicYear });
  }
  return this.ready();
});

Meteor.publish("tatKey", function (id) {
  if (this.userId) {
    return TatAnswerKeys.find({ _id: id });
  }
  return this.ready();
});

Meteor.publish("kboKeysGeneral", function () {
  if (this.userId) {
    return KboKeys.find();
  }
  return this.ready();
});

Meteor.publish("kboKeys", function (academicYear, kboNo) {
  if (this.userId) {
    return KboKeys.find({ academicYear: academicYear, kboNo: kboNo });
  }
  return this.ready();
});

Meteor.publish("kboSchoolKeys", function (academicYear) {
  if (this.userId) {
    return KboKeys.find({ academicYear: academicYear });
  }
  return this.ready();
});

Meteor.publish("kboKey", function (id) {
  if (this.userId) {
    return KboKeys.find({ _id: id });
  }
  return this.ready();
});

Meteor.publish("configs", function () {
  if (this.userId) {
    return Configs.find();
  }
  return this.ready();
});

Meteor.publish("teacherAccounts", function () {
  if (this.userId) {
    return TeacherAccounts.find();
  }
  return this.ready();
});

Meteor.publish("adminOpeStudents", function (schoolId, olympiad, grade) {
  if (this.userId) {
    if (schoolId === "all" && olympiad === "all" && grade === "all")
      return Students.find(
        {},
        { fields: { schoolId: 1, level: 1, grade: 1, olympiad } }
      );
    else if (schoolId === "all" && olympiad === "all")
      return Students.find({ grade }, { fields: { studentId: 1, level: 1 } });
    else if (schoolId === "all" && grade === "all")
      return Students.find(
        { olympiad },
        { fields: { studentId: 1, level: 1 } }
      );
    else if (grade === "all" && olympiad === "all")
      return Students.find(
        { schoolId },
        { fields: { studentId: 1, level: 1 } }
      );
    else if (schoolId === "all")
      return Students.find(
        { olympiad, grade },
        { fields: { studentId: 1, level: 1 } }
      );
    else if (olympiad === "all")
      return Students.find(
        { schoolId, grade },
        { fields: { studentId: 1, level: 1 } }
      );
    else if (grade === "all")
      return Students.find(
        { olympiad, schoolId },
        { fields: { studentId: 1, level: 1 } }
      );
    return Students.find(
      { schoolId, olympiad, grade: grade },
      { fields: { studentId: 1, level: 1 } }
    );
  }
  return this.ready();
});

Meteor.publish("adminOpeSchools", function () {
  if (this.userId) {
    return Schools.find({}, { fields: { schoolId: 1, shortName: 1 } });
  }
  return this.ready();
});

Meteor.publish("adminOpeConfigs", function () {
  if (this.userId) {
    return Configs.find({ _id: "opeThresholds" });
  }
  return this.ready();
});

Meteor.publish(
  "adminOpeResults",
  function (academicYear, schoolId, subjectId, grade) {
    if (this.userId) {
      if (schoolId === "all" && subjectId === "all" && grade === "all")
        return OpeResults.find({ academicYear });
      else if (schoolId === "all" && subjectId === "all")
        return OpeResults.find({ academicYear, grade });
      else if (schoolId === "all" && grade === "all")
        return OpeResults.find({ academicYear, olympiad: subjectId });
      else if (grade === "all" && subjectId === "all")
        return OpeResults.find({ academicYear, schoolId });
      else if (schoolId === "all")
        return OpeResults.find({ academicYear, olympiad: subjectId, grade });
      else if (subjectId === "all")
        return OpeResults.find({ academicYear, schoolId, grade });
      else if (grade === "all")
        return OpeResults.find({ academicYear, olympiad: subjectId, schoolId });
      return OpeResults.find({
        academicYear: academicYear,
        schoolId,
        olympiad: subjectId,
        grade: grade,
      });
    }
    return this.ready();
  }
);

Meteor.publish(
  "adminOpePaginatedResults",
  function (academicYear, schoolId, subjectId, grade, limit) {
    if (this.userId) {
      let cursor;
      if (schoolId === "all" && subjectId === "all" && grade === "all")
        cursor = OpeResults.find(
          { academicYear },
          { sort: { _id: -1 }, limit: parseInt(limit) }
        );
      else if (schoolId === "all" && subjectId === "all")
        cursor = OpeResults.find({ academicYear, grade });
      else if (schoolId === "all" && grade === "all")
        cursor = OpeResults.find({ academicYear, olympiad: subjectId });
      else if (grade === "all" && subjectId === "all")
        cursor = OpeResults.find({ academicYear, schoolId });
      else if (schoolId === "all")
        cursor = OpeResults.find({ academicYear, olympiad: subjectId, grade });
      else if (subjectId === "all")
        cursor = OpeResults.find({ academicYear, schoolId, grade });
      else if (grade === "all")
        cursor = OpeResults.find({
          academicYear,
          olympiad: subjectId,
          schoolId,
        });
      else
        cursor = OpeResults.find({
          academicYear: academicYear,
          schoolId,
          olympiad: subjectId,
          grade: grade,
        });

      return cursor;
    }
    return this.ready();
  }
);

Meteor.publish("adminSatResults", function (schoolId, grade) {
  if (this.userId) {
    if (schoolId && grade) {
      if (schoolId === "all" && grade === "all") {
        return SatResults.find({ grade: { $in: ["10", "11"] } });
      } else if (schoolId === "all") {
        return SatResults.find({ grade });
      } else if (grade === "all") {
        return SatResults.find({ schoolId, grade: { $in: ["10", "11"] } });
      } else {
        return SatResults.find({ schoolId, grade });
      }
    }
  }
  return this.ready();
});

Meteor.publish("adminIeltsResults", function (schoolId, grade) {
  if (this.userId) {
    if (schoolId && grade) {
      if (schoolId === "all" && grade === "all") {
        return IeltsResults.find({ grade: { $in: ["10", "11"] } });
      } else if (schoolId === "all") {
        return IeltsResults.find({ grade });
      } else if (grade === "all") {
        return IeltsResults.find({ schoolId, grade: { $in: ["10", "11"] } });
      } else {
        return IeltsResults.find({ schoolId, grade });
      }
    }
  }
  return this.ready();
});

Meteor.publish("adminSatAllResults", function (grade) {
  if (grade && grade === "all") return SatResults.find({});
  if (grade) return SatResults.find({ grade });
  return this.ready();
});

Meteor.publish("adminIeltsAllResults", function (grade) {
  if (grade && grade === "all") return IeltsResults.find({});
  if (grade) return IeltsResults.find({ grade });
  return this.ready();
});

Meteor.publish("adminAcademicGoals", function (academicYear) {
  return AcademicGoals.find({ academicYear });
});

Meteor.publish(
  "adminUbtOfficialResults",
  function (academicYear, schoolId, period) {
    if (schoolId) {
      if (schoolId === "all") {
        return UbtOfficialResults.find({ academicYear, period });
      }
      return UbtOfficialResults.find({ academicYear, schoolId, period });
    }
    return this.ready();
  }
);

Meteor.publish("adminUbtOfficialRatings", function (academicYear, period) {
  if (academicYear && period)
    return UbtOfficialRatings.find({ academicYear, period });

  return this.ready();
});

Meteor.publish(
  "adminKetPetRatingsCompare",
  function (academicYear, examPeriod) {
    if (this.userId) {
      let year = +academicYear.split("-")[0];
      let previousYear = year - 1 + "-" + year;

      return KetPetRatings.find({
        academicYear: { $in: [previousYear, academicYear] },
        examPeriod,
      });
    }
    return this.ready();
  }
);

Meteor.publish("adminKetPetRatingsCompareAdvanced", function () {
  if (this.userId) {
    return KetPetRatings.find({});
  }
  return this.ready();
});

Meteor.publish("examinationActivityLog", function () {
  return ExaminationActivityLog.find({});
});
