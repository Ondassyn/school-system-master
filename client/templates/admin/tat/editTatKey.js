import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './editTatKey.html';
Template.editTatKey.onCreated(function() {
    let template = this

    if (localStorage.getItem("tatNo")) {
        template.tatNo = new ReactiveVar(localStorage.getItem("tatNo"))
    } else {
        localStorage.setItem("tatNo","1")
        template.tatNo = new ReactiveVar("1")
    }

    template.subscribe("subjects")
    template.subscribe("tatKeys",academicYear.get(), template.tatNo.get())
    template.subscribe("tatKey",FlowRouter.getParam("id"))

})

Template.editTatKey.helpers({
    key() {
        return TatAnswerKeys.findOne({_id:FlowRouter.getParam("id")})
    },
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    selected(a,b) {
        if (a==b) {
            return "selected"
        }
    }
})

Template.editTatKey.events({
    "change #tatNo"(event,template) {
        template.tatNo.set(event.target.value)
        localStorage.setItem("tatNo", event.target.value)
    },
    "click #save"(event,template) {
        event.preventDefault()

        let answerKey = {
            academicYear: academicYear.get(),
            tatNo: template.find("[name=tatNo]").value,
            variant: template.find("[name=variant]").value,
            subjectId: template.find("[name=subjectId]").value,
            keys: template.find("[name=keys]").value,
        }

        Meteor.call("TatAnswerKeys.Update",FlowRouter.getParam("id"),answerKey,function(err) {
            if (err) {
                alert(err.reason)
            } else {
                alert("Сақталды")
            }
        })
        alert("Идет пересчет рейтинга школ")
    }
})
