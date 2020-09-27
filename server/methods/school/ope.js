import { Meteor } from 'meteor/meteor';
import { upload } from "../../modules/ope/upload";

Meteor.methods({
    "Ope.updateOpeResults": function(student_id, editItem) {

        if(Roles.userIsInRole(this.userId,'school') ||
            Roles.userIsInRole(this.userId,'schoolCoordinator')) {

            let studId = Students.findOne({_id:student_id}).studentId
            let student = OpeResults.findOne({studentId:studId})
            if (student) {
              var count = 0;
              var total = 0;

              for(var i = 1; i < 10; i++){
                if(editItem["ope"+i]){
                  count++
                  total = total + parseInt(editItem["ope"+i])
                }
              }

              let average = total/count;

              OpeResults.update({studentId:studId},
                {$set:{
                  ope1: editItem["ope1"],
                  ope2: editItem["ope2"],
                  ope3: editItem["ope3"],
                  ope4: editItem["ope4"],
                  ope5: editItem["ope5"],
                  ope6: editItem["ope6"],
                  average: average

                }})

            }else{

              let student = Students.findOne({_id:student_id})
              let studentName = student.name
              let studentSurname = student.surname
              let schoolId = student.schoolId
              let studentId = student.studentId
              let grade = student.grade
              let olympiad = student.olympiad

              var count = 0;
              var total = 0;
              for(var i = 1; i < 10; i++){
                if(editItem["ope"+i]){
                  count++
                  total = total + parseInt(editItem["ope"+i])
                }
              }

              let average = total/count;

              let studentOpeResults = {
                  studentSurname: studentSurname,
                  studentName: studentName,
                  studentId: studentId,
                  schoolId: schoolId,
                  grade: grade,
                  olympiad: olympiad,
                  ope1: editItem["ope1"],
                  ope2: editItem["ope2"],
                  ope3: editItem["ope3"],
                  ope4: editItem["ope4"],
                  ope5: editItem["ope5"],
                  ope6: editItem["ope6"],
                  average: average
              };
              OpeResults.insert(studentOpeResults)

            }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    'OpeReport.Upload':function(academicYear, reportPeriod, results) {
          ope = Configs.findOne({
              _id: 'opeUpload'
          });

          reportId = reportPeriod.replace(/[.*+?^${}()|[\]\\]/g, "_");
          if (ope[reportId] == 'disabled')
              throw new Meteor.Error('upload-disabled', 'OPE'+reportPeriod+' күнгі жүктеу жабық. Өтініш, IT Department-ке хабарласыңыз.')

          if(!Roles.userIsInRole(this.userId,'school') &&
              !Roles.userIsInRole(this.userId,'schoolCoordinator'))
              throw new Meteor.Error('access-denied', 'Access denied!')

          let school = Schools.findOne({
              userId: this.userId
          })

          if (school) {
              upload(academicYear, school.schoolId, reportPeriod, results)
          }
    }

})
