import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './editTurkishKeys.html';
Template.editTurkishKeys.onCreated(function() {
    let template = this
    template.subscribe("turkishKey",FlowRouter.getParam("id"))
})

Template.editTurkishKeys.helpers({
    keys() {
        return TurkishAnswerKeys.findOne({_id:FlowRouter.getParam("id")})
    },
    dayTwo(day) {
    	return day=="2"
    },
    grade7(grade) {
      return grade == "7"
    },
    grade8(grade) {
      return grade == "8"
    }
})

Template.editTurkishKeys.events({
    "click #save"(event,template) {
        event.preventDefault()
        let keys = TurkishAnswerKeys.findOne({_id:FlowRouter.getParam("id")})
        let answerKeys = {}
        answerKeys["turkish"] = template.find("[name=turkish]").value;
      
        Meteor.call("TurkishAnswerKeys.Update", keys._id,answerKeys,function(err) {
            if (err) {
                alert(err.reason)
            } else {
                alert("Сақталды!")
            }
        })
        alert("Идет пересчет рейтинга школ")
        //FlowRouter.redirect("/admin/bts/keys")
    }
})
