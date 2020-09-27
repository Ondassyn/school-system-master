import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './btsRatingByCount.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
Template.btsRatingByCount.onCreated(function(){
    let template = this
    Session.setDefault('Sort',{total:-1});
    document.title = "БТС Рейтинг";
    template.grade = new ReactiveVar("7")
    template.subscribe("schools")
    // template.subscribe("btsRatingAll",academicYear.get())
    template.autorun(()=>{
        template.subscribe("btsRating",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})

var schoolArray2 = [];
Template.btsRatingByCount.helpers({
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    btsNo3() {
        return FlowRouter.getParam("btsNo") == "3"
    },
    results() {

        var schoolStore = new Map();
        var schoolArray = [];

        let schools = Schools.find().fetch()
        let cursorKboRatings = BtsRatings.find({academicYear:academicYear.get()}).fetch()

        schools.forEach(school =>{
          schoolStore.set(school.schoolId, school.shortName);
        });

        for(var i = 0; i < cursorKboRatings.length; i++){
            schoolStore.delete(cursorKboRatings[i].schoolId);
        }

        schoolStore.delete("033");
        schoolStore.delete("028");
        schoolStore.delete("032");
        schoolStore.delete("041");
        schoolStore.delete("042");
        // schoolStore.delete("042");

        for (const [key, value] of schoolStore.entries()) {
          // console.log(key);
          schoolArray.push(value)
        }

        schoolArray2 = schoolArray;
        console.log(schoolArray2);

        return BtsRatings.find({},{sort: Session.get('Sort')});
    },
    schoolNotUploaded(){
      return schoolArray2;
    },
    gradeAll(){
        return "all" == Template.instance().grade.get()
    },
    grade7(){
        return "7" == Template.instance().grade.get()
    },
    grade8_or_9(){
        return "8" == Template.instance().grade.get() || "9" == Template.instance().grade.get()
    },
    grade10(){
        return "10" == Template.instance().grade.get()
    }
})


var sortMathematic = -1;
var sortPhysics = -1;
var sortChemistry = -1;
var sortBio = -1;

var sortHistory = -1;
var sortKazakh = -1;
var sortTur = -1;
var sortRus = -1;
var sortHistory = -1;
var sortGeography = -1;
var sortWorldHistory = -1;
var sortTotal = -1;

Template.btsRatingByCount.events({
    "change #select"(event,template) {
        template.grade.set(template.find('[name=grade]').value)

        let grade = FlowRouter.getParam('_id')
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      let btsNo = FlowRouter.getParam('btsNo');
      var selectedLesson = "Жалпы";

      if(template.grade.get() != "all"){
        let lessons = ["7 cынып", "8 cынып", "9 cынып", "10 cынып"];
          selectedLesson = lessons[parseInt(template.grade.get()) - 7]
      }

      var headers = ["#", "Оқу жылы", "Мектеп аты", "Жалпы",
      "Математика", "Қазақ тілі",       "Түрік тілі",
      "Орыс тілі",  "Қазақcтан тарихы", "Дүние тарихы",
      "География",  "Физика",           "Химия",        "Биология"];


      data.push(headers);
      var btsStore = BtsRatings.find({},{sort:Session.get('Sort')}).fetch();
      let mektepAty;
      let okuJyly = academicYear.get();

      for(var i = 0; i < btsStore.length; i++){
        let idN = i+1;
        let mektepAty  = Schools.findOne({schoolId: btsStore[i].schoolId}) ? Schools.findOne({schoolId: btsStore[i].schoolId}).shortName : undefined;
        let total = btsStore[i].total?btsStore[i].total.toFixed(2):0;
        let mathematic = btsStore[i].mathematic?btsStore[i].mathematic.toFixed(2):0;
        let kazakh_lang = btsStore[i].kazakh_lang?btsStore[i].kazakh_lang.toFixed(2):0;
        let turkish_lang = btsStore[i].turkish_lang?btsStore[i].turkish_lang.toFixed(2):0;
        let russian_lang = btsStore[i].russian_lang?btsStore[i].russian_lang.toFixed(2):0;
        let kazakh_history = btsStore[i].kazakh_history?btsStore[i].kazakh_history.toFixed(2):0;
        let world_history = btsStore[i].world_history?btsStore[i].world_history.toFixed(2):0;
        let geography = btsStore[i].geography?btsStore[i].geography.toFixed(2):0;
        let physics = btsStore[i].physics?btsStore[i].physics.toFixed(2):0;
        let chemistry = btsStore[i].chemistry?btsStore[i].chemistry.toFixed(2):0;
        let biology = btsStore[i].biology?btsStore[i].biology.toFixed(2):0;


        let content = [idN, okuJyly, mektepAty,
          total,
          mathematic,
          kazakh_lang,
          turkish_lang,
          russian_lang,
          kazakh_history,
          world_history,
          geography,
          physics,
          chemistry,
          biology
        ];

        data.push(content);
      }

      console.log(data);

      if(data.length == 1){
          alert("Keep calm, there is no data to export");
      }else{
        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;

          let sName = 'BTS-'+btsNo+' rating '+selectedLesson+' '+okuJyly+'.xlsx';
          XLSX.writeFile(wb, sName);
        });
      }
    },

    'click #sortMath'(event,template) {
        sortMathematic *= (-1)
        Session.set('Sort',{mathematic:sortMathematic});
    },
    'click #sortPhysics'(event,template) {
        sortPhysics *= (-1)
        Session.set('Sort',{physics:sortPhysics});
    },
    'click #sortChemistry'(event,template) {
        sortChemistry *= (-1)
        Session.set('Sort',{chemistry:sortChemistry});
    },
    'click #sortBio'(event,template) {
        sortBio *= (-1)
        Session.set('Sort',{biology:sortBio});
    },
    'click #sortHistory'(event,template) {
        sortHistory *= (-1)
        Session.set('Sort',{kazakh_history:sortHistory});
    },
    'click #sortKazakh'(event,template) {
        sortKazakh *= (-1)
        Session.set('Sort',{kazakh_lang:sortKazakh});
    },
    'click #sortTur'(event,template) {
        sortTur *= (-1)
        Session.set('Sort',{turkish_lang:sortTur});
    },
    'click #sortRus'(event,template) {
        sortRus *= (-1)
        Session.set('Sort',{russian_lang:sortRus});
    },
    'click #sortGeography'(event,template) {
        sortGeography *= (-1)
        Session.set('Sort',{geography:sortGeography});
    },
    'click #sortWorldHistory'(event,template) {
        sortWorldHistory *= (-1)
        Session.set('Sort',{world_history:sortWorldHistory});
    },
    'click #sortTotal'(event,template) {
        sortTotal *= (-1)
        Session.set('Sort',{total:sortTotal});
    },
})
