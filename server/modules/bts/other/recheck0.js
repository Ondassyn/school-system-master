// import { parseAnswerKey} from "../../multipleChoiceChecker";
// import {parseLevelKey} from "../../multipleChoiceChecker"
// import { check } from "../../multipleChoiceChecker";
// import { checkA } from "../../multipleChoiceChecker";
// import { checkB } from "../../multipleChoiceChecker";
// import { checkC } from "../../multipleChoiceChecker";
// import { calculateRating } from "../../rating";
//
// export const recheck = (academicYear,btsNo,variant,day) => {
//
//     let answerKey = BtsAnswerKeys.findOne({academicYear:academicYear,quarter:btsNo,variant:variant});
//     let levelKey = BtsLevels.findOne({academicYear:academicYear,quarter:btsNo,variant:variant});
//
//
//     if (answerKey.grade == '7' || answerKey.grade == '8') {
//         if (day == '1'){
//             let results = BtsResults.find({academicYear:academicYear,btsNo:btsNo,variant_day_1:variant}).fetch()
//
//             _.each(results,(result) => {
//                 result["algebra"] = check(parseAnswerKey(answerKey.algebra), result.day_1_keys.slice(0,100));
//                 result["algebraA"] = checkA(parseAnswerKey(answerKey.algebra), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.algebra));
//                 result["algebraB"] = checkB(parseAnswerKey(answerKey.algebra), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.algebra));
//                 result["algebraC"] = checkC(parseAnswerKey(answerKey.algebra), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.algebra));
//                 if (result.languageGroup == 'kaz') {
//                     result["kazakh"] = check(parseAnswerKey(answerKey.kazakh_kaz),result.day_1_keys.slice(100,150))
//                     result["kazakhA"] = checkA(parseAnswerKey(answerKey.kazakh_kaz),result.day_1_keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                     result["kazakhB"] = checkB(parseAnswerKey(answerKey.kazakh_kaz),result.day_1_keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                     result["kazakhC"] = checkC(parseAnswerKey(answerKey.kazakh_kaz),result.day_1_keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                     result["kazakh_literature"] = check(parseAnswerKey(answerKey.kazakh_literature_kaz),result.day_1_keys.slice(150,200))
//                     result["kazakh_literatureA"] = checkA(parseAnswerKey(answerKey.kazakh_literature_kaz),result.day_1_keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                     result["kazakh_literatureB"] = checkB(parseAnswerKey(answerKey.kazakh_literature_kaz),result.day_1_keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                     result["kazakh_literatureC"] = checkC(parseAnswerKey(answerKey.kazakh_literature_kaz),result.day_1_keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                 } else if (result.languageGroup == 'rus') {
//                     result["kazakh"] = check(parseAnswerKey(answerKey.kazakh_rus),result.day_1_keys.slice(100,150))
//                     result["kazakhA"] = checkA(parseAnswerKey(answerKey.kazakh_rus),result.day_1_keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                     result["kazakhB"] = checkB(parseAnswerKey(answerKey.kazakh_rus),result.day_1_keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                     result["kazakhC"] = checkC(parseAnswerKey(answerKey.kazakh_rus),result.day_1_keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                     result["kazakh_literature"] = check(parseAnswerKey(answerKey.kazakh_literature_rus),result.day_1_keys.slice(150,200))
//                     result["kazakh_literatureA"] = checkA(parseAnswerKey(answerKey.kazakh_literature_rus),result.day_1_keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                     result["kazakh_literatureB"] = checkB(parseAnswerKey(answerKey.kazakh_literature_rus),result.day_1_keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                     result["kazakh_literatureC"] = checkC(parseAnswerKey(answerKey.kazakh_literature_rus),result.day_1_keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                 }
//                 result["russian"] = check(parseAnswerKey(answerKey.russian), result.day_1_keys.slice(200,300))
//                 result["kazakh_history"] = check(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(300,400))
//                 result["kazakh_historyA"] = checkA(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//                 result["kazakh_historyB"] = checkB(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//                 result["kazakh_historyC"] = checkC(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//
//                 result["day_1_total"] = 0;
//                 result["total"] = 0;
//                 result["day_1_total"] = result["kazakh"] + result["russian"] + result["algebra"] + result["kazakh_history"]
//                 result["total"] = result["day_1_total"] + result["day_2_total"];
//
//                 BtsResults.update({_id:result._id},{$set:result})
//             })
//         }else{
//           if (btsNo == '2'){
//             let results = BtsResults.find({academicYear:academicYear,btsNo:btsNo,variant_day_2:variant}).fetch()
//             _.each(results,(result) => {
//                 result["geometry"] = check(parseAnswerKey(answerKey.geometry), result.day_1_keys.slice(0,100));
//                 result["geometryA"] = checkA(parseAnswerKey(answerKey.geometry), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.geometry));
//                 result["geometryB"] = checkB(parseAnswerKey(answerKey.geometry), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.geometry));
//                 result["geometryC"] = checkC(parseAnswerKey(answerKey.geometry), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.geometry));
//                 result["computer"] = check(parseAnswerKey(answerKey.computer), result.day_2_keys.slice(100,200));
//                 result["computerA"] = checkA(parseAnswerKey(answerKey.computer), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.computer));
//                 result["computerB"] = checkB(parseAnswerKey(answerKey.computer), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.computer));
//                 result["computerC"] = checkC(parseAnswerKey(answerKey.computer), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.computer));
//                 result["geography"] = check(parseAnswerKey(answerKey.geography), result.day_2_keys.slice(200,300));
//                 result["geographyA"] = checkA(parseAnswerKey(answerKey.geography), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.geography));
//                 result["geographyB"] = checkB(parseAnswerKey(answerKey.geography), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.geography));
//                 result["geographyC"] = checkC(parseAnswerKey(answerKey.geography), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.geography));
//                 result["world_history"] = check(parseAnswerKey(answerKey.world_history), result.day_2_keys.slice(300,400));
//                 result["world_historyA"] = checkA(parseAnswerKey(answerKey.world_history), result.day_2_keys.slice(300,400),parseLevelKey(levelKey.world_history));
//                 result["world_historyB"] = checkB(parseAnswerKey(answerKey.world_history), result.day_2_keys.slice(300,400),parseLevelKey(levelKey.world_history));
//                 result["world_historyC"] = checkC(parseAnswerKey(answerKey.world_history), result.day_2_keys.slice(300,400),parseLevelKey(levelKey.world_history));
//
//                 result["day_2_total"] = 0;
//                 result["total"] = 0;
//
//                 result["day_2_total"] = result["geometry"] + result["computer"] + result["geography"] + result["world_history"];
//                 result["total"] = result["day_1_total"] + result["day_2_total"];
//                 BtsResults.update({_id:result._id},{$set:result})
//             })
//           }else {
//             let results = BtsResults.find({academicYear:academicYear,btsNo:btsNo,variant_day_2:variant}).fetch()
//             _.each(results,(result) => {
//                 //result["turkish"] = check(parseAnswerKey(answerKey.turkish),result.day_2_keys.slice(0,100))
//                 result["physics"] = check(parseAnswerKey(answerKey.physics), result.day_2_keys.slice(0,100));
//                 result["physicsA"] = checkA(parseAnswerKey(answerKey.physics), result.day_2_keys.slice(0,100),parseLevelKey(levelKey.physics));
//                 result["physicsB"] = checkB(parseAnswerKey(answerKey.physics), result.day_2_keys.slice(0,100),parseLevelKey(levelKey.physics));
//                 result["physicsC"] = checkC(parseAnswerKey(answerKey.physics), result.day_2_keys.slice(0,100),parseLevelKey(levelKey.physics));
//                 result["chemistry"] = check(parseAnswerKey(answerKey.chemistry), result.day_2_keys.slice(100,200));
//                 result["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.chemistry));
//                 result["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.chemistry));
//                 result["chemistryC"] = checkC(parseAnswerKey(answerKey.chemistry), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.chemistry));
//                 result["biology"] = check(parseAnswerKey(answerKey.biology), result.day_2_keys.slice(200,300));
//                 result["biologyA"] = checkA(parseAnswerKey(answerKey.biology), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.biology));
//                 result["biologyB"] = checkB(parseAnswerKey(answerKey.biology), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.biology));
//                 result["biologyC"] = checkC(parseAnswerKey(answerKey.biology), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.biology));
//
//                 result["day_2_total"] = 0;
//                 result["total"] = 0;
//
//                 result["day_2_total"] = result["chemistry"] + result["physics"] + result["biology"];
//                 result["total"] = result["day_1_total"] + result["day_2_total"];
//                 BtsResults.update({_id:result._id},{$set:result})
//             })
//           }
//         }
//
//
//     }
//     if (answerKey.grade == "9" || answerKey.grade == "10") {
//         if (day == 1) {
//             let results = BtsResults.find({academicYear:academicYear,btsNo:btsNo,variant_day_1:variant}).fetch()
//
//             _.each(results,(result) => {
//
//               result["algebra"] = check(parseAnswerKey(answerKey.algebra), result.day_1_keys.slice(0,100));
//               result["algebraA"] = checkA(parseAnswerKey(answerKey.algebra), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.algebra));
//               result["algebraB"] = checkB(parseAnswerKey(answerKey.algebra), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.algebra));
//               result["algebraC"] = checkC(parseAnswerKey(answerKey.algebra), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.algebra));
//             //   result["geometry"] = check(parseAnswerKey(answerKey.geometry), result.day_1_keys.slice(75,100));
//             //   result["geometryA"] = checkA(parseAnswerKey(answerKey.geometry), result.day_1_keys.slice(75,100),parseLevelKey(levelKey.geometry));
//             //   result["geometryB"] = checkB(parseAnswerKey(answerKey.geometry), result.day_1_keys.slice(75,100),parseLevelKey(levelKey.geometry));
//             //   result["geometryC"] = checkC(parseAnswerKey(answerKey.geometry), result.day_1_keys.slice(75,100),parseLevelKey(levelKey.geometry));
//               if (result.languageGroup == 'kaz') {
//                   result["kazakh"] = check(parseAnswerKey(answerKey.kazakh_kaz),result.day_1_keys.slice(100,150))
//                   result["kazakhA"] = checkA(parseAnswerKey(answerKey.kazakh_kaz),result.day_1_keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                   result["kazakhB"] = checkB(parseAnswerKey(answerKey.kazakh_kaz),result.day_1_keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                   result["kazakhC"] = checkC(parseAnswerKey(answerKey.kazakh_kaz),result.day_1_keys.slice(100,150),parseLevelKey(levelKey.kazakh_kaz))
//                   result["kazakh_literature"] = check(parseAnswerKey(answerKey.kazakh_literature_kaz),result.day_1_keys.slice(150,200))
//                   result["kazakh_literatureA"] = checkA(parseAnswerKey(answerKey.kazakh_literature_kaz),result.day_1_keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                   result["kazakh_literatureB"] = checkB(parseAnswerKey(answerKey.kazakh_literature_kaz),result.day_1_keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//                   result["kazakh_literatureC"] = checkC(parseAnswerKey(answerKey.kazakh_literature_kaz),result.day_1_keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_kaz))
//               } else if (result.languageGroup == 'rus') {
//                   result["kazakh"] = check(parseAnswerKey(answerKey.kazakh_rus),result.day_1_keys.slice(100,150))
//                   result["kazakhA"] = checkA(parseAnswerKey(answerKey.kazakh_rus),result.day_1_keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                   result["kazakhB"] = checkB(parseAnswerKey(answerKey.kazakh_rus),result.day_1_keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                   result["kazakhC"] = checkC(parseAnswerKey(answerKey.kazakh_rus),result.day_1_keys.slice(100,150),parseLevelKey(levelKey.kazakh_rus))
//                   result["kazakh_literature"] = check(parseAnswerKey(answerKey.kazakh_literature_rus),result.day_1_keys.slice(150,200))
//                   result["kazakh_literatureA"] = checkA(parseAnswerKey(answerKey.kazakh_literature_rus),result.day_1_keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                   result["kazakh_literatureB"] = checkB(parseAnswerKey(answerKey.kazakh_literature_rus),result.day_1_keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//                   result["kazakh_literatureC"] = checkC(parseAnswerKey(answerKey.kazakh_literature_rus),result.day_1_keys.slice(150,200),parseLevelKey(levelKey.kazakh_literature_rus))
//               }
//               result["english"] = check(parseAnswerKey(answerKey.english), result.day_1_keys.slice(200,300));
//               result["englishA"] = checkA(parseAnswerKey(answerKey.english), result.day_1_keys.slice(200,300),parseLevelKey(levelKey.english));
//               result["englishB"] = checkB(parseAnswerKey(answerKey.english), result.day_1_keys.slice(200,300),parseLevelKey(levelKey.english));
//               result["englishC"] = checkC(parseAnswerKey(answerKey.english), result.day_1_keys.slice(200,300),parseLevelKey(levelKey.english));
//               result["kazakh_history"] = check(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(300,400))
//               result["kazakh_historyA"] = checkA(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//               result["kazakh_historyB"] = checkB(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//               result["kazakh_historyC"] = checkC(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
//
//               result["day_1_total"] = 0;
//               result["total"] = 0;
//               result["day_1_total"] = result["algebra"] + result["kazakh"] + result["kazakh_literature"] + result["english"] + result["kazakh_history"];
//               result["total"] = result["day_1_total"] + result["day_2_total"];
//
//               // result["day_1_total"] = result["physics"] + result["chemistry"] + result["biology"] + result["english"] + result["kazakh"] + result["kazakh_literature"] + result["russian"];
//               // result["total"] = result["day_1_total"] + result["day_2_total"];
//
//               BtsResults.update({_id:result._id},{$set:result})
//             })
//         } else {
//             let results = BtsResults.find({academicYear:academicYear,btsNo:btsNo,variant_day_2:variant}).fetch()
//
//             _.each(results,(result) => {
//                 if (btsNo == '3'){
//
//
//                     result["chemistry"] = check(parseAnswerKey(answerKey.chemistry), result.day_2_keys.slice(0,100));
//                     result["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), result.day_2_keys.slice(0,100),parseLevelKey(levelKey.chemistry));
//                     result["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), result.day_2_keys.slice(0,100),parseLevelKey(levelKey.chemistry));
//                     result["chemistryC"] = checkC(parseAnswerKey(answerKey.chemistry), result.day_2_keys.slice(0,100),parseLevelKey(levelKey.chemistry));
//                     result["biology"] = check(parseAnswerKey(answerKey.biology), result.day_2_keys.slice(100,200));
//                     result["biologyA"] = checkA(parseAnswerKey(answerKey.biology), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.biology));
//                     result["biologyB"] = checkB(parseAnswerKey(answerKey.biology), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.biology));
//                     result["biologyC"] = checkC(parseAnswerKey(answerKey.biology), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.biology));
//                     result["russian"] = check(parseAnswerKey(answerKey.russian), result.day_2_keys.slice(200,300));
//                     // result["russianA"] = checkA(parseAnswerKey(answerKey.russian), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.russian));
//                     // result["russianB"] = checkB(parseAnswerKey(answerKey.russian), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.russian));
//                     // result["russianC"] = checkC(parseAnswerKey(answerKey.russian), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.russian));
//                     result["geography"] = check(parseAnswerKey(answerKey.geography), result.day_2_keys.slice(300,400));
//                     result["geographyA"] = checkA(parseAnswerKey(answerKey.geography), result.day_2_keys.slice(300,400),parseLevelKey(levelKey.geography));
//                     result["geographyB"] = checkB(parseAnswerKey(answerKey.geography), result.day_2_keys.slice(300,400),parseLevelKey(levelKey.geography));
//                     result["geographyC"] = checkC(parseAnswerKey(answerKey.geography), result.day_2_keys.slice(300,400),parseLevelKey(levelKey.geography));
//
//                     result["day_2_total"] = 0;
//                     result["total"] = 0;
//
//                     result["day_2_total"] = result["russian"] + result["chemistry"] + result["biology"] + result["geography"];
//                     result["total"] = result["day_1_total"] + result["day_2_total"];
//                     BtsResults.update({_id:result._id},{$set:result})
//                 }
//                 else if (btsNo == '4'){
//
//                     result["russian"] = check(parseAnswerKey(answerKey.russian), result.day_2_keys.slice(0,100));
//                     result["physics"] = check(parseAnswerKey(answerKey.physics), result.day_2_keys.slice(100,200));
//                     result["physicsA"] = checkA(parseAnswerKey(answerKey.physics), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.physics));
//                     result["physicsB"] = checkB(parseAnswerKey(answerKey.physics), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.physics));
//                     result["physicsC"] = checkC(parseAnswerKey(answerKey.physics), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.physics));
//                     result["computer"] = check(parseAnswerKey(answerKey.computer), result.day_2_keys.slice(200,300));
//                     result["computerA"] = checkA(parseAnswerKey(answerKey.computer), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.computer));
//                     result["computerB"] = checkB(parseAnswerKey(answerKey.computer), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.computer));
//                     result["computerC"] = checkC(parseAnswerKey(answerKey.computer), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.computer));
//                     // result["russianA"] = checkA(parseAnswerKey(answerKey.russian), result.day_2_keys.slice(0,100),parseLevelKey(levelKey.russian));
//                     // result["russianB"] = checkB(parseAnswerKey(answerKey.russian), result.day_2_keys.slice(0,100),parseLevelKey(levelKey.russian));
//                     // result["russianC"] = checkC(parseAnswerKey(answerKey.russian), result.day_2_keys.slice(0,100),parseLevelKey(levelKey.russian));
//                     result["world_history"] = check(parseAnswerKey(answerKey.world_history), result.day_2_keys.slice(300,400));
//                     result["world_historyA"] = checkA(parseAnswerKey(answerKey.world_history), result.day_2_keys.slice(300,400),parseLevelKey(levelKey.world_history));
//                     result["world_historyB"] = checkB(parseAnswerKey(answerKey.world_history), result.day_2_keys.slice(300,400),parseLevelKey(levelKey.world_history));
//                     result["world_historyC"] = checkC(parseAnswerKey(answerKey.world_history), result.day_2_keys.slice(300,400),parseLevelKey(levelKey.world_history));
//
//                     result["day_2_total"] = 0;
//                     result["total"] = 0;
//
//                     result["day_2_total"] = result["russian"] + result["physics"] + result["computer"] + result["world_history"];
//                     result["total"] = result["day_1_total"] + result["day_2_total"];
//                     BtsResults.update({_id:result._id},{$set:result})
//                 }
//                 else {
//                     result["russian"] = check(parseAnswerKey(answerKey.russian), result.day_2_keys.slice(0,100));
//                     result["turkish"] = check(parseAnswerKey(answerKey.turkish), result.day_2_keys.slice(100,200));
//
//                     if (result.elective1 == '02') result.physics = check(parseAnswerKey(answerKey.physics), result.day_2_keys.slice(200,300));
//                     if (result.elective1 == '03') result.chemistry = check(parseAnswerKey(answerKey.chemistry), result.day_2_keys.slice(200,300));
//                     if (result.elective1 == '04') result.biology = check(parseAnswerKey(answerKey.biology), result.day_2_keys.slice(200,300));
//                     if (result.elective1 == '06') result.geography = check(parseAnswerKey(answerKey.geography), result.day_2_keys.slice(200,300));
//                     if (result.elective1 == '07') result.world_history = check(parseAnswerKey(answerKey.world_history), result.day_2_keys.slice(200,300));
//                     if (result.elective1 == '08') result.computer = check(parseAnswerKey(answerKey.computer), result.day_2_keys.slice(200,300));
//
//                     if (result.elective2 == '02') result.physics = check(parseAnswerKey(answerKey.physics), result.day_2_keys.slice(300,400));
//                     if (result.elective2 == '03') result.chemistry = check(parseAnswerKey(answerKey.chemistry), result.day_2_keys.slice(300,400))
//                     if (result.elective2 == '04') result.biology = check(parseAnswerKey(answerKey.biology), result.day_2_keys.slice(300,400))
//                     if (result.elective2 == '06') result.geography = check(parseAnswerKey(answerKey.geography), result.day_2_keys.slice(300,400));
//                     if (result.elective2 == '07') result.world_history = check(parseAnswerKey(answerKey.world_history), result.day_2_keys.slice(300,400))
//                     if (result.elective2 == '08') result.computer = check(parseAnswerKey(answerKey.computer), result.day_2_keys.slice(300,400))
//
//                     result["day_2_total"] = 0;
//                     result["total"] = 0;
//
//                     result["day_2_total"] = result["russian"] + result["turkish"] + (result["physics"] || 0) + (result["chemistry"] || 0) + (result["biology"] || 0) + (result["geography"] || 0) + (result["world_history"] || 0) + (result["computer"] || 0);
//                     result["total"] = result["day_1_total"] + result["day_2_total"];
//                     BtsResults.update({_id:result._id},{$set:result})
//                 }
//             })
//         }
//     }
//
//     let schools = Schools.find().fetch()
//     _.each(schools,(school) => {
//         //console.log("admin: rechek shkol")
//         calculateRating(academicYear,btsNo,school.schoolId)
//     })
// }
