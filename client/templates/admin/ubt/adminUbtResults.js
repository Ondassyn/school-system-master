import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminUbtResults.html';
import {ReactiveDict} from 'meteor/reactive-dict'
import XLSX from 'xlsx';

Template.adminUbtResults.onCreated(function() {
    let template = this
    Session.setDefault('Sort',{total:-1});
    document.title = "ҰБТ Нәтижелер";
    template.schoolId_select = new ReactiveVar("")
    template.subscribe("schools")

    template.autorun(() => {
        template.subscribe("ubtAdminResults", academicYear.get(), template.schoolId_select.get())
    })

})

Template.adminUbtResults.helpers({
  results() {
      return UhdResults.find({},{sort: Session.get('Sort')})
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


Template.adminUbtResults.events({

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

    var resultStore = UhdResults.findOne({},{sort:{total:-1}});

    var row = new Array();
    var data = new Array();

    var i = 0;
    for (var key in resultStore) {
        row[i] = key;
        i += 1;
    }

    data.push(row);

    var ubtArray = UhdResults.find({},{sort:{total:-1}}).fetch();

    for(var i = 0; i < ubtArray.length; i++){
      let array = [];
      let values = Object.values(ubtArray[i]);
      Array.prototype.push.apply(array, values);
      data.push(array);
    }

    var id0 = 0;
    var id2 = 2;

    for(var i = 0 ; i < data.length ; i++)
    {
       data[i].splice(id0,1);
       data[i].splice(id2,1);
    }

    let year = academicYear.get();
    let schoolName = Schools.findOne({schoolId:template.schoolId_select.get()}).secondaryName;
    console.log(schoolName);

    Meteor.call('download', data, (err, wb) => {
      if (err) throw err;

      let sName = 'Ubt results '+schoolName+'.xlsx';
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

Template.adminUbtResults.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
