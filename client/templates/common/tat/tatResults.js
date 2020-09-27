import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './tatResults.html';

import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

Template.tatResults.onCreated(function(){
    let template = this
    template.subjectId = new ReactiveVar('')
    document.title = "ТАТ Нәтижелері";
    template.subscribe('schools')
    template.subscribe('subjects')
    template.autorun(()=>{
        template.subscribe('tatResults',academicYear.get(),template.subjectId.get(),FlowRouter.getParam('tatNo'))
    })

})

Template.tatResults.helpers({
    tatNo() {
        return FlowRouter.getParam('tatNo')
    },
    results() {
        return TatResults.find({},{sort:{percent:-1}})
    }
})

Template.tatResults.events({
    'change #subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      var selectedLesson = "Жалпы";
      let tatN = FlowRouter.getParam('tatNo');

      if(template.subjectId.get() != ""){

        let lessons = [" ", "Алгебра", "Физика", "Химия", "Биология", "Ағылшын тілі", "География", " ",
         "Информатика", "Қазақ тілі", "Түрік тілі", "Орыс тілі", "Қазақстан тарихы", "Дене шынықтыру" ];

        if(template.subjectId.get() == "23"){
          selectedLesson = "Дене шынықтыру";
        }else{
          selectedLesson = lessons[parseInt(template.subjectId.get())]
        }
      }

      var headers = ["#", "Оқу жылы", "Мектеп аты", "Пән", "Мұғалім ID",
      "Аты	Жөні", "Лауазымы", "Нәтиже", "Пән бойынша орташа ұпай", "Пән бойынша орны", "%"];
      data.push(headers);

      var resultStore = TatResults.find({},{sort:{percent:-1}}).fetch();
      // console.log(resultStore.length);

      let mektepAty;
      if(resultStore.length > 0) {
        mektepAty  = Schools.findOne({schoolId: resultStore[0].schoolId}) ? Schools.findOne({schoolId: resultStore[0].schoolId}).shortName : undefined;
      }
      console.log(resultStore);
      for(var i = 0; i < resultStore.length; i++){
        const panAty = Subjects.findOne({subjectId: resultStore[i].subjectId}).name_kz;

        let idN = i+1;
        let okuJyly = resultStore[i].academicYear;
        let mugalimId = resultStore[i].teacherId;
        let mugalimInfo = resultStore[i].teacherSurname+" "+resultStore[i].teacherName;
        let lauazim = resultStore[i].position;
        let natizhe = resultStore[i].result;
        let subjectAverage = resultStore[i].subjectAverage;
        let place = resultStore[i].place;
        let procentN = resultStore[i].percent;

        let content = [idN, okuJyly, mektepAty, panAty, mugalimId, mugalimInfo,
          lauazim, natizhe, subjectAverage, place, procentN];

        data.push(content);
      }

      if(data.length == 1){
          alert("Keep calm, there is no data to export");
      }else{
        let year = academicYear.get();
        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;

          let sName = 'Tat'+tatN+' natizheleri '+selectedLesson+' '+year+'.xlsx';
          XLSX.writeFile(wb, sName);
        });
      }
    }
})
