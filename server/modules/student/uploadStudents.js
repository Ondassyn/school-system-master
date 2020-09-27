
export const uploadStudents = (academicYear,schoolId,results) => {

    _.each(results,(studentObj) => {

      let name          = studentObj.name
      let surname       = studentObj.surname
      let grade         = studentObj.grade
      let division      = studentObj.division
      let languageGroup = studentObj.languageGroup

      if (name && surname && grade && division) {
          Meteor.call('Student.insert',{
              name:name,
              surname:surname,
              grade:grade,
              division:division,
              olympiad:'free',
              joba:'free',
              languageGroup:languageGroup
          })
      }
      // FlowRouter.redirect('/school/students')
      /*
        let student = Students.findOne({studentId:parseInt(studentObj.studentId)});

        if (!student || student.schoolId != schoolId){
            return;
        }

        console.log(student.name);

        let studentRecord = {
            academicYear: academicYear,
            studentId: student.studentId,
            schoolId: schoolId,
            name: student.name,
            surname: student.surname,
            grade: student.grade + student.division,

            total: 0,
        }

        var totalPoints = 0;
        var totalAmount = 0;

        for (var i = 1; i <= 34; i++) {
            var n = 'ubt' + i;

            studentRecord[n] = studentObj[n] || 0;
            totalPoints += parseInt(studentObj[n] || 0)

            if (studentObj[n]) {
                totalAmount++ ;
            }
        }

        studentRecord.total = (totalPoints / totalAmount || 0).toFixed(2)
        studentRecord.total = parseFloat(studentRecord.total)

        let recordInDb = UhdResults.findOne({academicYear:academicYear,studentId:student.studentId,schoolId:schoolId})

        if (recordInDb) {
            UhdResults.update({_id:recordInDb._id},{$set:studentRecord})
        } else {
            UhdResults.insert(studentRecord)
        }*/
    })

}
