import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './turkishResults.html';
Template.turkishResults.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar("7")
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("turkishResults",academicYear.get(),template.grade.get())
    })
})
Template.turkishResults.helpers({
    results() {
        return TurkishResults.find({},{sort:{turkish:-1}})
    }
})

Template.turkishResults.events({
    'change .grade'(event,template) {
        template.grade.set(event.target.value)
    }
})
