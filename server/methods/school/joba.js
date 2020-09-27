import { Meteor } from 'meteor/meteor';
Meteor.methods({
    "Student.addJobaResult": function(academicYear, studentObj) {
        
        if(Roles.userIsInRole(this.userId,'school') ||
              Roles.userIsInRole(this.userId,'schoolCoordinator')) {
            let school = Schools.findOne({userId:this.userId})

            let student = Students.findOne({studentId:parseInt(studentObj.studentId)})

            if (student) {
                studentObj.schoolId = school.schoolId;
                studentObj.academicYear = academicYear;
                studentObj.name = student.name;
                studentObj.surname = student.surname;

                let sameStudent = JobaResults.findOne({studentId:studentObj.studentId,academicYear:studentObj.academicYear,jobaRegion:studentObj.jobaRegion, jobaId:studentObj.jobaId})

                if (sameStudent) {
                    throw new Meteor.Error('Duplicate error','The result already exists')
                }
                JobaResults.insert(studentObj)
            }
        }
    },

    "Student.deleteJobaResult": function(student_id) {

      if(Roles.userIsInRole(this.userId,'school') ||
          Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let student = JobaResults.findOne({_id:student_id})
            if(student) {
                JobaResults.remove({_id:student_id})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "Student.editPassedJoba": function(id,val) {
        if (!this.userId)
            return

        if(!Roles.userIsInRole(this.userId,'school') ||
              !Roles.userIsInRole(this.userId,'schoolCoordinator'))
            return
        let student = JobaResults.findOne({_id:id})
        if(student) {
            student.passed = val
            JobaResults.update({_id:student._id},{$set:student})
        }
    },

    "Student.editAttendedForJoba": function(id,val) {
        if (!this.userId)
            return

        if(!Roles.userIsInRole(this.userId,'school') ||
            !Roles.userIsInRole(this.userId,'schoolCoordinator'))
            return
        let student = JobaResults.findOne({_id:id})
        if(student) {
            student.attendedFor = val
            JobaResults.update({_id:student._id},{$set:student})
        }
    },

    "Student.editMedalJoba": function(id,val) {
        if (!this.userId)
            return

        if(!Roles.userIsInRole(this.userId,'school') ||
              !Roles.userIsInRole(this.userId,'schoolCoordinator'))
            return
        let student = JobaResults.findOne({_id:id})
        if(student) {
            student.medal = val
            JobaResults.update({_id:student._id},{$set:student})
        }
    },

    "Student.editAbsolutePlaceJoba": function(id,val) {
        if (!this.userId)
            return

        if(!Roles.userIsInRole(this.userId,'school') ||
            !Roles.userIsInRole(this.userId,'schoolCoordinator'))
            return
        let student = JobaResults.findOne({_id:id})
        if(student) {
            student.absolutePlace = val
            JobaResults.update({_id:student._id},{$set:student})
        }
    },

    "Student.editTeacherJoba": function(student_id,teacherId) {
        if(Roles.userIsInRole(this.userId,'school') ||
              Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let student = JobaResults.findOne({_id:student_id})
            let teacher = Teachers.findOne({teacherId:parseInt(teacherId)})
            if (student) {
                JobaResults.update({_id:student._id},{$set:{teacherId:teacherId, teacherName:teacher.name +" "+ teacher.surname}})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
})
