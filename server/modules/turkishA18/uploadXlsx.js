export const uploadXlsx = (academicYear, schoolId, results) => {
  let totalListening = 0;
  let totalReading = 0;
  let totalWriting = 0;
  let totalSpeaking = 0;
  let n = 0;
  let totalTotal = 0;

  if (results) {
    _.each(results, (result) => {
      let student = Students.findOne({ studentId: parseInt(result.studentId) });
      if (!student || student.schoolId != schoolId) {
        return;
      }

      let studentRecord = TurkishA18Results.findOne({
        academicYear,
        schoolId,
        studentId: student.studentId,
      });
      if (studentRecord) {
        let flag = false;

        if (
          (result.Dinleme || result.Dinleme === "0") &&
          isNumeric(result.Dinleme)
        ) {
          studentRecord["listening"] = +result.Dinleme;
          flag = true;
        } else if (
          (studentRecord.listening_preliminary ||
            studentRecord.listening_preliminary === 0) &&
          isNumeric(studentRecord.listening_preliminary)
        ) {
          studentRecord["listening"] = +studentRecord.listening_preliminary;
          flag = true;
        }

        if ((result.Okuma || result.Okuma === "0") && isNumeric(result.Okuma)) {
          studentRecord["reading"] = +result.Okuma;
          flag = true;
        } else if (
          (studentRecord.reading_preliminary ||
            studentRecord.reading_preliminary === 0) &&
          isNumeric(studentRecord.reading_preliminary)
        ) {
          studentRecord["reading"] = +studentRecord.reading_preliminary;
          flag = true;
        }

        if ((result.Yazma || result.Yazma === "0") && isNumeric(result.Yazma)) {
          studentRecord["writing"] = +result.Yazma;
          flag = true;
        }

        if (
          (result.Konusma || result.Konusma === "0") &&
          isNumeric(result.Konusma)
        ) {
          studentRecord["speaking"] = +result.Konusma;
          flag = true;
        }

        if (!flag) return;

        studentRecord["total"] = 0;
        studentRecord["total"] += studentRecord["listening"]
          ? studentRecord["listening"]
          : studentRecord["listening_preliminary"]
          ? studentRecord["listening_preliminary"]
          : 0;
        studentRecord["total"] += studentRecord["reading"]
          ? studentRecord["reading"]
          : studentRecord["reading_preliminary"]
          ? studentRecord["reading_preliminary"]
          : 0;
        studentRecord["total"] += studentRecord["speaking"]
          ? studentRecord["speaking"]
          : 0;
        studentRecord["total"] += studentRecord["writing"]
          ? studentRecord["writing"]
          : 0;

        TurkishA18Results.update(
          { _id: studentRecord._id },
          { $set: studentRecord }
        );
      } else {
        studentRecord = {
          academicYear: academicYear,
          studentId: student.studentId,
          schoolId: schoolId,
          name: student.name,
          surname: student.surname,
          grade: student.grade,
          division: student.division,
        };

        let flag = false;
        if (
          (result.Dinleme || result.Dinleme === "0") &&
          isNumeric(result.Dinleme)
        ) {
          studentRecord["listening"] = +result.Dinleme;
          flag = true;
        }

        if ((result.Okuma || result.Okuma === "0") && isNumeric(result.Okuma)) {
          studentRecord["reading"] = +result.Okuma;
          flag = true;
        }

        if ((result.Yazma || result.Okuma === "0") && isNumeric(result.Yazma)) {
          studentRecord["writing"] = +result.Yazma;
          flag = true;
        }
        if (
          (result.Konusma || result.Konusma === "0") &&
          isNumeric(result.Konusma)
        ) {
          studentRecord["speaking"] = +result.Konusma;
          flag = true;
        }

        if (!flag) return;

        studentRecord["total"] = 0;
        studentRecord["total"] += studentRecord["listening"]
          ? studentRecord["listening"]
          : studentRecord["listening_preliminary"]
          ? studentRecord["listening_preliminary"]
          : 0;
        studentRecord["total"] += studentRecord["reading"]
          ? studentRecord["reading"]
          : studentRecord["reading_preliminary"]
          ? studentRecord["reading_preliminary"]
          : 0;
        studentRecord["total"] += studentRecord["speaking"]
          ? studentRecord["speaking"]
          : 0;
        studentRecord["total"] += studentRecord["writing"]
          ? studentRecord["writing"]
          : 0;

        TurkishA18Results.insert(studentRecord);
      }

      totalListening += studentRecord["listening"]
        ? studentRecord["listening"]
        : 0;
      totalReading += studentRecord["reading"] ? studentRecord["reading"] : 0;
      totalWriting += studentRecord["writing"] ? studentRecord["writing"] : 0;
      totalSpeaking += studentRecord["speaking"]
        ? studentRecord["speaking"]
        : 0;
      totalTotal += studentRecord["total"] ? studentRecord["total"] : 0;
      n++;
    });

    if (n === 0) return;

    let ratingRecord = {
      academicYear,
      schoolId,
      listeningAverage: totalListening / n,
      readingAverage: totalReading / n,
      writingAverage: totalWriting / n,
      speakingAverage: totalSpeaking / n,
      totalAverage: totalTotal / n,
      totalNumber: n,
    };

    let ratingRecordInDb = TurkishA18Ratings.findOne({
      academicYear,
      schoolId,
    });

    if (ratingRecordInDb) {
      TurkishA18Ratings.update(
        { _id: ratingRecordInDb._id },
        { $set: ratingRecord }
      );
    } else {
      TurkishA18Ratings.insert(ratingRecord);
    }
  }
};

function isNumeric(str) {
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}
