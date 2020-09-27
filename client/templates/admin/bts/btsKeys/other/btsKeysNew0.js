import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsKeysNew0.html';
Template.btsKeysNew.onCreated(function() {
    let template = this

    if (localStorage.getItem("btsNo")) {
        template.btsNo = new ReactiveVar(localStorage.getItem("btsNo"))
    } else {
        localStorage.setItem("btsNo","1")
        template.btsNo = new ReactiveVar("1")
    }

    if (localStorage.getItem("day")) {
        template.day = new ReactiveVar(localStorage.getItem("day"))
    } else {
        localStorage.setItem("day","1")
        template.day = new ReactiveVar("1")
    }

    if (localStorage.getItem("grade")) {
        template.grade = new ReactiveVar(localStorage.getItem("grade"))
    } else {
        localStorage.setItem("grade","7")
        template.grade = new ReactiveVar("7")
    }

})

Template.btsKeysNew.helpers({
    dayOne() {
      return "1"==Template.instance().day.get()
    },
    
    dayTwo() {
    	return "2"==Template.instance().day.get()
    },
    selected(id,val) {
            let obj = {
                "btsNo": Template.instance().btsNo.get(),
                day: Template.instance().day.get(),
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
    },
    btsNo2(){
        return "2" == Template.instance().btsNo.get()
    }
})

Template.btsKeysNew.events({
    "change #btsNo"(event,template) {
        template.btsNo.set(event.target.value)
        localStorage.setItem("btsNo", event.target.value)
    },
    "change #day"(event,template) {
        template.day.set(event.target.value)
        localStorage.setItem("day", event.target.value)
    },
    "change #grade"(event,template) {
        template.grade.set(event.target.value)
        localStorage.setItem("grade", event.target.value)
    },
    "click #save"(event,template) {
        event.preventDefault()
        let answerKeys = {
            academicYear: academicYear.get(),
            grade: template.grade.get(),
            day: template.day.get(),
            quarter: template.btsNo.get(),
            variant: template.find("[name=variant]").value
        }
        if (template.grade.get() == "7" || template.grade.get() == "8"){
            console.log("#")
            if (template.day.get() == "1"){
                answerKeys["algebra"] = template.find("[name=algebra]").value;
                answerKeys["kazakh_kaz"] = template.find("[name=kazakh_kaz]").value;
                answerKeys["kazakh_rus"] = template.find("[name=kazakh_rus]").value;
                answerKeys["kazakh_literature_kaz"] = template.find("[name=kazakh_literature_kaz]").value;
                answerKeys["kazakh_literature_rus"] = template.find("[name=kazakh_literature_rus]").value;
                answerKeys["russian"] = template.find("[name=russian]").value;
                answerKeys["kazakh_history"] = template.find("[name=kazakh_history]").value;

            }
            if (template.day.get() == "2") {
                console.log("#")
                if (template.btsNo.get() == "2"){
                    answerKeys["geometry"] = template.find("[name=geometry]").value;
                    answerKeys["computer"] = template.find("[name=computer]").value;
                    answerKeys["geography"] = template.find("[name=geography]").value;
                    answerKeys["world_history"] = template.find("[name=world_history]").value;
                }else{
                    //answerKeys["turkish"] = template.find("[name=turkish]").value;
                    answerKeys["chemistry"] = template.find("[name=chemistry]").value;
                    answerKeys["physics"] = template.find("[name=physics]").value;
                    answerKeys["biology"] = template.find("[name=biology]").value;
                }
            }
        }
        if (template.grade.get() == "9" || template.grade.get() == "10"){
            console.log("#")
            if (template.day.get()=="2") {
              answerKeys["russian"] = template.find("[name=russian]").value
              //answerKeys["turkish"] = template.find("[name=turkish]").value
              answerKeys["physics"] = template.find("[name=physics]").value
              answerKeys["chemistry"] = template.find("[name=chemistry]").value
              answerKeys["biology"] = template.find("[name=biology]").value
              answerKeys["computer"] = template.find("[name=computer]").value
              answerKeys["world_history"] = template.find("[name=world_history]").value
              answerKeys["geography"] = template.find("[name=geography]").value
            }
            else {
              answerKeys["algebra"] = template.find("[name=algebra]").value;
              answerKeys["geometry"] = template.find("[name=geometry]").value;
              answerKeys["kazakh_kaz"] = template.find("[name=kazakh_kaz]").value;
              answerKeys["kazakh_rus"] = template.find("[name=kazakh_rus]").value;
              answerKeys["kazakh_literature_kaz"] = template.find("[name=kazakh_literature_kaz]").value;
              answerKeys["kazakh_literature_rus"] = template.find("[name=kazakh_literature_rus]").value;
              answerKeys["english"] = template.find("[name=english]").value;
              answerKeys["kazakh_history"] = template.find("[name=kazakh_history]").value
            }
        }

        Meteor.call("BtsAnswerKeys.Insert", answerKeys,function(err) {
            if (err) {
                alert(err.reason)
            } else {
                alert("Сақталды!")
            }
        })
        FlowRouter.redirect("/admin/bts/keys")
    }
})
