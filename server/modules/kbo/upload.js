import { check } from "../multipleChoiceChecker";
import { parseAnswerKey } from "../multipleChoiceChecker";
/*
 * метод для загрузки текст файла кбо
 * */
export const upload = (academicYear, kboNo, schoolId, rows) => {
  _.each(rows, (row) => {
    let student = Students.findOne({ studentId: parseInt(row.studentId) });

    let answerKey = KboKeys.findOne({
      academicYear: academicYear,
      kboNo: kboNo,
      variant: row.variant,
    });

    if (!student || student.schoolId != schoolId || !answerKey) return;

    let studentObj = {
      academicYear: academicYear,
      kboNo: kboNo,
      variant: row.variant,
      studentId: student.studentId,
      answers: row.keys,
    };

    studentObj.studentName = student.name;
    studentObj.studentSurname = student.surname;
    studentObj.grade = student.grade;
    studentObj.division = student.division;
    studentObj.schoolId = schoolId;
    studentObj.subjectId = answerKey.subjectId;
    studentObj.result = check(
      parseAnswerKey(answerKey.keys),
      studentObj.answers
    );

    if (studentObj.variant.substring(0, 2) == "07") {
      studentObj.kazLanguageGroup = "kaz";
      studentObj.subjectId = "07";
    } else if (studentObj.variant.substring(0, 2) == "08") {
      studentObj.kazLanguageGroup = "rus";
      studentObj.subjectId = "09";
    }

    let studentResult = KboResults.find({
      academicYear: studentObj.academicYear,
      kboNo: studentObj.kboNo,
      studentId: parseInt(studentObj.studentId),
      subjectId: studentObj.subjectId,
    }).count();

    if (studentResult == 0) {
      KboResults.insert(studentObj);
    } else {
      let studentResultId = KboResults.findOne({
        academicYear: studentObj.academicYear,
        kboNo: studentObj.kboNo,
        studentId: parseInt(studentObj.studentId),
      })._id;
      KboResults.update(studentResultId, {
        $set: {
          variant: studentObj.variant,
          answers: studentObj.answers,
          subjectId: studentObj.subjectId,
          result: studentObj.result,
        },
      });
    }
  });
};
