import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsLevelsEdit20_21.html';
Template.btsLevelsEdit20_21.onCreated(function() {
    let template = this
    template.subscribe("btsLevel",FlowRouter.getParam("id"))
})

Template.btsLevelsEdit20_21.helpers({
    levels() {
        return BtsLevels.findOne({_id:FlowRouter.getParam("id")})
    },
    day1(day) {
    	return day=="1"
    },
    day2(day) {
    	return day=="2"
    },
    grade7(grade) {
      return grade == "7"
    },
    grade8(grade) {
      return grade == "8"
    },
    grade9(grade) {
      return grade == "9"
    },
    grade10(grade) {
      return grade == "10"
    },
    btsNo1_or_2(btsNo) {
      return btsNo == "1" || btsNo == "2"
    },
    btsNo3(btsNo) {
      return btsNo == "3"
    }
})

Template.btsLevelsEdit20_21.events({
    "change #btsNo"(event,template) {
        template.btsNo.set(event.target.value)
        localStorage.setItem("btsNo", event.target.value)
    },
    "click #save"(event,template) {
        console.log("##")
        event.preventDefault()
        let levels = BtsLevels.findOne({_id:FlowRouter.getParam("id")})
        console.log(levels)
        let answerLevels = {}

        if (levels.grade == "7"){
          if (levels.day == "1"){
            if (levels.day == "1" && (levels.quarter == "1" || levels.quarter == "2")){
              answerLevels["mathematic"] = template.find("[name=mathematic]").value;
              answerLevels["kazakh_lang_kaz"] = template.find("[name=kazakh_lang_kaz]").value;
              answerLevels["kazakh_lang_rus"] = template.find("[name=kazakh_lang_rus]").value;
              answerLevels["turkish_lang"] = template.find("[name=turkish_lang]").value;

            }else if (levels.quarter == "3") {
              answerLevels["mathematic"] = template.find("[name=mathematic]").value;
              answerLevels["physics"] = template.find("[name=physics]").value;
              answerLevels["chemistry"] = template.find("[name=chemistry]").value;
              answerLevels["biology"] = template.find("[name=biology]").value;

            }
          }
        }else if (levels.grade == "8"){
          if (levels.day=="1") {
            answerLevels["mathematic"] = template.find("[name=mathematic]").value;
            answerLevels["physics"] = template.find("[name=physics]").value;
            answerLevels["biology"] = template.find("[name=biology]").value;
          }
          else if (levels.day=="2"){
            answerLevels["geography"] = template.find("[name=geography]").value;
            answerLevels["physics"] = template.find("[name=physics]").value;
            answerLevels["chemistry"] = template.find("[name=chemistry]").value;
            answerLevels["biology"] = template.find("[name=biology]").value;
          }
        }else if (levels.grade == "9"){
          if (levels.day=="1") {
            answerLevels["mathematic"] = template.find("[name=mathematic]").value;
            answerLevels["physics"] = template.find("[name=physics]").value;
            answerLevels["chemistry"] = template.find("[name=chemistry]").value;
          }
          else if (levels.day=="2"){
            answerLevels["geography"] = template.find("[name=geography]").value;
            answerLevels["physics"] = template.find("[name=physics]").value;
            answerLevels["chemistry"] = template.find("[name=chemistry]").value;
            answerLevels["biology"] = template.find("[name=biology]").value;
          }
        }else if (levels.grade == "10") {
            if (levels.day=="1"){
              answerLevels["mathematic"] = template.find("[name=mathematic]").value;

              answerLevels["geography"] = template.find("[name=geography]").value;
              answerLevels["physics"] = template.find("[name=physics]").value;
              answerLevels["chemistry"] = template.find("[name=chemistry]").value;
              answerLevels["biology"] = template.find("[name=biology]").value;
              answerLevels["world_history"] = template.find("[name=world_history]").value;
            }
        }

        Meteor.call("BtsLevels.Update", levels._id,answerLevels,function(err) {
            if (err) {
                alert(err.reason)
            } else {
                alert("Сақталды!")
            }
        })
        alert("Идет пересчет рейтинга школ")
        //FlowRouter.redirect("/admin/bts/levels")
    }
})
