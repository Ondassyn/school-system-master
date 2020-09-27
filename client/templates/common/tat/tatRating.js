import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './tatRating.html';

import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

Template.tatRating.onCreated(function(){
    let template = this
    document.title = "ТАТ Рейтинг";
    template.subjectId = new ReactiveVar('all')
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('tatRating',academicYear.get(),template.subjectId.get(),FlowRouter.getParam('tatNo'))
    })
})
var schoolArray2 = [];
Template.tatRating.helpers({
    tatNo() {
        return FlowRouter.getParam('tatNo')
    },
    results() {

        var schoolStore = new Map();
        var schoolArray = [];

        let schools = Schools.find().fetch()
        let cursorKboRatings = TatRating.find({},{sort:{total:-1}}).fetch()
        console.log(schools);
        // console.log();

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

        return TatRating.find({},{sort:{total:-1}})
    },
    
    schoolNotUploaded(){
      return schoolArray2;
    },
})

Template.tatRating.events({
    'change #subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      var selectedLesson = "Жалпы";

      if(template.subjectId.get() != "all"){

        let lessons = [" ", "Алгебра", "Физика", "Химия", "Биология", "Ағылшын тілі", "География", " ",
         "Информатика", "Қазақ тілі", "Түрік тілі", "Орыс тілі", "Қазақстан тарихы", "Дене шынықтыру" ];

        if(template.subjectId.get() == "23"){
          selectedLesson = "Дене шынықтыру";
        }else{
          selectedLesson = lessons[parseInt(template.subjectId.get())]
        }
      }

      var headers = ["#", "Оқу жылы", "Мектеп ID", "Мектеп аты", "Жалпы"];
      data.push(headers);

      var ratingStore = TatRating.find({},{sort:{total:-1}}).fetch();
      let tatN = FlowRouter.getParam('tatNo');
      console.log(ratingStore);

      for(var i = 0; i < ratingStore.length; i++){
        const schoolName  = Schools.findOne({schoolId: ratingStore[i].schoolId}).shortName;

        let idN = i+1;
        let okuJyly = ratingStore[i].academicYear;
        let mektepId = ratingStore[i].schoolId;
        let total = ratingStore[i].total;

        let content = [i+1, okuJyly, mektepId, schoolName, total];

        data.push(content);
      }

      if(data.length == 1){

          alert("Keep calm, there is no data to export");

      }else{
        // console.log(data);

        let year = academicYear.get();
        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;

          let sName = 'Tat'+tatN+' rating '+selectedLesson+' '+year+'.xlsx';
          XLSX.writeFile(wb, sName);
        });
      }
    }
})
