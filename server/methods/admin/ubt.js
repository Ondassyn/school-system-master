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

        UbtOfficialResults.update({ _id: ubtResult._id }, { $set: ubtResult });
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
  "Ubt.calculateRating": function (academicYear, period, schoolId) {
    if (Roles.userIsInRole(this.userId, "admin")) {
      if (schoolId === "all") {
        let schools = Schools.find({});
        schools.map((school) => {
          let rating = {
            academicYear,
            period,
            schoolId: school.schoolId,
          };

          let results = UbtOfficialResults.find({
            academicYear,
            period,
            schoolId: school.schoolId,
          });
          if (results) {
            let totalTotal = 0;
            let totalN = 0;
            let math_literacyTotal = 0;
            let math_literacyN = 0;
            let reading_literacyTotal = 0;
            let reading_literacyN = 0;
            let kazakh_historyTotal = 0;
            let kazakh_historyN = 0;
            let algebraTotal = 0;
            let algebraN = 0;
            let physicsTotal = 0;
            let physicsN = 0;
            let chemistryTotal = 0;
            let chemistryN = 0;
            let biologyTotal = 0;
            let biologyN = 0;
            let geographyTotal = 0;
            let geographyN = 0;
            let foreign_languageTotal = 0;
            let foreign_languageN = 0;
            let world_historyTotal = 0;
            let world_historyN = 0;
            let community_rightsTotal = 0;
            let community_rightsN = 0;
            let kazakh_russian_languageTotal = 0;
            let kazakh_russian_languageN = 0;
            let kazakh_russian_literatureTotal = 0;
            let kazakh_russian_literatureN = 0;

            results.map((result) => {
              if (result.total) {
                totalTotal += result.total;
                totalN++;
              }
              if (result.math_literacy && !isNaN(result.math_literacy)) {
                math_literacyTotal += result.math_literacy;
                math_literacyN++;
              }
              if (result.reading_literacy && !isNaN(result.reading_literacy)) {
                reading_literacyTotal += result.reading_literacy;
                reading_literacyN++;
              }
              if (result.kazakh_history && !isNaN(result.kazakh_history)) {
                kazakh_historyTotal += result.kazakh_history;
                kazakh_historyN++;
              }
              if (result.algebra && !isNaN(result.algebra)) {
                algebraTotal += result.algebra;
                algebraN++;
              }
              if (result.physics && !isNaN(result.physics)) {
                physicsTotal += result.physics;
                physicsN++;
              }
              if (result.chemistry && !isNaN(result.chemistry)) {
                chemistryTotal += result.chemistry;
                chemistryN++;
              }
              if (result.biology && !isNaN(result.biology)) {
                biologyTotal += result.biology;
                biologyN++;
              }
              if (result.geography && !isNaN(result.geography)) {
                geographyTotal += result.geography;
                geographyN++;
              }
              if (result.foreign_language && !isNaN(result.foreign_language)) {
                foreign_languageTotal += result.foreign_language;
                foreign_languageN++;
              }
              if (result.world_history && !isNaN(result.world_history)) {
                world_historyTotal += result.world_history;
                world_historyN++;
              }
              if (result.community_rights && !isNaN(result.community_rights)) {
                community_rightsTotal += result.community_rights;
                community_rightsN++;
              }
              if (
                result.kazakh_russian_language &&
                !isNaN(result.kazakh_russian_language)
              ) {
                kazakh_russian_languageTotal += result.kazakh_russian_language;
                kazakh_russian_languageN++;
              }
              if (
                result.kazakh_russian_literature &&
                !isNaN(result.kazakh_russian_literature)
              ) {
                kazakh_russian_literatureTotal +=
                  result.kazakh_russian_literature;
                kazakh_russian_literatureN++;
              }
            });

            if (totalN) {
              rating.total = totalTotal / totalN;
            }
            if (math_literacyN) {
              rating.math_literacy = math_literacyTotal / math_literacyN;
            }
            if (reading_literacyN) {
              rating.reading_literacy =
                reading_literacyTotal / reading_literacyN;
            }
            if (kazakh_historyN) {
              rating.kazakh_history = kazakh_historyTotal / kazakh_historyN;
            }
            if (algebraN) {
              rating.algebra = algebraTotal / algebraN;
            }
            if (physicsN) {
              rating.physics = physicsTotal / physicsN;
            }
            if (chemistryN) {
              rating.chemistry = chemistryTotal / chemistryN;
            }
            if (biologyN) {
              rating.biology = biologyTotal / biologyN;
            }
            if (geographyN) {
              rating.geography = geographyTotal / geographyN;
            }
            if (foreign_languageN) {
              rating.foreign_language =
                foreign_languageTotal / foreign_languageN;
            }
            if (world_historyN) {
              rating.world_history = world_historyTotal / world_historyN;
            }
            if (community_rightsN) {
              rating.community_rights =
                community_rightsTotal / community_rightsN;
            }
            if (kazakh_russian_languageN) {
              rating.kazakh_russian_language =
                kazakh_russian_languageTotal / kazakh_russian_languageN;
            }
            if (kazakh_russian_literatureN) {
              rating.kazakh_russian_literature =
                kazakh_russian_literatureTotal / kazakh_russian_literatureN;
            }
          }

          let recordInDb = UbtOfficialRatings.findOne({
            academicYear,
            period,
            schoolId: school.schoolId,
          });
          if (recordInDb) {
            UbtOfficialResults.update(
              { _id: recordInDb._id },
              { $set: rating }
            );
          } else {
            UbtOfficialRatings.insert(rating);
          }
        });
      } else {
        let rating = {
          academicYear,
          period,
          schoolId,
        };

        let results = UbtOfficialResults.find({
          academicYear,
          period,
          schoolId,
        });
        if (results) {
          let totalTotal = 0;
          let totalN = 0;
          let math_literacyTotal = 0;
          let math_literacyN = 0;
          let reading_literacyTotal = 0;
          let reading_literacyN = 0;
          let kazakh_historyTotal = 0;
          let kazakh_historyN = 0;
          let algebraTotal = 0;
          let algebraN = 0;
          let physicsTotal = 0;
          let physicsN = 0;
          let chemistryTotal = 0;
          let chemistryN = 0;
          let biologyTotal = 0;
          let biologyN = 0;
          let geographyTotal = 0;
          let geographyN = 0;
          let foreign_languageTotal = 0;
          let foreign_languageN = 0;
          let world_historyTotal = 0;
          let world_historyN = 0;
          let community_rightsTotal = 0;
          let community_rightsN = 0;
          let kazakh_russian_languageTotal = 0;
          let kazakh_russian_languageN = 0;
          let kazakh_russian_literatureTotal = 0;
          let kazakh_russian_literatureN = 0;

          results.map((result) => {
            if (result.total) {
              totalTotal += result.total;
              totalN++;
            }
            if (result.math_literacy && !isNaN(result.math_literacy)) {
              math_literacyTotal += result.math_literacy;
              math_literacyN++;
            }
            if (result.reading_literacy && !isNaN(result.reading_literacy)) {
              reading_literacyTotal += result.reading_literacy;
              reading_literacyN++;
            }
            if (result.kazakh_history && !isNaN(result.kazakh_history)) {
              kazakh_historyTotal += result.kazakh_history;
              kazakh_historyN++;
            }
            if (result.algebra && !isNaN(result.algebra)) {
              algebraTotal += result.algebra;
              algebraN++;
            }
            if (result.physics && !isNaN(result.physics)) {
              physicsTotal += result.physics;
              physicsN++;
            }
            if (result.chemistry && !isNaN(result.chemistry)) {
              chemistryTotal += result.chemistry;
              chemistryN++;
            }
            if (result.biology && !isNaN(result.biology)) {
              biologyTotal += result.biology;
              biologyN++;
            }
            if (result.geography && !isNaN(result.geography)) {
              geographyTotal += result.geography;
              geographyN++;
            }
            if (result.foreign_language && !isNaN(result.foreign_language)) {
              foreign_languageTotal += result.foreign_language;
              foreign_languageN++;
            }
            if (result.world_history && !isNaN(result.world_history)) {
              world_historyTotal += result.world_history;
              world_historyN++;
            }
            if (result.community_rights && !isNaN(result.community_rights)) {
              community_rightsTotal += result.community_rights;
              community_rightsN++;
            }
            if (
              result.kazakh_russian_language &&
              !isNaN(result.kazakh_russian_language)
            ) {
              kazakh_russian_languageTotal += result.kazakh_russian_language;
              kazakh_russian_languageN++;
            }
            if (
              result.kazakh_russian_literature &&
              !isNaN(result.kazakh_russian_literature)
            ) {
              kazakh_russian_literatureTotal +=
                result.kazakh_russian_literature;
              kazakh_russian_literatureN++;
            }
          });

          if (totalN) {
            rating.total = totalTotal / totalN;
          }
          if (math_literacyN) {
            rating.math_literacy = math_literacyTotal / math_literacyN;
          }
          if (reading_literacyN) {
            rating.reading_literacy = reading_literacyTotal / reading_literacyN;
          }
          if (kazakh_historyN) {
            rating.kazakh_history = kazakh_historyTotal / kazakh_historyN;
          }
          if (algebraN) {
            rating.algebra = algebraTotal / algebraN;
          }
          if (physicsN) {
            rating.physics = physicsTotal / physicsN;
          }
          if (chemistryN) {
            rating.chemistry = chemistryTotal / chemistryN;
          }
          if (biologyN) {
            rating.biology = biologyTotal / biologyN;
          }
          if (geographyN) {
            rating.geography = geographyTotal / geographyN;
          }
          if (foreign_languageN) {
            rating.foreign_language = foreign_languageTotal / foreign_languageN;
          }
          if (world_historyN) {
            rating.world_history = world_historyTotal / world_historyN;
          }
          if (community_rightsN) {
            rating.community_rights = community_rightsTotal / community_rightsN;
          }
          if (kazakh_russian_languageN) {
            rating.kazakh_russian_language =
              kazakh_russian_languageTotal / kazakh_russian_languageN;
          }
          if (kazakh_russian_literatureN) {
            rating.kazakh_russian_literature =
              kazakh_russian_literatureTotal / kazakh_russian_literatureN;
          }
        }

        let recordInDb = UbtOfficialRatings.findOne({
          academicYear,
          period,
          schoolId,
        });
        if (recordInDb) {
          UbtOfficialRatings.update({ _id: recordInDb._id }, { $set: rating });
        } else {
          UbtOfficialRatings.insert(rating);
        }
      }
    } else {
      throw new Meteor.Error("auth-error", "Admin rights required.");
    }
  },
});
