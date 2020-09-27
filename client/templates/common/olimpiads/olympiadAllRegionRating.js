import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './olympiadAllRegionRating.html';

Template.olympiadAllRegionRating.onCreated(function() {
    let template = this
    Session.setDefault('Sort',{totalPoint:-1});
    template.subject = new ReactiveVar("all")
    document.title = "Облыстық олимпиада рейтинг";
    template.subscribe('schools')
    template.subscribe('subjects')
    // template.subscribe('olympiads')
    template.autorun(()=>{
        template.subscribe("olympiadRatings",academicYear.get())
    })
})

var schoolArray2 = [];
var totalOfMedals = 0;
var totalGold = 0;
var totalSilver = 0;
var totalBronze = 0;

Template.olympiadAllRegionRating.helpers({
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
        var schoolStore = new Map();
        var schoolArray = [];

        let schools = Schools.find().fetch()
        let cursorKboRatings = OlympiadRatings.find({grade: "all", subjectId: "all"}).fetch()

        schools.forEach(school =>{
          schoolStore.set(school.schoolId, school.shortName);
        });
        for(var i = 0; i < cursorKboRatings.length; i++){
            schoolStore.delete(cursorKboRatings[i].schoolId);
        }

        for (const [key, value] of schoolStore.entries()) {
          schoolArray.push(value)
        }

        schoolArray2 = schoolArray;

        let subject = new RegExp(Template.instance().subject.get())

        return OlympiadRatings.find({grade: "all", subjectId: subject,  regTotalOlymp: { $gt:0 } },{sort: Session.get('Sort')})
    },

    totalOfMedals(){
      totalOfMedals = 0;
      totalGold = 0;
      totalSilver = 0;
      totalBronze = 0;

      let subject = new RegExp(Template.instance().subject.get())
      var olympiadRatings = OlympiadRatings.find({grade: "all", subjectId: subject},{sort: Session.get('Sort')}).fetch()
      console.log(olympiadRatings);

      olympiadRatings.forEach(rating =>{
        totalOfMedals += rating.regTotalOlymp;
        totalGold += rating.regGoldOlymp;
        totalSilver += rating.regSilverOlymp;
        totalBronze += rating.regBronzeOlymp;
      });
      console.log(totalGold);

      return totalOfMedals;
    },
    totalGold(){
      totalGold = 0;

      let subject = new RegExp(Template.instance().subject.get())
      var olympiadRatings = OlympiadRatings.find({grade: "all", subjectId: subject},{sort: Session.get('Sort')}).fetch()

      olympiadRatings.forEach(rating =>{
        totalGold += rating.regGoldOlymp;
      });
      return totalGold;
    },
    totalSilver(){
      totalSilver = 0;

      let subject = new RegExp(Template.instance().subject.get())
      var olympiadRatings = OlympiadRatings.find({grade: "all", subjectId: subject},{sort: Session.get('Sort')}).fetch()

      olympiadRatings.forEach(rating =>{
        totalSilver += rating.regSilverOlymp;
      });
      return totalSilver;
    },
    totalBronze(){
      totalBronze = 0;

      let subject = new RegExp(Template.instance().subject.get())
      var olympiadRatings = OlympiadRatings.find({grade: "all", subjectId: subject},{sort: Session.get('Sort')}).fetch()

      olympiadRatings.forEach(rating =>{
        totalBronze += rating.regBronzeOlymp;
      });

      return totalBronze;
    },
    schoolNotUploaded(){
      return schoolArray2;
    }
})

Template.olympiadAllRegionRating.events({
    "change #select"(event,template) {
        template.subject.set(event.target.value)
    },
    "click .collapsible"(event,template) {
        event.preventDefault()
        var content = template.find("[name = divContent]");
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
    },
    'click #totalMedal'(event,template) {
        Session.set('Sort',{regTotalOlymp:-1});
    },
    'click #goldMedal'(event,template) {
        Session.set('Sort',{regGoldOlymp:-1});
    },
    'click #silverMedal'(event,template) {
        Session.set('Sort',{regSilverOlymp:-1});
    },
    'click #bronzeMedal'(event,template) {
        Session.set('Sort',{regBronzeOlymp:-1});
    },
    'click #totalPoint'(event,template) {
        Session.set('Sort',{totalPoint:-1});
    },
})
