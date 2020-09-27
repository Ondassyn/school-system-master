import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './olympiadAllRegionJuniorResults.html';

Template.olympiadAllRegionJuniorResults.onCreated(function() {
    let template = this
    template.subject = new ReactiveVar("")
    template.medal_select = new ReactiveVar("")
    template.attendedFor = new ReactiveVar("")
    template.passed = new ReactiveVar("")
    template.schoolId_select = new ReactiveVar("")
    
    template.subscribe('schools')
    template.subscribe('subjects')
    template.subscribe('olympiads')
    template.autorun(()=>{
        template.subscribe("olympiadAllResults",academicYear.get())
    })
})

Template.olympiadAllRegionJuniorResults.helpers({
    schools()  {
        return Schools.find({},{sort:{schoolId:1}})
    },
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    olympiads(){
        return Olympiads.find()
    },
    results() {
        let subject = new RegExp(Template.instance().subject.get())
        let medal_select = new RegExp(Template.instance().medal_select.get())
        let attendedFor = new RegExp(Template.instance().attendedFor.get())
        let passed = new RegExp(Template.instance().passed.get())
        let schoolId_select = new RegExp(Template.instance().schoolId_select.get())
        
        return OlympiadResults.find({
            schoolId: schoolId_select,
            olympiadType:'science',
            attendedFor: attendedFor,
            subjectId:subject,
            olympiadRegion:'regionalJunior',
            medal:medal_select,
            passed:passed
        },{sort:{schoolId:1, passed:-1, subjectId:1, attendedFor:1, medal:1, absolutePlace:1}
        })
    },
})

Template.olympiadAllRegionJuniorResults.events({
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

