import { check } from "../../multipleChoiceChecker";
import { checkA } from "../../multipleChoiceChecker";
import { checkB } from "../../multipleChoiceChecker";
import { checkC } from "../../multipleChoiceChecker";
import { parseAnswerKey } from "../../multipleChoiceChecker";
import { parseLevelKey } from "../../multipleChoiceChecker";

export const upload0 = (academicYear, btsNo, day, schoolId, results) => {
  _.each(results, (studentObj) => {
    let student = Students.findOne({
      studentId: parseInt(studentObj.studentId),
    });

    // getting an answerKey

    let answerKey = BtsAnswerKeys.findOne({
      academicYear: academicYear,
      quarter: btsNo,
      day: day,
      variant: studentObj.variant,
      grade: student.grade,
    });

    let levelKey = BtsLevels.findOne({
      academicYear: academicYear,
      quarter: btsNo,
      day: day,
      variant: studentObj.variant,
      grade: student.grade,
    });

    if (!student || student.schoolId != schoolId || !answerKey) {
      return;
    }

    // creating student details for storing in db
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
      subjectsPassed: 0,
      total: 0,
      totalA: 0,
      totalB: 0,
      totalC: 0,
    };
    switch (student.grade) {
      case "7":
        if (day == "1") {
          studentRecord.variant_day_1 = answerKey.variant;
          studentRecord.day_1_keys = studentObj.keys;

          if (
            student.languageGroup.includes("us") ||
            student.languageGroup.includes("рыс") ||
            student.languageGroup.includes("ус")
          ) {
            studentRecord["kazakh_lang"] = check(
              parseAnswerKey(answerKey.kazakh_lang_rus),
              studentObj.keys.slice(0, 100)
            );
            studentRecord["kazakh_langA"] = checkA(
              parseAnswerKey(answerKey.kazakh_lang_rus),
              studentObj.keys.slice(0, 100),
              parseLevelKey(levelKey.kazakh_lang_rus)
            );
            studentRecord["kazakh_langB"] = checkB(
              parseAnswerKey(answerKey.kazakh_lang_rus),
              studentObj.keys.slice(0, 100),
              parseLevelKey(levelKey.kazakh_lang_rus)
            );
            studentRecord["kazakh_langC"] = checkC(
              parseAnswerKey(answerKey.kazakh_lang_rus),
              studentObj.keys.slice(0, 100),
              parseLevelKey(levelKey.kazakh_lang_rus)
            );
          } else {
            studentRecord["kazakh_lang"] = check(
              parseAnswerKey(answerKey.kazakh_lang_kaz),
              studentObj.keys.slice(0, 100)
            );
            studentRecord["kazakh_langA"] = checkA(
              parseAnswerKey(answerKey.kazakh_lang_kaz),
              studentObj.keys.slice(0, 100),
              parseLevelKey(levelKey.kazakh_lang_kaz)
            );
            studentRecord["kazakh_langB"] = checkB(
              parseAnswerKey(answerKey.kazakh_lang_kaz),
              studentObj.keys.slice(0, 100),
              parseLevelKey(levelKey.kazakh_lang_kaz)
            );
            studentRecord["kazakh_langC"] = checkC(
              parseAnswerKey(answerKey.kazakh_lang_kaz),
              studentObj.keys.slice(0, 100),
              parseLevelKey(levelKey.kazakh_lang_kaz)
            );
          }

          studentRecord["geography"] = check(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(100, 200)
          );
          studentRecord["geographyA"] = checkA(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.geography)
          );
          studentRecord["geographyB"] = checkB(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.geography)
          );
          studentRecord["geographyC"] = checkC(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.geography)
          );

          studentRecord["kazakh_history"] = check(
            parseAnswerKey(answerKey.kazakh_history),
            studentObj.keys.slice(200, 300)
          );
          studentRecord["kazakh_historyA"] = checkA(
            parseAnswerKey(answerKey.kazakh_history),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.kazakh_history)
          );
          studentRecord["kazakh_historyB"] = checkB(
            parseAnswerKey(answerKey.kazakh_history),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.kazakh_history)
          );
          studentRecord["kazakh_historyC"] = checkC(
            parseAnswerKey(answerKey.kazakh_history),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.kazakh_history)
          );

          //there is no russian A and B level questions
          // studentRecord["russian_lang"] = check(parseAnswerKey(answerKey.russian_lang), studentObj.keys.slice(300,400))

          studentRecord["day_1_total"] =
            studentRecord["kazakh_lang"] +
            studentRecord["geography"] +
            studentRecord["kazakh_history"];
          studentRecord["day_1_total_A"] =
            studentRecord["kazakh_langA"] +
            studentRecord["geographyA"] +
            studentRecord["kazakh_historyA"];
          studentRecord["day_1_total_B"] =
            studentRecord["kazakh_langB"] +
            studentRecord["geographyB"] +
            studentRecord["kazakh_historyB"];
          studentRecord["day_1_total_C"] =
            studentRecord["kazakh_langC"] +
            studentRecord["geographyC"] +
            studentRecord["kazakh_historyC"];

          studentRecord["total"] += studentRecord["day_1_total"];
          studentRecord["totalA"] += studentRecord["day_1_total_A"];
          studentRecord["totalB"] += studentRecord["day_1_total_B"];
          studentRecord["totalC"] += studentRecord["day_1_total_C"];

          if (studentRecord["kazakh_history"] >= 10)
            studentRecord["subjectsPassed"]++;
          if (studentRecord["kazakh_lang"] >= 10)
            studentRecord["subjectsPassed"]++;
          if (studentRecord["geography"] >= 10)
            studentRecord["subjectsPassed"]++;
          studentRecord["day_1_subjectsPassed"] =
            studentRecord["subjectsPassed"];
        } else if (day === "2") {
          studentRecord.variant_day_2 = answerKey.variant;
          studentRecord.day_2_keys = studentObj.keys;

          studentRecord["mathematic"] = check(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100)
          );
          studentRecord["mathematicA"] = checkA(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.mathematic)
          );
          studentRecord["mathematicB"] = checkB(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.mathematic)
          );
          studentRecord["mathematicC"] = checkC(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.mathematic)
          );

          studentRecord["russian_lang"] = check(
            parseAnswerKey(answerKey.russian_lang),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.russian_lang)
          );
          studentRecord["russian_langA"] = checkA(
            parseAnswerKey(answerKey.russian_lang),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.russian_lang)
          );
          studentRecord["russian_langB"] = checkB(
            parseAnswerKey(answerKey.russian_lang),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.russian_lang)
          );
          studentRecord["russian_langC"] = checkC(
            parseAnswerKey(answerKey.russian_lang),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.russian_lang)
          );

          if (studentRecord["mathematic"] >= 10)
            studentRecord["subjectsPassed"]++;
          if (studentRecord["russian_lang"] >= 10)
            studentRecord["subjectsPassed"]++;
          studentRecord["day_2_subjectsPassed"] =
            studentRecord["subjectsPassed"];

          studentRecord["day_2_total"] =
            studentRecord["mathematic"] + studentRecord["russian_lang"];
          studentRecord["day_2_total_A"] =
            studentRecord["mathematicA"] + studentRecord["russian_langA"];
          studentRecord["day_2_total_B"] =
            studentRecord["mathematicB"] + studentRecord["russian_langB"];
          studentRecord["day_2_total_C"] =
            studentRecord["mathematicC"] + studentRecord["russian_langC"];

          studentRecord["total"] += studentRecord["day_2_total"];
          studentRecord["totalA"] += studentRecord["day_2_total_A"];
          studentRecord["totalB"] += studentRecord["day_2_total_B"];
          studentRecord["totalC"] += studentRecord["day_2_total_C"];
        }
        //end 7 grade
        break;

      case "8":
        if (day == "1") {
          studentRecord.variant_day_1 = answerKey.variant;
          studentRecord.day_1_keys = studentObj.keys;

          studentRecord["mathematic"] = check(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100)
          );
          studentRecord["mathematicA"] = checkA(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.mathematic)
          );
          studentRecord["mathematicB"] = checkB(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.mathematic)
          );
          studentRecord["mathematicC"] = checkC(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.mathematic)
          );

          studentRecord["chemistry"] = check(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(100, 200)
          );
          studentRecord["chemistryA"] = checkA(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.chemistry)
          );
          studentRecord["chemistryB"] = checkB(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.chemistry)
          );
          studentRecord["chemistryC"] = checkC(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.chemistry)
          );

          studentRecord["geography"] = check(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(200, 300)
          );
          studentRecord["geographyA"] = checkA(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.geography)
          );
          studentRecord["geographyB"] = checkB(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.geography)
          );
          studentRecord["geographyC"] = checkC(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.geography)
          );

          if (studentRecord["mathematic"] >= 10)
            studentRecord["subjectsPassed"]++;
          if (studentRecord["chemistry"] >= 10)
            studentRecord["subjectsPassed"]++;
          if (studentRecord["geography"] >= 10)
            studentRecord["subjectsPassed"]++;
          studentRecord["day_1_subjectsPassed"] =
            studentRecord["subjectsPassed"];

          studentRecord["day_1_total"] =
            studentRecord["mathematic"] +
            studentRecord["chemistry"] +
            studentRecord["geography"];
          studentRecord["day_1_total_A"] =
            studentRecord["mathematicA"] +
            studentRecord["chemistryA"] +
            studentRecord["geographyA"];
          studentRecord["day_1_total_B"] =
            studentRecord["mathematicB"] +
            studentRecord["chemistryB"] +
            studentRecord["geographyB"];
          studentRecord["day_1_total_C"] =
            studentRecord["mathematicC"] +
            studentRecord["chemistryC"] +
            studentRecord["geographyC"];

          studentRecord["total"] += studentRecord["day_1_total"];
          studentRecord["totalA"] += studentRecord["day_1_total_A"];
          studentRecord["totalB"] += studentRecord["day_1_total_B"];
          studentRecord["totalC"] += studentRecord["day_1_total_C"];
        } else if (day == "2") {
          studentRecord.variant_day_2 = answerKey.variant;
          studentRecord.day_2_keys = studentObj.keys;

          studentRecord["physics"] = check(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(0, 100)
          );
          studentRecord["physicsA"] = checkA(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.physics)
          );
          studentRecord["physicsB"] = checkB(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.physics)
          );
          studentRecord["physicsC"] = checkC(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.physics)
          );

          studentRecord["biology"] = check(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(100, 200)
          );
          studentRecord["biologyA"] = checkA(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.biology)
          );
          studentRecord["biologyB"] = checkB(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.biology)
          );
          studentRecord["biologyC"] = checkC(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.biology)
          );

          if (
            student.languageGroup.includes("us") ||
            student.languageGroup.includes("рыс") ||
            student.languageGroup.includes("ус")
          ) {
            studentRecord["kazakh_lang"] = check(
              parseAnswerKey(answerKey.kazakh_lang_rus),
              studentObj.keys.slice(200, 300)
            );
            studentRecord["kazakh_langA"] = checkA(
              parseAnswerKey(answerKey.kazakh_lang_rus),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.kazakh_lang_rus)
            );
            studentRecord["kazakh_langB"] = checkB(
              parseAnswerKey(answerKey.kazakh_lang_rus),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.kazakh_lang_rus)
            );
            studentRecord["kazakh_langC"] = checkC(
              parseAnswerKey(answerKey.kazakh_lang_rus),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.kazakh_lang_rus)
            );
          } else {
            studentRecord["kazakh_lang"] = check(
              parseAnswerKey(answerKey.kazakh_lang_kaz),
              studentObj.keys.slice(200, 300)
            );
            studentRecord["kazakh_langA"] = checkA(
              parseAnswerKey(answerKey.kazakh_lang_kaz),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.kazakh_lang_kaz)
            );
            studentRecord["kazakh_langB"] = checkB(
              parseAnswerKey(answerKey.kazakh_lang_kaz),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.kazakh_lang_kaz)
            );
            studentRecord["kazakh_langC"] = checkC(
              parseAnswerKey(answerKey.kazakh_lang_kaz),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.kazakh_lang_kaz)
            );
          }

          if (studentRecord["physics"] >= 10) studentRecord["subjectsPassed"]++;
          if (studentRecord["biology"] >= 10) studentRecord["subjectsPassed"]++;
          if (studentRecord["kazakh_lang"] >= 10)
            studentRecord["subjectsPassed"]++;
          studentRecord["day_2_subjectsPassed"] =
            studentRecord["subjectsPassed"];

          studentRecord["day_2_total"] =
            studentRecord["physics"] +
            studentRecord["biology"] +
            studentRecord["kazakh_lang"];
          studentRecord["day_2_total_A"] =
            studentRecord["physicsA"] +
            studentRecord["biologyA"] +
            studentRecord["kazakh_langA"];
          studentRecord["day_2_total_B"] =
            studentRecord["physicsB"] +
            studentRecord["biologyB"] +
            studentRecord["kazakh_langB"];
          studentRecord["day_2_total_C"] =
            studentRecord["physicsC"] +
            studentRecord["biologyC"] +
            studentRecord["kazakh_langC"];

          studentRecord["total"] += studentRecord["day_2_total"];
          studentRecord["totalA"] += studentRecord["day_2_total_A"];
          studentRecord["totalB"] += studentRecord["day_2_total_B"];
          studentRecord["totalC"] += studentRecord["day_2_total_C"];
        }
        break;
      case "9":
        if (day == "1") {
          studentRecord.variant_day_1 = answerKey.variant;
          studentRecord.day_1_keys = studentObj.keys;

          studentRecord["mathematic"] = check(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100)
          );
          studentRecord["mathematicA"] = checkA(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.mathematic)
          );
          studentRecord["mathematicB"] = checkB(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.mathematic)
          );
          studentRecord["mathematicC"] = checkC(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.mathematic)
          );

          studentRecord["chemistry"] = check(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(100, 200)
          );
          studentRecord["chemistryA"] = checkA(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.chemistry)
          );
          studentRecord["chemistryB"] = checkB(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.chemistry)
          );
          studentRecord["chemistryC"] = checkC(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.chemistry)
          );

          studentRecord["geography"] = check(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(200, 300)
          );
          studentRecord["geographyA"] = checkA(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.geography)
          );
          studentRecord["geographyB"] = checkB(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.geography)
          );
          studentRecord["geographyC"] = checkC(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.geography)
          );

          if (studentRecord["mathematic"] >= 10)
            studentRecord["subjectsPassed"]++;
          if (studentRecord["chemistry"] >= 10)
            studentRecord["subjectsPassed"]++;
          if (studentRecord["geography"] >= 10)
            studentRecord["subjectsPassed"]++;
          studentRecord["day_1_subjectsPassed"] =
            studentRecord["subjectsPassed"];

          studentRecord["day_1_total"] =
            studentRecord["mathematic"] +
            studentRecord["chemistry"] +
            studentRecord["geography"];
          studentRecord["day_1_total_A"] =
            studentRecord["mathematicA"] +
            studentRecord["chemistryA"] +
            studentRecord["geographyA"];
          studentRecord["day_1_total_B"] =
            studentRecord["mathematicB"] +
            studentRecord["chemistryB"] +
            studentRecord["geographyB"];
          studentRecord["day_1_total_C"] =
            studentRecord["mathematicC"] +
            studentRecord["chemistryC"] +
            studentRecord["geographyC"];

          studentRecord["total"] += studentRecord["day_1_total"];
          studentRecord["totalA"] += studentRecord["day_1_total_A"];
          studentRecord["totalB"] += studentRecord["day_1_total_B"];
          studentRecord["totalC"] += studentRecord["day_1_total_C"];

          // studentRecord["mathematicBonus"] = check(
          //   parseAnswerKey(answerKey.mathematicBonus),
          //   studentObj.keys.slice(300, 325)
          // );
          // studentRecord["mathematicBonusA"] = checkA(
          //   parseAnswerKey(answerKey.mathematicBonus),
          //   studentObj.keys.slice(300, 325),
          //   parseLevelKey(levelKey.mathematicBonus)
          // );
          // studentRecord["mathematicB"] = checkB(
          //   parseAnswerKey(answerKey.mathematicBonus),
          //   studentObj.keys.slice(300, 325),
          //   parseLevelKey(levelKey.mathematicBonus)
          // );

          // studentRecord["physicsBonus"] = check(
          //   parseAnswerKey(answerKey.physicsBonus),
          //   studentObj.keys.slice(325, 350)
          // );
          // studentRecord["physicsBonusA"] = checkA(
          //   parseAnswerKey(answerKey.physicsBonus),
          //   studentObj.keys.slice(325, 350),
          //   parseLevelKey(levelKey.physicsBonus)
          // );
          // studentRecord["physicsBonusB"] = checkB(
          //   parseAnswerKey(answerKey.physicsBonus),
          //   studentObj.keys.slice(325, 350),
          //   parseLevelKey(levelKey.physicsBonus)
          // );

          // studentRecord["chemistryBonus"] = check(
          //   parseAnswerKey(answerKey.chemistryBonus),
          //   studentObj.keys.slice(350, 375)
          // );
          // studentRecord["chemistryBonusA"] = checkA(
          //   parseAnswerKey(answerKey.chemistryBonus),
          //   studentObj.keys.slice(350, 375),
          //   parseLevelKey(levelKey.chemistryBonus)
          // );
          // studentRecord["chemistryBonusB"] = checkB(
          //   parseAnswerKey(answerKey.chemistryBonus),
          //   studentObj.keys.slice(350, 375),
          //   parseLevelKey(levelKey.chemistryBonus)
          // );

          // studentRecord["day_1_totalBonus"] =
          //   studentRecord["mathematicBonus"] +
          //   studentRecord["physicsBonus"] +
          //   studentRecord["chemistryBonus"];
          // studentRecord["day_1_totalBonus_A"] =
          //   studentRecord["mathematicBonusA"] +
          //   studentRecord["physicsBonusA"] +
          //   studentRecord["chemistryBonusA"];
          // studentRecord["day_1_totalBonus_B"] =
          //   studentRecord["mathematicBonusB"] +
          //   studentRecord["physicsBonusB"] +
          //   studentRecord["chemistryBonusB"];

          // studentRecord["totalBonus"] += studentRecord["day_1_totalBonus"];
          // studentRecord["totalBonusA"] += studentRecord["day_1_totalBonus_A"];
          // studentRecord["totalBonusB"] += studentRecord["day_1_totalBonus_B"];
        } else if (day == "2") {
          studentRecord.variant_day_2 = answerKey.variant;
          studentRecord.day_2_keys = studentObj.keys;

          studentRecord["physics"] = check(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(0, 100)
          );
          studentRecord["physicsA"] = checkA(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.physics)
          );
          studentRecord["physicsB"] = checkB(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.physics)
          );
          studentRecord["physicsC"] = checkC(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.physics)
          );

          studentRecord["biology"] = check(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(100, 200)
          );
          studentRecord["biologyA"] = checkA(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.biology)
          );
          studentRecord["biologyB"] = checkB(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.biology)
          );
          studentRecord["biologyC"] = checkC(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.biology)
          );

          studentRecord["turkish_lang"] = check(
            parseAnswerKey(answerKey.turkish_lang),
            studentObj.keys.slice(200, 300)
          );
          studentRecord["turkish_langA"] = checkA(
            parseAnswerKey(answerKey.turkish_lang),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.turkish_lang)
          );
          studentRecord["turkish_langB"] = checkB(
            parseAnswerKey(answerKey.turkish_lang),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.turkish_lang)
          );
          studentRecord["turkish_langC"] = checkC(
            parseAnswerKey(answerKey.turkish_lang),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.turkish_lang)
          );

          if (studentRecord["physics"] >= 10) studentRecord["subjectsPassed"]++;
          if (studentRecord["biology"] >= 10) studentRecord["subjectsPassed"]++;
          if (studentRecord["turkish_lang"] >= 10)
            studentRecord["subjectsPassed"]++;
          studentRecord["day_2_subjectsPassed"] =
            studentRecord["subjectsPassed"];

          studentRecord["day_2_total"] =
            studentRecord["physics"] +
            studentRecord["biology"] +
            studentRecord["turkish_lang"];
          studentRecord["day_2_total_A"] =
            studentRecord["physicsA"] +
            studentRecord["biologyA"] +
            studentRecord["turkish_langA"];
          studentRecord["day_2_total_B"] =
            studentRecord["physicsB"] +
            studentRecord["biologyB"] +
            studentRecord["turkish_langB"];
          studentRecord["day_2_total_C"] =
            studentRecord["physicsC"] +
            studentRecord["biologyC"] +
            studentRecord["turkish_langC"];

          studentRecord["total"] += studentRecord["day_2_total"];
          studentRecord["totalA"] += studentRecord["day_2_total_A"];
          studentRecord["totalB"] += studentRecord["day_2_total_B"];
          studentRecord["totalC"] += studentRecord["day_2_total_C"];
        }
        break;

      case "10":
        if (day == "1") {
          studentRecord["mathematic"] = check(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100)
          );
          studentRecord["mathematicA"] = checkA(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.mathematic)
          );
          studentRecord["mathematicB"] = checkB(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.mathematic)
          );
          studentRecord["mathematicC"] = checkC(
            parseAnswerKey(answerKey.mathematic),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.mathematic)
          );

          studentRecord["kazakh_history"] = check(
            parseAnswerKey(answerKey.kazakh_history),
            studentObj.keys.slice(100, 200)
          );
          studentRecord["kazakh_historyA"] = checkA(
            parseAnswerKey(answerKey.kazakh_history),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.kazakh_history)
          );
          studentRecord["kazakh_historyB"] = checkB(
            parseAnswerKey(answerKey.kazakh_history),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.kazakh_history)
          );
          studentRecord["kazakh_historyC"] = checkC(
            parseAnswerKey(answerKey.kazakh_history),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.kazakh_history)
          );

          studentRecord["turkish_lang"] = check(
            parseAnswerKey(answerKey.turkish_lang),
            studentObj.keys.slice(200, 300)
          );
          studentRecord["turkish_langA"] = checkA(
            parseAnswerKey(answerKey.turkish_lang),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.turkish_lang)
          );
          studentRecord["turkish_langB"] = checkB(
            parseAnswerKey(answerKey.turkish_lang),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.turkish_lang)
          );
          studentRecord["turkish_langC"] = checkC(
            parseAnswerKey(answerKey.turkish_lang),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.turkish_lang)
          );

          if (studentRecord["mathematic"] >= 10)
            studentRecord["subjectsPassed"]++;
          if (studentRecord["kazakh_history"] >= 10)
            studentRecord["subjectsPassed"]++;
          if (studentRecord["turkish_lang"] >= 10)
            studentRecord["subjectsPassed"]++;
          studentRecord["day_1_subjectsPassed"] =
            studentRecord["subjectsPassed"];

          studentRecord["day_1_total"] =
            studentRecord["mathematic"] +
            studentRecord["kazakh_history"] +
            studentRecord["turkish_lang"];
          studentRecord["day_1_total_A"] =
            studentRecord["mathematicA"] +
            studentRecord["kazakh_historyA"] +
            studentRecord["turkish_langA"];
          studentRecord["day_1_total_B"] =
            studentRecord["mathematicB"] +
            studentRecord["kazakh_historyB"] +
            studentRecord["turkish_langB"];
          studentRecord["day_1_total_C"] =
            studentRecord["mathematicC"] +
            studentRecord["kazakh_historyC"] +
            studentRecord["turkish_langC"];

          studentRecord["total"] += studentRecord["day_1_total"];
          studentRecord["totalA"] += studentRecord["day_1_total_A"];
          studentRecord["totalB"] += studentRecord["day_1_total_B"];
          studentRecord["totalC"] += studentRecord["day_1_total_C"];

          // studentRecord["day_1_totalBonus"] = sumOfCorrectAnswersBonus;
          // studentRecord["day_1_totalBonus_A"] = sumOfCorrectAnswersBonusA;
          // studentRecord["day_1_totalBonus_B"] = sumOfCorrectAnswersBonusB;

          // studentRecord["totalBonus"] += studentRecord["day_1_totalBonus"];
          // studentRecord["totalBonusA"] += studentRecord["day_1_totalBonus_A"];
          // studentRecord["totalBonusB"] += studentRecord["day_1_totalBonus_B"];
        }
        break;
    }

    let recordInDb = BtsResults.findOne({
      academicYear: academicYear,
      btsNo: btsNo,
      studentId: student.studentId,
      schoolId: schoolId,
    });

    if (recordInDb) {
      if (day == 1) {
        studentRecord["total"] =
          studentRecord["day_1_total"] + (recordInDb["day_2_total"] || 0);
        studentRecord["totalA"] =
          studentRecord["day_1_total_A"] + (recordInDb["day_2_total_A"] || 0);
        studentRecord["totalB"] =
          studentRecord["day_1_total_B"] + (recordInDb["day_2_total_B"] || 0);
        studentRecord["totalC"] =
          studentRecord["day_1_total_C"] + (recordInDb["day_2_total_C"] || 0);

        studentRecord["subjectsPassed"] =
          studentRecord["day_1_subjectsPassed"] +
          (recordInDb["day_2_subjectsPassed"] || 0);
      } else {
        studentRecord["total"] =
          studentRecord["day_2_total"] + (recordInDb["day_1_total"] || 0);
        studentRecord["totalA"] =
          studentRecord["day_2_total_A"] + (recordInDb["day_1_total_A"] || 0);
        studentRecord["totalB"] =
          studentRecord["day_2_total_B"] + (recordInDb["day_1_total_B"] || 0);
        studentRecord["totalC"] =
          studentRecord["day_2_total_C"] + (recordInDb["day_1_total_C"] || 0);
        studentRecord["subjectsPassed"] =
          studentRecord["day_2_subjectsPassed"] +
          (recordInDb["day_1_subjectsPassed"] || 0);
      }
      BtsResults.update({ _id: recordInDb._id }, { $set: studentRecord });
    } else {
      BtsResults.insert(studentRecord);
    }
  });
};
