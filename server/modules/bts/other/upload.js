// import { check} from "../multipleChoiceChecker";
// import { checkA} from "../multipleChoiceChecker";
// import { checkB} from "../multipleChoiceChecker";
// import { checkC} from "../multipleChoiceChecker";
// import { parseAnswerKey } from "../multipleChoiceChecker";
// import { parseLevelKey } from "../multipleChoiceChecker";
// /*
// * метод для загрузки текст файла bts
// * */
//
// export const upload = (academicYear,btsNo,day,schoolId,results) => {
//     _.each(results,(studentObj) => {
//         //console.log(studentObj.keys)
//         let student = Students.findOne({studentId:parseInt(studentObj.studentId)});
//
//         // getting an answerKey
//         let answerKey = BtsAnswerKeys.findOne({
//             academicYear: academicYear,
//             quarter: btsNo,
//             day: day,
//             variant: studentObj.variant,
//             grade: student.grade
//         });
//
//         let levelKey = BtsLevels.findOne({
//             academicYear: academicYear,
//             quarter: btsNo,
//             day: day,
//             variant: studentObj.variant,
//             grade: student.grade
//         });
//
//         if (!student || student.schoolId != schoolId || !answerKey)
//             return;
//
//         // creating student details for storing in db
//         let studentRecord = {
//             academicYear: academicYear,
//             btsNo: btsNo,
//             studentId: student.studentId,
//             schoolId: schoolId,
//             name: student.name,
//             surname: student.surname,
//             grade: student.grade,
//             division: student.division,
//             languageGroup: student.languageGroup,
//             elective1: student.elective1,
//             elective2: student.elective2,
//             total: 0,
//         }
//
//         if (student.grade == '7' || student.grade == '8') {
//             if (btsNo == '2'){
//                 if(day == '1'){
//                     studentRecord.variant_day_1 = answerKey.variant
//                     studentRecord.day_1_keys = studentObj.keys
//                     studentRecord["algebra"] = check(parseAnswerKey(answerKey.algebra), studentObj.keys.slice(0,100))
//                     studentRecord["algebraA"] = checkA(parseAnswerKey(answerKey.algebra), studentObj.keys.slice(0,100),parseLevelKey(levelKey.algebra))
//                     studentRecord["algebraB"] = checkB(parseAnswerKey(answerKey.algebra), studentObj.keys.slice(0,100),parseLevelKey(levelKey.algebra))
//                     studentRecord["algebraC"] = checkC(parseAnswerKey(answerKey.algebra), studentObj.keys.slice(0,100),parseLevelKey(levelKey.algebra))
//                     if (studentRecord.languageGroup == "kaz") {
//                         studentRecord["kazakh"] = check(parseAnswerKey(answerKey.kazakh_kaz), studentObj.keys.slice(100,150))
//                         studentRecord["kazakhA"] = checkA(parseAnswerKey(answerKey.kazakh_kaz), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                         studentRecord["kazakhB"] = checkB(parseAnswerKey(answerKey.kazakh_kaz), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                         studentRecord["kazakhC"] = checkC(parseAnswerKey(answerKey.kazakh_kaz), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                         studentRecord["kazakh_literature"] = check(parseAnswerKey(answerKey.kazakh_literature_kaz), studentObj.keys.slice(150,200))
//                         studentRecord["kazakh_literatureA"] = checkA(parseAnswerKey(answerKey.kazakh_literature_kaz), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                         studentRecord["kazakh_literatureB"] = checkB(parseAnswerKey(answerKey.kazakh_literature_kaz), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                         studentRecord["kazakh_literatureC"] = checkC(parseAnswerKey(answerKey.kazakh_literature_kaz), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                     } else if (studentRecord.languageGroup == "rus") {
//                         studentRecord["kazakh"] = check(parseAnswerKey(answerKey.kazakh_rus), studentObj.keys.slice(100,150))
//                         studentRecord["kazakhA"] = checkA(parseAnswerKey(answerKey.kazakh_rus), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                         studentRecord["kazakhB"] = checkB(parseAnswerKey(answerKey.kazakh_rus), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                         studentRecord["kazakhC"] = checkC(parseAnswerKey(answerKey.kazakh_rus), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                         studentRecord["kazakh_literature"] = check(parseAnswerKey(answerKey.kazakh_literature_rus), studentObj.keys.slice(150,200))
//                         studentRecord["kazakh_literatureA"] = checkA(parseAnswerKey(answerKey.kazakh_literature_rus), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                         studentRecord["kazakh_literatureB"] = checkB(parseAnswerKey(answerKey.kazakh_literature_rus), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                         studentRecord["kazakh_literatureC"] = checkC(parseAnswerKey(answerKey.kazakh_literature_rus), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                     }
//                     studentRecord["russian"] = check(parseAnswerKey(answerKey.russian), studentObj.keys.slice(200,300))
//                     studentRecord["kazakh_history"] = check(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400))
//                     studentRecord["kazakh_historyA"] = checkA(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//                     studentRecord["kazakh_historyB"] = checkB(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//                     studentRecord["kazakh_historyC"] = checkC(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//
//
//                     studentRecord["day_1_total"] = studentRecord["kazakh"] + studentRecord["russian"] + studentRecord["algebra"] + studentRecord["kazakh_history"]
//                     studentRecord["total"] += studentRecord["day_1_total"]
//
//                 }
//                 else{
//                     studentRecord.variant_day_2 = answerKey.variant
//                     studentRecord.day_2_keys = studentObj.keys
//                     studentRecord["geometry"] = check(parseAnswerKey(answerKey.geometry), studentObj.keys.slice(0,100));
//                     studentRecord["geometryA"] = checkA(parseAnswerKey(answerKey.geometry), studentObj.keys.slice(0,100),parseLevelKey(levelKey.geometry));
//                     studentRecord["geometryB"] = checkB(parseAnswerKey(answerKey.geometry), studentObj.keys.slice(0,100),parseLevelKey(levelKey.geometry));
//                     studentRecord["geometryC"] = checkC(parseAnswerKey(answerKey.geometry), studentObj.keys.slice(0,100),parseLevelKey(levelKey.geometry));
//                     studentRecord["computer"] = check(parseAnswerKey(answerKey.computer), studentObj.keys.slice(100,200));
//                     studentRecord["computerA"] = checkA(parseAnswerKey(answerKey.computer), studentObj.keys.slice(100,200),parseLevelKey(levelKey.computer));
//                     studentRecord["computerB"] = checkB(parseAnswerKey(answerKey.computer), studentObj.keys.slice(100,200),parseLevelKey(levelKey.computer));
//                     studentRecord["computerC"] = checkC(parseAnswerKey(answerKey.computer), studentObj.keys.slice(100,200),parseLevelKey(levelKey.computer));
//                     studentRecord["geography"] = check(parseAnswerKey(answerKey.geography), studentObj.keys.slice(200,300));
//                     studentRecord["geographyA"] = checkA(parseAnswerKey(answerKey.geography), studentObj.keys.slice(200,300),parseLevelKey(levelKey.geography));
//                     studentRecord["geographyB"] = checkB(parseAnswerKey(answerKey.geography), studentObj.keys.slice(200,300),parseLevelKey(levelKey.geography));
//                     studentRecord["geographyC"] = checkC(parseAnswerKey(answerKey.geography), studentObj.keys.slice(200,300),parseLevelKey(levelKey.geography));
//                     studentRecord["world_history"] = check(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(300,400));
//                     studentRecord["world_historyA"] = checkA(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.world_history));
//                     studentRecord["world_historyB"] = checkB(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.world_history));
//                     studentRecord["world_historyC"] = checkC(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.world_history));
//
//
//                     studentRecord["day_2_total"] = studentRecord["geometry"] + studentRecord["computer"] + studentRecord["geography"] + studentRecord["world_history"]
//                     studentRecord["total"] += studentRecord["day_2_total"]
//                 }
//             }
//             else{
//                 if(day == '1'){
//                     studentRecord.variant_day_1 = answerKey.variant
//                     studentRecord.day_1_keys = studentObj.keys
//                     studentRecord["algebra"] = check(parseAnswerKey(answerKey.algebra), studentObj.keys.slice(0,100))
//                     studentRecord["algebraA"] = checkA(parseAnswerKey(answerKey.algebra), studentObj.keys.slice(0,100),parseLevelKey(levelKey.algebra))
//                     studentRecord["algebraB"] = checkB(parseAnswerKey(answerKey.algebra), studentObj.keys.slice(0,100),parseLevelKey(levelKey.algebra))
//                     studentRecord["algebraC"] = checkC(parseAnswerKey(answerKey.algebra), studentObj.keys.slice(0,100),parseLevelKey(levelKey.algebra))
//                     if (studentRecord.languageGroup == "kaz") {
//                         studentRecord["kazakh"] = check(parseAnswerKey(answerKey.kazakh_kaz), studentObj.keys.slice(100,150))
//                         studentRecord["kazakhA"] = checkA(parseAnswerKey(answerKey.kazakh_kaz), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                         studentRecord["kazakhB"] = checkB(parseAnswerKey(answerKey.kazakh_kaz), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                         studentRecord["kazakhC"] = checkC(parseAnswerKey(answerKey.kazakh_kaz), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                         studentRecord["kazakh_literature"] = check(parseAnswerKey(answerKey.kazakh_literature_kaz), studentObj.keys.slice(150,200))
//                         studentRecord["kazakh_literatureA"] = checkA(parseAnswerKey(answerKey.kazakh_literature_kaz), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                         studentRecord["kazakh_literatureB"] = checkB(parseAnswerKey(answerKey.kazakh_literature_kaz), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                         studentRecord["kazakh_literatureC"] = checkC(parseAnswerKey(answerKey.kazakh_literature_kaz), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                     } else if (studentRecord.languageGroup == "rus") {
//                         studentRecord["kazakh"] = check(parseAnswerKey(answerKey.kazakh_rus), studentObj.keys.slice(100,150))
//                         studentRecord["kazakhA"] = checkA(parseAnswerKey(answerKey.kazakh_rus), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                         studentRecord["kazakhB"] = checkB(parseAnswerKey(answerKey.kazakh_rus), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                         studentRecord["kazakhC"] = checkC(parseAnswerKey(answerKey.kazakh_rus), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                         studentRecord["kazakh_literature"] = check(parseAnswerKey(answerKey.kazakh_literature_rus), studentObj.keys.slice(150,200))
//                         studentRecord["kazakh_literatureA"] = checkA(parseAnswerKey(answerKey.kazakh_literature_rus), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                         studentRecord["kazakh_literatureB"] = checkB(parseAnswerKey(answerKey.kazakh_literature_rus), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                         studentRecord["kazakh_literatureC"] = checkC(parseAnswerKey(answerKey.kazakh_literature_rus), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                     }
//                     studentRecord["russian"] = check(parseAnswerKey(answerKey.russian), studentObj.keys.slice(200,300))
//                     studentRecord["kazakh_history"] = check(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400))
//                     studentRecord["kazakh_historyA"] = checkA(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//                     studentRecord["kazakh_historyB"] = checkB(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//                     studentRecord["kazakh_historyC"] = checkC(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//
//
//                     studentRecord["day_1_total"] = studentRecord["kazakh"] + studentRecord["russian"] + studentRecord["algebra"] + studentRecord["kazakh_history"]
//                     studentRecord["total"] += studentRecord["day_1_total"]
//
//                 }
//                 else{
//                     studentRecord.variant_day_2 = answerKey.variant
//                     studentRecord.day_2_keys = studentObj.keys
//                     //studentRecord["turkish"] = check(parseAnswerKey(answerKey.turkish), studentObj.keys.slice(0,100))
//                     studentRecord["physics"] = check(parseAnswerKey(answerKey.physics), studentObj.keys.slice(0,100));
//                     studentRecord["physicsA"] = checkA(parseAnswerKey(answerKey.physics), studentObj.keys.slice(0,100),parseLevelKey(levelKey.physics));
//                     studentRecord["physicsB"] = checkB(parseAnswerKey(answerKey.physics), studentObj.keys.slice(0,100),parseLevelKey(levelKey.physics));
//                     studentRecord["physicsC"] = checkC(parseAnswerKey(answerKey.physics), studentObj.keys.slice(0,100),parseLevelKey(levelKey.physics));
//                     studentRecord["chemistry"] = check(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(100,200));
//                     studentRecord["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(100,200),parseLevelKey(levelKey.chemistry));
//                     studentRecord["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(100,200),parseLevelKey(levelKey.chemistry));
//                     studentRecord["chemistryC"] = checkC(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(100,200),parseLevelKey(levelKey.chemistry));
//                     studentRecord["biology"] = check(parseAnswerKey(answerKey.biology), studentObj.keys.slice(200,300));
//                     studentRecord["biologyA"] = checkA(parseAnswerKey(answerKey.biology), studentObj.keys.slice(200,300),parseLevelKey(levelKey.biology));
//                     studentRecord["biologyB"] = checkB(parseAnswerKey(answerKey.biology), studentObj.keys.slice(200,300),parseLevelKey(levelKey.biology));
//                     studentRecord["biologyC"] = checkC(parseAnswerKey(answerKey.biology), studentObj.keys.slice(200,300),parseLevelKey(levelKey.biology));
//
//                     studentRecord["day_2_total"] = studentRecord["chemistry"] + studentRecord["physics"] + studentRecord["biology"]
//                     studentRecord["total"] += studentRecord["day_2_total"]
//                 }
//             }
//
//     }else { // grade == 9 || 10 || 11
//
//             if (day == '2') {
//                 if (btsNo == '3'){
//                     studentRecord.variant_day_2 = answerKey.variant
//                     studentRecord.day_2_keys = studentObj.keys
//
//                     studentRecord["chemistry"] = check(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(0,100));
//                     studentRecord["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(0,100),parseLevelKey(levelKey.chemistry));
//                     studentRecord["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(0,100),parseLevelKey(levelKey.chemistry));
//                     studentRecord["chemistryC"] = checkC(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(0,100),parseLevelKey(levelKey.chemistry));
//                     studentRecord["biology"] = check(parseAnswerKey(answerKey.biology), studentObj.keys.slice(100,200));
//                     studentRecord["biologyA"] = checkA(parseAnswerKey(answerKey.biology), studentObj.keys.slice(100,200),parseLevelKey(levelKey.biology));
//                     studentRecord["biologyB"] = checkB(parseAnswerKey(answerKey.biology), studentObj.keys.slice(100,200),parseLevelKey(levelKey.biology));
//                     studentRecord["biologyC"] = checkC(parseAnswerKey(answerKey.biology), studentObj.keys.slice(100,200),parseLevelKey(levelKey.biology));
//                     studentRecord["russian"] = check(parseAnswerKey(answerKey.russian), studentObj.keys.slice(200,300));
//                     // studentRecord["russianA"] = checkA(parseAnswerKey(answerKey.russian), studentObj.keys.slice(200,300),parseLevelKey(levelKey.russian));
//                     // studentRecord["russianB"] = checkB(parseAnswerKey(answerKey.russian), studentObj.keys.slice(200,300),parseLevelKey(levelKey.russian));
//                     // studentRecord["russianC"] = checkC(parseAnswerKey(answerKey.russian), studentObj.keys.slice(200,300),parseLevelKey(levelKey.russian));
//                     studentRecord["geography"] = check(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400));
//                     studentRecord["geographyA"] = checkA(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400),parseLevelKey(levelKey.geography));
//                     studentRecord["geographyB"] = checkB(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400),parseLevelKey(levelKey.geography));
//                     studentRecord["geographyC"] = checkC(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400),parseLevelKey(levelKey.geography));
//
//                     studentRecord["day_2_total"] = studentRecord["russian"] + studentRecord["chemistry"] + studentRecord["biology"] + studentRecord["geography"];
//                     studentRecord["total"] += studentRecord["day_2_total"];
//                 }
//                 else if (btsNo == '4'){
//                     studentRecord.variant_day_2 = answerKey.variant
//                     studentRecord.day_2_keys = studentObj.keys
//
//                     studentRecord["russian"] = check(parseAnswerKey(answerKey.russian), studentObj.keys.slice(0,100));
//                     studentRecord["physics"] = check(parseAnswerKey(answerKey.physics), studentObj.keys.slice(100,200));
//                     studentRecord["physicsA"] = checkA(parseAnswerKey(answerKey.physics), studentObj.keys.slice(100,200),parseLevelKey(levelKey.physics));
//                     studentRecord["physicsB"] = checkB(parseAnswerKey(answerKey.physics), studentObj.keys.slice(100,200),parseLevelKey(levelKey.physics));
//                     studentRecord["physicsC"] = checkC(parseAnswerKey(answerKey.physics), studentObj.keys.slice(100,200),parseLevelKey(levelKey.physics));
//                     studentRecord["computer"] = check(parseAnswerKey(answerKey.computer), studentObj.keys.slice(200,300));
//                     studentRecord["computerA"] = checkA(parseAnswerKey(answerKey.computer), studentObj.keys.slice(200,300),parseLevelKey(levelKey.computer));
//                     studentRecord["computerB"] = checkB(parseAnswerKey(answerKey.computer), studentObj.keys.slice(200,300),parseLevelKey(levelKey.computer));
//                     studentRecord["computerC"] = checkC(parseAnswerKey(answerKey.computer), studentObj.keys.slice(200,300),parseLevelKey(levelKey.computer));
//                     // studentRecord["russianA"] = checkA(parseAnswerKey(answerKey.russian), studentObj.keys.slice(0,100),parseLevelKey(levelKey.russian));
//                     // studentRecord["russianB"] = checkB(parseAnswerKey(answerKey.russian), studentObj.keys.slice(0,100),parseLevelKey(levelKey.russian));
//                     // studentRecord["russianC"] = checkC(parseAnswerKey(answerKey.russian), studentObj.keys.slice(0,100),parseLevelKey(levelKey.russian));
//                     studentRecord["world_history"] = check(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(300,400));
//                     studentRecord["world_historyA"] = checkA(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.world_history));
//                     studentRecord["world_historyB"] = checkB(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.world_history));
//                     studentRecord["world_historyC"] = checkC(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.world_history));
//
//                     studentRecord["day_2_total"] = studentRecord["russian"] + studentRecord["physics"] + studentRecord["computer"] + studentRecord["world_history"];
//                     studentRecord["total"] += studentRecord["day_2_total"];
//                 }
//                 else {
//                     studentRecord.variant_day_2 = answerKey.variant
//                     studentRecord.day_2_keys = studentObj.keys
//
//                     studentRecord["russian"] = check(parseAnswerKey(answerKey.russian), studentObj.keys.slice(0,100));
//                     studentRecord["turkish"] = check(parseAnswerKey(answerKey.turkish), studentObj.keys.slice(100,200));
//
//                     if (studentRecord.elective1 == '02') studentRecord.physics = check(parseAnswerKey(answerKey.physics), studentObj.keys.slice(200,300));
//                     if (studentRecord.elective1 == '03') studentRecord.chemistry = check(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(200,300));
//                     if (studentRecord.elective1 == '04') studentRecord.biology = check(parseAnswerKey(answerKey.biology), studentObj.keys.slice(200,300));
//                     if (studentRecord.elective1 == '06') studentRecord.geography = check(parseAnswerKey(answerKey.geography), studentObj.keys.slice(200,300));
//                     if (studentRecord.elective1 == '07') studentRecord.world_history = check(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(200,300));
//                     if (studentRecord.elective1 == '08') studentRecord.computer = check(parseAnswerKey(answerKey.computer), studentObj.keys.slice(200,300));
//
//                     if (studentRecord.elective2 == '02') studentRecord.physics = check(parseAnswerKey(answerKey.physics), studentObj.keys.slice(300,400));
//                     if (studentRecord.elective2 == '03') studentRecord.chemistry = check(parseAnswerKey(answerKey.chemistry), studentObj.keys.slice(300,400))
//                     if (studentRecord.elective2 == '04') studentRecord.biology = check(parseAnswerKey(answerKey.biology), studentObj.keys.slice(300,400))
//                     if (studentRecord.elective2 == '06') studentRecord.geography = check(parseAnswerKey(answerKey.geography), studentObj.keys.slice(300,400));
//                     if (studentRecord.elective2 == '07') studentRecord.world_history = check(parseAnswerKey(answerKey.world_history), studentObj.keys.slice(300,400))
//                     if (studentRecord.elective2 == '08') studentRecord.computer = check(parseAnswerKey(answerKey.computer), studentObj.keys.slice(300,400))
//
//                     studentRecord["day_2_total"] = studentRecord["russian"] + studentRecord["turkish"] + (studentRecord["physics"] || 0) + (studentRecord["chemistry"] || 0) + (studentRecord["biology"] || 0) + (studentRecord["geography"] || 0) + (studentRecord["world_history"] || 0) + (studentRecord["computer"] || 0);
//                     studentRecord["total"] += studentRecord["day_2_total"];
//                 }
//             } else {
//                 studentRecord.variant_day_1 = answerKey.variant
//                 studentRecord.day_1_keys = studentObj.keys
//
//                 studentRecord["algebra"] = check(parseAnswerKey(answerKey.algebra), studentObj.keys.slice(0,100));
//                 studentRecord["algebraA"] = checkA(parseAnswerKey(answerKey.algebra), studentObj.keys.slice(0,100),parseLevelKey(levelKey.algebra));
//                 studentRecord["algebraB"] = checkB(parseAnswerKey(answerKey.algebra), studentObj.keys.slice(0,100),parseLevelKey(levelKey.algebra));
//                 studentRecord["algebraC"] = checkC(parseAnswerKey(answerKey.algebra), studentObj.keys.slice(0,100),parseLevelKey(levelKey.algebra));
//                 // studentRecord["geometry"] = check(parseAnswerKey(answerKey.geometry), studentObj.keys.slice(75,100));
//                 // studentRecord["geometryA"] = checkA(parseAnswerKey(answerKey.geometry), studentObj.keys.slice(75,100),parseLevelKey(levelKey.geometry));
//                 // studentRecord["geometryB"] = checkB(parseAnswerKey(answerKey.geometry), studentObj.keys.slice(75,100),parseLevelKey(levelKey.geometry));
//                 // studentRecord["geometryC"] = checkC(parseAnswerKey(answerKey.geometry), studentObj.keys.slice(75,100),parseLevelKey(levelKey.geometry));
//                 if (studentRecord.languageGroup == "kaz") {
//                     studentRecord["kazakh"] = check(parseAnswerKey(answerKey.kazakh_kaz), studentObj.keys.slice(100,150))
//                     studentRecord["kazakhA"] = checkA(parseAnswerKey(answerKey.kazakh_kaz), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                     studentRecord["kazakhB"] = checkB(parseAnswerKey(answerKey.kazakh_kaz), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                     studentRecord["kazakhC"] = checkC(parseAnswerKey(answerKey.kazakh_kaz), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                     studentRecord["kazakh_literature"] = check(parseAnswerKey(answerKey.kazakh_literature_kaz), studentObj.keys.slice(150,200))
//                     studentRecord["kazakh_literatureA"] = checkA(parseAnswerKey(answerKey.kazakh_literature_kaz), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                     studentRecord["kazakh_literatureB"] = checkB(parseAnswerKey(answerKey.kazakh_literature_kaz), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                     studentRecord["kazakh_literatureC"] = checkC(parseAnswerKey(answerKey.kazakh_literature_kaz), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                 } else if (studentRecord.languageGroup == "rus") {
//                     studentRecord["kazakh"] = check(parseAnswerKey(answerKey.kazakh_rus), studentObj.keys.slice(100,150))
//                     studentRecord["kazakhA"] = checkA(parseAnswerKey(answerKey.kazakh_rus), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                     studentRecord["kazakhB"] = checkB(parseAnswerKey(answerKey.kazakh_rus), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                     studentRecord["kazakhC"] = checkC(parseAnswerKey(answerKey.kazakh_rus), studentObj.keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                     studentRecord["kazakh_literature"] = check(parseAnswerKey(answerKey.kazakh_literature_rus), studentObj.keys.slice(150,200))
//                     studentRecord["kazakh_literatureA"] = checkA(parseAnswerKey(answerKey.kazakh_literature_rus), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                     studentRecord["kazakh_literatureB"] = checkB(parseAnswerKey(answerKey.kazakh_literature_rus), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                     studentRecord["kazakh_literatureC"] = checkC(parseAnswerKey(answerKey.kazakh_literature_rus), studentObj.keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                 }
//                 studentRecord["english"] = check(parseAnswerKey(answerKey.english), studentObj.keys.slice(200,300));
//                 studentRecord["englishA"] = checkA(parseAnswerKey(answerKey.english), studentObj.keys.slice(200,300),parseLevelKey(levelKey.english));
//                 studentRecord["englishB"] = checkB(parseAnswerKey(answerKey.english), studentObj.keys.slice(200,300),parseLevelKey(levelKey.english));
//                 studentRecord["englishC"] = checkC(parseAnswerKey(answerKey.english), studentObj.keys.slice(200,300),parseLevelKey(levelKey.english));
//                 studentRecord["kazakh_history"] = check(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400))
//                 studentRecord["kazakh_historyA"] = checkA(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//                 studentRecord["kazakh_historyB"] = checkB(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//                 studentRecord["kazakh_historyC"] = checkC(parseAnswerKey(answerKey.kazakh_history), studentObj.keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//
//                 studentRecord["day_1_total"] = studentRecord["algebra"] + studentRecord["kazakh"] + studentRecord["kazakh_literature"] + studentRecord["english"] + studentRecord["kazakh_history"];
//                 studentRecord["total"] += studentRecord["day_1_total"];
//             }
//          }
//
//         let recordInDb = BtsResults.findOne({academicYear:academicYear,btsNo:btsNo,studentId:student.studentId,schoolId:schoolId})
//
//         if (recordInDb) {
//             if (day == 1) {
//                 studentRecord["total"] = studentRecord["day_1_total"] + (recordInDb["day_2_total"] || 0)
//             } else {
//                 studentRecord["total"] = studentRecord["day_2_total"] + (recordInDb["day_1_total"] || 0)
//             }
//             BtsResults.update({_id:recordInDb._id},{$set:studentRecord})
//         } else {
//             BtsResults.insert(studentRecord)
//         }
//     })
// }
