import { uploadTxt } from "../../modules/turkishA18/uploadTxt";
import { uploadXlsx } from "../../modules/turkishA18/uploadXlsx";
// import { calculateRating } from "../../modules/bts/rating20_21";

Meteor.methods({
  "TurkishA18Results.UploadTxt": function (academicYear, results) {
    bts = Configs.findOne({
      _id: "turkishA18Upload",
    });

    if (!Roles.userIsInRole(this.userId, "school"))
      throw new Meteor.Error("access-denied", "Access denied!");

    let school = Schools.findOne({
      userId: this.userId,
    });

    if (!school) school = Schools.findOne({ coordinatorId: this.userId });

    if (school) {
      uploadTxt(academicYear, school.schoolId, results);
      // calculateRating(academicYear,btsNo,day,school.schoolId)
    }
  },

  "TurkishA18Results.UploadXlsx": function (academicYear, results) {
    if (
      !Roles.userIsInRole(this.userId, "school") &&
      !Roles.userIsInRole(this.userId, "schoolCoordinator")
    )
      throw new Meteor.Error("access-denied", "Access denied!");

    let school = Schools.findOne({
      userId: this.userId,
    });

    if (!school) school = Schools.findOne({ coordinatorId: this.userId });

    if (school) {
      uploadXlsx(academicYear, school.schoolId, results);
    }
  },
});
