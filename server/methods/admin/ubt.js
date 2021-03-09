import { Meteor } from "meteor/meteor";

Meteor.methods({
  "Ubt.updateAdminUbtOfficialResults": function (
    academicYear,
    period,
    schoolId,
    studentId,
    editItem
  ) {
    if (Roles.userIsInRole(this.userId, "admin")) {
      if (!schoolId) {
        throw new Meteor.Error("data-error", "School has not been found.");
      }

      let ubtResult = UbtOfficialResults.findOne({
        academicYear,
        period,
        studentId,
      });

      if (ubtResult) {
        ubtResult.total =
          editItem.total || editItem.total === "0"
            ? Number(editItem.total)
            : "";
        ubtResult.math_literacy =
          editItem.math_literacy || editItem.math_literacy
            ? Number(editItem.math_literacy)
            : "";
        ubtResult.reading_literacy =
          editItem.reading_literacy || editItem.reading_literacy === "0"
            ? Number(editItem.reading_literacy)
            : "";
        ubtResult.kazakh_history =
          editItem.kazakh_history || editItem.kazakh_history === "0"
            ? Number(editItem.kazakh_history)
            : "";
        ubtResult.algebra =
          editItem.algebra || editItem.algebra === "0"
            ? Number(editItem.algebra)
            : "";
        ubtResult.physics =
          editItem.physics || editItem.physics === "0"
            ? Number(editItem.physics)
            : "";
        ubtResult.chemistry =
          editItem.chemistry || editItem.chemistry === "0"
            ? Number(editItem.chemistry)
            : "";
        ubtResult.biology =
          editItem.biology || editItem.biology === "0"
            ? Number(editItem.biology)
            : "";
        ubtResult.geography =
          editItem.geography || editItem.geography === "0"
            ? Number(editItem.geography)
            : "";
        ubtResult.foreign_language =
          editItem.foreign_language || editItem.foreign_language === "0"
            ? Number(editItem.foreign_language)
            : "";
        ubtResult.world_history =
          editItem.world_history || editItem.world_history === "0"
            ? Number(editItem.world_history)
            : "";
        ubtResult.community_rights =
          editItem.community_rights || editItem.community_rights === "0"
            ? Number(editItem.community_rights)
            : "";
        ubtResult.kazakh_russian_language =
          editItem.kazakh_russian_language ||
          editItem.kazakh_russian_language === "0"
            ? Number(editItem.kazakh_russian_language)
            : "";
        ubtResult.kazakh_russian_literature =
          editItem.kazakh_russian_literature ||
          editItem.kazakh_russian_literature === "0"
            ? Number(editItem.kazakh_russian_literature)
            : "";

        UbtOfficialResults.update(
          { academicYear, studentId },
          { $set: ubtResult }
        );
        ExaminationActivityLog.insert({
          createdAt: new Date(),
          userRole: "admin",
          examName: "ҰБТ",
          examNo: period,
          action: "update",
          academicYear,
          schoolId,
          grade: "11",
          studentId,
        });
      } else {
        let ubtRecord = {
          studentId,
          academicYear,
          period,
          schoolId,
          total:
            editItem.total || editItem.total === "0"
              ? Number(editItem.total)
              : "",
          math_literacy:
            editItem.math_literacy || editItem.math_literacy
              ? Number(editItem.math_literacy)
              : "",
          reading_literacy:
            editItem.reading_literacy || editItem.reading_literacy === "0"
              ? Number(editItem.reading_literacy)
              : "",
          kazakh_history:
            editItem.kazakh_history || editItem.kazakh_history === "0"
              ? Number(editItem.kazakh_history)
              : "",
          algebra:
            editItem.algebra || editItem.algebra === "0"
              ? Number(editItem.algebra)
              : "",
          physics:
            editItem.physics || editItem.physics === "0"
              ? Number(editItem.physics)
              : "",
          chemistry:
            editItem.chemistry || editItem.chemistry === "0"
              ? Number(editItem.chemistry)
              : "",
          biology:
            editItem.biology || editItem.biology === "0"
              ? Number(editItem.biology)
              : "",
          geography:
            editItem.geography || editItem.geography === "0"
              ? Number(editItem.geography)
              : "",
          foreign_language:
            editItem.foreign_language || editItem.foreign_language === "0"
              ? Number(editItem.foreign_language)
              : "",
          world_history:
            editItem.world_history || editItem.world_history === "0"
              ? Number(editItem.world_history)
              : "",
          community_rights:
            editItem.community_rights || editItem.community_rights === "0"
              ? Number(editItem.community_rights)
              : "",
          kazakh_russian_language:
            editItem.kazakh_russian_language ||
            editItem.kazakh_russian_language === "0"
              ? Number(editItem.kazakh_russian_language)
              : "",
          kazakh_russian_literature:
            editItem.kazakh_russian_literature ||
            editItem.kazakh_russian_literature === "0"
              ? Number(editItem.kazakh_russian_literature)
              : "",
        };

        UbtOfficialResults.insert(ubtRecord);
        ExaminationActivityLog.insert({
          createdAt: new Date(),
          userRole: "admin",
          examName: "ҰБТ",
          examNo: period,
          action: "insert",
          academicYear,
          schoolId,
          grade: "11",
          studentId,
        });
      }
    } else {
      throw new Meteor.Error("auth-error", "Admin rights required.");
    }
  },
});
