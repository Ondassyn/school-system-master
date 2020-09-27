import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './lessonObjectivesNew.html';
Template.lessonObjectivesNew.onCreated(function() {
    let template = this

    template.grade_select = new ReactiveVar()
    template.subject_select = new ReactiveVar()
    template.subscribe('subjects')
    template.subscribe("lessonObjectives")

})

Template.lessonObjectivesNew.helpers({
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    }
})

Template.lessonObjectivesNew.events({
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


        if(objectives.subjectId && objectives.grade && objectives.id) {
            Meteor.call("lessonObjectives.Insert",objectives,function(err) {
                if (err) {
                    alert(err.reason)
                } else {
                    alert("Сақталды!")
                        }
                })
            FlowRouter.redirect("/admin/lessonObjectives")
        } else {
            alert("Кейбір мағлұматтар толтырылмаған!")
        }
    }
})