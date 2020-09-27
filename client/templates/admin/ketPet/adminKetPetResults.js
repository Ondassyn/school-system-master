import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminKetPetResults.html';
import {ReactiveDict} from 'meteor/reactive-dict'
import XLSX from 'xlsx';

Template.adminKetPetResults.onCreated(function() {
    let template = this
    Session.setDefault('Sort',{total:-1});
    document.title = "KET-PET Нәтижелер";
    template.examPeriod = new ReactiveVar('2')
    template.grade = new ReactiveVar('7')
    template.results = new ReactiveVar([])
    template.schoolId_select = new ReactiveVar("")
    template.subscribe("schools")

    template.autorun(() => {
        template.subscribe("adminKetPetResults", academicYear.get(), template.schoolId_select.get(), template.grade.get(), template.examPeriod.get())
    })

})

Template.adminKetPetResults.helpers({
  students(){
    return Students.find({},{sort:{surname:-1, division:1}})
  },
  grade7(){
      return "7" == Template.instance().grade.get()
  },

  grade8(){
      return "8" == Template.instance().grade.get()
  },

  results() {
      return KetPetResults.find({},{sort: Session.get('Sort')})
  },
  schools() {
      return Schools.find({},{sort:{schoolId:1}})
  },
});

var sortTotal = -1;
var sortLevel = -1;
var sortReadingAndWriting = -1;
var sortWritingTask9 = -1;
var sortReading = -1;
var sortWritingPart1 = -1;
var sortWritingPart2 = -1;
var sortWritingPart3 = -1;
var sortListening = -1;
var sortSpeaking = -1;


Template.adminKetPetResults.events({

  "change #select"(event,template) {
      template.schoolId_select.set(template.find('[name=schoolId_select]').value)
      let schoolId_select = FlowRouter.getParam('_id')
  },

  'change #gradeSelect'(event,template) {
      template.grade.set(event.target.value)
  },
  'change #examPeriod'(event,template) {
      template.examPeriod.set(event.target.value)
  },

  "click #export"(event,template) {
    const html = document.getElementById('out').innerHTML;

    var resultStore = KetPetResults.find({},{sort: Session.get('Sort')}).fetch()

    var data = [];
    var curGrade = resultStore[0].grade;
    let okuJyly = academicYear.get();



    let mektepAty  = Schools.findOne({schoolId: template.schoolId_select.get()}) ? Schools.findOne({schoolId: template.schoolId_select.get()}).shortName : undefined;
    schoolInfo = ["Мектеп аты", mektepAty];
    data.push(schoolInfo);

    if(curGrade == '7'){
      headers = ["#", "Оқу жылы","Оқушы ID", "Сынып", "Аты Жөні", "Жалпы", "Level", "Reading And Writing",
      "Writing task 9", "Listening", "Speaking"];

      data.push(headers);

        for(var i = 0; i < resultStore.length; i++){
          let idN = i+1;
          let studentInfo = resultStore[i].surname+" "+resultStore[i].name.trim();
          let classN = resultStore[i].grade+" "+resultStore[i].division;
          let studentId = resultStore[i].studentId;
          let total = resultStore[i].total;

          let level = resultStore[i].level;
          let ReadingAndWriting = resultStore[i].ReadingAndWriting;
          let WritingTask9 = resultStore[i].WritingTask9;
          let Listening = resultStore[i].Listening;
          let Speaking = resultStore[i].Speaking;

          let content = [idN, okuJyly, studentId, classN, studentInfo, total, level, ReadingAndWriting,
            WritingTask9, Listening, Speaking];

          data.push(content);
        }

    }else if (curGrade == '8') {
      headers = ["#", "Оқу жылы","Оқушы ID", "Сынып", "Аты Жөні","Жалпы", "Level", "Reading", "Writing Part 1",
        "Writing Part 2", "Writing Part 3", "Listening", "Speaking"];

        data.push(headers);

        for(var i = 0; i < resultStore.length; i++){
          let idN = i+1;
          let studentInfo = resultStore[i].surname+" "+resultStore[i].name.trim();
          let classN = resultStore[i].grade+" "+resultStore[i].division;
          let studentId = resultStore[i].studentId;
          let total = resultStore[i].total;
          let level = resultStore[i].level;

          let Reading = resultStore[i].Reading;
          let WritingPart1 = resultStore[i].WritingPart1;
          let WritingPart2 = resultStore[i].WritingPart2;
          let WritingPart3 = resultStore[i].WritingPart3;

          let Listening = resultStore[i].Listening;
          let Speaking = resultStore[i].Speaking;

          let content = [idN, okuJyly, studentId, classN, studentInfo, total, level, Reading,
            WritingPart1, WritingPart2, WritingPart3,Listening, Speaking];

          data.push(content);

        }

    }

    Meteor.call('download', data, (err, wb) => {
      if (err) throw err;

      let sName = 'KET-PET results '+template.grade.get()+'сынып, '+template.examPeriod.get()+' токсан '+okuJyly+'.xlsx';
      XLSX.writeFile(wb, sName);
    });

  },

  'click #sortTotal'(event,template) {
      sortTotal *= (-1)
      Session.set('Sort',{total:sortTotal});
  },
  'click #sortLevel'(event,template) {
      sortLevel *= (-1)
      Session.set('Sort',{level:sortLevel});
  },
  'click #sortReadingAndWriting'(event,template) {
      sortReadingAndWriting *= (-1)
      Session.set('Sort',{ReadingAndWriting:sortReadingAndWriting});
  },
  'click #sortWritingTask9'(event,template) {

      sortWritingTask9 *= (-1)
      Session.set('Sort',{WritingTask9:sortWritingTask9});
  },
  'click #sortReading'(event,template) {

      sortReading *= (-1)
      Session.set('Sort',{Reading:sortReading});
  },
  'click #sortWritingPart1'(event,template) {

      sortWritingPart1 *= (-1)
      Session.set('Sort',{sortWritingPart1:sortWritingPart1});
  },
  'click #sortWritingPart2'(event,template) {

      sortWritingPart2 *= (-1)
      Session.set('Sort',{sortWritingPart2:sortWritingPart2});
  },
  'click #sortWritingPart3'(event,template) {

      sortWritingPart3 *= (-1)
      Session.set('Sort',{sortWritingPart3:sortWritingPart3});
  },
  'click #sortListening'(event,template) {

      sortListening *= (-1)
      Session.set('Sort',{Listening:sortListening});
  },
  'click #sortSpeaking'(event,template) {

      sortSpeaking *= (-1)
      Session.set('Sort',{Speaking:sortSpeaking});
  },
})

Template.adminKetPetResults.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
