import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import './ketPetResults.html';
import XLSX from 'xlsx';

Template.ketPetResults.onCreated(function(){
    let template = this
    Session.setDefault('Sort',{total:-1});
    document.title = "KET-PET Нәтижелері";
    template.state = new ReactiveVar("results")
    template.grade = new ReactiveVar('7')
    template.examPeriod = new ReactiveVar('2')

    template.autorun(()=>{
        template.subscribe("ketPetResults", academicYear.get(), template.grade.get(), template.examPeriod.get())
    })
})


Template.ketPetResults.helpers({
    results() {
        return KetPetResults.find({},{sort: Session.get('Sort')})
    },

    grade7(){
        return "7" == Template.instance().grade.get()
    },

    grade8(){
        return "8" == Template.instance().grade.get()
    }
})

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

Template.ketPetResults.events({

    'change #select'(event,template) {
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

        let sName = 'KET-PET results grade '+template.grade.get()+'сынып, токсан '+template.examPeriod.get()+' '+okuJyly+'.xlsx';
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

      // var data = [
      //   ["studentId", "grade" , "surname", "name","ubt1","ubt2","ubt3","ubt4","ubt5","ubt6","ubt7","ubt8","ubt9","ubt10"],
      //   [ "007" ,"11A", "Kanatov" , name, html, 60, 70, 80, 90, 100, 110, 120, 130, 140 ]
      // ];

// 0: (14) ["studentId", "grade", "surname", "name", "ubt1", "ubt2", "ubt3", "ubt4", "ubt5", "ubt6", "ubt7", "ubt8", "ubt9", "ubt10"]
// 1: (14) ["007", "11A", "Kanatov", "Vasya", "50", 60, 70, 80, 90, 100, 110, 120, 130, 140]
// length: 2

// 0: (42) ["_id", "academicYear", "studentId", "schoolId", "name", "surname", "grade", "total", "ubt1", "ubt2", "ubt3", "ubt4", "ubt5", "ubt6", "ubt7", "ubt8", "ubt9", "ubt10", "ubt11", "ubt12", "ubt13", "ubt14", "ubt15", "ubt16", "ubt17", "ubt18", "ubt19", "ubt20", "ubt21", "ubt22", "ubt23", "ubt24", "ubt25", "ubt26", "ubt27", "ubt28", "ubt29", "ubt30", "ubt31", "ubt32", "ubt33", "ubt34"]
