import { check} from "../multipleChoiceChecker";
import { checkA} from "../multipleChoiceChecker";
import { checkB} from "../multipleChoiceChecker";
import { parseAnswerKey } from "../multipleChoiceChecker";
import { parseLevelKey } from "../multipleChoiceChecker";

export const upload0 = (academicYear,btsNo,day,schoolId,results) => {
    _.each(results,(studentObj) => {
        //console.log(studentObj.keys)
        let student = Students.findOne({studentId:parseInt(studentObj.studentId)});

        // getting an answerKey

        let answerKey = BtsAnswerKeys.findOne({
            academicYear: academicYear,
            quarter: btsNo,
            day: day,
            variant: studentObj.variant,
            grade: student.grade
        });

        let levelKey = BtsLevels.findOne({
            academicYear: academicYear,
            quarter: btsNo,
            day: day,
            variant: studentObj.variant,
            grade: student.grade
        });

        if (!student || student.schoolId != schoolId || !answerKey)
            return;

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
            totalB: 0
        }
        switch(student.grade){
          case '7':

            console.log("grade 7");

            if(day == '1'){
              studentRecord.variant_day_1 = answerKey.variant
              studentRecord.day_1_keys = studentObj.keys

                if (btsNo == '1' || btsNo == '2'){

                  console.log("btsNo 1 or 2");
                  studentRecord["mathematic"] = check(parseAnswerKey(answerKey.mathematic), studentObj.keys.slice(0,100))
                  studentRecord["mathematicA"] = checkA(parseAnswerKey(answerKey.mathematic), studentObj.keys.slice(0,100),parseLevelKey(levelKey.mathematic))
                  studentRecord["mathematicB"] = checkB(parseAnswerKey(answerKey.mathematic), studentObj.keys.slice(0,100),parseLevelKey(levelKey.mathematic))

                  studentRecord["kazakh_lang"] = check(parseAnswerKey(answerKey.kazakh_lang), studentObj.keys.slice(100,200))
                  studentRecord["kazakh_langA"] = checkA(parseAnswerKey(answerKey.kazakh_lang), studentObj.keys.slice(100,200),parseLevelKey(levelKey.kazakh_lang))
                  studentRecord["kazakh_langB"] = checkB(parseAnswerKey(answerKey.kazakh_lang), studentObj.keys.slice(100,200),parseLevelKey(levelKey.kazakh_lang))

                  studentRecord["turkish_lang"] = check(parseAnswerKey(answerKey.turkish_lang), studentObj.keys.slice(200,300))
                  studentRecord["turkish_langA"] = checkA(parseAnswerKey(answerKey.turkish_lang), studentObj.keys.slice(200,300),parseLevelKey(levelKey.turkish_lang))
                  studentRecord["turkish_langB"] = checkB(parseAnswerKey(answerKey.turkish_lang), studentObj.keys.slice(200,300),parseLevelKey(levelKey.turkish_lang))

                  //there is no russian A and B level questions
                  studentRecord["russian_lang"] = check(parseAnswerKey(answerKey.russian_lang), studentObj.keys.slice(300,400))

                  studentRecord["day_1_total"] = studentRecord["mathematic"] + studentRecord["kazakh_lang"] + studentRecord["turkish_lang"] + studentRecord["russian_lang"]
                  studentRecord["day_1_total_A"] = studentRecord["mathematicA"] + studentRecord["kazakh_langA"] + studentRecord["turkish_langA"]
                  studentRecord["day_1_total_B"] = studentRecord["mathematicB"] + studentRecord["kazakh_langB"] + studentRecord["turkish_langB"]

                  studentRecord["total"] += studentRecord["day_1_total"]
                  studentRecord["totalA"] += studentRecord["day_1_total_A"]
                  studentRecord["totalB"] += studentRecord["day_1_total_B"]

                }else if (btsNo == '3'){

                  studentRecord["mathematic"]   = check(parseAnswerKey(answerKey.mathematic), studentObj.keys.slice(0,100))
                  studentRecord["mathematicA"]  = checkA(parseAnswerKey(answerKey.mathematic), studentObj.keys.slice(0,100),parseLevelKey(levelKey.mathematic))
                  studentRecord["mathematicB"]  = checkB(parseAnswerKey(answerKey.mathematic), studentObj.keys.slice(0,100),parseLevelKey(levelKey.mathematic))

                  studentRecord["physics"]  = check(parseAnswerKey(answerKey.physics), studentObj.keys.slice(100,200));
                  studentRecord["physicsA"] = checkA(parseAnswerKey(answerKey.physics), studentObj.keys.slice(100,200),parseLevelKey(levelKey.physics));
                  studentRecord["physicsB"] = checkB(parseAnswerKey(answerKey.physics), studentObj.keys.slice(100,200),parseLevelKey(levelKey.physics));

                  studentRecord["chemistry"]  = check(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(200,300));
                  studentRecord["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(200,300),parseLevelKey(levelKey.chemistry));
                  studentRecord["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(200,300),parseLevelKey(levelKey.chemistry));

                  studentRecord["biology"] = check(parseAnswerKey(answerKey.biology), studentObj.keys.slice(300,400));
                  studentRecord["biologyA"] = checkA(parseAnswerKey(answerKey.biology), studentObj.keys.slice(300,400), parseLevelKey(levelKey.biology));
                  studentRecord["biologyB"] = checkB(parseAnswerKey(answerKey.biology), studentObj.keys.slice(300,400), parseLevelKey(levelKey.biology));


                  studentRecord["day_1_total"] = studentRecord["mathematic"] + studentRecord["physics"] + studentRecord["chemistry"] + studentRecord["biology"]
                  studentRecord["day_1_total_A"] = studentRecord["mathematicA"] + studentRecord["physicsA"] + studentRecord["chemistryA"] + studentRecord["biologyA"]
                  studentRecord["day_1_total_B"] = studentRecord["mathematicB"] + studentRecord["physicsB"] + studentRecord["chemistryB"] + studentRecord["biologyB"]

                  studentRecord["total"] += studentRecord["day_1_total"]
                  studentRecord["totalA"] += studentRecord["day_1_total_A"]
                  studentRecord["totalB"] += studentRecord["day_1_total_B"]
                }
            }
            //end 7 grade
            break;

          case '8':
          case '9':

            if (day == '1'){
              console.log("upload0 day 1");
              studentRecord.variant_day_1 = answerKey.variant
              studentRecord.day_1_keys = studentObj.keys

              studentRecord["mathematic"]   = check(parseAnswerKey(answerKey.mathematic), studentObj.keys.slice(0,100))
              studentRecord["mathematicA"]  = checkA(parseAnswerKey(answerKey.mathematic), studentObj.keys.slice(0,100),parseLevelKey(levelKey.mathematic))
              studentRecord["mathematicB"]  = checkB(parseAnswerKey(answerKey.mathematic), studentObj.keys.slice(0,100),parseLevelKey(levelKey.mathematic))

              studentRecord["kazakh_lang"] = check(parseAnswerKey(answerKey.kazakh_lang), studentObj.keys.slice(100,200))
              studentRecord["kazakh_langA"] = checkA(parseAnswerKey(answerKey.kazakh_lang), studentObj.keys.slice(100,200),parseLevelKey(levelKey.kazakh_lang))
              studentRecord["kazakh_langB"] = checkB(parseAnswerKey(answerKey.kazakh_lang), studentObj.keys.slice(100,200),parseLevelKey(levelKey.kazakh_lang))

              studentRecord["turkish_lang"] = check(parseAnswerKey(answerKey.turkish_lang), studentObj.keys.slice(200,300))
              studentRecord["turkish_langA"] = checkA(parseAnswerKey(answerKey.turkish_lang), studentObj.keys.slice(200,300),parseLevelKey(levelKey.turkish_lang))
              studentRecord["turkish_langB"] = checkB(parseAnswerKey(answerKey.turkish_lang), studentObj.keys.slice(200,300),parseLevelKey(levelKey.turkish_lang))

              studentRecord["kazakh_history"] = check(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400))
              studentRecord["kazakh_historyA"] = checkA(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400), parseLevelKey(levelKey.kazakh_history))
              studentRecord["kazakh_historyB"] = checkB(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400), parseLevelKey(levelKey.kazakh_history))

              studentRecord["day_1_total"] = studentRecord["mathematic"] + studentRecord["kazakh_lang"] + studentRecord["turkish_lang"] + studentRecord["kazakh_history"]
              studentRecord["day_1_total_A"] = studentRecord["mathematicA"] + studentRecord["kazakh_langA"] + studentRecord["turkish_langA"] + studentRecord["kazakh_historyA"]
              studentRecord["day_1_total_B"] = studentRecord["mathematicB"] + studentRecord["kazakh_langB"] + studentRecord["turkish_langB"] + studentRecord["kazakh_historyB"]

              studentRecord["total"] += studentRecord["day_1_total"]
              studentRecord["totalA"] += studentRecord["day_1_total_A"]
              studentRecord["totalB"] += studentRecord["day_1_total_B"]

            }else if (day == '2'){
                studentRecord.variant_day_2 = answerKey.variant
                studentRecord.day_2_keys = studentObj.keys

                studentRecord["geography"] = check(parseAnswerKey(answerKey.geography), studentObj.keys.slice(0,100))
                studentRecord["geographyA"] = checkA(parseAnswerKey(answerKey.geography), studentObj.keys.slice(0,100),parseLevelKey(levelKey.geography))
                studentRecord["geographyB"] = checkB(parseAnswerKey(answerKey.geography), studentObj.keys.slice(0,100),parseLevelKey(levelKey.geography))

                studentRecord["physics"]  = check(parseAnswerKey(answerKey.physics), studentObj.keys.slice(100,200));
                studentRecord["physicsA"] = checkA(parseAnswerKey(answerKey.physics), studentObj.keys.slice(100,200),parseLevelKey(levelKey.physics));
                studentRecord["physicsB"] = checkB(parseAnswerKey(answerKey.physics), studentObj.keys.slice(100,200),parseLevelKey(levelKey.physics));

                studentRecord["chemistry"]  = check(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(200,300));
                studentRecord["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(200,300),parseLevelKey(levelKey.chemistry));
                studentRecord["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(200,300),parseLevelKey(levelKey.chemistry));

                studentRecord["biology"] = check(parseAnswerKey(answerKey.biology), studentObj.keys.slice(300,400));
                studentRecord["biologyA"] = checkA(parseAnswerKey(answerKey.biology), studentObj.keys.slice(300,400), parseLevelKey(levelKey.biology));
                studentRecord["biologyB"] = checkB(parseAnswerKey(answerKey.biology), studentObj.keys.slice(300,400), parseLevelKey(levelKey.biology));

                studentRecord["day_2_total"] = studentRecord["geography"] + studentRecord["physics"] + studentRecord["chemistry"] + studentRecord["biology"]
                studentRecord["day_2_total_A"] = studentRecord["geographyA"] + studentRecord["physicsA"] + studentRecord["chemistryA"] + studentRecord["biologyA"]
                studentRecord["day_2_total_B"] = studentRecord["geographyB"] + studentRecord["physicsB"] + studentRecord["chemistryB"] + studentRecord["biologyB"]

                studentRecord["total"] += studentRecord["day_2_total"]
                studentRecord["totalA"] += studentRecord["day_2_total_A"]
                studentRecord["totalB"] += studentRecord["day_2_total_B"]
            }
            break;

          case '10':
            console.log("grade: 10");
            if (day == '1'){

              studentRecord["mathematic"]   = check(parseAnswerKey(answerKey.mathematic), studentObj.keys.slice(0,100))
              studentRecord["mathematicA"]  = checkA(parseAnswerKey(answerKey.mathematic), studentObj.keys.slice(0,100),parseLevelKey(levelKey.mathematic))
              studentRecord["mathematicB"]  = checkB(parseAnswerKey(answerKey.mathematic), studentObj.keys.slice(0,100),parseLevelKey(levelKey.mathematic))

              studentRecord["kazakh_lang"] = check(parseAnswerKey(answerKey.kazakh_lang), studentObj.keys.slice(100,200))
              studentRecord["kazakh_langA"] = checkA(parseAnswerKey(answerKey.kazakh_lang), studentObj.keys.slice(100,200),parseLevelKey(levelKey.kazakh_lang))
              studentRecord["kazakh_langB"] = checkB(parseAnswerKey(answerKey.kazakh_lang), studentObj.keys.slice(100,200),parseLevelKey(levelKey.kazakh_lang))

              studentRecord["kazakh_history"] = check(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(200,300))
              studentRecord["kazakh_historyA"] = checkA(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(200,300), parseLevelKey(levelKey.kazakh_history))
              studentRecord["kazakh_historyB"] = checkB(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(200,300), parseLevelKey(levelKey.kazakh_history))

              var sumOfCorrectAnswers = studentRecord["mathematic"] + studentRecord["kazakh_lang"] + studentRecord["kazakh_history"];
              var sumOfCorrectAnswersA = studentRecord["mathematicA"] + studentRecord["kazakh_langA"] + studentRecord["kazakh_historyA"];
              var sumOfCorrectAnswersB = studentRecord["mathematicB"] + studentRecord["kazakh_langB"] + studentRecord["kazakh_historyB"];

              let electiveGroupId = studentRecord["electiveGroup"];

              if(electiveGroupId == "01"){ //География - Физика

                studentRecord["geography"] = check(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400))
                studentRecord["geographyA"] = checkA(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400),parseLevelKey(levelKey.geography))
                studentRecord["geographyB"] = checkB(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400),parseLevelKey(levelKey.geography))

                studentRecord["physics"]  = check(parseAnswerKey(answerKey.physics), studentObj.keys.slice(400,500));
                studentRecord["physicsA"] = checkA(parseAnswerKey(answerKey.physics), studentObj.keys.slice(400,500),parseLevelKey(levelKey.physics));
                studentRecord["physicsB"] = checkB(parseAnswerKey(answerKey.physics), studentObj.keys.slice(400,500),parseLevelKey(levelKey.physics));


                sumOfCorrectAnswers += studentRecord["geography"] + studentRecord["physics"]
                sumOfCorrectAnswersA += studentRecord["geographyA"] + studentRecord["physicsA"]
                sumOfCorrectAnswersB += studentRecord["geographyB"] + studentRecord["physicsB"]

              }else if (electiveGroupId == "02") { //География - Химия
                console.log("electiveGroupId 02");
                studentRecord["geography"] = check(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400))
                studentRecord["geographyA"] = checkA(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400),parseLevelKey(levelKey.geography))
                studentRecord["geographyB"] = checkB(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400),parseLevelKey(levelKey.geography))

                studentRecord["chemistry"] = check(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(400,500))
                studentRecord["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(400,500),parseLevelKey(levelKey.chemistry))
                studentRecord["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(400,500),parseLevelKey(levelKey.chemistry))

                sumOfCorrectAnswers += studentRecord["geography"] + studentRecord["chemistry"]
                sumOfCorrectAnswersA += studentRecord["geographyA"] + studentRecord["chemistryA"]
                sumOfCorrectAnswersB += studentRecord["geographyB"] + studentRecord["chemistryB"]

              }else if (electiveGroupId == "03") { //География - Биология
                console.log("electiveGroupId 03");
                studentRecord["geography"] = check(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400))
                studentRecord["geographyA"] = checkA(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400),parseLevelKey(levelKey.geography))
                studentRecord["geographyB"] = checkB(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400),parseLevelKey(levelKey.geography))

                studentRecord["biology"] = check(parseAnswerKey(answerKey.biology), studentObj.keys.slice(400,500));
                studentRecord["biologyA"] = checkA(parseAnswerKey(answerKey.biology), studentObj.keys.slice(400,500), parseLevelKey(levelKey.biology));
                studentRecord["biologyB"] = checkB(parseAnswerKey(answerKey.biology), studentObj.keys.slice(400,500), parseLevelKey(levelKey.biology));


                sumOfCorrectAnswers += studentRecord["geography"] + studentRecord["biology"]
                sumOfCorrectAnswersA += studentRecord["geographyA"] + studentRecord["biologyA"]
                sumOfCorrectAnswersB += studentRecord["geographyB"] + studentRecord["biologyB"]

              }else if (electiveGroupId == "04") { //Физика - Химия
                console.log("electiveGroupId 04");
                studentRecord["physics"]  = check(parseAnswerKey(answerKey.physics), studentObj.keys.slice(300,400));
                studentRecord["physicsA"] = checkA(parseAnswerKey(answerKey.physics), studentObj.keys.slice(300,400),parseLevelKey(levelKey.physics));
                studentRecord["physicsB"] = checkB(parseAnswerKey(answerKey.physics), studentObj.keys.slice(300,400),parseLevelKey(levelKey.physics));


                studentRecord["chemistry"] = check(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(400,500))
                studentRecord["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(400,500),parseLevelKey(levelKey.chemistry))
                studentRecord["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(400,500),parseLevelKey(levelKey.chemistry))

                sumOfCorrectAnswers += studentRecord["physics"] + studentRecord["chemistry"]
                sumOfCorrectAnswersA += studentRecord["physicsA"] + studentRecord["chemistryA"]
                sumOfCorrectAnswersB += studentRecord["physicsB"] + studentRecord["chemistryB"]

              }else if (electiveGroupId == "05") { //Физика - Биология
                studentRecord["physics"]  = check(parseAnswerKey(answerKey.physics), studentObj.keys.slice(300,400));
                studentRecord["physicsA"] = checkA(parseAnswerKey(answerKey.physics), studentObj.keys.slice(300,400),parseLevelKey(levelKey.physics));
                studentRecord["physicsB"] = checkB(parseAnswerKey(answerKey.physics), studentObj.keys.slice(300,400),parseLevelKey(levelKey.physics));


                studentRecord["biology"] = check(parseAnswerKey(answerKey.biology), studentObj.keys.slice(400,500));
                studentRecord["biologyA"] = checkA(parseAnswerKey(answerKey.biology), studentObj.keys.slice(400,500), parseLevelKey(levelKey.biology));
                studentRecord["biologyB"] = checkB(parseAnswerKey(answerKey.biology), studentObj.keys.slice(400,500), parseLevelKey(levelKey.biology));

                sumOfCorrectAnswers += studentRecord["physics"] + studentRecord["biology"]
                sumOfCorrectAnswersA += studentRecord["physicsA"] + studentRecord["biologyA"]
                sumOfCorrectAnswersB += studentRecord["physicsB"] + studentRecord["biologyB"]

              }else if (electiveGroupId == "06") { // Химия - Биология
                studentRecord["chemistry"] = check(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(300,400))
                studentRecord["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(300,400),parseLevelKey(levelKey.chemistry))
                studentRecord["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(300,400),parseLevelKey(levelKey.chemistry))

                studentRecord["biology"] = check(parseAnswerKey(answerKey.biology), studentObj.keys.slice(400,500));
                studentRecord["biologyA"] = checkA(parseAnswerKey(answerKey.biology), studentObj.keys.slice(400,500), parseLevelKey(levelKey.biology));
                studentRecord["biologyB"] = checkB(parseAnswerKey(answerKey.biology), studentObj.keys.slice(400,500), parseLevelKey(levelKey.biology));

                sumOfCorrectAnswers += studentRecord["chemistry"] + studentRecord["biology"]
                sumOfCorrectAnswersA += studentRecord["chemistryA"] + studentRecord["biologyA"]
                sumOfCorrectAnswersB += studentRecord["chemistryB"] + studentRecord["biologyB"]

              }else if (electiveGroupId == "07") { // География - Д. Тарихы
                studentRecord["geography"] = check(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400))
                studentRecord["geographyA"] = checkA(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400),parseLevelKey(levelKey.geography))
                studentRecord["geographyB"] = checkB(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400),parseLevelKey(levelKey.geography))

                studentRecord["world_history"] = check(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(400,500))
                studentRecord["world_historyA"] = checkA(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(400,500),parseLevelKey(levelKey.world_history))
                studentRecord["world_historyB"] = checkB(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(400,500),parseLevelKey(levelKey.world_history))

                sumOfCorrectAnswers += studentRecord["geography"] + studentRecord["world_history"]
                sumOfCorrectAnswersA += studentRecord["geographyA"] + studentRecord["world_historyA"]
                sumOfCorrectAnswersB += studentRecord["geographyB"] + studentRecord["world_historyB"]
              }

              studentRecord["day_1_total"] = sumOfCorrectAnswers;
              studentRecord["day_1_total_A"] = sumOfCorrectAnswersA;
              studentRecord["day_1_total_B"] = sumOfCorrectAnswersB;

              studentRecord["total"] += studentRecord["day_1_total"]
              studentRecord["totalA"] += studentRecord["day_1_total_A"]
              studentRecord["totalB"] += studentRecord["day_1_total_B"]

            }
            break;
        }

        let recordInDb = BtsResults.findOne({academicYear:academicYear, btsNo:btsNo, studentId:student.studentId, schoolId:schoolId})

        if (recordInDb) {
            if (day == 1) {
                studentRecord["total"] = studentRecord["day_1_total"] + (recordInDb["day_2_total"] || 0)
                studentRecord["totalA"] = studentRecord["day_1_total_A"] + (recordInDb["day_2_total_A"] || 0)
                studentRecord["totalB"] = studentRecord["day_1_total_B"] + (recordInDb["day_2_total_B"] || 0)
            } else {
                studentRecord["total"] = studentRecord["day_2_total"] + (recordInDb["day_1_total"] || 0)
                studentRecord["totalA"] = studentRecord["day_2_total_A"] + (recordInDb["day_1_total_A"] || 0)
                studentRecord["totalB"] = studentRecord["day_2_total_B"] + (recordInDb["day_1_total_B"] || 0)
            }
            BtsResults.update({_id:recordInDb._id},{$set:studentRecord})
        } else {
            BtsResults.insert(studentRecord)
        }

    })
}
