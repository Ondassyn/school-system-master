import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './kboStudentResults.html';

Template.kboStudentResults.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar('7')
    template.subjectId = new ReactiveVar('01')
    template.subscribe('subjects')
    template.autorun(()=>{
        template.subscribe('kboStudentResults',academicYear.get(),FlowRouter.getParam('kboNo'))
    })

})

Template.kboStudentResults.helpers({
    kboNo() {
        return FlowRouter.getParam('kboNo')
    },
    results() {
        return KboResults.find({},{sort:{subjectId:1,result:-1}})
    }
})

Template.kboStudentResults.events({
    
})
