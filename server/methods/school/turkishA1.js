import { uploadTxt } from "../../modules/turkishA1/uploadTxt";
import { uploadXlsx } from "../../modules/turkishA1/uploadXlsx";
// import { calculateRating } from "../../modules/bts/rating20_21";

Meteor.methods({
  "TurkishA1Results.UploadTxt": function (academicYear, no, results) {
    bts = Configs.findOne({
      _id: "turkishA1Upload",
    });

    if (!Roles.userIsInRole(this.userId, "school"))
      throw new Meteor.Error("access-denied", "Access denied!");

    let school = Schools.findOne({
      userId: this.userId,
    });

    if (!school) school = Schools.findOne({ coordinatorId: this.userId });

    if (school) {
      uploadTxt(academicYear, school.schoolId, no, results);
      // calculateRating(academicYear,btsNo,day,school.schoolId)
    }
  },

  "TurkishA1Results.UploadXlsx": function (academicYear, no, results) {
    if (
      !Roles.userIsInRole(this.userId, "school") &&
      !Roles.userIsInRole(this.userId, "schoolCoordinator")
    ) {
      throw new Meteor.Error("access-denied", "Access denied!");
    }
    let school = Schools.findOne({
      userId: this.userId,
    });

    if (!school) school = Schools.findOne({ coordinatorId: this.userId });

    if (school) {
      uploadXlsx(academicYear, school.schoolId, no, results);
    }
  },
});
