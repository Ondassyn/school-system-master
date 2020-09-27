export const ubtResultsAverageCalc = (academicYear,schoolId) => {

    let ubtResults = UhdResults.find({academicYear:academicYear, schoolId:schoolId}).fetch()

    //---------------------------------------------
    _.each(ubtResults,(studentObj) => {

        let studentRecord = {
            academicYear: academicYear,
            studentId: studentObj.studentId,
            schoolId: schoolId,
            name: studentObj.name,
            surname: studentObj.surname,
            grade: studentObj.grade,
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

        let recordInDb = UhdResults.findOne({academicYear:academicYear,studentId:studentObj.studentId,schoolId:schoolId})

        if (recordInDb) {
            UhdResults.update({_id:recordInDb._id},{$set:studentRecord})
        } else {
            UhdResults.insert(studentRecord)
        }
    })

    //---------------------------------------------
}
