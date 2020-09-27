import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsObjectivesResults.html';
Template.btsObjectivesResults.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar("7")
    template.subject_select = new ReactiveVar ('algebra')
    template.objective_select = new ReactiveVar()

    template.subscribe("subjects")
    template.subscribe("btsObjectivesList",academicYear.get(),FlowRouter.getParam('btsNo'))
    template.autorun(()=>{
        template.subscribe("btsObjectivesResults",academicYear.get(),FlowRouter.getParam('btsNo'))
    })
})
Template.btsObjectivesResults.helpers({
    objectives() {
        let subject_select = Template.instance().subject_select.get()
        let grade = Template.instance().grade.get()

        return BtsObjectivesList.find({
            subject: subject_select,
            grade:grade
        },{sort:{objectiveId:1}})
    },

    btsNo() {
        return FlowRouter.getParam('btsNo')
    },

    results() {
        let subject_select = new RegExp(Template.instance().subject_select.get())
        let objective_select = Template.instance().objective_select.get()
        let grade = Template.instance().grade.get()

        return BtsObjectivesResults.find({
            subject:subject_select,
            objective:objective_select,
            grade:grade

        },{sort:{objective:1,success:-1,}})
    } 
})

Template.btsObjectivesResults.events({
    "change #select"(event,template) {        
        template.subject_select.set(template.find('[name=subject_select]').value)
        template.objective_select.set(template.find('[name=objective_select]').value)
        template.grade.set(template.find('[name=grade]').value)

        let subject_select = FlowRouter.getParam('_id')
        let objective_select = FlowRouter.getParam('_id')
        let grade = FlowRouter.getParam('_id')
    }
})
