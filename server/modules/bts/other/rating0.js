// import { runInThisContext } from "vm";
// // 1 and 2 BTS exams needs to be changed if there are any changes, 3 and 4 were changed
// export const calculateRating = (academicYear,btsNo,schoolId) => {
//     //calculated bts rating here
//     let grades = ["7","8","9","10"]
//     //let grades = ["9","10"]
//     var counter = 0;
//
//
//     let totalRating = {
//         academicYear:academicYear,
//         btsNo: btsNo,
//         schoolId: schoolId,
//         grade: "all",
//         algebra: 0,
//         algebra_A: 0,
//         algebra_B: 0,
//         algebra_C: 0,
//         geometry: 0,
//         geometry_A: 0,
//         geometry_B: 0,
//         geometry_C: 0,
//         computer: 0,
//         computer_A: 0,
//         computer_B: 0,
//         computer_C: 0,
//         turkish: 0,
//         turkish_A: 0,
//         turkish_B: 0,
//         turkish_C: 0,
//         world_history: 0,
//         world_history_A: 0,
//         world_history_B: 0,
//         world_history_C: 0,
//         kazakh_history: 0,
//         kazakh_history_A: 0,
//         kazakh_history_B: 0,
//         kazakh_history_C: 0,
//         geography: 0,
//         geography_A: 0,
//         geography_B: 0,
//         geography_C: 0,
//         physics: 0,
//         physics_A: 0,
//         physics_B: 0,
//         physics_C: 0,
//         chemistry: 0,
//         chemistry_A: 0,
//         chemistry_B: 0,
//         chemistry_C: 0,
//         biology: 0,
//         biology_A: 0,
//         biology_B: 0,
//         biology_C: 0,
//         english: 0,
//         english_A: 0,
//         english_B: 0,
//         english_C: 0,
//         kazakh: 0,
//         kazakh_A: 0,
//         kazakh_B: 0,
//         kazakh_C: 0,
//         kazakh_literature: 0,
//         kazakh_literature_A: 0,
//         kazakh_literature_B: 0,
//         kazakh_literature_C: 0,
//         russian: 0,
//         // russian_A: 0,
//         // russian_B: 0,
//         // russian_C: 0,
//         total: 0,
//         total_A: 0,
//         total_B: 0,
//         total_C: 0
//     }
//
//     _.each(grades,(grade) => {
//         let gradeRating = calculateBtsRatingForGrade(academicYear,btsNo,schoolId,grade)
//
//         if (grade == gradeRating.grade && gradeRating.total > 0) {
//             counter++;
//         }
//
//         if(grade == '9' || grade == '10'){
//             if(btsNo == '3'){
//                 totalRating.chemistry += (gradeRating.chemistry || 0)
//                 totalRating.chemistry_A += (gradeRating.chemistry_A || 0)
//                 totalRating.chemistry_B += (gradeRating.chemistry_B || 0)
//                 totalRating.chemistry_C += (gradeRating.chemistry_C || 0)
//                 totalRating.biology += (gradeRating.biology || 0)
//                 totalRating.biology_A += (gradeRating.biology_A || 0)
//                 totalRating.biology_B += (gradeRating.biology_B || 0)
//                 totalRating.biology_C += (gradeRating.biology_C || 0)
//                 totalRating.geography += (gradeRating.geography || 0)
//                 totalRating.geography_A += (gradeRating.geography_A || 0)
//                 totalRating.geography_B += (gradeRating.geography_B || 0)
//                 totalRating.geography_C += (gradeRating.geography_C || 0)
//                 totalRating.algebra += (gradeRating.algebra || 0)
//                 totalRating.algebra_A += (gradeRating.algebra_A || 0)
//                 totalRating.algebra_B += (gradeRating.algebra_B || 0)
//                 totalRating.algebra_C += (gradeRating.algebra_C || 0)
//                 totalRating.kazakh_history += (gradeRating.kazakh_history || 0)
//                 totalRating.kazakh_history_A += (gradeRating.kazakh_history_A || 0)
//                 totalRating.kazakh_history_B += (gradeRating.kazakh_history_B || 0)
//                 totalRating.kazakh_history_C += (gradeRating.kazakh_history_C || 0)
//                 totalRating.kazakh += (gradeRating.kazakh || 0)
//                 totalRating.kazakh_A += (gradeRating.kazakh_A || 0)
//                 totalRating.kazakh_B += (gradeRating.kazakh_B || 0)
//                 totalRating.kazakh_C += (gradeRating.kazakh_C || 0)
//                 totalRating.kazakh_literature += (gradeRating.kazakh_literature || 0)
//                 totalRating.kazakh_literature_A += (gradeRating.kazakh_literature_A || 0)
//                 totalRating.kazakh_literature_B += (gradeRating.kazakh_literature_B || 0)
//                 totalRating.kazakh_literature_C += (gradeRating.kazakh_literature_C || 0)
//                 totalRating.russian += (gradeRating.russian || 0)
//                 totalRating.english += (gradeRating.english || 0)
//                 totalRating.english_A += (gradeRating.english_A || 0)
//                 totalRating.english_B += (gradeRating.english_B || 0)
//                 totalRating.english_C += (gradeRating.english_C || 0)
//                 totalRating.total += (gradeRating.total || 0)
//                 totalRating.total_A += (gradeRating.total_A || 0)
//                 totalRating.total_B += (gradeRating.total_B || 0)
//                 totalRating.total_C += (gradeRating.total_C || 0)
//             }
//             if(btsNo == '4'){
//                 totalRating.algebra += (gradeRating.algebra || 0)
//                 totalRating.algebra_A += (gradeRating.algebra_A || 0)
//                 totalRating.algebra_B += (gradeRating.algebra_B || 0)
//                 totalRating.algebra_C += (gradeRating.algebra_C || 0)
//                 totalRating.computer += (gradeRating.computer || 0)
//                 totalRating.computer_A += (gradeRating.computer_A || 0)
//                 totalRating.computer_B += (gradeRating.computer_B || 0)
//                 totalRating.computer_C += (gradeRating.computer_C || 0)
//                 totalRating.world_history += (gradeRating.world_history || 0)
//                 totalRating.world_history_A += (gradeRating.world_history_A || 0)
//                 totalRating.world_history_B += (gradeRating.world_history_B || 0)
//                 totalRating.world_history_C += (gradeRating.world_history_C || 0)
//                 totalRating.kazakh_history += (gradeRating.kazakh_history || 0)
//                 totalRating.kazakh_history_A += (gradeRating.kazakh_history_A || 0)
//                 totalRating.kazakh_history_B += (gradeRating.kazakh_history_B || 0)
//                 totalRating.kazakh_history_C += (gradeRating.kazakh_history_C || 0)
//
//                 totalRating.physics += (gradeRating.physics || 0)
//                 totalRating.physics_A += (gradeRating.physics_A || 0)
//                 totalRating.physics_B += (gradeRating.physics_B || 0)
//                 totalRating.physics_C += (gradeRating.physics_C || 0)
//
//                 totalRating.english += (gradeRating.english || 0)
//                 totalRating.english_A += (gradeRating.english_A || 0)
//                 totalRating.english_B += (gradeRating.english_B || 0)
//                 totalRating.english_C += (gradeRating.english_C || 0)
//                 totalRating.kazakh += (gradeRating.kazakh || 0)
//                 totalRating.kazakh_A += (gradeRating.kazakh_A || 0)
//                 totalRating.kazakh_B += (gradeRating.kazakh_B || 0)
//                 totalRating.kazakh_C += (gradeRating.kazakh_C || 0)
//                 totalRating.kazakh_literature += (gradeRating.kazakh_literature || 0)
//                 totalRating.kazakh_literature_A += (gradeRating.kazakh_literature_A || 0)
//                 totalRating.kazakh_literature_B += (gradeRating.kazakh_literature_B || 0)
//                 totalRating.kazakh_literature_C += (gradeRating.kazakh_literature_C || 0)
//                 totalRating.russian += (gradeRating.russian || 0)
//                 totalRating.total += (gradeRating.total || 0)
//                 totalRating.total_A += (gradeRating.total_A || 0)
//                 totalRating.total_B += (gradeRating.total_B || 0)
//                 totalRating.total_C += (gradeRating.total_C || 0)
//             }
//
//         }else{
//             if(btsNo == '2'){
//                 totalRating.algebra += (gradeRating.algebra || 0)
//                 totalRating.algebra_A += (gradeRating.algebra_A || 0)
//                 totalRating.algebra_B += (gradeRating.algebra_B || 0)
//                 totalRating.algebra_C += (gradeRating.algebra_C || 0)
//                 totalRating.geometry += (gradeRating.geometry || 0)
//                 totalRating.geometry_A += (gradeRating.geometry_A || 0)
//                 totalRating.geometry_B += (gradeRating.geometry_B || 0)
//                 totalRating.geometry_C += (gradeRating.geometry_C || 0)
//                 totalRating.computer += (gradeRating.computer || 0)
//                 totalRating.computer_A += (gradeRating.computer_A || 0)
//                 totalRating.computer_B += (gradeRating.computer_B || 0)
//                 totalRating.computer_C += (gradeRating.computer_C || 0)
//                 totalRating.world_history += (gradeRating.world_history || 0)
//                 totalRating.world_history_A += (gradeRating.world_history_A || 0)
//                 totalRating.world_history_B += (gradeRating.world_history_B || 0)
//                 totalRating.world_history_C += (gradeRating.world_history_C || 0)
//                 totalRating.geography += (gradeRating.geography || 0)
//                 totalRating.geography_A += (gradeRating.geography_A || 0)
//                 totalRating.geography_B += (gradeRating.geography_B || 0)
//                 totalRating.geography_C += (gradeRating.geography_C || 0)
//                 totalRating.kazakh_history += (gradeRating.kazakh_history || 0)
//                 totalRating.kazakh_history_A += (gradeRating.kazakh_history_A || 0)
//                 totalRating.kazakh_history_B += (gradeRating.kazakh_history_B || 0)
//                 totalRating.kazakh_history_C += (gradeRating.kazakh_history_C || 0)
//                 totalRating.kazakh += (gradeRating.kazakh || 0)
//                 totalRating.kazakh_A += (gradeRating.kazakh_A || 0)
//                 totalRating.kazakh_B += (gradeRating.kazakh_B || 0)
//                 totalRating.kazakh_C += (gradeRating.kazakh_C || 0)
//                 totalRating.kazakh_literature += (gradeRating.kazakh_literature || 0)
//                 totalRating.kazakh_literature_A += (gradeRating.kazakh_literature_A || 0)
//                 totalRating.kazakh_literature_B += (gradeRating.kazakh_literature_B || 0)
//                 totalRating.kazakh_literature_C += (gradeRating.kazakh_literature_C || 0)
//                 totalRating.russian += (gradeRating.russian || 0)
//                 totalRating.total += (gradeRating.total || 0)
//             }
//             if(btsNo == '4'){
//
//                 totalRating.algebra += (gradeRating.algebra || 0)
//                 totalRating.algebra_A += (gradeRating.algebra_A || 0)
//                 totalRating.algebra_B += (gradeRating.algebra_B || 0)
//                 totalRating.algebra_C += (gradeRating.algebra_C || 0)
//                 totalRating.kazakh_history += (gradeRating.kazakh_history || 0)
//                 totalRating.kazakh_history_A += (gradeRating.kazakh_history_A || 0)
//                 totalRating.kazakh_history_B += (gradeRating.kazakh_history_B || 0)
//                 totalRating.kazakh_history_C += (gradeRating.kazakh_history_C || 0)
//                 totalRating.physics += (gradeRating.physics || 0)
//                 totalRating.physics_A += (gradeRating.physics_A || 0)
//                 totalRating.physics_B += (gradeRating.physics_B || 0)
//                 totalRating.physics_C += (gradeRating.physics_C || 0)
//                 totalRating.chemistry += (gradeRating.chemistry || 0)
//                 totalRating.chemistry_A += (gradeRating.chemistry_A || 0)
//                 totalRating.chemistry_B += (gradeRating.chemistry_B || 0)
//                 totalRating.chemistry_C += (gradeRating.chemistry_C || 0)
//                 totalRating.biology += (gradeRating.biology || 0)
//                 totalRating.biology_A += (gradeRating.biology_A || 0)
//                 totalRating.biology_B += (gradeRating.biology_B || 0)
//                 totalRating.biology_C += (gradeRating.biology_C || 0)
//                 totalRating.kazakh += (gradeRating.kazakh || 0)
//                 totalRating.kazakh_A += (gradeRating.kazakh_A || 0)
//                 totalRating.kazakh_B += (gradeRating.kazakh_B || 0)
//                 totalRating.kazakh_C += (gradeRating.kazakh_C || 0)
//                 totalRating.kazakh_literature += (gradeRating.kazakh_literature || 0)
//                 totalRating.kazakh_literature_A += (gradeRating.kazakh_literature_A || 0)
//                 totalRating.kazakh_literature_B += (gradeRating.kazakh_literature_B || 0)
//                 totalRating.kazakh_literature_C += (gradeRating.kazakh_literature_C || 0)
//                 totalRating.russian += (gradeRating.russian || 0)
//                 totalRating.total += (gradeRating.total || 0)
//             }
//
//         }
//
//     })
//
//     totalRating.algebra = totalRating.algebra / (counter || 1)
//     totalRating.algebra_A = totalRating.algebra_A / (counter || 1)
//     totalRating.algebra_B = totalRating.algebra_B / (counter || 1)
//     totalRating.algebra_C = totalRating.algebra_C / (counter || 1)
//     totalRating.geometry = totalRating.geometry / (counter || 1)
//     totalRating.geometry_A = totalRating.geometry_A / (counter || 1)
//     totalRating.geometry_B = totalRating.geometry_B / (counter || 1)
//     totalRating.geometry_C = totalRating.geometry_C / (counter || 1)
//     totalRating.computer = totalRating.computer / (counter*0.5 || 1)
//     totalRating.computer_A = totalRating.computer_A / (counter*0.5 || 1)
//     totalRating.computer_B = totalRating.computer_B / (counter*0.5 || 1)
//     totalRating.computer_C = totalRating.computer_C / (counter*0.5 || 1)
//     // totalRating.turkish = totalRating.turkish / (counter || 1)
//     // totalRating.turkish_A = totalRating.turkish_A / (counter || 1)
//     // totalRating.turkish_B = totalRating.turkish_B / (counter || 1)
//     // totalRating.turkish_C = totalRating.turkish_C / (counter || 1)
//     totalRating.world_history = totalRating.world_history / (counter*0.5 || 1)
//     totalRating.world_history_A = totalRating.world_history_A / (counter*0.5 || 1)
//     totalRating.world_history_B = totalRating.world_history_B / (counter*0.5 || 1)
//     totalRating.world_history_C = totalRating.world_history_C / (counter*0.5 || 1)
//     totalRating.kazakh_history = totalRating.kazakh_history / (counter || 1)
//     totalRating.kazakh_history_A = totalRating.kazakh_history_A / (counter || 1)
//     totalRating.kazakh_history_B = totalRating.kazakh_history_B / (counter || 1)
//     totalRating.kazakh_history_C = totalRating.kazakh_history_C / (counter || 1)
//     totalRating.geography = totalRating.geography / (counter || 1)
//     totalRating.geography_A = totalRating.geography_A / (counter || 1)
//     totalRating.geography_B = totalRating.geography_B / (counter || 1)
//     totalRating.geography_C = totalRating.geography_C / (counter || 1)
//     totalRating.physics = totalRating.physics / (counter || 1)
//     totalRating.physics_A = totalRating.physics_A / (counter || 1)
//     totalRating.physics_B = totalRating.physics_B / (counter || 1)
//     totalRating.physics_C = totalRating.physics_C / (counter || 1)
//     totalRating.chemistry = totalRating.chemistry / (counter*0.5 || 1)
//     totalRating.chemistry_A = totalRating.chemistry_A / (counter*0.5 || 1)
//     totalRating.chemistry_B = totalRating.chemistry_B / (counter*0.5 || 1)
//     totalRating.chemistry_C = totalRating.chemistry_C / (counter*0.5 || 1)
//     totalRating.biology = totalRating.biology / (counter*0.5 || 1)
//     totalRating.biology_A = totalRating.biology_A / (counter*0.5 || 1)
//     totalRating.biology_B = totalRating.biology_B / (counter*0.5 || 1)
//     totalRating.biology_C = totalRating.biology_C / (counter*0.5 || 1)
//     totalRating.english = totalRating.english / (counter*0.5 || 1)
//     totalRating.english_A = totalRating.english_A / (counter*0.5 || 1)
//     totalRating.english_B = totalRating.english_B / (counter*0.5 || 1)
//     totalRating.english_C = totalRating.english_C / (counter*0.5 || 1)
//     totalRating.kazakh = totalRating.kazakh / (counter || 1)
//     totalRating.kazakh_A = totalRating.kazakh_A / (counter || 1)
//     totalRating.kazakh_B = totalRating.kazakh_B / (counter || 1)
//     totalRating.kazakh_C = totalRating.kazakh_C / (counter || 1)
//     totalRating.kazakh_literature = totalRating.kazakh_literature / (counter || 1)
//     totalRating.kazakh_literature_A = totalRating.kazakh_literature_A / (counter || 1)
//     totalRating.kazakh_literature_B = totalRating.kazakh_literature_B / (counter || 1)
//     totalRating.kazakh_literature_C = totalRating.kazakh_literature_C / (counter || 1)
//     totalRating.russian = totalRating.russian / (counter || 1)
//     // totalRating.russian_A = totalRating.russian_A / (counter || 1)
//     // totalRating.russian_B = totalRating.russian_B / (counter || 1)
//     // totalRating.russian_C = totalRating.russian_C / (counter || 1)
//     totalRating.total = totalRating.total / (counter || 1)
//     totalRating.total_A = totalRating.total_A / (counter || 1)
//     totalRating.total_B = totalRating.total_B / (counter || 1)
//     totalRating.total_C = totalRating.total_C / (counter || 1)
//
//     // insert total rating to db
//     var sameSchoolRating = BtsRatings.findOne({
//         btsNo: btsNo,
//         schoolId: schoolId,
//         academicYear: academicYear,
//         grade: 'all'
//     })
//
//     if (sameSchoolRating) {
//         BtsRatings.update({_id:sameSchoolRating._id},{$set:totalRating})
//     } else {
//         BtsRatings.insert(totalRating)
//     }
//     console.log(counter)
// }
//
// calculateBtsRatingForGrade = (academicYear,btsNo,schoolId,grade) => {
//     let ratingObj = {
//         academicYear:academicYear,
//         btsNo: btsNo,
//         schoolId: schoolId,
//         grade: grade,
//         algebra: 0,
//         algebra_A:0,
//         algebra_B:0,
//         algebra_C:0,
//         geometry: 0,
//         geometry_A:0,
//         geometry_B:0,
//         geometry_C:0,
//         computer: 0,
//         computer_A: 0,
//         computer_B: 0,
//         computer_C: 0,
//         turkish: 0,
//         turkish_A: 0,
//         turkish_B: 0,
//         turkish_C: 0,
//         world_history: 0,
//         world_history_A: 0,
//         world_history_B: 0,
//         world_history_C: 0,
//         kazakh_history: 0,
//         kazakh_history_A: 0,
//         kazakh_history_B: 0,
//         kazakh_history_C: 0,
//         geography: 0,
//         geography_A: 0,
//         geography_B: 0,
//         geography_C: 0,
//         physics: 0,
//         physics_A: 0,
//         physics_B: 0,
//         physics_C: 0,
//         chemistry: 0,
//         biology: 0,
//         biology_A: 0,
//         biology_B: 0,
//         biology_C: 0,
//         english: 0,
//         english_A: 0,
//         english_B: 0,
//         english_C: 0,
//         kazakh: 0,
//         kazakh_A: 0,
//         kazakh_B: 0,
//         kazakh_C: 0,
//         kazakh_literature: 0,
//         kazakh_literature_A: 0,
//         kazakh_literature_B: 0,
//         kazakh_literature_C: 0,
//         russian: 0,
//         chemistry:0,
//         chemistry_A:0,
//         chemistry_B:0,
//         chemistry_C:0,
//         total: 0,
//         total_A: 0,
//         total_B: 0,
//         total_C: 0
//     }
//
//     let records = BtsResults.find({academicYear:academicYear,btsNo:btsNo,grade:grade,schoolId:schoolId}).fetch()
//
//     let firstDayCounter = 0;
//     let secondDayCounter = 0;
//     let firstDayTotal = 0;
//     let secondDayTotal = 0;
//     let counterPhysics = 0;
//     let counterChemistry = 0;
//     let counterBiology = 0;
//     let counterGeography = 0;
//     let counterComputer = 0;
//     let counterWorld_History = 0;
//
//     if (ratingObj.grade == '7' || ratingObj.grade == '8'){
//         _.each(records,(record) => {
//             if (record.day_1_total){
//                 ratingObj.algebra += (record.algebra || 0)
//                 ratingObj.algebra_A += (record.algebraA || 0)
//                 ratingObj.algebra_B += (record.algebraB || 0)
//                 ratingObj.algebra_C += (record.algebraC || 0)
//                 ratingObj.kazakh += (record.kazakh || 0)
//                 ratingObj.kazakh_A += (record.kazakhA || 0)
//                 ratingObj.kazakh_B += (record.kazakhB || 0)
//                 ratingObj.kazakh_C += (record.kazakhC || 0)
//                 ratingObj.kazakh_literature += (record.kazakh_literature || 0)
//                 ratingObj.kazakh_literature_A += (record.kazakh_literatureA || 0)
//                 ratingObj.kazakh_literature_B += (record.kazakh_literatureB || 0)
//                 ratingObj.kazakh_literature_C += (record.kazakh_literatureC || 0)
//                 ratingObj.russian += (record.russian || 0)
//                 ratingObj.kazakh_history += (record.kazakh_history || 0)
//                 ratingObj.kazakh_history_A += (record.kazakh_historyA || 0)
//                 ratingObj.kazakh_history_B += (record.kazakh_historyB || 0)
//                 ratingObj.kazakh_history_C += (record.kazakh_historyC || 0)
//                 firstDayCounter++;
//                 firstDayTotal += (record.day_1_total || 0)
//             }
//             if (record.day_2_total){
//                 if (btsNo == '2'){
//                     ratingObj.geometry += (record.geometry || 0)
//                     ratingObj.geometry_A += (record.geometryA || 0)
//                     ratingObj.geometry_B += (record.geometryB || 0)
//                     ratingObj.geometry_C += (record.geometryC || 0)
//                     ratingObj.computer += (record.computer || 0)
//                     ratingObj.computer_A += (record.computerA || 0)
//                     ratingObj.computer_B += (record.computerB || 0)
//                     ratingObj.computer_C += (record.computerC || 0)
//                     ratingObj.geography += (record.geography || 0)
//                     ratingObj.geography_A += (record.geographyA || 0)
//                     ratingObj.geography_B += (record.geographyB || 0)
//                     ratingObj.geography_C += (record.geographyC || 0)
//                     ratingObj.world_history += (record.world_history || 0)
//                     ratingObj.world_history_A += (record.world_historyA || 0)
//                     ratingObj.world_history_B += (record.world_historyB || 0)
//                     ratingObj.world_history_C += (record.world_historyC || 0)
//                     secondDayCounter++;
//                     secondDayTotal += (record.day_2_total || 0)
//                 }else{
//                     //ratingObj.turkish += (record.turkish || 0)
//                     ratingObj.chemistry += (record.chemistry ||0)
//                     ratingObj.chemistry_A += (record.chemistryA ||0)
//                     ratingObj.chemistry_B += (record.chemistryB ||0)
//                     ratingObj.chemistry_C += (record.chemistryC ||0)
//                     ratingObj.physics += (record.physics ||0)
//                     ratingObj.physics_A += (record.physicsA ||0)
//                     ratingObj.physics_B += (record.physicsB ||0)
//                     ratingObj.physics_C += (record.physicsC ||0)
//                     ratingObj.biology += (record.biology || 0)
//                     ratingObj.biology_A += (record.biologyA || 0)
//                     ratingObj.biology_B += (record.biologyB || 0)
//                     ratingObj.biology_C += (record.biologyC || 0)
//                     secondDayCounter++;
//                     secondDayTotal += (record.day_2_total || 0)
//                 }
//             }
//         })
//     }else{
//         _.each(records,(record) => {
//
//             if (record.day_1_total) {
//                 ratingObj.algebra += (record.algebra || 0)
//                 ratingObj.algebra_A += (record.algebraA || 0)
//                 ratingObj.algebra_B += (record.algebraB || 0)
//                 ratingObj.algebra_C += (record.algebraC || 0)
//                 ratingObj.kazakh_history += (record.kazakh_history || 0)
//                 ratingObj.kazakh_history_A += (record.kazakh_historyA || 0)
//                 ratingObj.kazakh_history_B += (record.kazakh_historyB || 0)
//                 ratingObj.kazakh_history_C += (record.kazakh_historyC || 0)
//                 ratingObj.english += (record.english || 0)
//                 ratingObj.english_A += (record.englishA || 0)
//                 ratingObj.english_B += (record.englishB || 0)
//                 ratingObj.english_C += (record.englishC || 0)
//                 ratingObj.kazakh += (record.kazakh || 0)
//                 ratingObj.kazakh_A += (record.kazakhA || 0)
//                 ratingObj.kazakh_B += (record.kazakhB || 0)
//                 ratingObj.kazakh_C += (record.kazakhC || 0)
//                 ratingObj.kazakh_literature += (record.kazakh_literature || 0)
//                 ratingObj.kazakh_literature_A += (record.kazakh_literatureA || 0)
//                 ratingObj.kazakh_literature_B += (record.kazakh_literatureB || 0)
//                 ratingObj.kazakh_literature_C += (record.kazakh_literatureC || 0)
//                 firstDayCounter++;
//                 firstDayTotal += (record.day_1_total || 0)
//             }
//
//             if (record.day_2_total) {
//                 if(record.btsNo == '3'){
//                     ratingObj.russian += (record.russian || 0)
//                     ratingObj.chemistry += (record.chemistry ||0)
//                     ratingObj.chemistry_A += (record.chemistryA ||0)
//                     ratingObj.chemistry_B += (record.chemistryB ||0)
//                     ratingObj.chemistry_C += (record.chemistryC ||0)
//                     ratingObj.biology += (record.biology || 0)
//                     ratingObj.biology_A += (record.biologyA || 0)
//                     ratingObj.biology_B += (record.biologyB || 0)
//                     ratingObj.biology_C += (record.biologyC || 0)
//                     ratingObj.geography += (record.geography || 0)
//                     ratingObj.geography_A += (record.geographyA || 0)
//                     ratingObj.geography_B += (record.geographyB || 0)
//                     ratingObj.geography_C += (record.geographyC || 0)
//                     secondDayCounter++;
//                     secondDayTotal += (record.day_2_total || 0)
//                 }
//                 else if(record.btsNo == '4'){
//                     ratingObj.russian += (record.russian || 0)
//                     ratingObj.physics += (record.physics ||0)
//                     ratingObj.physics_A += (record.physicsA ||0)
//                     ratingObj.physics_B += (record.physicsB ||0)
//                     ratingObj.physics_C += (record.physicsC ||0)
//                     ratingObj.computer += (record.computer || 0)
//                     ratingObj.computer_A += (record.computerA || 0)
//                     ratingObj.computer_B += (record.computerB || 0)
//                     ratingObj.computer_C += (record.computerC || 0)
//                     ratingObj.world_history += (record.world_history || 0)
//                     ratingObj.world_history_A += (record.world_historyA || 0)
//                     ratingObj.world_history_B += (record.world_historyB || 0)
//                     ratingObj.world_history_C += (record.world_historyC || 0)
//                     secondDayCounter++;
//                     secondDayTotal += (record.day_2_total || 0)
//                 }
//                 else{
//                     if(record.physics) {
//                         ratingObj.physics += record.physics;
//                         counterPhysics ++;
//                     }
//
//                     if(record.chemistry) {
//                         ratingObj.chemistry += record.chemistry;
//                         counterChemistry ++;
//                     }
//
//                     if(record.biology) {
//                         ratingObj.biology += record.biology;
//                         counterBiology ++;
//                     }
//
//                     if(record.geography) {
//                         ratingObj.geography += record.geography;
//                         counterGeography ++;
//                     }
//
//                     if(record.computer) {
//                         ratingObj.computer += record.computer;
//                         counterComputer ++;
//                     }
//
//                     if(record.world_history) {
//                         ratingObj.world_history += record.world_history;
//                         counterWorld_History ++;
//                     }
//
//                     ratingObj.turkish += (record.turkish || 0)
//                     ratingObj.russian += (record.russian || 0)
//                     secondDayCounter++;
//                     secondDayTotal += (record.day_2_total || 0)
//                 }
//             }
//
//         })
//     }
//     if (ratingObj.grade == '7' || ratingObj.grade == '8'){
//         if (firstDayCounter != 0) {
//             ratingObj.algebra = (ratingObj.algebra / firstDayCounter)
//             ratingObj.algebra_A = (ratingObj.algebra_A / firstDayCounter)
//             ratingObj.algebra_B = (ratingObj.algebra_B / firstDayCounter)
//             ratingObj.algebra_C = (ratingObj.algebra_C / firstDayCounter)
//             ratingObj.kazakh = (ratingObj.kazakh / firstDayCounter)
//             ratingObj.kazakh_A = (ratingObj.kazakh_A / firstDayCounter)
//             ratingObj.kazakh_B = (ratingObj.kazakh_B / firstDayCounter)
//             ratingObj.kazakh_C = (ratingObj.kazakh_C / firstDayCounter)
//             ratingObj.kazakh_literature = (ratingObj.kazakh_literature / firstDayCounter)
//             ratingObj.kazakh_literature_A = (ratingObj.kazakh_literature_A / firstDayCounter)
//             ratingObj.kazakh_literature_B = (ratingObj.kazakh_literature_B / firstDayCounter)
//             ratingObj.kazakh_literature_C = (ratingObj.kazakh_literature_C / firstDayCounter)
//             ratingObj.russian = (ratingObj.russian / firstDayCounter)
//             ratingObj.kazakh_history = (ratingObj.kazakh_history / firstDayCounter)
//             ratingObj.kazakh_history_A = (ratingObj.kazakh_history_A / firstDayCounter)
//             ratingObj.kazakh_history_B = (ratingObj.kazakh_history_B / firstDayCounter)
//             ratingObj.kazakh_history_C = (ratingObj.kazakh_history_C / firstDayCounter)
//             ratingObj.total += firstDayTotal/firstDayCounter
//         }
//
//         if (secondDayCounter != 0) {
//             if (btsNo == '2'){
//                 ratingObj.geometry = (ratingObj.geometry / secondDayCounter)
//                 ratingObj.geometry_A = (ratingObj.geometry_A / secondDayCounter)
//                 ratingObj.geometry_B = (ratingObj.geometry_B / secondDayCounter)
//                 ratingObj.geometry_C = (ratingObj.geometry_C / secondDayCounter)
//                 ratingObj.computer = (ratingObj.computer / secondDayCounter)
//                 ratingObj.computer_A = (ratingObj.computer_A / secondDayCounter)
//                 ratingObj.computer_B = (ratingObj.computer_B / secondDayCounter)
//                 ratingObj.computer_C = (ratingObj.computer_C / secondDayCounter)
//                 ratingObj.geography = (ratingObj.geography / secondDayCounter)
//                 ratingObj.geography_A = (ratingObj.geography_A / secondDayCounter)
//                 ratingObj.geography_B = (ratingObj.geography_B / secondDayCounter)
//                 ratingObj.geography_C = (ratingObj.geography_C / secondDayCounter)
//                 ratingObj.world_history = (ratingObj.world_history / secondDayCounter)
//                 ratingObj.world_history_A = (ratingObj.world_history_A / secondDayCounter)
//                 ratingObj.world_history_B = (ratingObj.world_history_B / secondDayCounter)
//                 ratingObj.world_history_C = (ratingObj.world_history_C / secondDayCounter)
//                 ratingObj.total += secondDayTotal/secondDayCounter
//             }else{
//                 //ratingObj.turkish = (ratingObj.turkish / secondDayCounter)
//                 ratingObj.physics = (ratingObj.physics / secondDayCounter)
//                 ratingObj.physics_A = (ratingObj.physics_A / secondDayCounter)
//                 ratingObj.physics_B = (ratingObj.physics_B / secondDayCounter)
//                 ratingObj.physics_C = (ratingObj.physics_C / secondDayCounter)
//                 ratingObj.chemistry = (ratingObj.chemistry / secondDayCounter)
//                 ratingObj.chemistry_A = (ratingObj.chemistry_A / secondDayCounter)
//                 ratingObj.chemistry_B = (ratingObj.chemistry_B / secondDayCounter)
//                 ratingObj.chemistry_C = (ratingObj.chemistry_C / secondDayCounter)
//                 ratingObj.biology = (ratingObj.biology / secondDayCounter)
//                 ratingObj.biology_A = (ratingObj.biology_A / secondDayCounter)
//                 ratingObj.biology_B = (ratingObj.biology_B / secondDayCounter)
//                 ratingObj.biology_C = (ratingObj.biology_C / secondDayCounter)
//                 ratingObj.total += secondDayTotal/secondDayCounter
//             }
//         }
//     }else{
//         if (firstDayCounter != 0) {
//             ratingObj.algebra = (ratingObj.algebra / firstDayCounter)
//             ratingObj.algebra_A = (ratingObj.algebra_A / firstDayCounter)
//             ratingObj.algebra_B = (ratingObj.algebra_B / firstDayCounter)
//             ratingObj.algebra_C = (ratingObj.algebra_C / firstDayCounter)
//             ratingObj.kazakh_history = (ratingObj.kazakh_history / firstDayCounter)
//             ratingObj.kazakh_history_A = (ratingObj.kazakh_history_A / firstDayCounter)
//             ratingObj.kazakh_history_B = (ratingObj.kazakh_history_B / firstDayCounter)
//             ratingObj.kazakh_history_C = (ratingObj.kazakh_history_C / firstDayCounter)
//             ratingObj.english = (ratingObj.english / firstDayCounter)
//             ratingObj.english_A = (ratingObj.english_A / firstDayCounter)
//             ratingObj.english_B = (ratingObj.english_B / firstDayCounter)
//             ratingObj.english_C = (ratingObj.english_C / firstDayCounter)
//             ratingObj.kazakh = (ratingObj.kazakh / firstDayCounter)
//             ratingObj.kazakh_A = (ratingObj.kazakh_A / firstDayCounter)
//             ratingObj.kazakh_B = (ratingObj.kazakh_B / firstDayCounter)
//             ratingObj.kazakh_C = (ratingObj.kazakh_C / firstDayCounter)
//             ratingObj.kazakh_literature = (ratingObj.kazakh_literature / firstDayCounter)
//             ratingObj.kazakh_literature_A = (ratingObj.kazakh_literature_A / firstDayCounter)
//             ratingObj.kazakh_literature_B = (ratingObj.kazakh_literature_B / firstDayCounter)
//             ratingObj.kazakh_literature_C = (ratingObj.kazakh_literature_C / firstDayCounter)
//             ratingObj.total += firstDayTotal/firstDayCounter
//         }
//         if (secondDayCounter != 0) {
//             if(btsNo == '3'){
//                 ratingObj.russian = (ratingObj.russian / secondDayCounter)
//                 ratingObj.chemistry = (ratingObj.chemistry / secondDayCounter)
//                 ratingObj.chemistry_A = (ratingObj.chemistry_A / secondDayCounter)
//                 ratingObj.chemistry_B = (ratingObj.chemistry_B / secondDayCounter)
//                 ratingObj.chemistry_C = (ratingObj.chemistry_C / secondDayCounter)
//                 ratingObj.biology = (ratingObj.biology / secondDayCounter)
//                 ratingObj.biology_A = (ratingObj.biology_A / secondDayCounter)
//                 ratingObj.biology_B = (ratingObj.biology_B / secondDayCounter)
//                 ratingObj.biology_C = (ratingObj.biology_C / secondDayCounter)
//                 ratingObj.geography = (ratingObj.geography / secondDayCounter)
//                 ratingObj.geography_A = (ratingObj.geography_A / secondDayCounter)
//                 ratingObj.geography_B = (ratingObj.geography_B / secondDayCounter)
//                 ratingObj.geography_C = (ratingObj.geography_C / secondDayCounter)
//                 ratingObj.total += secondDayTotal/secondDayCounter
//             }
//             if(btsNo == '4'){
//                 ratingObj.russian = (ratingObj.russian / secondDayCounter)
//                 ratingObj.physics = (ratingObj.physics / secondDayCounter)
//                 ratingObj.physics_A = (ratingObj.physics_A / secondDayCounter)
//                 ratingObj.physics_B = (ratingObj.physics_B / secondDayCounter)
//                 ratingObj.physics_C = (ratingObj.physics_C / secondDayCounter)
//                 ratingObj.computer = (ratingObj.computer / secondDayCounter)
//                 ratingObj.computer_A = (ratingObj.computer_A / secondDayCounter)
//                 ratingObj.computer_B = (ratingObj.computer_B / secondDayCounter)
//                 ratingObj.computer_C = (ratingObj.computer_C / secondDayCounter)
//                 ratingObj.world_history = (ratingObj.world_history / secondDayCounter)
//                 ratingObj.world_history_A = (ratingObj.world_history_A / secondDayCounter)
//                 ratingObj.world_history_B = (ratingObj.world_history_B / secondDayCounter)
//                 ratingObj.world_history_C = (ratingObj.world_history_C / secondDayCounter)
//                 ratingObj.total += secondDayTotal/secondDayCounter
//             }
//         }
//     }
//
//     // insert rating to db
//     var sameRating = BtsRatings.findOne({
//         btsNo: btsNo,
//         academicYear: academicYear,
//         schoolId: schoolId,
//         grade: grade
//     })
//     if (!sameRating)
//         BtsRatings.insert(ratingObj)
//     else {
//         BtsRatings.update({_id:sameRating._id}, {
//             $set: ratingObj
//         })
//     }
//
//     return ratingObj
// }
