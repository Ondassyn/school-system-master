import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsObjectivesAllResults.html';

Template.btsObjectivesAllResults.onCreated(function(){
    let template = this
    //template.grade = new ReactiveVar('7')
    template.subject_select = new ReactiveVar ('algebra')
    template.schoolId_select = new ReactiveVar ('001')
    template.objective_select = new ReactiveVar()
    template.subscribe('subjects')
    template.subscribe("schools")
    template.subscribe("btsObjectivesList",academicYear.get(),FlowRouter.getParam('btsNo'))
    template.autorun(()=>{
        template.subscribe("btsAllObjectivesResults",academicYear.get(),FlowRouter.getParam('btsNo'),FlowRouter.getParam('grade'))
    })
})
Template.btsObjectivesAllResults.helpers({
    objectives() {
        let subject= Template.instance().subject_select.get()
        //let grade = Template.instance().grade.get()

        return BtsObjectivesList.find({
            subject: subject,
            grade:FlowRouter.getParam('grade')
        },{sort:{objectiveId:1}})
    },

    btsNo() {
        return FlowRouter.getParam('btsNo')
    },

    grade() {
        return FlowRouter.getParam('grade')
    },

    schools()  {
        return Schools.find({},{sort:{schoolId:1}})
    },

    results() {
        let schoolId_select = new RegExp(Template.instance().schoolId_select.get())
        let subject_select = new RegExp(Template.instance().subject_select.get())
        let objective_select = Template.instance().objective_select.get()

        return BtsObjectivesResults.find({
            schoolId:schoolId_select,
            subject:subject_select,
            objective:objective_select
        },{sort:{subject:1,objective:1,success:-1}})
    }
})

Template.btsObjectivesAllResults.events({
    
    "change #select"(event,template) {
        template.schoolId_select.set(template.find('[name=schoolId_select]').value)
        template.subject_select.set(template.find('[name=subject_select]').value)
        template.objective_select.set(template.find('[name=objective_select]').value)
        //template.grade.set(template.find('[name=grade]').value)

        let schoolId_select = FlowRouter.getParam('_id')
        let subject_select = FlowRouter.getParam('_id')
        let objective_select = FlowRouter.getParam('_id')
        //let grade = FlowRouter.getParam('_id')
    }
})
