import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './turkishKeysNew.html';
Template.turkishKeysNew.onCreated(function() {
    let template = this

    if (localStorage.getItem("grade")) {
        template.grade = new ReactiveVar(localStorage.getItem("grade"))
    } else {
        localStorage.setItem("grade","7")
        template.grade = new ReactiveVar("7")
    }

})

Template.turkishKeysNew.helpers({
    selected(id,val) {
            let obj = {
                grade: Template.instance().grade.get()
            }
            let v = obj[id]===val
            return v ? "selected" : ""
    },
    grade7(){
        return "7" == Template.instance().grade.get()
    },
    grade8(){
        return "8" == Template.instance().grade.get()
    }
})

Template.turkishKeysNew.events({
    "change #grade"(event,template) {
        template.grade.set(event.target.value)
        localStorage.setItem("grade", event.target.value)
    },
    "click #save"(event,template) {
        event.preventDefault()
        let answerKeys = {
            academicYear: academicYear.get(),
            grade: template.grade.get(),
            variant: template.find("[name=variant]").value
        }
        answerKeys["turkish"] = template.find("[name=turkish]").value;
        
        Meteor.call("TurkishAnswerKeys.Insert", answerKeys,function(err) {
            if (err) {
                alert(err.reason)
            } else {
                alert("Сақталды!")
            }
        })
        FlowRouter.redirect("/admin/turkish/keys")
    }
})
