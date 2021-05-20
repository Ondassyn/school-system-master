import { check } from "../multipleChoiceChecker";
import { parseAnswerKey } from "../multipleChoiceChecker";

export const uploadTxt = (academicYear, schoolId, no, results) => {
  _.each(results, (studentObj) => {
    //console.log(studentObj.keys)
    let student = Students.findOne({
      studentId: parseInt(studentObj.studentId),
    });

    // getting an answerKey

    let answerKey = TurkishA1Keys.findOne({
      academicYear: academicYear,
      variant: studentObj.variant,
      no,
    });

    if (!student || student.schoolId != schoolId || !answerKey || !no) return;

    // creating student details for storing in db
    let studentRecord = {
      academicYear: academicYear,
      studentId: student.studentId,
      schoolId: schoolId,
      no: no,
      name: student.name,
      surname: student.surname,
      grade: student.grade,
      division: student.division,
      variant: answerKey.variant,
      keys: studentObj.keys,
      listening_preliminary: 0,
      reading_preliminary: 0,
    };

    studentRecord["listening_preliminary"] = check(
      parseAnswerKey(answerKey.listening),
      studentObj.keys.slice(0, 125)
    );
    studentRecord["reading_preliminary"] = check(
      parseAnswerKey(answerKey.reading),
      studentObj.keys.slice(125, 250)
    );

    let recordInDb = TurkishA1Results.findOne({
      academicYear: academicYear,
      studentId: student.studentId,
      schoolId: schoolId,
      no: no,
    });

    if (recordInDb) {
      TurkishA1Results.update({ _id: recordInDb._id }, { $set: studentRecord });
    } else {
      TurkishA1Results.insert(studentRecord);
    }
  });
};
