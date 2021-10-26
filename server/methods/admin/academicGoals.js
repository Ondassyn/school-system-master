import { Meteor } from "meteor/meteor";

Meteor.methods({
  "AcademicGoals.updateAdminAcademicGoals": function (
    academicYear,
    studentId,
    grade,
    editItem,
    schoolId
  ) {
    if (Roles.userIsInRole(this.userId, "admin")) {
      let satResult = AcademicGoals.findOne({ academicYear, studentId });

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

        AcademicGoals.update({ academicYear, studentId }, { $set: satResult });
        ExaminationActivityLog.insert({
          createdAt: new Date(),
          userRole: "admin",
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

        AcademicGoals.insert(satRecord);
        ExaminationActivityLog.insert({
          createdAt: new Date(),
          userRole: "admin",
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
});
