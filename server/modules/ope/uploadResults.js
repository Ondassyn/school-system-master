
export const uploadResults = (academicYear,subjectId,opeNumber,results) => {
    let unregisteredStudents = [];
    _.each(results,(studentObj) => {
        let schoolId = studentObj.schoolId;
        while(schoolId.length < 3) 
            schoolId = '0' + schoolId;

        let student = Students.findOne({studentId:parseInt(studentObj.studentId), schoolId});

        if (!student){
            unregisteredStudents.push(studentObj.studentSurname + ' ' + studentObj.studentName);
            return;        
        }

        let studentRecord = {
            studentSurname: student.surname,
            studentName: student.name,
            studentId: student.studentId,
            schoolId,
            grade: student.grade,
            olympiad: subjectId,
            ['ope' + opeNumber]: studentObj.opeResult,
            academicYear
        }


        let recordInDb = OpeResults.findOne({academicYear:academicYear,studentId:student.studentId,schoolId})

        if (recordInDb) {
            OpeResults.update({_id:recordInDb._id},{$set:studentRecord})
        } else {
            OpeResults.insert(studentRecord)
        }
    })

    if(unregisteredStudents){
        let err = 'Келесі оқушылар табылған жоқ: ';
        unregisteredStudents.map((student) => {
            err += student + ', ';
        })
        return err.slice(0, -2);
    }
}
