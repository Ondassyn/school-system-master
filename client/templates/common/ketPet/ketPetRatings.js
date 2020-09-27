
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './ketPetRatings.html';
import {ReactiveDict} from 'meteor/reactive-dict'
import XLSX from 'xlsx';

Template.ketPetRatings.onCreated(function() {
    let template = this
    document.title = "KET-PET Рейтинг";
    template.examPeriod = new ReactiveVar('2')
    // template.subscribe('ketPetRating');
    template.subscribe('schools')
    Session.setDefault('Sort',{total:-1});

    template.autorun(() => {
        template.subscribe("ketPetRatings", academicYear.get(), template.examPeriod.get())
    })

})

var schoolArray2 = [];
Template.ketPetRatings.helpers({
  results() {

      var schoolStore = new Map();
      var schoolArray = [];

      let schools = Schools.find().fetch()
      let cursorKboRatings = KetPetRatings.find({},{sort: Session.get('Sort')}).fetch()

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

      return KetPetRatings.find({},{sort: {total:-1}})
  },
  schools() {
      return Schools.find({},{sort:{schoolId:1}})
  },
  schoolNotUploaded(){
    return schoolArray2;
  },
});

Template.ketPetRatings.events({
  'change #examPeriod'(event,template) {
      template.examPeriod.set(event.target.value)
  },
  "click #export"(event,template) {
    const html = document.getElementById('out').innerHTML;

    var data = [];
    let okuJyly = academicYear.get();

    headers = ["#", "Оқу жылы", "Тоқсан", "Мектеп ID", "Мектеп аты", "KET (7 сынып) Орта балл", "Average level KET ", "PET (8 сынып) Орта балл",
    "Average level PET", "Жалпы"];

    data.push(headers);
    var resultStore = KetPetRatings.find({},{sort: {total:-1}}).fetch()

    for(var i = 0; i < resultStore.length; i++){
      let idN = i+1;
      let examPeriod = resultStore[i].examPeriod;
      let schoolId = resultStore[i].schoolId;
      let mektepAty  = Schools.findOne({schoolId: resultStore[i].schoolId}) ? Schools.findOne({schoolId: resultStore[i].schoolId}).shortName : undefined;

      let total7Grade = resultStore[i].total7Grade;
      let total7Level = resultStore[i].total7Level;
      let total8Grade = resultStore[i].total8Grade;
      let total8Level = resultStore[i].total8Level;
      let total = resultStore[i].total;

      let content = [idN, okuJyly, examPeriod, schoolId, mektepAty, total7Grade, total7Level, total8Grade, total8Level, total];

      data.push(content);
    }

    Meteor.call('download', data, (err, wb) => {
      if (err) throw err;

      let sName = 'KET-PET rating '+template.examPeriod.get()+'токсан '+okuJyly+'.xlsx';
      XLSX.writeFile(wb, sName);
    });
  },

  'click #sortTotal'(event,template) {
      Session.set('Sort',{total:-1});
  },
  'click #reportType1'(event,template) {
      Session.set('Sort',{reportType1:-1});
  },

})

Template.ketPetRatings.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
