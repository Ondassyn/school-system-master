import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './turkishRating.html';
Template.turkishRating.onCreated(function(){
    let template = this
    Session.setDefault('Sort',{total:-1});

    template.grade = new ReactiveVar("all")
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("turkishRating",academicYear.get(),template.grade.get())
    })
})

Template.turkishRating.helpers({
    examNo() {
        return FlowRouter.getParam("examNo")
    },
    results() {
        return TurkishRatings.find({},{sort: Session.get('Sort')});
    }
})

Template.turkishRating.events({
    "change #select"(event,template) {
        template.grade.set(template.find('[name=grade]').value)

        let grade = FlowRouter.getParam('_id')
    },
    'click #sortTurkish'(event,template) {
        Session.set('Sort',{turkish:-1});
    },
    'click #sortTotal'(event,template) {
        Session.set('Sort',{total:-1});
    },
})
