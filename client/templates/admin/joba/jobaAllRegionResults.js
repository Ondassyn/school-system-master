import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './jobaAllRegionResults.html';

Template.jobaAllRegionResults.onCreated(function() {
    let template = this
    template.subject = new ReactiveVar("")
    template.medal_select = new ReactiveVar("")
    template.attendedFor = new ReactiveVar("")
    template.passed = new ReactiveVar("")
    template.schoolId_select = new ReactiveVar("")
    
    template.subscribe('schools')
    template.subscribe('subjects')
    template.subscribe('joba')
    template.autorun(()=>{
        template.subscribe("jobaAllResults",academicYear.get())
    })
})

Template.jobaAllRegionResults.helpers({
    schools()  {
        return Schools.find({},{sort:{schoolId:1}})
    },
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    joba(){
        return Joba.find()
    },
    results() {
        let subject = new RegExp(Template.instance().subject.get())
        let medal_select = new RegExp(Template.instance().medal_select.get())
        let attendedFor = new RegExp(Template.instance().attendedFor.get())
        let passed = new RegExp(Template.instance().passed.get())
        let schoolId_select = new RegExp(Template.instance().schoolId_select.get())
        
        return jobaResults.find({
            schoolId: schoolId_select,
            jobaType:'science',
            attendedFor: attendedFor,
            subjectId:subject,
            jobaRegion:'regional',
            medal:medal_select,
            passed:passed
        },{sort:{schoolId:1, passed:-1, subjectId:1, attendedFor:1, medal:1, absolutePlace:1}
        })
    },
})

Template.jobaAllRegionResults.events({
    "change #select"(event,template) {
        template.subject.set(template.find('[name=subject]').value)
        template.medal_select.set(template.find('[name=medal_select]').value)
        template.attendedFor.set(template.find('[name=attendedFor]').value)
        template.passed.set(template.find('[name=passed]').value)
        template.schoolId_select.set(template.find('[name=schoolId_select]').value)


        let subject = FlowRouter.getParam('_id')
        let schoolId_select = FlowRouter.getParam('_id')
        let medal_select = FlowRouter.getParam('_id')
        let attendedFor = FlowRouter.getParam('_id')
        let passed = FlowRouter.getParam('_id')
    }
})

