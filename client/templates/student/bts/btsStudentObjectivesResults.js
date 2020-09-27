import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsStudentObjectivesResults.html';
Template.btsStudentObjectivesResults.onCreated(function(){
    let template = this
    template.subject_select = new ReactiveVar ('algebra')

    template.subscribe("subjects")
    template.autorun(()=>{
        template.subscribe("btsStudentObjectivesResults",academicYear.get(),FlowRouter.getParam('btsNo'))
    })
})
Template.btsStudentObjectivesResults.helpers({
    objectives() {
        let subject_select = Template.instance().subject_select.get()

        return BtsObjectivesList.find({
            subject: subject_select
        },{sort:{objectiveId:1}})
    },

    btsNo() {
        return FlowRouter.getParam('btsNo')
    },

    results() {
        let subject_select = new RegExp(Template.instance().subject_select.get())

        return BtsObjectivesResults.find({
            subject:subject_select,

        },{sort:{objective:1,success:-1,}})
    } 
})

Template.btsStudentObjectivesResults.events({
    "change #select"(event,template) {        
        template.subject_select.set(template.find('[name=subject_select]').value)

        let subject_select = FlowRouter.getParam('_id')
    }
})
