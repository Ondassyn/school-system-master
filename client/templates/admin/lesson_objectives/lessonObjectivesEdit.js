import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './lessonObjectivesEdit.html';
Template.lessonObjectivesEdit.onCreated(function() {
    let template = this

    template.grade_select = new ReactiveVar("")
    template.subject_select = new ReactiveVar("")
    template.subscribe('subjects')
    template.subscribe("lessonObjective",FlowRouter.getParam("_id"))
})

Template.lessonObjectivesEdit.helpers({
    
    objectives() {
        return LessonObjectives.findOne({_id:FlowRouter.getParam("_id")})
    },
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    }
})

Template.lessonObjectivesEdit.events({
    
    "change #select"(event,template) {
        template.grade_select.set(template.find('[name=grade_select]').value)
        template.subject_select.set(template.find('[name=subject_select]').value)

        let grade_select = FlowRouter.getParam('_id')
        let subject_select = FlowRouter.getParam('_id')
    },

    "click #save"(event,template) {
        event.preventDefault()
        let objective = LessonObjectives.findOne({_id:FlowRouter.getParam('_id')}) 
        let objectives = {
            grade: template.find("[name=grade_select]").value,
            id: template.find("[name=id]").value
        }

        objectives.subjectId = template.find("[name=subject_select]").value
        objectives.objective = template.find("[name=objective]").value
        objectives.topic = template.find("[name=topic]").value

        Meteor.call("lessonObjectives.Update",objective._id,objectives,function(err) {
            if (err) {
                alert(err.reason)
            } else {
                alert("Сақталды!")
                    }
            })
        //FlowRouter.redirect("/admin/bts/objectives")
    }
})