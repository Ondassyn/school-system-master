import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './olympiadsRating.html';

Template.olympiadsRating.onCreated(function() {
    let template = this
    Session.setDefault('Sort',{regTotalOlymp:-1});
    template.subject = new ReactiveVar("all")
    template.grade = new ReactiveVar("all")
    template.schoolId_select = new ReactiveVar("")

    template.subscribe('schools')
    template.subscribe('subjects')
    template.subscribe('olympiads')
    template.autorun(()=>{
        template.subscribe("olympiadRatings",academicYear.get())
    })
})

Template.olympiadsRating.helpers({
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
        let grade = new RegExp(Template.instance().grade.get())
        let schoolId_select = new RegExp(Template.instance().schoolId_select.get())

        return OlympiadRatings.find({
            schoolId: schoolId_select,
            subjectId: subject,
            grade: grade
        },{sort: Session.get('Sort')}
        )
    },
})

Template.olympiadsRating.events({
    "change #select"(event,template) {
        template.subject.set(template.find('[name=subject]').value)
        template.grade.set(template.find('[name=grade]').value)
        template.schoolId_select.set(template.find('[name=schoolId_select]').value)

        let subject = FlowRouter.getParam('_id')
        let grade = FlowRouter.getParam('_id')
        let schoolId_select = FlowRouter.getParam('_id')
    },
    "click #calculateOlympiad" (event,template) {
        event.preventDefault()
        if (confirm('Олимпиада нәтижелерін санағыңыз келеді ма?')) {

            SUIBlock.block('Саналуда...');
            Meteor.call("calculateOlympiadRating", academicYear.get(), function (err) {
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
        Session.set('Sort',{regGoldOlymp:-1});
    },
    'click #sortRegionSilver'(event,template) {
        Session.set('Sort',{regSilverOlymp:-1});
    },
    'click #sortRegionBronze'(event,template) {
        Session.set('Sort',{regBronzeOlymp:-1});
    },
    'click #sortRegionTotal'(event,template) {
        Session.set('Sort',{regTotalOlymp:-1});
    },
    'click #sortRegionJuniorGold'(event,template) {
        Session.set('Sort',{regJunGoldOlymp:-1});
    },
    'click #sortRegionJuniorSilver'(event,template) {
        Session.set('Sort',{regJunSilverOlymp:-1});
    },
    'click #sortRegionJuniorBronze'(event,template) {
        Session.set('Sort',{regJunBronzeOlymp:-1});
    },
    'click #sortRegionJuniorTotal'(event,template) {
        Session.set('Sort',{regJunTotalOlymp:-1});
    },
    'click #sortNatGold'(event,template) {
        Session.set('Sort',{natGoldOlymp:-1});
    },
    'click #sortNatSilver'(event,template) {
        Session.set('Sort',{natSilverOlymp:-1});
    },
    'click #sortNatBronze'(event,template) {
        Session.set('Sort',{natBronzeOlymp:-1});
    },
    'click #sortNatTotal'(event,template) {
        Session.set('Sort',{natTotalOlymp:-1});
    },
    'click #sortNatJuniorGold'(event,template) {
        Session.set('Sort',{natJunGoldOlymp:-1});
    },
    'click #sortNatJuniorSilver'(event,template) {
        Session.set('Sort',{natJunSilverOlymp:-1});
    },
    'click #sortNatJuniorBronze'(event,template) {
        Session.set('Sort',{natJunBronzeOlymp:-1});
    },
    'click #sortNatJuniorTotal'(event,template) {
        Session.set('Sort',{natJunTotalOlymp:-1});
    },
})
