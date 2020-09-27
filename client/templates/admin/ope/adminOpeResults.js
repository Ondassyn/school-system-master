import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminOpeResults.html';
import {ReactiveDict} from 'meteor/reactive-dict'

Template.adminOpeResults.onCreated(function() {
    let template = this
    document.title = "OPE Нәтижелері";
    template.subjectId = new ReactiveVar('01')
    template.grade = new ReactiveVar('7')

    template.subscribe('schools');

    template.autorun(() => {
        template.subscribe("adminOpeResults", template.subjectId.get(), template.grade.get())
    })
})

Template.adminOpeResults.helpers({
  opeList(){
    return OpeResults.find()
  }
});

Template.adminOpeResults.events({
    'change #subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    },
    'change #grade'(event,template) {
        template.grade.set(event.target.value)
    },
})

Template.adminOpeResults.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
