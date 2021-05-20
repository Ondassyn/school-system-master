import { calculateRating } from "../../modules/bts/rating";
import { recheck } from "../../modules/turkish/recheck";
import { calculateObj } from "../../modules/bts/calculateObj";

Meteor.methods({
  "TurkishA1Keys.Insert": function (
    academicYear,
    variant,
    no,
    listening,
    reading
  ) {
    if (!this.userId || !Roles.userIsInRole(this.userId, ["admin"]))
      throw new Meteor.Error(401, "Please login as administrator");

    //check if same variant exists in database
    let sameVariant = TurkishA1Keys.findOne({
      academicYear,
      variant,
      no,
    });
    if (sameVariant)
      throw new Meteor.Error(
        322,
        "Answer keys with same variant already exists please change variant"
      );
    let keysId = TurkishA1Keys.insert({
      academicYear,
      variant,
      no,
      listening,
      reading,
    });
    return keysId;
  },

  "TurkishA1Keys.Delete": function (id) {
    if (Roles.userIsInRole(this.userId, ["admin"])) {
      let answerKeys = TurkishA1Keys.findOne({ _id: id });
      if (answerKeys) {
        TurkishA1Keys.remove({ _id: id });
      }
    } else {
      throw new Meteor.Error("auth-error", "Admin rights required.");
    }
  },

  "TurkishA1Keys.Update": function (id, answerKeys) {
    if (!this.userId || !Roles.userIsInRole(this.userId, ["admin"]))
      throw new Meteor.Error(401, "Please login as administrator");

    sameVariant = TurkishA1Keys.findOne({ _id: id });
    if (sameVariant) {
      TurkishA1Keys.update({ _id: id }, { $set: answerKeys });
    }
  },
});
