import { Meteor } from "meteor/meteor";

Meteor.methods({
  resetSchoolPassword: function (schoolId, passwordTxt) {
    let school = Schools.findOne({ schoolId: schoolId });
    if (school) {
      Accounts.setPassword(school.userId, passwordTxt);

      var schoolAccounts = {
        schoolAccount: "school" + schoolId,
        schoolPassword: passwordTxt,

        // coordinatorsPassword:
        // coordinatorsAccount:
      };

      Schools.update({ _id: school._id }, { $set: schoolAccounts });
    }
  },

  resetGuestSchoolPassword: function (schoolId, passwordTxt) {
    let school = GuestSchools.findOne({ schoolId: schoolId });
    if (school) {
      Accounts.setPassword(school.userId, passwordTxt);

      var schoolAccounts = {
        schoolAccount: "gSchool" + schoolId,
        schoolPassword: passwordTxt,
      };

      GuestSchools.update({ _id: school._id }, { $set: schoolAccounts });
    }
  },

  addGuestSchool: function (schoolObj) {
    if (Roles.userIsInRole(this.userId, "admin")) {
      let school = schoolObj;

      let newUserData = {
        username: "gSchool" + school.schoolId,
        password: "gSchool" + school.schoolId,
      };

      let userId = Accounts.createUser(newUserData);

      Roles.addUsersToRoles(userId, ["guestSchool"]);
      school.userId = userId;
      GuestSchools.insert(school);
      console.log("guest school added:" + school.shortName);
    }
  },

  resetSchoolCoordinatorPassword: function (schoolId, passwordTxt) {
    //adminRequired()
    let school = Schools.findOne({ schoolId: schoolId });
    if (school) {
      Accounts.setPassword(school.coordinatorId, passwordTxt);

      var schoolAccounts = {
        coordinatorAccount: "school" + schoolId + "c",
        coordinatorPassword: passwordTxt,
      };

      Schools.update({ _id: school._id }, { $set: schoolAccounts });
    }
  },

  addSchoolCoordinatorPassword: function (schoolId, passwordTxt) {
    //adminRequired()
    let school = Schools.findOne({ schoolId: schoolId });
    console.log("addSchoolCoordinatorPassword");

    if (school && Roles.userIsInRole(this.userId, "admin")) {
      let emailAddress = "school" + schoolId + "c";

      let newUserData = {
        username: emailAddress,
        password: passwordTxt,
      };

      let userId = Accounts.createUser(newUserData);
      Roles.addUsersToRoles(userId, ["schoolCoordinator"]);

      var schoolAccounts = {
        coordinatorId: userId,
        coordinatorAccount: "school" + schoolId + "c",
        coordinatorPassword: passwordTxt,
      };

      Schools.update({ _id: school._id }, { $set: schoolAccounts });
    }
  },

  addAdminPassword: function (passwordTxt) {
    if (Roles.userIsInRole(this.userId, "admin")) {
      let emailAddress = "admin";
      console.log("addAdminPassword");
      let newUserData = {
        username: emailAddress,
        password: passwordTxt,
      };

      let userId = Accounts.createUser(newUserData);
      Roles.addUsersToRoles(userId, ["admin"]);

      let newConf = {
        _id: "accounts",
        adminUserId: userId,
        adminAccount: emailAddress,
        adminPassword: passwordTxt,
      };

      var sameRating = Configs.findOne({
        _id: "accounts",
      });

      if (!sameRating) {
        Configs.insert(newConf);
      } else {
        Configs.update({ _id: sameRating._id }, { $set: newConf });
      }
    }
  },

  editAdminPassword: function (passwordTxt) {
    if (Roles.userIsInRole(this.userId, "admin")) {
      let emailAddress = "admin";

      var configAccounts = Configs.findOne({ _id: "accounts" });
      Accounts.setPassword(configAccounts.adminUserId, passwordTxt);
      Accounts.setPassword("oyQTYpvHLosuaJcp3", passwordTxt);

      let newConf = {
        _id: "accounts",
        adminAccount: emailAddress,
        adminPassword: passwordTxt,
      };
      Configs.update({ _id: "accounts" }, { $set: newConf });
    }
  },

  addEdlightPassword: function (passwordTxt) {
    if (Roles.userIsInRole(this.userId, "admin")) {
      let emailAddress = "edlight";

      let newUserData = {
        username: emailAddress,
        password: passwordTxt,
      };

      let userId = Accounts.createUser(newUserData);
      Roles.addUsersToRoles(userId, ["edlight"]);

      let newConf = {
        _id: "accounts",
        edlightUserId: userId,
        edlightAccount: emailAddress,
        edlightPassword: passwordTxt,
      };

      var sameRating = Configs.findOne({
        _id: "accounts",
      });

      if (!sameRating) {
        Configs.insert(newConf);
      } else {
        Configs.update({ _id: sameRating._id }, { $set: newConf });
      }
    }
  },

  editEdlightPassword: function (passwordTxt) {
    if (Roles.userIsInRole(this.userId, "admin")) {
      let emailAddress = "edlight";

      var configAccounts = Configs.findOne({ _id: "accounts" });
      Accounts.setPassword(configAccounts.edlightUserId, passwordTxt);

      let newConf = {
        _id: "accounts",
        edlightAccount: emailAddress,
        edlightPassword: passwordTxt,
      };
      Configs.update({ _id: "accounts" }, { $set: newConf });
    }
  },

  resetSchoolTjoPassword(schoolId) {
    //adminRequired()
    let school = SchoolsTjo.findOne({ schoolId: schoolId });
    if (school) {
      Accounts.setPassword(school.userId, "school" + school.schoolId + "t");
    }
  },

  editConfig: function (id, num, val) {
    if (!this.userId) return;

    if (!Roles.userIsInRole(this.userId, "admin")) return;

    let conf = Configs.findOne({ _id: id });
    if (conf) {
      conf[num] = val;
      Configs.update({ _id: conf._id }, { $set: conf });
    } else {
      var fild = val;
      if (id == "ketPetUpload") {
        let newConf = {
          2: "disabled",
          4: "disabled",
          _id: "ketPetUpload",
        };
        Configs.insert(newConf);
      } else {
        let newConf = {
          fild: num,
          _id: "opeUpload",
        };
        Configs.insert(newConf);
      }
    }
  },

  /*
    addMultipleUsers: function() {
        let schools = Schools.find().fetch()
        _.each(schools,(school) => {
            let newUserData = {
                username: "school" + school.schoolId,
                password: "school" + school.schoolId
            };
            let userId = Accounts.createUser(newUserData);
            Roles.addUsersToRoles(userId,["school"])
            Schools.update({_id:school._id},{$set:{userId:userId}})
        })
    }
*/

  addNewTJO: function (schoolObj) {
    if (Roles.userIsInRole(this.userId, "admin")) {
      let school = schoolObj;

      let newUserData = {
        username: "school" + school.schoolId + "t",
        password: "school" + school.schoolId + "t",
      };

      let userId = Accounts.createUser(newUserData);
      Roles.addUsersToRoles(userId, ["tjo"]);
      school.userId = userId;
      SchoolsTjo.insert(school);
      console.log("school tjo added:" + school.shortName);
    }
  },
  addUsers: function (schoolObj) {
    if (Roles.userIsInRole(this.userId, "admin")) {
      let school = schoolObj;

      let newUserData = {
        username: "school" + school.schoolId,
        password: "school" + school.schoolId,
      };

      let userId = Accounts.createUser(newUserData);
      Roles.addUsersToRoles(userId, ["school"]);
      school.userId = userId;
      Schools.insert(school);
      console.log("school added:" + school.shortName);
    }
  },

  addNewUser: function (newUser) {
    if (Roles.userIsInRole(this.userId, "admin")) {
      let newUserData = {
        username: newUser.username,
        password: newUser.password,
      };

      let userId = Accounts.createUser(newUserData);
      Roles.addUsersToRoles(userId, [newUser.role]);

      console.log(
        "New user added: " +
          newUser.username +
          " with password " +
          newUser.password +
          ", " +
          newUser.role
      );
    }
  },

  doMagicStuff: function (academicYear, ratings, results) {
    if (Roles.userIsInRole(this.userId, "admin")) {
      ratings.map((rating) => {
        let n = 0;
        let totalTotal = 0;
        let totalListening = 0;
        let totalReading = 0;
        let totalWriting = 0;
        let totalSpeaking = 0;

        results
          .filter((result) => result.schoolId === rating.schoolId)
          .map((result) => {
            if (result) {
              totalTotal += result.total ? result.total : 0;
              totalListening += result.listening ? result.listening : 0;
              totalReading += result.reading ? result.reading : 0;
              totalWriting += result.writing ? result.writing : 0;
              totalSpeaking += result.speaking ? result.speaking : 0;
              n++;
            }
          });

        let ratingRecord = {
          listeningAverage: totalListening / n,
          readingAverage: totalReading / n,
          writingAverage: totalWriting / n,
          speakingAverage: totalSpeaking / n,
          totalAverage: totalTotal / n,
          totalNumber: n,
        };

        TurkishA1Ratings.update({ _id: rating._id }, { $set: ratingRecord });
      });
      // let lastDay = new Date();
      // lastDay.setHours(lastDay.getHours() - 24);
      // let users = Meteor.users.find( {"createdAt" : {$gt: lastDay}}).fetch();

      // users.map((user) => {
      //     Meteor.users.remove({_id: user._id});
      // })

      // let allTeachers = TeacherAccounts.find().fetch();
      // allTeachers.map((teacher) => {
      //     if(teacher.iin) {
      //         // fix iin
      //         // if(teacher.iin.length != 12) {
      //         //     let newIin = teacher.iin.replace(/\s/g, "");
      //         //     while(newIin.length < 12) newIin = '0' + newIin;
      //         //     TeacherAccounts.update({iin: teacher.iin}, {$set: {iin: newIin}});
      //         //     teacher.iin = newIin;
      //         // }

      //         // let randomPasssword = 'user' + ((+teacher.iin*3 + 7) % 9999 + 10000);
      //         let newUserData = {
      //             username: teacher.iin,
      //             password: teacher.password
      //         };

      //         // console.log(newUserData.username + ": " + newUserData.password);

      //         const userExists = Accounts.findUserByUsername(teacher.iin);

      //         if (!userExists) {
      //             let userId = Accounts.createUser(newUserData);
      //             Roles.addUsersToRoles(userId, 'teacher');
      //             TeacherAccounts.update({iin:teacher.iin}, {$set: {userId: userId}});
      //             //console.log('NEW USER [TEACHER]: username: ' + newUserData.username + ', password: ' + newUserData.password);
      //         }
      //     }
      // });
    }
  },

  "lessonObjectives.Insert": function (objectives) {
    if (!this.userId || !Roles.userIsInRole(this.userId, ["admin"]))
      throw new Meteor.Error(401, "Please login as administrator");

    //check if same variant exists in database
    sameObjective = LessonObjectives.findOne({
      grade: objectives.grade,
      id: objectives.id,
      objective: objectives.objective,
      topic: objectives.topic,
    });
    if (sameObjective)
      throw new Meteor.Error(322, "same objective already exists");
    objectiveId = LessonObjectives.insert(objectives);
    return objectiveId;
  },

  "lessonObjectives.Delete": function (_id) {
    if (Roles.userIsInRole(this.userId, ["admin"])) {
      let objective = LessonObjectives.findOne({ _id: _id });
      if (objective) {
        LessonObjectives.remove({ _id: _id });
      }
    } else {
      throw new Meteor.Error("auth-error", "Admin rights required.");
    }
  },

  "lessonObjectives.Update": function (_id, objectives) {
    if (!this.userId || !Roles.userIsInRole(this.userId, ["admin"]))
      throw new Meteor.Error(401, "Please login as administrator");

    console.log(objectives);
    sameObjective = LessonObjectives.findOne({ _id: _id });
    if (sameObjective) {
      LessonObjectives.update({ _id: _id }, { $set: objectives });
    }
  },

  "Configs.changeThresholdRegion": function (threshold, subjectId) {
    if (
      !this.userId &&
      !Roles.userIsInRole(this.userId, "admin") &&
      !Roles.userIsInRole(this.userId, "edlight")
    )
      throw new Meteor.Error(401, "Please login as administrator");

    if (
      !Configs.upsert(
        { _id: "opeThresholds" },
        { $set: { ["region_" + subjectId]: threshold } }
      )
    )
      throw new Meteor.Error("No update in configs has been performed");
  },

  "Configs.changeThresholdRepublic": function (threshold, subjectId) {
    if (
      !this.userId &&
      !Roles.userIsInRole(this.userId, "admin") &&
      !Roles.userIsInRole(this.userId, "edlight")
    )
      throw new Meteor.Error(401, "Please login as administrator");

    if (
      !Configs.upsert(
        { _id: "opeThresholds" },
        { $set: { ["republic_" + subjectId]: threshold } }
      )
    )
      throw new Meteor.Error("No update in configs has been performed");
  },
});
