import { Meteor } from "meteor/meteor";

Meteor.publish("schoolStudents", function () {
  if (this.userId) {
    let school = Schools.findOne({ userId: this.userId });
    if (!school) school = Schools.findOne({ coordinatorId: this.userId });
    if (school) {
      return Students.find({ schoolId: school.schoolId });
    }
  }
  return this.ready();
});

Meteor.publish("schoolSatResults", function (grade) {
  if (this.userId) {
    let school = Schools.findOne({ userId: this.userId });
    if (!school) school = Schools.findOne({ coordinatorId: this.userId });
    if (school)
      return SatResults.find({ grade: grade, schoolId: school.schoolId });
  }
  return this.ready();
});

Meteor.publish("schoolIeltsResults", function (grade) {
  if (this.userId) {
    let school = Schools.findOne({ userId: this.userId });
    if (!school) school = Schools.findOne({ coordinatorId: this.userId });
    if (school)
      return IeltsResults.find({ grade: grade, schoolId: school.schoolId });
  }
  return this.ready();
});

Meteor.publish("schoolUbtOfficialResults", function (period) {
  if (this.userId) {
    let school = Schools.findOne({ userId: this.userId });
    if (!school) school = Schools.findOne({ coordinatorId: this.userId });
    if (school)
      return UbtOfficialResults.find({ schoolId: school.schoolId, period });
  }
  return this.ready();
});

Meteor.publish("turkishA1SchoolResults", function (academicYear) {
  if (this.userId) {
    let school = Schools.findOne({ userId: this.userId });
    if (!school) school = Schools.findOne({ coordinatorId: this.userId });
    return TurkishA1Results.find({ academicYear, schoolId: school.schoolId });
  }
  return this.ready();
});
