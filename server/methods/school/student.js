import { Meteor } from 'meteor/meteor';
import { uploadStudents } from "../../modules/student/uploadStudents";

Meteor.methods({
    "Student.updateOlympiadSubject": function(student_id,subjectId) {
      if(Roles.userIsInRole(this.userId,'school') ||
        Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let student = Students.findOne({_id:student_id})
            if (student) {
                Students.update({_id:student._id},{$set:{olympiad:subjectId}})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "Student.updateBtsElectiveGroup": function(student_id, electiveGroupId) {
      if(Roles.userIsInRole(this.userId,'school') ||
          Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let student = Students.findOne({_id:student_id})
            if (student) {
                Students.update({_id:student._id},{$set:{electiveGroup:electiveGroupId}})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
  	"Student.Upload":function(academicYear,results) {

      if(!Roles.userIsInRole(this.userId,'school') &&
          !Roles.userIsInRole(this.userId,'schoolCoordinator'))
              throw new Meteor.Error('access-denied', 'Access denied!')

          let school = Schools.findOne({
              userId: this.userId
          })

          if (school) {
              uploadStudents(academicYear,school.schoolId,results)
              // calculateRating(academicYear,school.schoolId)
          }
    },

    "Student.updateJobaSubject": function(student_id,subjectId) {
      if(Roles.userIsInRole(this.userId,'school') ||
        Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let student = Students.findOne({_id:student_id})
            if (student) {
                Students.update({_id:student._id},{$set:{joba:subjectId}})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Student.insert": function(studentObject) {
      if(Roles.userIsInRole(this.userId,'school') ||
        Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let school = Schools.findOne({userId:this.userId})
            if(school) {
                let id = IdCounter.findOne()
                studentId = id['studentId']+1
                IdCounter.update({_id:id._id},{$set:{studentId:studentId}})

                let student = studentObject
                student.studentId = studentId
                student.schoolId = school.schoolId

                Students.insert(student)
                console.log(student.name);
                console.log(student.grade);

                console.log("Inserted");
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Student.update": function(studentObject,student_id) {
      if(Roles.userIsInRole(this.userId,'school') ||
        Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let student = Students.findOne({_id:student_id})
            if(student) {
                Students.update({_id:student_id},{$set:studentObject})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Student.transfer": function(student_id) {
      if(Roles.userIsInRole(this.userId,'school') ||
        Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let student = Students.findOne({_id:student_id})
            if(student) {
                Students.remove({_id:student_id})
                StudentTransferList.insert(student)
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Student.acceptToSchool": function(student_id) {
      if(Roles.userIsInRole(this.userId,'school') ||
        Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let student = StudentTransferList.findOne({_id:student_id})
            if(student) {
                StudentTransferList.remove({_id:student_id})
                let school = Schools.findOne({userId:this.userId})
                student.schoolId = school.schoolId
                Students.insert(student)
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Student.upgrade": function(academicYear) {
      if(Roles.userIsInRole(this.userId,'school') ||
        Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let school = Schools.findOne({userId:this.userId})

            let years = academicYear.split('-')
            let prev = +years[0]
            prev--
            let previousAcademicYear =  prev+'-'+years[0];

            let students = Students.find({schoolId:school.schoolId}).fetch()
            _.each(students,(student) => {
                if(student.grade == "11"){
                  Students.update({_id:student._id},{$set:{grade:previousAcademicYear}})
                }
                else if(student.grade == "7" || student.grade == "8"
                || student.grade == "9" || student.grade == "10"){
                  let grade = +student.grade+1+""
                  Students.update({_id:student._id},{$set:{grade:grade}})
                }

            })
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    // added this
    "Student.downgrade": function() {
      if(Roles.userIsInRole(this.userId,'school') ||
        Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let school = Schools.findOne({userId:this.userId})
            Students.remove({grade:"7",schoolId:school.schoolId})
            let students = Students.find({schoolId:school.schoolId}).fetch()
            _.each(students,(student) => {
              if(student.grade == "7" || student.grade == "8" || student.grade == "9" || student.grade == "10" || student.grade == "11"){

                let grade = +student.grade-1+""
                Students.update({_id:student._id},{$set:{grade:grade}})
              }
            })
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Student.addUser": function(student_id) {
      if(Roles.userIsInRole(this.userId,'school') ||
        Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let student = Students.findOne({_id:student_id})

            let newUserData = {
                username: "student" + student.studentId,
                password: "student" + student.studentId
            };

            let userId = Accounts.createUser(newUserData);
            Roles.addUsersToRoles(userId,['student'])
            student.userId = userId;
            student.hasProfile = 'yes';
            Students.update({_id:student_id},{$set:student});

            //console.log("student added:" + student.name + student.surname)
            }
    },
    "Student.addMultipleUsers": function() {
      if(Roles.userIsInRole(this.userId,'school') ||
        Roles.userIsInRole(this.userId,'schoolCoordinator')){

            let school = Schools.findOne({userId:this.userId})

            let students = Students.find({schoolId:school.schoolId}).fetch()
            _.each(students,(student) => {
                let newUserData = {
                    username: "student" + student.studentId,
                    password: "student" + student.studentId
                };

                let userId = Accounts.createUser(newUserData);
                Roles.addUsersToRoles(userId,['student'])
                student.userId = userId;
                student.hasProfile = 'yes';
                Students.update({studentId:student.studentId},{$set:student});
            })
        }
    },
    "Student.deleteMultipleUsers": function() {
      if(Roles.userIsInRole(this.userId,'school') ||
        Roles.userIsInRole(this.userId,'schoolCoordinator')){

            let school = Schools.findOne({userId:this.userId})

            let students = Students.find({schoolId:school.schoolId}).fetch()
            _.each(students,(student) => {

                Meteor.users.remove(student.userId)
                student.hasProfile = 'no';
                Students.update({studentId:student.studentId},{$set:student});
            })
        }
    },
    "Student.deleteAccount": function(student_id) {
      if(Roles.userIsInRole(this.userId,'school') ||
        Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let student = Students.findOne({_id:student_id})
            Meteor.users.remove(student.userId)
            //Roles.removeUser(student.userId,[])

            student.hasProfile = 'no';
            Students.update({_id:student_id},{$set:student});
            //console.log("student deleted:" + student.name + student.surname)
          }
    },
    "Student.deleteStudent": function(student_id) {
      if(Roles.userIsInRole(this.userId,'school') ||
        Roles.userIsInRole(this.userId,'schoolCoordinator')){
            Students.remove({_id:this._id});
        }
    }
})
