import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './tatKeys.html';
Template.tatKeys.onCreated(function() {
    let template = this

    if (localStorage.getItem("tatNo")) {
        template.tatNo = new ReactiveVar(localStorage.getItem("tatNo"))
    } else {
        localStorage.setItem("tatNo","1")
        template.tatNo = new ReactiveVar("1")
    }
    template.subscribe("subjects")
    template.autorun(() => {
        template.subscribe("tatKeys",academicYear.get(),template.tatNo.get())
    })

})

Template.tatKeys.helpers({
    keys() {
        return TatAnswerKeys.find({},{sort:{variant:1}})
    },
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    }
})

Template.tatKeys.events({
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
            keys: template.find("[name=keys]").value.replace(/\s/g,''),
        }
        console.log(answerKey);
        Meteor.call("TatAnswerKeys.Insert",answerKey,function(err) {
            if (err) {
                alert(err.reason)
            } else {
	    	alert("Сақталды")
	    }
        })
    },
    "click #delete"(event,template) {
        if (confirm('Жауап кілтін өшіргіңіз келеді ме?')) {
            Meteor.call("TatAnswerKeys.Delete", this._id, function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    FlowRouter.redirect('/admin/tat/keys')
                }
            })
        }
    }
})
