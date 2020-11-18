
export const uploadResults = (academicYear,subjectId,opeNumber,results) => {
    let unregisteredStudents = [];
    _.each(results,(studentObj) => {
        let schoolId = studentObj.schoolId;
        while(schoolId.length < 3) 
            schoolId = '0' + schoolId;

        let student = Students.findOne({studentId:parseInt(studentObj.studentId), schoolId});

        if (!student){
            if(studentObj.studentName.trim())
                unregisteredStudents.push(studentObj.studentName.trim());
            return;        
        }


        let recordInDb = OpeResults.findOne({academicYear:academicYear,studentId:student.studentId,schoolId})

        if (recordInDb) {
            let sum = 0;
            let n = 0;
            for(i = 1; i <= 6; i++) {
                if(recordInDb['ope' + i]){
                    if(i !== opeNumber){
                        sum += parseFloat(recordInDb['ope' + i].replace(/,/g, ''));
                        n++;
                    }
                }
            }
            if(studentObj.opeResult) {
                sum += parseFloat(studentObj.opeResult.replace(/,/g, ''));
                n++;
            }

            let studentRecord = {
                studentSurname: student.surname,
                studentName: student.name,
                studentId: student.studentId,
                schoolId,
                grade: student.grade,
                olympiad: subjectId,
                ['ope' + opeNumber]: studentObj.opeResult,
                average: (sum/n).toFixed(2),
                academicYear,
                level: student.level
            }

            OpeResults.update({_id:recordInDb._id},{$set:studentRecord})
        } else {
            let studentRecord = {
                studentSurname: student.surname,
                studentName: student.name,
                studentId: student.studentId,
                schoolId,
                grade: student.grade,
                olympiad: subjectId,
                ['ope' + opeNumber]: studentObj.opeResult,
                average: studentObj.opeResult,
                academicYear,
                level: student.level
            }
            OpeResults.insert(studentRecord);
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
