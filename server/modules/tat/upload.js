import { checkBijectivelyMap } from "../multipleChoiceChecker";
import { parseAnswerKeysToMap } from "../multipleChoiceChecker";
/*
 * метод для загрузки текст файла кбо
 * */
export const upload = (academicYear, tatNo, schoolId, rows) => {
  _.each(rows, (row) => {
    let teacher = Teachers.findOne({ iin: row.teacherIin });

    let answerKey = TatAnswerKeys.findOne({
      academicYear: academicYear,
      tatNo: tatNo,
      variant: row.variant,
    });

    if (
      !teacher ||
      teacher.schoolId != schoolId ||
      !answerKey ||
      teacher.subjectId !== answerKey.subjectId
    )
      return;

    let teacherObj = {
      academicYear: academicYear,
      tatNo: tatNo,
      // variant: row.variant,
      teacherId: teacher.teacherId,
      teacherIin: row.teacherIin,
      answers: row.keys,
    };

    teacherObj.teacherName = teacher.name;
    teacherObj.teacherSurname = teacher.surname;
    teacherObj.schoolId = schoolId;
    teacherObj.position = teacher.position;
    teacherObj.subjectId = answerKey.subjectId;
    teacherObj.result = checkBijectivelyMap(
      parseAnswerKeysToMap(answerKey.keys),
      teacherObj.answers
    );
    teacherObj.percent = (
      (teacherObj.result / parseAnswerKeysToMap(answerKey.keys).size) *
      100
    ).toFixed(2);

    /*
        teacherObj.teacherName = row.name.replace(/\s/g,'');
        teacherObj.teacherSurname = row.surname.replace(/\s/g,'');
        teacherObj.schoolId = schoolId;
        teacherObj.position = 'қонақтар';
        teacherObj.subjectId = answerKey.subjectId;
        teacherObj.result = check(parseAnswerKey(answerKey.keys),teacherObj.answers)
        teacherObj.percent = (teacherObj.result/parseAnswerKey(answerKey.keys).length*100).toFixed(2)
        */

    let teacherResult = TatResults.find({
      academicYear: teacherObj.academicYear,
      tatNo: teacherObj.tatNo,
      teacherIin: teacherObj.teacherIin,
    }).count();

    if (teacherResult == 0) {
      TatResults.insert(teacherObj);
    } else {
      let teacherResultId = TatResults.findOne({
        academicYear: teacherObj.academicYear,
        tatNo: teacherObj.tatNo,
        teacherIin: teacherObj.teacherIin,
      })._id;
      TatResults.update(teacherResultId, {
        $set: {
          variant: teacherObj.variant,
          answers: teacherObj.answers,
          subjectId: teacherObj.subjectId,
          result: teacherObj.result,
          percent: teacherObj.percent,
        },
      });
    }
  });
};
