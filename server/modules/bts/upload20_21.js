import { check } from "../multipleChoiceChecker";
import { checkA } from "../multipleChoiceChecker";
import { checkB } from "../multipleChoiceChecker";
import { parseAnswerKey } from "../multipleChoiceChecker";
import { parseLevelKey } from "../multipleChoiceChecker";

export const upload0 = (academicYear, btsNo, day, schoolId, results) => {
  console.log("reults.length: " + results.length);
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
      console.log(student + " ! " + student.schoolId + " ! " + answerKey);
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
      total: 0,
      totalA: 0,
      totalB: 0,
      // totalBonus: 0,
      // totalBonusA: 0,
      // totalBonusB: 0,
    };
    switch (student.grade) {
      case "7":
        if (day == "1") {
          studentRecord.variant_day_1 = answerKey.variant;
          studentRecord.day_1_keys = studentObj.keys;

          if (btsNo == "1") {
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

            if (
              student.languageGroup.includes("us") ||
              student.languageGroup.includes("рыс") ||
              student.languageGroup.includes("ус")
            ) {
              studentRecord["kazakh_lang"] = check(
                parseAnswerKey(answerKey.kazakh_lang_rus),
                studentObj.keys.slice(100, 200)
              );
              studentRecord["kazakh_langA"] = checkA(
                parseAnswerKey(answerKey.kazakh_lang_rus),
                studentObj.keys.slice(100, 200),
                parseLevelKey(levelKey.kazakh_lang_rus)
              );
              studentRecord["kazakh_langB"] = checkB(
                parseAnswerKey(answerKey.kazakh_lang_rus),
                studentObj.keys.slice(100, 200),
                parseLevelKey(levelKey.kazakh_lang_rus)
              );
            } else {
              studentRecord["kazakh_lang"] = check(
                parseAnswerKey(answerKey.kazakh_lang_kaz),
                studentObj.keys.slice(100, 200)
              );
              studentRecord["kazakh_langA"] = checkA(
                parseAnswerKey(answerKey.kazakh_lang_kaz),
                studentObj.keys.slice(100, 200),
                parseLevelKey(levelKey.kazakh_lang_kaz)
              );
              studentRecord["kazakh_langB"] = checkB(
                parseAnswerKey(answerKey.kazakh_lang_kaz),
                studentObj.keys.slice(100, 200),
                parseLevelKey(levelKey.kazakh_lang_kaz)
              );
            }

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

            //there is no russian A and B level questions
            // studentRecord["russian_lang"] = check(parseAnswerKey(answerKey.russian_lang), studentObj.keys.slice(300,400))

            studentRecord["day_1_total"] =
              studentRecord["mathematic"] +
              studentRecord["kazakh_lang"] +
              studentRecord["turkish_lang"];
            studentRecord["day_1_total_A"] =
              studentRecord["mathematicA"] +
              studentRecord["kazakh_langA"] +
              studentRecord["turkish_langA"];
            studentRecord["day_1_total_B"] =
              studentRecord["mathematicB"] +
              studentRecord["kazakh_langB"] +
              studentRecord["turkish_langB"];

            studentRecord["total"] += studentRecord["day_1_total"];
            studentRecord["totalA"] += studentRecord["day_1_total_A"];
            studentRecord["totalB"] += studentRecord["day_1_total_B"];
          } else if (btsNo == "2" || btsNo == "3") {
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

            if (
              student.languageGroup.includes("us") ||
              student.languageGroup.includes("рыс") ||
              student.languageGroup.includes("ус")
            ) {
              studentRecord["kazakh_lang"] = check(
                parseAnswerKey(answerKey.kazakh_lang_rus),
                studentObj.keys.slice(100, 200)
              );
              studentRecord["kazakh_langA"] = checkA(
                parseAnswerKey(answerKey.kazakh_lang_rus),
                studentObj.keys.slice(100, 200),
                parseLevelKey(levelKey.kazakh_lang_rus)
              );
              studentRecord["kazakh_langB"] = checkB(
                parseAnswerKey(answerKey.kazakh_lang_rus),
                studentObj.keys.slice(100, 200),
                parseLevelKey(levelKey.kazakh_lang_rus)
              );
            } else {
              studentRecord["kazakh_lang"] = check(
                parseAnswerKey(answerKey.kazakh_lang_kaz),
                studentObj.keys.slice(100, 200)
              );
              studentRecord["kazakh_langA"] = checkA(
                parseAnswerKey(answerKey.kazakh_lang_kaz),
                studentObj.keys.slice(100, 200),
                parseLevelKey(levelKey.kazakh_lang_kaz)
              );
              studentRecord["kazakh_langB"] = checkB(
                parseAnswerKey(answerKey.kazakh_lang_kaz),
                studentObj.keys.slice(100, 200),
                parseLevelKey(levelKey.kazakh_lang_kaz)
              );
            }

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

            //there is no russian A and B level questions
            // studentRecord["russian_lang"] = check(parseAnswerKey(answerKey.russian_lang), studentObj.keys.slice(300,400))

            studentRecord["day_1_total"] =
              studentRecord["mathematic"] +
              studentRecord["kazakh_lang"] +
              studentRecord["geography"];
            studentRecord["day_1_total_A"] =
              studentRecord["mathematicA"] +
              studentRecord["kazakh_langA"] +
              studentRecord["geographyA"];
            studentRecord["day_1_total_B"] =
              studentRecord["mathematicB"] +
              studentRecord["kazakh_langB"] +
              studentRecord["geographyB"];

            studentRecord["total"] += studentRecord["day_1_total"];
            studentRecord["totalA"] += studentRecord["day_1_total_A"];
            studentRecord["totalB"] += studentRecord["day_1_total_B"];

            // studentRecord["mathematicBonus"] = check(
            //   parseAnswerKey(answerKey.mathematicBonus),
            //   studentObj.keys.slice(300, 325)
            // );
            // studentRecord["mathematicBonusA"] = checkA(
            //   parseAnswerKey(answerKey.mathematicBonus),
            //   studentObj.keys.slice(300, 325),
            //   parseLevelKey(levelKey.mathematicBonus)
            // );
            // studentRecord["mathematicBonusB"] = checkB(
            //   parseAnswerKey(answerKey.mathematicBonus),
            //   studentObj.keys.slice(300, 325),
            //   parseLevelKey(levelKey.mathematicBonus)
            // );

            // if (
            //   student.languageGroup.includes("us") ||
            //   student.languageGroup.includes("рыс") ||
            //   student.languageGroup.includes("ус")
            // ) {
            //   studentRecord["kazakh_langBonus"] = check(
            //     parseAnswerKey(answerKey.kazakh_lang_rusBonus),
            //     studentObj.keys.slice(325, 350)
            //   );
            //   studentRecord["kazakh_langBonusA"] = checkA(
            //     parseAnswerKey(answerKey.kazakh_lang_rusBonus),
            //     studentObj.keys.slice(325, 350),
            //     parseLevelKey(levelKey.kazakh_lang_rusBonus)
            //   );
            //   studentRecord["kazakh_langBonusB"] = checkB(
            //     parseAnswerKey(answerKey.kazakh_lang_rusBonus),
            //     studentObj.keys.slice(325, 350),
            //     parseLevelKey(levelKey.kazakh_lang_rusBonus)
            //   );
            // } else {
            //   studentRecord["kazakh_langBonus"] = check(
            //     parseAnswerKey(answerKey.kazakh_lang_kazBonus),
            //     studentObj.keys.slice(325, 350)
            //   );
            //   studentRecord["kazakh_langBonusA"] = checkA(
            //     parseAnswerKey(answerKey.kazakh_lang_kazBonus),
            //     studentObj.keys.slice(325, 350),
            //     parseLevelKey(levelKey.kazakh_lang_kazBonus)
            //   );
            //   studentRecord["kazakh_langBonusB"] = checkB(
            //     parseAnswerKey(answerKey.kazakh_lang_kazBonus),
            //     studentObj.keys.slice(325, 350),
            //     parseLevelKey(levelKey.kazakh_lang_kazBonus)
            //   );
            // }

            // studentRecord["geographyBonus"] = check(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(350, 375)
            // );
            // studentRecord["geographyBonusA"] = checkA(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(350, 375),
            //   parseLevelKey(levelKey.geographyBonus)
            // );
            // studentRecord["geographyBonusB"] = checkB(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(350, 375),
            //   parseLevelKey(levelKey.geographyBonus)
            // );

            // //there is no russian A and B level questions
            // // studentRecord["russian_lang"] = check(parseAnswerKey(answerKey.russian_lang), studentObj.keys.slice(300,400))

            // studentRecord["day_1_totalBonus"] =
            //   studentRecord["mathematicBonus"] +
            //   studentRecord["kazakh_langBonus"] +
            //   studentRecord["geographyBonus"];
            // studentRecord["day_1_totalBonus_A"] =
            //   studentRecord["mathematicBonusA"] +
            //   studentRecord["kazakh_langBonusA"] +
            //   studentRecord["geographyBonusA"];
            // studentRecord["day_1_totalBonus_B"] =
            //   studentRecord["mathematicBonusB"] +
            //   studentRecord["kazakh_langBonusB"] +
            //   studentRecord["geographyBonusB"];

            // studentRecord["totalBonus"] += studentRecord["day_1_totalBonus"];
            // studentRecord["totalBonusA"] += studentRecord["day_1_totalBonus_A"];
            // studentRecord["totalBonusB"] += studentRecord["day_1_totalBonus_B"];
          }
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

          studentRecord["physics"] = check(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(100, 200)
          );
          studentRecord["physicsA"] = checkA(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.physics)
          );
          studentRecord["physicsB"] = checkB(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.physics)
          );

          studentRecord["biology"] = check(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(200, 300)
          );
          studentRecord["biologyA"] = checkA(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.biology)
          );
          studentRecord["biologyB"] = checkB(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.biology)
          );

          studentRecord["day_1_total"] =
            studentRecord["mathematic"] +
            studentRecord["physics"] +
            studentRecord["biology"];
          studentRecord["day_1_total_A"] =
            studentRecord["mathematicA"] +
            studentRecord["physicsA"] +
            studentRecord["biologyA"];
          studentRecord["day_1_total_B"] =
            studentRecord["mathematicB"] +
            studentRecord["physicsB"] +
            studentRecord["biologyB"];

          studentRecord["total"] += studentRecord["day_1_total"];
          studentRecord["totalA"] += studentRecord["day_1_total_A"];
          studentRecord["totalB"] += studentRecord["day_1_total_B"];

          // studentRecord["mathematicBonus"] = check(
          //   parseAnswerKey(answerKey.mathematicBonus),
          //   studentObj.keys.slice(300, 325)
          // );
          // studentRecord["mathematicBonusA"] = checkA(
          //   parseAnswerKey(answerKey.mathematicBonus),
          //   studentObj.keys.slice(300, 325),
          //   parseLevelKey(levelKey.mathematicBonus)
          // );
          // studentRecord["mathematicBonusB"] = checkB(
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

          // studentRecord["biologyBonus"] = check(
          //   parseAnswerKey(answerKey.biologyBonus),
          //   studentObj.keys.slice(350, 375)
          // );
          // studentRecord["biologyBonusA"] = checkA(
          //   parseAnswerKey(answerKey.biologyBonus),
          //   studentObj.keys.slice(350, 375),
          //   parseLevelKey(levelKey.biologyBonus)
          // );
          // studentRecord["biologyBonusB"] = checkB(
          //   parseAnswerKey(answerKey.biologyBonus),
          //   studentObj.keys.slice(350, 375),
          //   parseLevelKey(levelKey.biologyBonus)
          // );

          // studentRecord["day_1_totalBonus"] =
          //   studentRecord["mathematicBonus"] +
          //   studentRecord["physicsBonus"] +
          //   studentRecord["biologyBonus"];
          // studentRecord["day_1_totalBonus_A"] =
          //   studentRecord["mathematicBonusA"] +
          //   studentRecord["physicsBonusA"] +
          //   studentRecord["biologyBonusA"];
          // studentRecord["day_1_totalBonus_B"] =
          //   studentRecord["mathematicBonusB"] +
          //   studentRecord["physicsBonusB"] +
          //   studentRecord["biologyBonusB"];

          // studentRecord["totalBonus"] += studentRecord["day_1_totalBonus"];
          // studentRecord["totalBonusA"] += studentRecord["day_1_totalBonus_A"];
          // studentRecord["totalBonusB"] += studentRecord["day_1_totalBonus_B"];
        } else if (day == "2") {
          studentRecord.variant_day_2 = answerKey.variant;
          studentRecord.day_2_keys = studentObj.keys;

          studentRecord["geography"] = check(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(0, 100)
          );
          studentRecord["geographyA"] = checkA(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.geography)
          );
          studentRecord["geographyB"] = checkB(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.geography)
          );

          studentRecord["physics"] = check(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(100, 200)
          );
          studentRecord["physicsA"] = checkA(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.physics)
          );
          studentRecord["physicsB"] = checkB(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.physics)
          );

          studentRecord["chemistry"] = check(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(200, 300)
          );
          studentRecord["chemistryA"] = checkA(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.chemistry)
          );
          studentRecord["chemistryB"] = checkB(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.chemistry)
          );

          studentRecord["biology"] = check(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(300, 400)
          );
          studentRecord["biologyA"] = checkA(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(300, 400),
            parseLevelKey(levelKey.biology)
          );
          studentRecord["biologyB"] = checkB(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(300, 400),
            parseLevelKey(levelKey.biology)
          );

          studentRecord["day_2_total"] =
            studentRecord["geography"] +
            studentRecord["physics"] +
            studentRecord["chemistry"] +
            studentRecord["biology"];
          studentRecord["day_2_total_A"] =
            studentRecord["geographyA"] +
            studentRecord["physicsA"] +
            studentRecord["chemistryA"] +
            studentRecord["biologyA"];
          studentRecord["day_2_total_B"] =
            studentRecord["geographyB"] +
            studentRecord["physicsB"] +
            studentRecord["chemistryB"] +
            studentRecord["biologyB"];

          studentRecord["total"] += studentRecord["day_2_total"];
          studentRecord["totalA"] += studentRecord["day_2_total_A"];
          studentRecord["totalB"] += studentRecord["day_2_total_B"];
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

          studentRecord["physics"] = check(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(100, 200)
          );
          studentRecord["physicsA"] = checkA(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.physics)
          );
          studentRecord["physicsB"] = checkB(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.physics)
          );

          studentRecord["chemistry"] = check(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(200, 300)
          );
          studentRecord["chemistryA"] = checkA(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.chemistry)
          );
          studentRecord["chemistryB"] = checkB(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.chemistry)
          );

          studentRecord["day_1_total"] =
            studentRecord["mathematic"] +
            studentRecord["physics"] +
            studentRecord["chemistry"];
          studentRecord["day_1_total_A"] =
            studentRecord["mathematicA"] +
            studentRecord["physicsA"] +
            studentRecord["chemistryA"];
          studentRecord["day_1_total_B"] =
            studentRecord["mathematicB"] +
            studentRecord["physicsB"] +
            studentRecord["chemistryB"];

          studentRecord["total"] += studentRecord["day_1_total"];
          studentRecord["totalA"] += studentRecord["day_1_total_A"];
          studentRecord["totalB"] += studentRecord["day_1_total_B"];

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

          studentRecord["geography"] = check(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(0, 100)
          );
          studentRecord["geographyA"] = checkA(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.geography)
          );
          studentRecord["geographyB"] = checkB(
            parseAnswerKey(answerKey.geography),
            studentObj.keys.slice(0, 100),
            parseLevelKey(levelKey.geography)
          );

          studentRecord["physics"] = check(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(100, 200)
          );
          studentRecord["physicsA"] = checkA(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.physics)
          );
          studentRecord["physicsB"] = checkB(
            parseAnswerKey(answerKey.physics),
            studentObj.keys.slice(100, 200),
            parseLevelKey(levelKey.physics)
          );

          studentRecord["chemistry"] = check(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(200, 300)
          );
          studentRecord["chemistryA"] = checkA(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.chemistry)
          );
          studentRecord["chemistryB"] = checkB(
            parseAnswerKey(answerKey.chemistry),
            studentObj.keys.slice(200, 300),
            parseLevelKey(levelKey.chemistry)
          );

          studentRecord["biology"] = check(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(300, 400)
          );
          studentRecord["biologyA"] = checkA(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(300, 400),
            parseLevelKey(levelKey.biology)
          );
          studentRecord["biologyB"] = checkB(
            parseAnswerKey(answerKey.biology),
            studentObj.keys.slice(300, 400),
            parseLevelKey(levelKey.biology)
          );

          studentRecord["day_2_total"] =
            studentRecord["geography"] +
            studentRecord["physics"] +
            studentRecord["chemistry"] +
            studentRecord["biology"];
          studentRecord["day_2_total_A"] =
            studentRecord["geographyA"] +
            studentRecord["physicsA"] +
            studentRecord["chemistryA"] +
            studentRecord["biologyA"];
          studentRecord["day_2_total_B"] =
            studentRecord["geographyB"] +
            studentRecord["physicsB"] +
            studentRecord["chemistryB"] +
            studentRecord["biologyB"];

          studentRecord["total"] += studentRecord["day_2_total"];
          studentRecord["totalA"] += studentRecord["day_2_total_A"];
          studentRecord["totalB"] += studentRecord["day_2_total_B"];
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

          // studentRecord["mathematicBonus"] = check(
          //   parseAnswerKey(answerKey.mathematicBonus),
          //   studentObj.keys.slice(300, 325)
          // );
          // studentRecord["mathematicBonusA"] = checkA(
          //   parseAnswerKey(answerKey.mathematicBonus),
          //   studentObj.keys.slice(300, 325),
          //   parseLevelKey(levelKey.mathematicBonus)
          // );
          // studentRecord["mathematicBonusB"] = checkB(
          //   parseAnswerKey(answerKey.mathematicBonus),
          //   studentObj.keys.slice(300, 325),
          //   parseLevelKey(levelKey.mathematicBonus)
          // );

          var sumOfCorrectAnswers = studentRecord["mathematic"];
          var sumOfCorrectAnswersA = studentRecord["mathematicA"];
          var sumOfCorrectAnswersB = studentRecord["mathematicB"];

          // var sumOfCorrectAnswersBonus = studentRecord["mathematicBonus"];
          // var sumOfCorrectAnswersBonusA = studentRecord["mathematicBonusA"];
          // var sumOfCorrectAnswersBonusB = studentRecord["mathematicBonusB"];

          let electiveGroupId = studentRecord["electiveGroup"];

          if (electiveGroupId == "01") {
            //География - Физика

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

            studentRecord["physics"] = check(
              parseAnswerKey(answerKey.physics),
              studentObj.keys.slice(200, 300)
            );
            studentRecord["physicsA"] = checkA(
              parseAnswerKey(answerKey.physics),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.physics)
            );
            studentRecord["physicsB"] = checkB(
              parseAnswerKey(answerKey.physics),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.physics)
            );

            sumOfCorrectAnswers +=
              studentRecord["geography"] + studentRecord["physics"];
            sumOfCorrectAnswersA +=
              studentRecord["geographyA"] + studentRecord["physicsA"];
            sumOfCorrectAnswersB +=
              studentRecord["geographyB"] + studentRecord["physicsB"];

            // studentRecord["geographyBonus"] = check(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(325, 350)
            // );
            // studentRecord["geographyBonusA"] = checkA(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(325, 350),
            //   parseLevelKey(levelKey.geographyBonus)
            // );
            // studentRecord["geographyBonusB"] = checkB(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(325, 350),
            //   parseLevelKey(levelKey.geographyBonus)
            // );

            // studentRecord["physicsBonus"] = check(
            //   parseAnswerKey(answerKey.physicsBonus),
            //   studentObj.keys.slice(350, 375)
            // );
            // studentRecord["physicsBonusA"] = checkA(
            //   parseAnswerKey(answerKey.physicsBonus),
            //   studentObj.keys.slice(350, 375),
            //   parseLevelKey(levelKey.physicsBonus)
            // );
            // studentRecord["physicsBonusB"] = checkB(
            //   parseAnswerKey(answerKey.physicsBonus),
            //   studentObj.keys.slice(350, 375),
            //   parseLevelKey(levelKey.physicsBonus)
            // );

            // sumOfCorrectAnswersBonus +=
            //   studentRecord["geographyBonus"] + studentRecord["physicsBonus"];
            // sumOfCorrectAnswersBonusA +=
            //   studentRecord["geographyBonusA"] + studentRecord["physicsBonusA"];
            // sumOfCorrectAnswersBonusB +=
            //   studentRecord["geographyBonusB"] + studentRecord["physicsBonusB"];
          } else if (electiveGroupId == "02") {
            //География - Химия
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

            studentRecord["chemistry"] = check(
              parseAnswerKey(answerKey.chemistry),
              studentObj.keys.slice(200, 300)
            );
            studentRecord["chemistryA"] = checkA(
              parseAnswerKey(answerKey.chemistry),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.chemistry)
            );
            studentRecord["chemistryB"] = checkB(
              parseAnswerKey(answerKey.chemistry),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.chemistry)
            );

            sumOfCorrectAnswers +=
              studentRecord["geography"] + studentRecord["chemistry"];
            sumOfCorrectAnswersA +=
              studentRecord["geographyA"] + studentRecord["chemistryA"];
            sumOfCorrectAnswersB +=
              studentRecord["geographyB"] + studentRecord["chemistryB"];

            // studentRecord["geographyBonus"] = check(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(325, 350)
            // );
            // studentRecord["geographyBonusA"] = checkA(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(325, 350),
            //   parseLevelKey(levelKey.geographyBonus)
            // );
            // studentRecord["geographyBonusB"] = checkB(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(325, 350),
            //   parseLevelKey(levelKey.geographyBonus)
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

            // sumOfCorrectAnswersBonus +=
            //   studentRecord["geographyBonus"] + studentRecord["chemistryBonus"];
            // sumOfCorrectAnswersBonusA +=
            //   studentRecord["geographyBonusA"] +
            //   studentRecord["chemistryBonusA"];
            // sumOfCorrectAnswersBonusB +=
            //   studentRecord["geographyBonusB"] +
            //   studentRecord["chemistryBonusB"];
          } else if (electiveGroupId == "03") {
            //География - Биология
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

            studentRecord["biology"] = check(
              parseAnswerKey(answerKey.biology),
              studentObj.keys.slice(200, 300)
            );
            studentRecord["biologyA"] = checkA(
              parseAnswerKey(answerKey.biology),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.biology)
            );
            studentRecord["biologyB"] = checkB(
              parseAnswerKey(answerKey.biology),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.biology)
            );

            sumOfCorrectAnswers +=
              studentRecord["geography"] + studentRecord["biology"];
            sumOfCorrectAnswersA +=
              studentRecord["geographyA"] + studentRecord["biologyA"];
            sumOfCorrectAnswersB +=
              studentRecord["geographyB"] + studentRecord["biologyB"];

            // studentRecord["geographyBonus"] = check(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(325, 350)
            // );
            // studentRecord["geographyBonusA"] = checkA(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(325, 350),
            //   parseLevelKey(levelKey.geographyBonus)
            // );
            // studentRecord["geographyBonusB"] = checkB(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(325, 350),
            //   parseLevelKey(levelKey.geographyBonus)
            // );

            // studentRecord["biologyBonus"] = check(
            //   parseAnswerKey(answerKey.biologyBonus),
            //   studentObj.keys.slice(350, 375)
            // );
            // studentRecord["biologyBonusA"] = checkA(
            //   parseAnswerKey(answerKey.biologyBonus),
            //   studentObj.keys.slice(350, 375),
            //   parseLevelKey(levelKey.biologyBonus)
            // );
            // studentRecord["biologyBonusB"] = checkB(
            //   parseAnswerKey(answerKey.biologyBonus),
            //   studentObj.keys.slice(350, 375),
            //   parseLevelKey(levelKey.biologyBonus)
            // );

            // sumOfCorrectAnswersBonus +=
            //   studentRecord["geographyBonus"] + studentRecord["biologyBonus"];
            // sumOfCorrectAnswersBonusA +=
            //   studentRecord["geographyBonusA"] + studentRecord["biologyBonusA"];
            // sumOfCorrectAnswersBonusB +=
            //   studentRecord["geographyBonusB"] + studentRecord["biologyBonusB"];
          } else if (electiveGroupId == "04") {
            //Физика - Химия
            studentRecord["physics"] = check(
              parseAnswerKey(answerKey.physics),
              studentObj.keys.slice(100, 200)
            );
            studentRecord["physicsA"] = checkA(
              parseAnswerKey(answerKey.physics),
              studentObj.keys.slice(100, 200),
              parseLevelKey(levelKey.physics)
            );
            studentRecord["physicsB"] = checkB(
              parseAnswerKey(answerKey.physics),
              studentObj.keys.slice(100, 200),
              parseLevelKey(levelKey.physics)
            );

            studentRecord["chemistry"] = check(
              parseAnswerKey(answerKey.chemistry),
              studentObj.keys.slice(200, 300)
            );
            studentRecord["chemistryA"] = checkA(
              parseAnswerKey(answerKey.chemistry),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.chemistry)
            );
            studentRecord["chemistryB"] = checkB(
              parseAnswerKey(answerKey.chemistry),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.chemistry)
            );

            sumOfCorrectAnswers +=
              studentRecord["physics"] + studentRecord["chemistry"];
            sumOfCorrectAnswersA +=
              studentRecord["physicsA"] + studentRecord["chemistryA"];
            sumOfCorrectAnswersB +=
              studentRecord["physicsB"] + studentRecord["chemistryB"];

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

            // sumOfCorrectAnswersBonus +=
            //   studentRecord["physicsBonus"] + studentRecord["chemistryBonus"];
            // sumOfCorrectAnswersBonusA +=
            //   studentRecord["physicsBonusA"] + studentRecord["chemistryBonusA"];
            // sumOfCorrectAnswersBonusB +=
            //   studentRecord["physicsBonusB"] + studentRecord["chemistryBonusB"];
          } else if (electiveGroupId == "05") {
            //Физика - Биология
            studentRecord["physics"] = check(
              parseAnswerKey(answerKey.physics),
              studentObj.keys.slice(100, 200)
            );
            studentRecord["physicsA"] = checkA(
              parseAnswerKey(answerKey.physics),
              studentObj.keys.slice(100, 200),
              parseLevelKey(levelKey.physics)
            );
            studentRecord["physicsB"] = checkB(
              parseAnswerKey(answerKey.physics),
              studentObj.keys.slice(100, 200),
              parseLevelKey(levelKey.physics)
            );

            studentRecord["biology"] = check(
              parseAnswerKey(answerKey.biology),
              studentObj.keys.slice(200, 300)
            );
            studentRecord["biologyA"] = checkA(
              parseAnswerKey(answerKey.biology),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.biology)
            );
            studentRecord["biologyB"] = checkB(
              parseAnswerKey(answerKey.biology),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.biology)
            );

            sumOfCorrectAnswers +=
              studentRecord["physics"] + studentRecord["biology"];
            sumOfCorrectAnswersA +=
              studentRecord["physicsA"] + studentRecord["biologyA"];
            sumOfCorrectAnswersB +=
              studentRecord["physicsB"] + studentRecord["biologyB"];

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

            // studentRecord["biologyBonus"] = check(
            //   parseAnswerKey(answerKey.biologyBonus),
            //   studentObj.keys.slice(350, 375)
            // );
            // studentRecord["biologyBonusA"] = checkA(
            //   parseAnswerKey(answerKey.biologyBonus),
            //   studentObj.keys.slice(350, 375),
            //   parseLevelKey(levelKey.biologyBonus)
            // );
            // studentRecord["biologyBonusB"] = checkB(
            //   parseAnswerKey(answerKey.biologyBonus),
            //   studentObj.keys.slice(350, 375),
            //   parseLevelKey(levelKey.biologyBonus)
            // );

            // sumOfCorrectAnswersBonus +=
            //   studentRecord["physicsBonus"] + studentRecord["biologyBonus"];
            // sumOfCorrectAnswersBonusA +=
            //   studentRecord["physicsBonusA"] + studentRecord["biologyBonusA"];
            // sumOfCorrectAnswersBonusB +=
            //   studentRecord["physicsBonusB"] + studentRecord["biologyBonusB"];
          } else if (electiveGroupId == "06") {
            // Химия - Биология
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

            studentRecord["biology"] = check(
              parseAnswerKey(answerKey.biology),
              studentObj.keys.slice(200, 300)
            );
            studentRecord["biologyA"] = checkA(
              parseAnswerKey(answerKey.biology),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.biology)
            );
            studentRecord["biologyB"] = checkB(
              parseAnswerKey(answerKey.biology),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.biology)
            );

            sumOfCorrectAnswers +=
              studentRecord["chemistry"] + studentRecord["biology"];
            sumOfCorrectAnswersA +=
              studentRecord["chemistryA"] + studentRecord["biologyA"];
            sumOfCorrectAnswersB +=
              studentRecord["chemistryB"] + studentRecord["biologyB"];

            // studentRecord["chemistryBonus"] = check(
            //   parseAnswerKey(answerKey.chemistryBonus),
            //   studentObj.keys.slice(325, 350)
            // );
            // studentRecord["chemistryBonusA"] = checkA(
            //   parseAnswerKey(answerKey.chemistryBonus),
            //   studentObj.keys.slice(325, 350),
            //   parseLevelKey(levelKey.chemistryBonus)
            // );
            // studentRecord["chemistryBonusB"] = checkB(
            //   parseAnswerKey(answerKey.chemistryBonus),
            //   studentObj.keys.slice(325, 350),
            //   parseLevelKey(levelKey.chemistryBonus)
            // );

            // studentRecord["biologyBonus"] = check(
            //   parseAnswerKey(answerKey.biologyBonus),
            //   studentObj.keys.slice(350, 375)
            // );
            // studentRecord["biologyBonusA"] = checkA(
            //   parseAnswerKey(answerKey.biologyBonus),
            //   studentObj.keys.slice(350, 375),
            //   parseLevelKey(levelKey.biologyBonus)
            // );
            // studentRecord["biologyBonusB"] = checkB(
            //   parseAnswerKey(answerKey.biologyBonus),
            //   studentObj.keys.slice(350, 375),
            //   parseLevelKey(levelKey.biologyBonus)
            // );

            // sumOfCorrectAnswersBonus +=
            //   studentRecord["chemistryBonus"] + studentRecord["biologyBonus"];
            // sumOfCorrectAnswersBonusA +=
            //   studentRecord["chemistryBonusA"] + studentRecord["biologyBonusA"];
            // sumOfCorrectAnswersBonusB +=
            //   studentRecord["chemistryBonusB"] + studentRecord["biologyBonusB"];
          } else if (electiveGroupId == "07") {
            // География - Д. Тарихы
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

            studentRecord["world_history"] = check(
              parseAnswerKey(answerKey.world_history),
              studentObj.keys.slice(200, 300)
            );
            studentRecord["world_historyA"] = checkA(
              parseAnswerKey(answerKey.world_history),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.world_history)
            );
            studentRecord["world_historyB"] = checkB(
              parseAnswerKey(answerKey.world_history),
              studentObj.keys.slice(200, 300),
              parseLevelKey(levelKey.world_history)
            );

            sumOfCorrectAnswers +=
              studentRecord["geography"] + studentRecord["world_history"];
            sumOfCorrectAnswersA +=
              studentRecord["geographyA"] + studentRecord["world_historyA"];
            sumOfCorrectAnswersB +=
              studentRecord["geographyB"] + studentRecord["world_historyB"];

            // studentRecord["geographyBonus"] = check(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(325, 350)
            // );
            // studentRecord["geographyBonusA"] = checkA(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(325, 350),
            //   parseLevelKey(levelKey.geographyBonus)
            // );
            // studentRecord["geographyBonusB"] = checkB(
            //   parseAnswerKey(answerKey.geographyBonus),
            //   studentObj.keys.slice(325, 350),
            //   parseLevelKey(levelKey.geographyBonus)
            // );

            // studentRecord["world_historyBonus"] = check(
            //   parseAnswerKey(answerKey.world_historyBonus),
            //   studentObj.keys.slice(350, 375)
            // );
            // studentRecord["world_historyBonusA"] = checkA(
            //   parseAnswerKey(answerKey.world_historyBonus),
            //   studentObj.keys.slice(350, 375),
            //   parseLevelKey(levelKey.world_historyBonus)
            // );
            // studentRecord["world_historyBonusB"] = checkB(
            //   parseAnswerKey(answerKey.world_historyBonus),
            //   studentObj.keys.slice(350, 375),
            //   parseLevelKey(levelKey.world_historyBonus)
            // );

            // sumOfCorrectAnswersBonus +=
            //   studentRecord["geographyBonus"] +
            //   studentRecord["world_historyBonus"];
            // sumOfCorrectAnswersBonusA +=
            //   studentRecord["geographyBonusA"] +
            //   studentRecord["world_historyBonusA"];
            // sumOfCorrectAnswersBonusB +=
            //   studentRecord["geographyBonusB"] +
            //   studentRecord["world_historyBonusB"];
          }

          studentRecord["day_1_total"] = sumOfCorrectAnswers;
          studentRecord["day_1_total_A"] = sumOfCorrectAnswersA;
          studentRecord["day_1_total_B"] = sumOfCorrectAnswersB;

          studentRecord["total"] += studentRecord["day_1_total"];
          studentRecord["totalA"] += studentRecord["day_1_total_A"];
          studentRecord["totalB"] += studentRecord["day_1_total_B"];

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

        // studentRecord["totalBonus"] =
        //   studentRecord["day_1_totalBonus"] +
        //   (recordInDb["day_2_totalBonus"] || 0);
        // studentRecord["totalBonusA"] =
        //   studentRecord["day_1_totalBonus_A"] +
        //   (recordInDb["day_2_totalBonus_A"] || 0);
        // studentRecord["totalBonusB"] =
        //   studentRecord["day_1_totalBonus_B"] +
        //   (recordInDb["day_2_totalBonus_B"] || 0);
      } else {
        studentRecord["total"] =
          studentRecord["day_2_total"] + (recordInDb["day_1_total"] || 0);
        studentRecord["totalA"] =
          studentRecord["day_2_total_A"] + (recordInDb["day_1_total_A"] || 0);
        studentRecord["totalB"] =
          studentRecord["day_2_total_B"] + (recordInDb["day_1_total_B"] || 0);
      }
      BtsResults.update({ _id: recordInDb._id }, { $set: studentRecord });
    } else {
      BtsResults.insert(studentRecord);
    }
  });
};
