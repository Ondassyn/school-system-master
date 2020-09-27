import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './olympiadAllRegionResults.html';

Template.olympiadAllRegionResults.onCreated(function() {
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

var schoolArray2 = [];
Template.olympiadAllRegionResults.helpers({
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
/*
        var schoolStore = new Map();
        var schoolExists = new Map();
        var schoolArray = [];

        let cursorKboRatings = OlympiadResults.find({olympiadType:'science', olympiadRegion:'regional'}).fetch()
        cursorKboRatings.forEach(school =>{
          schoolExists.set(school.schoolId, school.schoolId);
        });

        let schools = Schools.find().fetch()
        schools.forEach(school =>{
          schoolStore.set(school.schoolId, school.shortName);
        });

        // console.log("schoolExists");
        // console.log(schoolExists);
        //
        // console.log("schools");
        // console.log(schools);

        for(var i = 0; i < cursorKboRatings.length; i++){
            schoolStore.delete(cursorKboRatings[i].schoolId);
        }

        for (const [key, value] of schoolExists.entries()) {
          // console.log(value);
          schoolArray.push(value)
        }

        schoolArray2 = schoolArray;
        console.log(schoolArray2);
        */

        return OlympiadResults.find({
            schoolId: schoolId_select,
            olympiadType:'science',
            attendedFor: attendedFor,
            subjectId:subject,
            olympiadRegion:'regional',
            medal:medal_select,
            passed:passed
        },{sort:{schoolId:1, passed:-1, subjectId:1, attendedFor:1, medal:1, absolutePlace:1}})
    },
    schoolNotUploaded(){
      return schoolArray2;
    }
})

Template.olympiadAllRegionResults.events({
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
    },
    "click .collapsible"(event,template) {
        event.preventDefault()
        var content = template.find("[name = divContent]");
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
    }
})
