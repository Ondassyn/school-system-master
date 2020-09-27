// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';
// import './btsLevelsEdit.html';
// Template.btsLevelsEdit.onCreated(function() {
//     let template = this
//     template.subscribe("btsLevel",FlowRouter.getParam("id"))
// })
//
// Template.btsLevelsEdit.helpers({
//     levels() {
//         return BtsLevels.findOne({_id:FlowRouter.getParam("id")})
//     },
//     dayTwo(day) {
//     	return day=="2"
//     },
//     grade7(grade) {
//       return grade == "7"
//     },
//     grade8(grade) {
//       return grade == "8"
//     },
//     btsNo2(btsNo) {
//       return btsNo == "2"
//     },
//     btsNo4(btsNo) {
//       return btsNo == "4"
//     }
// })
//
// Template.btsLevelsEdit.events({
//     "change #btsNo"(event,template) {
//         template.btsNo.set(event.target.value)
//         localStorage.setItem("btsNo", event.target.value)
//     },
//     "click #save"(event,template) {
//         console.log("##")
//         event.preventDefault()
//         let levels = BtsLevels.findOne({_id:FlowRouter.getParam("id")})
//         console.log(levels)
//         let answerLevels = {}
//         if (levels.grade == "7" || levels.grade == "8"){
//           console.log("#")
//           if (levels.day == "1"){
//             answerLevels["algebra"] = template.find("[name=algebra]").value;
//             answerLevels["kazakh_kaz"] = template.find("[name=kazakh_kaz]").value;
//             answerLevels["kazakh_rus"] = template.find("[name=kazakh_rus]").value;
//             answerLevels["kazakh_literature_kaz"] = template.find("[name=kazakh_literature_kaz]").value;
//             answerLevels["kazakh_literature_rus"] = template.find("[name=kazakh_literature_rus]").value;
//             answerLevels["russian"] = template.find("[name=russian]").value;
//             answerLevels["kazakh_history"] = template.find("[name=kazakh_history]").value;
//           }else {
//             if (levels.btsNo == "2"){
//               answerLevels["geometry"] = template.find("[name=geometry]").value;
//               answerLevels["computer"] = template.find("[name=computer]").value;
//               answerLevels["geography"] = template.find("[name=geography]").value;
//               answerLevels["world_history"] = template.find("[name=world_history]").value;
//             }else {
//               //answerLevels["turkish"] = template.find("[name=turkish]").value;
//               answerLevels["chemistry"] = template.find("[name=chemistry]").value;
//               answerLevels["physics"] = template.find("[name=physics]").value;
//               answerLevels["biology"] = template.find("[name=biology]").value;
//             }
//           }
//         }else {
//
//           if (levels.day=="2") {
//             answerLevels["russian"] = template.find("[name=russian]").value
//             //answerLevels["turkish"] = template.find("[name=turkish]").value
//             answerLevels["physics"] = template.find("[name=physics]").value
//             answerLevels["chemistry"] = template.find("[name=chemistry]").value
//             answerLevels["biology"] = template.find("[name=biology]").value
//             answerLevels["computer"] = template.find("[name=computer]").value
//             answerLevels["world_history"] = template.find("[name=world_history]").value
//             answerLevels["geography"] = template.find("[name=geography]").value
//           }
//           else {
//             answerLevels["algebra"] = template.find("[name=algebra]").value;
//             answerLevels["geometry"] = template.find("[name=geometry]").value;
//             answerLevels["kazakh_kaz"] = template.find("[name=kazakh_kaz]").value;
//             answerLevels["kazakh_rus"] = template.find("[name=kazakh_rus]").value;
//             answerLevels["kazakh_literature_kaz"] = template.find("[name=kazakh_literature_kaz]").value;
//             answerLevels["kazakh_literature_rus"] = template.find("[name=kazakh_literature_rus]").value;
//             answerLevels["english"] = template.find("[name=english]").value;
//             answerLevels["kazakh_history"] = template.find("[name=kazakh_history]").value
//           }
//       }
//         Meteor.call("BtsLevels.Update", levels._id,answerLevels,function(err) {
//             if (err) {
//                 alert(err.reason)
//             } else {
//                 alert("Сақталды!")
//             }
//         })
//         alert("Идет пересчет рейтинга школ")
//         //FlowRouter.redirect("/admin/bts/levels")
//     }
// })
