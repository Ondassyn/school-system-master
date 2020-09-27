// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';
// import './btsLevelsNew.html';
// Template.btsLevelsNew.onCreated(function() {
//     let template = this
//
//     if (localStorage.getItem("btsNo")) {
//         template.btsNo = new ReactiveVar(localStorage.getItem("btsNo"))
//     } else {
//         localStorage.setItem("btsNo","1")
//         template.btsNo = new ReactiveVar("1")
//     }
//
//     if (localStorage.getItem("day")) {
//         template.day = new ReactiveVar(localStorage.getItem("day"))
//     } else {
//         localStorage.setItem("day","1")
//         template.day = new ReactiveVar("1")
//     }
//
//     if (localStorage.getItem("grade")) {
//         template.grade = new ReactiveVar(localStorage.getItem("grade"))
//     } else {
//         localStorage.setItem("grade","7")
//         template.grade = new ReactiveVar("7")
//     }
//
// })
//
// Template.btsLevelsNew.helpers({
//     dayTwo() {
//     	return "2"==Template.instance().day.get()
//     },
//     selected(id,val) {
//             let obj = {
//                 "btsNo": Template.instance().btsNo.get(),
//                 day: Template.instance().day.get(),
//                 grade: Template.instance().grade.get()
//             }
//             let v = obj[id]===val
//             return v ? "selected" : ""
//     },
//     grade7(){
//         return "7" == Template.instance().grade.get()
//     },
//     grade8(){
//         return "8" == Template.instance().grade.get()
//     },
//     btsNo2(){
//         return "2" == Template.instance().btsNo.get()
//     }
// })
//
// Template.btsLevelsNew.events({
//     "change #btsNo"(event,template) {
//         template.btsNo.set(event.target.value)
//         localStorage.setItem("btsNo", event.target.value)
//     },
//     "change #day"(event,template) {
//         template.day.set(event.target.value)
//         localStorage.setItem("day", event.target.value)
//     },
//     "change #grade"(event,template) {
//         template.grade.set(event.target.value)
//         localStorage.setItem("grade", event.target.value)
//     },
//     "click #save"(event,template) {
//         event.preventDefault()
//         let answerLevels = {
//             academicYear: academicYear.get(),
//             grade: template.grade.get(),
//             day: template.day.get(),
//             quarter: template.btsNo.get(),
//             variant: template.find("[name=variant]").value
//         }
//         if (template.grade.get() == "7" || template.grade.get() == "8"){
//             console.log("#")
//             if (template.day.get() == "1"){
//                 answerLevels["algebra"] = template.find("[name=algebra]").value;
//                 answerLevels["kazakh_kaz"] = template.find("[name=kazakh_kaz]").value;
//                 answerLevels["kazakh_rus"] = template.find("[name=kazakh_rus]").value;
//                 answerLevels["kazakh_literature_kaz"] = template.find("[name=kazakh_literature_kaz]").value;
//                 answerLevels["kazakh_literature_rus"] = template.find("[name=kazakh_literature_rus]").value;
//                 answerLevels["russian"] = template.find("[name=russian]").value;
//                 answerLevels["kazakh_history"] = template.find("[name=kazakh_history]").value;
//
//             }
//             if (template.day.get() == "2") {
//                 console.log("#")
//                 if (template.btsNo.get() == "2"){
//                     answerLevels["geometry"] = template.find("[name=geometry]").value;
//                     answerLevels["computer"] = template.find("[name=computer]").value;
//                     answerLevels["geography"] = template.find("[name=geography]").value;
//                     answerLevels["world_history"] = template.find("[name=world_history]").value;
//                 }else{
//                     //answerLevels["turkish"] = template.find("[name=turkish]").value;
//                     answerLevels["chemistry"] = template.find("[name=chemistry]").value;
//                     answerLevels["physics"] = template.find("[name=physics]").value;
//                     answerLevels["biology"] = template.find("[name=biology]").value;
//                 }
//             }
//         }
//         if (template.grade.get() == "9" || template.grade.get() == "10"){
//             console.log("#")
//             if (template.day.get()=="2") {
//               answerLevels["russian"] = template.find("[name=russian]").value
//               //answerLevels["turkish"] = template.find("[name=turkish]").value
//               answerLevels["physics"] = template.find("[name=physics]").value
//               answerLevels["chemistry"] = template.find("[name=chemistry]").value
//               answerLevels["biology"] = template.find("[name=biology]").value
//               answerLevels["computer"] = template.find("[name=computer]").value
//               answerLevels["world_history"] = template.find("[name=world_history]").value
//               answerLevels["geography"] = template.find("[name=geography]").value
//             }
//             else {
//               answerLevels["algebra"] = template.find("[name=algebra]").value;
//               answerLevels["geometry"] = template.find("[name=geometry]").value;
//               answerLevels["kazakh_kaz"] = template.find("[name=kazakh_kaz]").value;
//               answerLevels["kazakh_rus"] = template.find("[name=kazakh_rus]").value;
//               answerLevels["kazakh_literature_kaz"] = template.find("[name=kazakh_literature_kaz]").value;
//               answerLevels["kazakh_literature_rus"] = template.find("[name=kazakh_literature_rus]").value;
//               answerLevels["english"] = template.find("[name=english]").value;
//               answerLevels["kazakh_history"] = template.find("[name=kazakh_history]").value
//             }
//         }
//
//         Meteor.call("BtsLevels.Insert", answerLevels,function(err) {
//             if (err) {
//                 alert(err.reason)
//             } else {
//                 alert("Сақталды!")
//             }
//         })
//         FlowRouter.redirect("/admin/bts/levels")
//     }
// })
