import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsObjectivesGeneralRating.html';
Template.btsObjectivesGeneralRating.onCreated(function(){
    let template = this
    template.subject_select = new ReactiveVar ('algebra')
    template.objective_select = new ReactiveVar()

    template.subscribe("btsObjectivesList",academicYear.get(),FlowRouter.getParam('btsNo'))
    template.subscribe("schools")
    template.subscribe('subjects')
    template.autorun(()=>{
        template.subscribe("btsObjectivesRatings",academicYear.get(),FlowRouter.getParam('btsNo'),FlowRouter.getParam('grade'))
    })
})
Template.btsObjectivesGeneralRating.helpers({
    
    objective() {
        let subject_select = Template.instance().subject_select.get()

        return BtsObjectivesList.find({
            subject: subject_select,
            grade: FlowRouter.getParam('grade')
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
        
        let subject_select = new RegExp(Template.instance().subject_select.get())
        let objective_select = Template.instance().objective_select.get()

        return BtsObjectivesRatings.find({
            subject:subject_select,
            objectiveId:objective_select,

        },{sort:{objective:1,success:-1,}})
    }
})

Template.btsObjectivesGeneralRating.events({
    
    "change #select"(event,template) {
        
        template.subject_select.set(template.find('[name=subject_select]').value)
        template.objective_select.set(template.find('[name=objective_select]').value)
        //template.grade.set(template.find('[name=grade]').value)

        let subject_select = FlowRouter.getParam('_id')
        let objective_select = FlowRouter.getParam('_id')
        //let grade = FlowRouter.getParam('_id')
    }
})
