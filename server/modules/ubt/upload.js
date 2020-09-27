
export const upload = (academicYear,schoolId,results) => {
    _.each(results,(studentObj) => {
        let student = Students.findOne({studentId:parseInt(studentObj.studentId)});

        if (!student || student.schoolId != schoolId){
            return;
        }

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

        for (var i = 1; i <= 60; i++) {
            var n = 'ubt' + i;

            studentRecord[n] = studentObj[n] || 0;
            totalPoints += parseInt(studentObj[n] || 0)

            if (studentObj[n]!=0) {
                totalAmount++ ;
            }
        }

        studentRecord.total = (totalPoints / totalAmount || 0).toFixed(1)
        studentRecord.total = parseFloat(studentRecord.total)

        let recordInDb = UhdResults.findOne({academicYear:academicYear,studentId:student.studentId,schoolId:schoolId})

        if (recordInDb) {
            UhdResults.update({_id:recordInDb._id},{$set:studentRecord})
        } else {
            UhdResults.insert(studentRecord)
        }
    })
}
