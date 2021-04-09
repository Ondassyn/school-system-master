import { Meteor } from "meteor/meteor";

Meteor.methods({
  "Sat.updateSchoolSatResults": function (
    academicYear,
    studentId,
    grade,
    editItem
  ) {
    if (
      Roles.userIsInRole(this.userId, "school") ||
      Roles.userIsInRole(this.userId, "schoolCoordinator") ||
      Roles.userIsInRole(this.userId, "admin")
    ) {
      let schoolId = Schools.findOne({ userId: this.userId }).schoolId;
      let satResult = SatResults.findOne({ academicYear, studentId });

      if (satResult) {
        satResult.sat1_english = editItem.sat1_english
          ? Number(editItem.sat1_english)
          : "";
        satResult.sat1_math = editItem.sat1_math
          ? Number(editItem.sat1_math)
          : "";
        satResult.sat1_total = editItem.sat1_total
          ? Number(editItem.sat1_total)
          : "";
        satResult.sat2_world_history = editItem.sat2_world_history
          ? Number(editItem.sat2_world_history)
          : "";
        satResult.sat2_math1 = editItem.sat2_math1
          ? Number(editItem.sat2_math1)
          : "";
        satResult.sat2_math2 = editItem.sat2_math2
          ? Number(editItem.sat2_math2)
          : "";
        satResult.sat2_biology = editItem.sat2_biology
          ? Number(editItem.sat2_biology)
          : "";
        satResult.sat2_chemistry = editItem.sat2_chemistry
          ? Number(editItem.sat2_chemistry)
          : "";
        satResult.sat2_physics = editItem.sat2_physics
          ? Number(editItem.sat2_physics)
          : "";
        satResult.sat2_total = editItem.sat2_total
          ? Number(editItem.sat2_total)
          : "";

        satResult.updatedAt = new Date();

        SatResults.update({ academicYear, studentId }, { $set: satResult });
        ExaminationActivityLog.insert({
          createdAt: new Date(),
          userRole: "school",
          examName: "SAT",
          examNo: "",
          action: "update",
          academicYear,
          schoolId,
          grade,
          studentId,
        });
      } else {
        let satRecord = {
          studentId,
          academicYear,
          grade,
          schoolId,
          createdAt: new Date(),
          sat1_english: editItem.sat1_english
            ? Number(editItem.sat1_english)
            : "",
          sat1_math: editItem.sat1_math ? Number(editItem.sat1_math) : "",
          sat1_total: editItem.sat1_total ? Number(editItem.sat1_total) : "",
          sat2_world_history: editItem.sat2_world_history
            ? Number(editItem.sat2_world_history)
            : "",
          sat2_math1: editItem.sat2_math1 ? Number(editItem.sat2_math1) : "",
          sat2_math2: editItem.sat2_math2 ? Number(editItem.sat2_math2) : "",
          sat2_biology: editItem.sat2_biology
            ? Number(editItem.sat2_biology)
            : "",
          sat2_chemistry: editItem.sat2_chemistry
            ? Number(editItem.sat2_chemistry)
            : "",
          sat2_physics: editItem.sat2_physics
            ? Number(editItem.sat2_physics)
            : "",
          sat2_total: editItem.sat2_total ? Number(editItem.sat2_total) : "",
        };

        SatResults.insert(satRecord);
        ExaminationActivityLog.insert({
          createdAt: new Date(),
          userRole: "school",
          examName: "SAT",
          examNo: "",
          action: "insert",
          academicYear,
          schoolId,
          grade,
          studentId,
        });
      }
    } else {
      throw new Meteor.Error("auth-error", "School rights required.");
    }
  },
  "Ielts.updateSchoolIeltsResults": function (
    academicYear,
    studentId,
    grade,
    editItem
  ) {
    if (
      Roles.userIsInRole(this.userId, "school") ||
      Roles.userIsInRole(this.userId, "schoolCoordinator") ||
      Roles.userIsInRole(this.userId, "admin")
    ) {
      let schoolId = Schools.findOne({ userId: this.userId }).schoolId;
      let ieltsResult = IeltsResults.findOne({ academicYear, studentId });

      if (ieltsResult) {
        ieltsResult.listening = editItem.ielts_listening
          ? Number(editItem.ielts_listening)
          : "";
        ieltsResult.reading = editItem.ielts_reading
          ? Number(editItem.ielts_reading)
          : "";
        ieltsResult.writing = editItem.ielts_writing
          ? Number(editItem.ielts_writing)
          : "";
        ieltsResult.speaking = editItem.ielts_speaking
          ? Number(editItem.ielts_speaking)
          : "";
        ieltsResult.total = editItem.ielts_total
          ? Number(editItem.ielts_total)
          : "";

        ieltsResult.updatedAt = new Date();

        IeltsResults.update({ academicYear, studentId }, { $set: ieltsResult });
        ExaminationActivityLog.insert({
          createdAt: new Date(),
          userRole: "school",
          examName: "IELTS",
          examNo: "",
          action: "update",
          academicYear,
          schoolId,
          grade,
          studentId,
        });
      } else {
        let ieltsRecord = {
          studentId,
          academicYear,
          grade,
          schoolId,
          createdAt: new Date(),
          listening: editItem.ielts_listening
            ? Number(editItem.ielts_listening)
            : "",
          reading: editItem.ielts_reading ? Number(editItem.ielts_reading) : "",
          writing: editItem.ielts_writing ? Number(editItem.ielts_writing) : "",
          speaking: editItem.ielts_speaking
            ? Number(editItem.ielts_speaking)
            : "",
          total: editItem.ielts_total ? Number(editItem.ielts_total) : "",
        };

        IeltsResults.insert(ieltsRecord);
        ExaminationActivityLog.insert({
          createdAt: new Date(),
          userRole: "school",
          examName: "IELTS",
          examNo: "",
          action: "insert",
          academicYear,
          schoolId,
          grade,
          studentId,
        });
      }
    } else {
      throw new Meteor.Error("auth-error", "School rights required.");
    }
  },
});
