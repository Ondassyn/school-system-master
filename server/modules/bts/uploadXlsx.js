import { calculateRatingXlsx } from "./rating20_21Xlsx";

export const uploadXlsx = (academicYear,btsNo,day, grade, results) => {
    let unregisteredStudents = [];
    let subjectsList;
    if(grade === '7'){
        subjectsList = ['mathematic', 'kazakh_lang', 'geography', 'mathematicBonus', 'kazakh_langBonus', 'geographyBonus']
    } else if(grade === '8'){
        subjectsList = ['mathematic', 'physics', 'biology', 'mathematicBonus', 'physicsBonus', 'biologyBonus']
    } else  if(grade === '9'){
        subjectsList = ['mathematic', 'physics', 'chemistry', 'mathematicBonus', 'physicsBonus', 'chemistryBonus']
    } else if(grade === '10'){
        subjectsList = ['mathematic', 'physics', 'biology', 'geography', 'chemistry', 'mathematicBonus', 'physicsBonus', 'biologyBonus', 'geographyBonus', 'chemistryBonus']
    }

    let schools = [];

    _.each(results,(studentObj) => {
        let schoolId = studentObj.SchoolID;
        if(!schoolId) return;
        
        while(schoolId.length < 3) 
            schoolId = '0' + schoolId;
        if(!schools.includes(schoolId)) schools.push(schoolId);
        let student = Students.findOne({studentId:parseInt(studentObj.ID), schoolId});

        if (!student){
            if(studentObj.Name.trim().length > 0)
                unregisteredStudents.push(studentObj.Name.trim());
            return;        
        }

        let recordInDb = BtsResults.findOne({academicYear:academicYear,studentId:student.studentId,schoolId, btsNo, grade})
        
        
        if (recordInDb) {
            let studentRecord = {
                academicYear: academicYear,
                btsNo: btsNo,
                studentId: student.studentId,
                schoolId: schoolId,
                name: student.name,
                surname: student.surname,
                grade: student.grade,
                division: student.division,
                languageGroup: student.languageGroup,
                electiveGroup: student.electiveGroup,
                total: 0,
                totalA: 0,
                totalB: 0
            }

            let total = 0;
            subjectsList.map(subject => {
                if(studentObj[subject] !== undefined){
                    let points = parseInt(studentObj[subject]);
                    if(points) {
                        studentRecord[subject] = points;
                        studentRecord[subject + 'A'] = 0;
                        studentRecord[subject + 'B'] = 0;
                        
                        total += points;
                    } else {
                        studentRecord[subject] = 0;
                        studentRecord[subject + 'A'] = 0;
                        studentRecord[subject + 'B'] = 0;
                    }
                }
            })
            studentRecord.total = total;

            studentRecord["day_1_total"] = total;
            studentRecord["day_1_total_A"] = 0;
            studentRecord["day_1_total_B"] = 0;

            BtsResults.update({_id:recordInDb._id},{$set:studentRecord})
        } else {
            let studentRecord = {
                academicYear: academicYear,
                btsNo: btsNo,
                studentId: student.studentId,
                schoolId: schoolId,
                name: student.name,
                surname: student.surname,
                grade: student.grade,
                division: student.division,
                languageGroup: student.languageGroup,
                electiveGroup: student.electiveGroup,
                total: 0,
                totalA: 0,
                totalB: 0
            }


            let total = 0;
            subjectsList.map(subject => {
                if(studentObj[subject] !== undefined){
                    let points = parseInt(studentObj[subject]);
                    if(points) {
                        studentRecord[subject] = points;
                        studentRecord[subject + 'A'] = 0;
                        studentRecord[subject + 'B'] = 0;
                        
                        total += points;
                    } else {
                        studentRecord[subject] = 0;
                        studentRecord[subject + 'A'] = 0;
                        studentRecord[subject + 'B'] = 0;
                    }
                }
            })
            studentRecord.total = total;

            studentRecord["day_1_total"] = total;
            studentRecord["day_1_total_A"] = 0;
            studentRecord["day_1_total_B"] = 0;

            BtsResults.insert(studentRecord);
        }
    })

    schools.map(schoolId => {
        calculateRatingXlsx(academicYear,btsNo,day,schoolId)
    })

    if(unregisteredStudents){
        let err = 'Келесі оқушылар табылған жоқ: ';
        unregisteredStudents.map((student) => {
            err += student + ', ';
        })
        return err.slice(0, -2);
    }
}
