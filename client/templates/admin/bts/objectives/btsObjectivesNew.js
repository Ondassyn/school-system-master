import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsObjectivesNew.html';
Template.btsObjectivesNew.onCreated(function() {
    let template = this

    template.grade = new ReactiveVar("7")
    template.subject = new ReactiveVar("01")
    template.btsNo = new ReactiveVar("1")
    template.objectiveId = new ReactiveVar()

    //template.subscribe("btsObjectivesList")
    template.subscribe('lessonObjectives')
    template.subscribe('subjects')

})

Template.btsObjectivesNew.helpers({
    lessonObjectives() {
        let grade = Template.instance().grade.get()
        let subject = Template.instance().subject.get()
        return LessonObjectives.find({grade:grade,subjectId:subject},{sort:{id:1}})
    },
    selectObjective() {
        let objectiveId = Template.instance().objectiveId.get()
        return LessonObjectives.findOne({id:objectiveId})
    }
})

Template.btsObjectivesNew.events({

    "change #select"(event,template) {
        template.btsNo.set(template.find('[name=quarter]').value)
        template.grade.set(template.find('[name=grade]').value)
        template.subject.set(template.find('[name=subject]').value)
        template.objectiveId.set(template.find('[name=objectiveId]').value)

        let btsNo = FlowRouter.getParam('_id')
        let grade = FlowRouter.getParam('_id')
        let subject = FlowRouter.getParam('_id')
        let objectiveId = FlowRouter.getParam('_id')
    },
    "click #save"(event,template) {
        event.preventDefault()
        
        let selectedObjective = LessonObjectives.findOne({id:template.find("[name=objectiveId]").value})
        let subjectEng = Subjects.findOne({subjectId:template.find("[name=subject]").value})

        let objectives = {
            academicYear: academicYear.get(),
            grade: template.find("[name=grade]").value,
            subject: subjectEng.name_en,
            quarter: template.find("[name=quarter]").value,
            variant1: template.find("[name=variant1]").value,
            variant2: template.find("[name=variant2]").value
        }

        objectives.questions1 = template.find("[name=questions1]").value
        objectives.questions2 = template.find("[name=questions2]").value
        objectives.objectiveId = template.find("[name=objectiveId]").value
        objectives.objectiveDefinition = selectedObjective.objective  
        objectives.topic = selectedObjective.topic                     

        console.log(objectives)

        if(objectives.variant1 && objectives.variant2 && objectives.objectiveId) {
        Meteor.call("BtsObjectives.Insert", objectives,function(err) {
            if (err) {
                alert(err.reason)
            } else {
                alert("Сақталды!")
            }
        })        
        if (objectives.quarter == '1')
            FlowRouter.redirect('/admin/bts/objectives/1')
        if (objectives.quarter == '2')
            FlowRouter.redirect('/admin/bts/objectives/2')
        if (objectives.quarter == '3')
            FlowRouter.redirect('/admin/bts/objectives/3')
        if (objectives.quarter == '4')
            FlowRouter.redirect('/admin/bts/objectives/4')
        } else {
            alert("Кейбір мәліметтер толтырылмаған!")
        }
    }
})