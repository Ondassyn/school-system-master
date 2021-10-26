import { Meteor } from "meteor/meteor";

Meteor.methods({
  "AcademicGoals.updateSchoolAcademicGoals": function (
    academicYear,
    goalId,
    editItem
  ) {
    if (
      Roles.userIsInRole(this.userId, "school") ||
      Roles.userIsInRole(this.userId, "schoolCoordinator") ||
      Roles.userIsInRole(this.userId, "admin")
    ) {
      let schoolId = Schools.findOne({ userId: this.userId }).schoolId;
      let academicGoal = AcademicGoals.findOne({ academicYear, schoolId });

      if (academicGoal) {
        academicGoal["goal" + goalId + "_completed"] = editItem.completed
          ? Number(editItem.completed)
          : "";
        academicGoal["goal" + goalId + "_target"] = editItem.target
          ? Number(editItem.target)
          : "";

        academicGoal.updatedAt = new Date();

        AcademicGoals.update(
          { academicYear, schoolId },
          { $set: academicGoal }
        );
      } else {
        let record = {
          academicYear,
          schoolId,

          createdAt: new Date(),
          ["goal" + goalId + "_completed"]: editItem.completed
            ? Number(editItem.completed)
            : "",
          ["goal" + goalId + "_target"]: editItem.target
            ? Number(editItem.target)
            : "",
        };

        AcademicGoals.insert(record);
      }
    } else {
      throw new Meteor.Error("auth-error", "School rights required.");
    }
  },
});
