import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsObjectivesEdit.html';
Template.btsObjectivesEdit.onCreated(function() {
    let template = this
    template.subscribe('subjects')
    template.subscribe("btsObjective",FlowRouter.getParam("_id"))
})

Template.btsObjectivesEdit.helpers({
    
    objectives() {
        return BtsObjectivesList.findOne({_id:FlowRouter.getParam("_id")})
    }
})

Template.btsObjectivesEdit.events({
    
    "click #save"(event,template) {
        event.preventDefault()
        let objective = BtsObjectivesList.findOne({_id:FlowRouter.getParam('_id')}) 
        let objectives = {
            academicYear: academicYear.get(),
            variant1: template.find("[name=variant1]").value,
            variant2: template.find("[name=variant2]").value
        }

        objectives.questions1 = template.find("[name=questions1]").value
        objectives.questions2 = template.find("[name=questions2]").value

        Meteor.call("BtsObjectives.Update",objective._id,objectives,function(err) {
            if (err) {
                alert(err.reason)
            } else {
                alert("Сақталды!")
                    }
            })

        if (objective.quarter == '1') {
            FlowRouter.redirect("/admin/bts/objectives/1")
        }
        if (objective.quarter == '2') {
            FlowRouter.redirect("/admin/bts/objectives/2")
        }
        if (objective.quarter  == '3') {
            FlowRouter.redirect("/admin/bts/objectives/3")
        }
        if (objective.quarter  == '4') {
            FlowRouter.redirect("/admin/bts/objectives/4")
        }

        console.log('###')    

    }
})