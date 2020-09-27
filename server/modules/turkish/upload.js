import { checkTurkish} from "../multipleChoiceChecker";
import { checkTurkishEmpty} from "../multipleChoiceChecker";
import { parseAnswerKey } from "../multipleChoiceChecker";
/*
* метод для загрузки текст файла bts
* */

export const upload = (academicYear,schoolId,results) => {
    _.each(results,(studentObj) => {
        
        let student = Students.findOne({studentId:parseInt(studentObj.studentId)});

        // getting an answerKey
        let answerKey = TurkishAnswerKeys.findOne({
            academicYear: academicYear,
            variant: studentObj.variant,
            grade: student.grade
        });
        
        if (!student || student.schoolId != schoolId || !answerKey)
            return;

        // creating student details for storing in db
        let studentRecord = {
            academicYear: academicYear,
            studentId: student.studentId,
            schoolId: schoolId,
            name: studentObj.name,
            surname: studentObj.surname,
            grade: student.grade,
            division: student.division,
            languageGroup: student.languageGroup,
            total: 0,
        }
                       
        studentRecord.variant = answerKey.variant
        studentRecord.keys = studentObj.keys

        studentRecord["turkishCorrect"] = checkTurkish(parseAnswerKey(answerKey.turkish), studentObj.keys.slice(0,400));
        studentRecord["turkishInCorrect"] = 80-studentRecord.turkishCorrect-checkTurkishEmpty(parseAnswerKey(answerKey.turkish), studentObj.keys.slice(0,400));
        studentRecord["turkish"] = (studentRecord.turkishCorrect-studentRecord.turkishInCorrect/3)*1.25
        
        let recordInDb = TurkishResults.findOne({academicYear:academicYear,studentId:student.studentId,schoolId:schoolId})
        if (recordInDb) {
            TurkishResults.update({_id:recordInDb._id},{$set:studentRecord})
        } else {
            TurkishResults.insert(studentRecord)
        }
    })
}
