import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './jobaRating.html';

Template.jobaRating.onCreated(function() {
    let template = this
    Session.setDefault('Sort',{regTotalJoba:-1});
    template.subject = new ReactiveVar("all")
    template.grade = new ReactiveVar("all")
    template.schoolId_select = new ReactiveVar("")
    
    template.subscribe('schools')
    template.subscribe('subjects')
    template.subscribe('joba')
    template.autorun(()=>{
        template.subscribe("jobaRatings",academicYear.get())
    })
})

Template.jobaRating.helpers({
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
        let grade = new RegExp(Template.instance().grade.get())
        let schoolId_select = new RegExp(Template.instance().schoolId_select.get())
        
        return JobaRatings.find({
            schoolId: schoolId_select,
            subjectId: subject,
            grade: grade
        },{sort: Session.get('Sort')}
        )
    },
})

Template.jobaRating.events({
    "change #select"(event,template) {
        template.subject.set(template.find('[name=subject]').value)
        template.grade.set(template.find('[name=grade]').value)
        template.schoolId_select.set(template.find('[name=schoolId_select]').value)

        let subject = FlowRouter.getParam('_id')
        let grade = FlowRouter.getParam('_id')
        let schoolId_select = FlowRouter.getParam('_id')
    },
    "click #calculateJoba" (event,template) {
        event.preventDefault()
        if (confirm('Жоба нәтижелерін санағыңыз келеді ма?')) {

            SUIBlock.block('Саналуда...');
            Meteor.call("calculateJobaRating", academicYear.get(), function (err) {
                if (err) {
                    alert(err.reason)
                    SUIBlock.unblock();
                } else {
                    SUIBlock.unblock();
                    alert("Санау аяқталды")
                }
            })
        }
    },
    'click #sortRegionGold'(event,template) {
        Session.set('Sort',{regGoldJoba:-1});
    },
    'click #sortRegionSilver'(event,template) {
        Session.set('Sort',{regSilverJoba:-1});
    },
    'click #sortRegionBronze'(event,template) {
        Session.set('Sort',{regBronzeJoba:-1});
    },
    'click #sortRegionTotal'(event,template) {
        Session.set('Sort',{regTotalJoba:-1});
    },
    'click #sortNatGold'(event,template) {
        Session.set('Sort',{natGoldJoba:-1});
    },
    'click #sortNatSilver'(event,template) {
        Session.set('Sort',{natSilverJoba:-1});
    },
    'click #sortNatBronze'(event,template) {
        Session.set('Sort',{natBronzeJoba:-1});
    },
    'click #sortNatTotal'(event,template) {
        Session.set('Sort',{natTotalJoba:-1});
    },
    'click #sortInterGold'(event,template) {
        Session.set('Sort',{interGoldJoba:-1});
    },
    'click #sortInterSilver'(event,template) {
        Session.set('Sort',{interSilverJoba:-1});
    },
    'click #sortInterBronze'(event,template) {
        Session.set('Sort',{interBronzeJoba:-1});
    },
    'click #sortInterTotal'(event,template) {
        Session.set('Sort',{interTotalJoba:-1});
    },
})

