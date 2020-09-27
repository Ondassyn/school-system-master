import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './kboRating.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

Template.kboRating.onCreated(function(){
    let template = this
    document.title = "КБО Рейтинг";
    Session.setDefault('Sort',{total:-1});
    template.grade = new ReactiveVar('all')
    template.subscribe('schools')
    template.subscribe('KboKeys')


    template.autorun(()=>{
        template.subscribe('kboRating',academicYear.get(),template.grade.get(),FlowRouter.getParam('kboNo'))
    })
})

var schoolArray2 = [];
Template.kboRating.helpers({

    kboNo() {
        return FlowRouter.getParam('kboNo')
    },

    results() {

        var schoolStore = new Map();
        var schoolArray = [];

        let schools = Schools.find().fetch()
        let cursorKboRatings = KboRatings.find({academicYear:academicYear.get()},{sort: Session.get('Sort')}).fetch()

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

        for (const [key, value] of schoolStore.entries()) {
          // console.log(key);
          schoolArray.push(value)
        }

        schoolArray2 = schoolArray;

        return KboRatings.find({},{sort: Session.get('Sort')});
    },

    schoolNotUploaded(){
      return schoolArray2;
    },

    points(subjectId) {
        let result = KboRatings.findOne({schoolId:this.schoolId})
        if (result) {
            return result[subjectId]
        } else {
            return 0
        }
    }
})

Template.kboRating.events({
    'change #grade'(event,template) {
        template.grade.set(event.target.value)
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      let kboNo = FlowRouter.getParam('kboNo');
      var selectedGrade = "Жалпы";

      if(template.grade.get() != "all"){
        let grades = ["7 cынып", "8 cынып", "9 cынып", "10 cынып", "11 cынып"];
        selectedGrade= grades[parseInt(template.grade.get()) - 7]
      }

      var headers = ["#", "Оқу жылы", "Мектеп аты", "Сынып",
      "Жалпы", "Физика", "Химия", "Биология", "Ағылшын тілі","География",
      "Қазақ тілі(Қазақ тобы)", "Қазақ тілі (Орыс тобы)", "Орыс тілі", "Алгебра",
      "Түрік тілі", "Тарих", "Құқық"];

      data.push(headers);
      var kboStore = KboRatings.find({},{sort: Session.get('Sort')}).fetch();
      let okuJyly = academicYear.get();
      // console.log(kboStore);

      for(var i = 0; i < kboStore.length; i++){
        let idN = i+1;
        let mektepAty  = Schools.findOne({schoolId: kboStore[i].schoolId}) ? Schools.findOne({schoolId: kboStore[i].schoolId}).shortName : undefined;
        let total = kboStore[i].total;
        let algebra = kboStore[i]["01"];
        let physics = kboStore[i]["02"];
        let chemistry = kboStore[i]["03"];
        let biology = kboStore[i]["04"];
        let english = kboStore[i]["05"];
        let geography = kboStore[i]["06"];

        let kazakh_kz = kboStore[i]["07"];
        let kazakh_rus = kboStore[i]["08"];
        let turkish = kboStore[i]["10"];
        let russian = kboStore[i]["11"];

        let history = kboStore[i]["12"];
        let kukik = kboStore[i]["15"];

        let content = [idN, okuJyly, mektepAty, selectedGrade,
          total,
          physics,
          chemistry,
          biology,
          english,
          geography,
          kazakh_kz,
          kazakh_rus,
          russian,
          algebra,
          turkish,
          history,
          kukik];

        data.push(content);

      }

      // console.log(data);

      if(data.length == 1){
          alert("Keep calm, there is no data to export");
      }else{
        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;

          let sName = 'KBO-'+kboNo+' rating '+selectedGrade+' '+okuJyly+'.xlsx';
          XLSX.writeFile(wb, sName);
        });
      }

    },

    'click #sortAlgebra'(event,template) {
        Session.set('Sort',{'01':-1});
    },
    'click #sortPhysics'(event,template) {
        Session.set('Sort',{'02':-1});
    },
    'click #sortChemistry'(event,template) {
        Session.set('Sort',{'03':-1});
    },
    'click #sortBio'(event,template) {
        Session.set('Sort',{'04':-1});
    },
    'click #sortEng'(event,template) {
        Session.set('Sort',{'05':-1});
    },
    'click #sortGeography'(event,template) {
        Session.set('Sort',{'06':-1});
    },
    'click #sortKaz'(event,template) {
        Session.set('Sort',{'07':-1});
    },
    'click #sortTurkish'(event,template) {
        Session.set('Sort',{'10':-1});
    },
    'click #sortRus'(event,template) {
        Session.set('Sort',{'11':-1});
    },
    'click #sortKZHistory'(event,template) {
        Session.set('Sort',{'12':-1});
    },
    'click #sortTotal'(event,template) {
        Session.set('Sort',{total:-1});
    }
})
