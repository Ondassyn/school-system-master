import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './ketPet10Results.html';
import {ReactiveDict} from 'meteor/reactive-dict'
import XLSX from 'xlsx';

Template.ketPet10Results.onCreated(function() {
    let template = this
    document.title = "KET-PET TOP-10";
    template.examPeriod = new ReactiveVar('2')
    template.grade = new ReactiveVar('7')
    template.results = new ReactiveVar([])
    template.subscribe("schools")

    template.autorun(() => {
        template.subscribe("ketPet10Results", academicYear.get(), template.grade.get(), template.examPeriod.get())
    })

    Session.setDefault('Sort',{total:-1});
})

var sortTotal = -1;
var sortLevel = 1;
var sortReadingAndWriting = 1;
var sortWritingTask9 = 1;
var sortReading = -1;
var sortWritingPart1 = 1;
var sortWritingPart2 = 1;
var sortWritingPart3 = 1;
var sortListening = 1;
var sortSpeaking = 1;

Template.ketPet10Results.helpers({
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
      return KetPetResults.find({})
      // return KetPetResults.find({},{sort: {total: -1}, limit: 10})
  },
  schools() {
      return Schools.find({},{sort:{schoolId:1}})
  },
});

Template.ketPet10Results.events({

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

  'click #dnload' () {
      const html = document.getElementById('out').innerHTML;

      var data = [];
      var headers = ['report_name',	'math', 'physics', 'chemistry', 'biology', 'english', 'geography', 'kazakh_history',
      'informatic', 'kazakh_lang', 'turkish_lang', 'russian_lang', 'huhuk'];
      var reportNameList = ['Мұғалім түсіндірген сабақ сағаты',
                            'Басқа мұғалім түсіндірген сабақ сағаты',
                            'Жасалған емтихан саны',
                            'Мұғалім мотивация программ сағаты',
                            'Мұғалімнің кандидат саны(10 сынып)',
                            'Мұғалімнің кандидат саны(11 сынып)',
                            'Жалпы Олимпиадчик оқушы саны',
                            'Область дәрежесіне жеткен оқушы саны',
                            'Республика дәрежесіне жеткен оқушы саны',
                            'Дүние дәрежесіне жеткен оқушы саны',
                            'Әкімшіліктің мотивация программ сағаты',
                            'Олимпиада мұғалімдерімен жиналыс сағаты']

      data.push(headers);

      reportNameList.forEach(reportName =>{
        let content = [reportName];
        data.push(content);
      });

      Meteor.call('download', data, (err, wb) => {
        if (err) throw err;

        let sName = 'ope_report.xlsx';
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

Template.ketPet10Results.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
