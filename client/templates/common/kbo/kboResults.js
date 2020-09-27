import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './kboResults.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

Template.kboResults.onCreated(function(){
    let template = this
    document.title = "КБО Нәтиже";
    template.grade = new ReactiveVar('7')
    template.subjectId = new ReactiveVar('01')
    template.subscribe('schools')
    template.subscribe('subjects')
    template.autorun(()=>{
        template.subscribe('kboResults',academicYear.get(),template.grade.get(),template.subjectId.get(),FlowRouter.getParam('kboNo'))
    })
})

Template.kboResults.helpers({
    kboNo() {
        return FlowRouter.getParam('kboNo')
    },
    results() {
        return KboResults.find({},{sort:{subjectId:1,result:-1}})
    }
})

Template.kboResults.events({
    'change #grade'(event,template) {
        template.grade.set(event.target.value)
    },
    'change #subject'(event,template) {
        template.subjectId.set(event.target.value)
    },
    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      let kboNo = FlowRouter.getParam('kboNo');
      var selectedGrade = "Жалпы";
      var selectedLesson = "Алгебра";

      let lessons = [" ","Алгебра", "Физика", "Химия", "Биология", "Ағылшын тілі",
      "География", "Қазақ тілі (қазақ тобы)", " ", "Қазақ тілі (орыс тобы)",
      "Түрік тілі", "Орыс тілі", "Тарих", " ", " ", "Құқық"];

      if(template.grade.get() != "all"){
        let grades = ["7 cынып", "8 cынып", "9 cынып", "10 cынып", "11 cынып"];
        selectedGrade = grades[parseInt(template.grade.get()) - 7];
      }
      console.log(template.subjectId.get());

      selectedLesson = lessons[parseInt(template.subjectId.get())];

      var headers = ["#", "Оқу жылы", "Аты	Жөні", "Сынып", "Пән", "Вариант", "Нәтиже"];
      data.push(headers);

      var kboStore = KboResults.find({},{sort:{subjectId:1,result:-1}}).fetch();
      let okuJyly = academicYear.get();

      console.log(selectedLesson);

      /*
      academicYear: "2018-2019"
      division: "В"
      grade: "7"
      kboNo: "1"
      result: 26
      schoolId: "020"
      studentId: 27684
      studentName: " Мирас"
      studentSurname: "Абдыхали "
      subjectId: "01"
      variant: "0107"

      */

      for(var i = 0; i < kboStore.length; i++){
        let idN = i+1;
        let studentInfo = kboStore[i].studentSurname.trim()+" "+kboStore[i].studentName.trim();
        let synyp = kboStore[i].grade+" "+kboStore[i].division;
        let variant = kboStore[i].variant;

        let result = kboStore[i].result;

        let content = [idN, okuJyly, studentInfo, synyp, selectedLesson, variant, result];

        data.push(content);

      }

      console.log(data);

      if(data.length == 1){
          alert("Keep calm, there is no data to export");
      }else{
        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;
          let sName = 'KBO-'+kboNo+' Нәтиже '+selectedGrade+' '+selectedLesson+' '+okuJyly+'.xlsx';
          XLSX.writeFile(wb, sName);
        });
      }

    }
})
