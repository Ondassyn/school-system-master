import { Meteor } from 'meteor/meteor';
Meteor.methods({
    "Student.addOlympiadResult": function(academicYear, studentObj) {
        if(Roles.userIsInRole(this.userId,'school') ||
            Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let school = Schools.findOne({userId:this.userId})

            let student = Students.findOne({studentId:parseInt(studentObj.studentId)})

            if (student) {
                studentObj.schoolId = school.schoolId;
                studentObj.academicYear = academicYear;
                studentObj.name = student.name;
                studentObj.surname = student.surname;

                let sameStudent = OlympiadResults.findOne({studentId:studentObj.studentId,academicYear:studentObj.academicYear,olympiadRegion:studentObj.olympiadRegion, olympiadId:studentObj.olympiadId})

                if (sameStudent) {
                    throw new Meteor.Error('Duplicate error','The result already exists')
                }
                OlympiadResults.insert(studentObj)
            }
        }
    },

    "Student.deleteOlympiadResult": function(student_id) {
        if(Roles.userIsInRole(this.userId,'school') ||
            Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let student = OlympiadResults.findOne({_id:student_id})
            if(student) {
                OlympiadResults.remove({_id:student_id})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "Student.editPassed": function(id,val) {
        if (!this.userId)
            return

          if(!Roles.userIsInRole(this.userId,'school') &&
                !Roles.userIsInRole(this.userId,'schoolCoordinator'))
            return
        let student = OlympiadResults.findOne({_id:id})
        if(student) {
            student.passed = val
            OlympiadResults.update({_id:student._id},{$set:student})
        }
    },

    "Student.editAttendedFor": function(id,val) {
        if (!this.userId)
            return

        if(!Roles.userIsInRole(this.userId,'school') &&
            !Roles.userIsInRole(this.userId,'schoolCoordinator'))
            return
        let student = OlympiadResults.findOne({_id:id})
        if(student) {
            student.attendedFor = val
            OlympiadResults.update({_id:student._id},{$set:student})
        }
    },

    "Student.editMedal": function(id,val) {
        if (!this.userId)
            return

        if(!Roles.userIsInRole(this.userId,'school') &&
            !Roles.userIsInRole(this.userId,'schoolCoordinator'))
            return
        let student = OlympiadResults.findOne({_id:id})
        if(student) {
            student.medal = val
            OlympiadResults.update({_id:student._id},{$set:student})
        }
    },

    "Student.editAbsolutePlace": function(id,val) {
        if (!this.userId)
            return

        if(!Roles.userIsInRole(this.userId,'school') &&
            !Roles.userIsInRole(this.userId,'schoolCoordinator'))
            return

        let student = OlympiadResults.findOne({_id:id})
        if(student) {
            student.absolutePlace = val
            OlympiadResults.update({_id:student._id},{$set:student})
        }
    },

    "Student.editTeacher": function(student_id,teacherId) {
        if(Roles.userIsInRole(this.userId,'school') ||
            Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let student = OlympiadResults.findOne({_id:student_id})
            let teacher = Teachers.findOne({teacherId:parseInt(teacherId)})
            if (student) {
                OlympiadResults.update({_id:student._id},{$set:{teacherId:teacherId, teacherName:teacher.name +" "+ teacher.surname}})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
})
