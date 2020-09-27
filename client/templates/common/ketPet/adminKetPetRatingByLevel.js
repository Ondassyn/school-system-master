import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminKetPetRatingByLevel.html';
import {ReactiveDict} from 'meteor/reactive-dict'
import XLSX from 'xlsx';

Template.adminKetPetRatingByLevel.onCreated(function() {
    let template = this
    document.title = "KET-PET Деңгей бойынша бағалау";
    template.examPeriod = new ReactiveVar('2')
    template.grade = new ReactiveVar('7')
    template.results = new ReactiveVar([])
    template.schoolId_select = new ReactiveVar("")
    template.subscribe("schools")

    template.autorun(() => {
        template.subscribe("ketPetRatings", academicYear.get(), template.examPeriod.get())
    })

    Session.set('Sort',{grade7Fail:-1, grade8Fail:-1});
})

var schoolArray2 = [];
Template.adminKetPetRatingByLevel.helpers({
  grade7(){
      return "7" == Template.instance().grade.get()
  },

  grade8(){
      return "8" == Template.instance().grade.get()
  },

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

      return KetPetRatings.find({},{sort: Session.get('Sort')})
  },
  schools() {
      return Schools.find({},{sort:{schoolId:1}})
  },
  schoolNotUploaded(){
    return schoolArray2;
  },
});

var sortFail7 = -1;
var sortA1 = -1;
var sortPass_A2 = -1;
var sortMerit_A2 = -1;
var sortDistinction_B1 = -1;

var sortFail8 = -1;
var sortA2 = -1;
var sortPass_B1 = -1;
var sortMerit_B1 = -1;
var sortDistinction_B2 = -1;


Template.adminKetPetRatingByLevel.events({

  "change #select"(event,template) {
      template.schoolId_select.set(template.find('[name=schoolId_select]').value)
      let schoolId_select = FlowRouter.getParam('_id')
  },
  "change #gradeSelect"(event,template) {
      template.grade.set(event.target.value)
  },
  "change #examPeriod"(event,template) {
      template.examPeriod.set(event.target.value)
  },

  "click #export"(event,template) {
    const html = document.getElementById('out').innerHTML;

    var data = [];
    let okuJyly = academicYear.get();

    var resultStore = KetPetRatings.find({},{sort: Session.get('Sort')}).fetch()
    if(template.grade.get() == '7'){

      headers = ["#", "Оқу жылы", "Тоқсан", "Мектеп ID", "Мектеп аты",
      "Fail", "A1", "Pass(A2)", "Pass with Merit(A2)", "Pass with Distinction(B1)"];

      data.push(headers);

      for(var i = 0; i < resultStore.length; i++){
        let idN = i+1;
        let examPeriod = resultStore[i].examPeriod;
        let schoolId = resultStore[i].schoolId;
        let mektepAty  = Schools.findOne({schoolId: resultStore[i].schoolId}) ? Schools.findOne({schoolId: resultStore[i].schoolId}).shortName : undefined;

        let grade7Fail = resultStore[i].grade7Fail;
        let grade7A1 = resultStore[i].grade7A1;
        let grade7PassA2 = resultStore[i].grade7PassA2;
        let grade7MeritA2 = resultStore[i].grade7MeritA2;
        let grade7DistB1 = resultStore[i].grade7DistB1;

        let content = [idN, okuJyly, examPeriod, schoolId, mektepAty,
          grade7Fail, grade7A1, grade7PassA2, grade7MeritA2, grade7DistB1];

        data.push(content);
      }

    }else{

      headers = ["#", "Оқу жылы", "Тоқсан", "Мектеп ID", "Мектеп аты",
      "Fail", "A2", "Pass(B1)", "Pass with Merit(B1)", "Pass with Distinction(B2)"];

      data.push(headers);

      for(var i = 0; i < resultStore.length; i++){
        let idN = i+1;
        let examPeriod = resultStore[i].examPeriod;
        let schoolId = resultStore[i].schoolId;
        let mektepAty  = Schools.findOne({schoolId: resultStore[i].schoolId}) ? Schools.findOne({schoolId: resultStore[i].schoolId}).shortName : undefined;

        let grade8Fail = resultStore[i].grade8Fail;
        let grade8A2 = resultStore[i].grade8A2;
        let grade8PassB1 = resultStore[i].grade8PassB1;
        let grade8MeritB1 = resultStore[i].grade8MeritB1;
        let grade8DistB2 = resultStore[i].grade8DistB2;

        let content = [idN, okuJyly, examPeriod, schoolId, mektepAty,
          grade8Fail, grade8A2, grade8PassB1, grade8MeritB1, grade8DistB2];

        data.push(content);
      }
    }

    Meteor.call('download', data, (err, wb) => {
      if (err) throw err;

      let sName = 'KET-PET rating by level '+template.examPeriod.get()+' токсан '+template.grade.get()+' сынып.xlsx';
      XLSX.writeFile(wb, sName);
    });
  },

  'click #sortFail7'(event,template) {
      sortFail7 *= (-1)
      Session.set('Sort',{grade7Fail:sortFail7});
  },
  'click #sortA1'(event,template) {
      sortA1 *= (-1)
      Session.set('Sort',{grade7A1:sortA1});
  },
  'click #sortPass_A2'(event,template) {
      sortPass_A2 *= (-1)
      Session.set('Sort',{grade7PassA2:sortPass_A2});
  },
  'click #sortMerit_A2'(event,template) {

      sortMerit_A2 *= (-1)
      Session.set('Sort',{grade7MeritA2:sortMerit_A2});
  },
  'click #sortDistinction_B1'(event,template) {

      sortDistinction_B1 *= (-1)
      Session.set('Sort',{grade7DistB1:sortDistinction_B1});
  },
  'click #sortFail8'(event,template) {
      sortFail8 *= (-1)
      Session.set('Sort',{grade8Fail:sortFail8});
  },
  'click #sortA2'(event,template) {
      sortA2 *= (-1)
      Session.set('Sort',{grade8A2:sortA2});
  },
  'click #sortPass_B1'(event,template) {
      sortPass_B1 *= (-1)
      Session.set('Sort',{grade8PassB1:sortPass_B1});
  },
  'click #sortMerit_B1'(event,template) {
      sortMerit_B1 *= (-1)
      Session.set('Sort',{grade8MeritB1:sortMerit_B1});
  },
  'click #sortDistinction_B2'(event,template) {
      sortDistinction_B2 *= (-1)
      Session.set('Sort',{grade8DistB2:sortDistinction_B2});
  },
})

Template.adminKetPetRatingByLevel.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
