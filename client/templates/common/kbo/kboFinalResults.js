import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './kboFinalResults.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

Template.kboFinalResults.onCreated(function(){
    let template = this
    document.title = "КБО Финал";
    template.state = new ReactiveVar('total')
    template.subjectId = new ReactiveVar('01')
    template.grade = new ReactiveVar("")
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('kboAllResults',academicYear.get(),template.subjectId.get(),template.grade.get())
    })
})

let data2 = [];
function getResult(){
    let grade = Template.instance().grade.get();
    let kbo1 = KboResults.find({kboNo:'1'}).fetch()
    let kbo2 = KboResults.find({kboNo:'2'}).fetch()
    let kbo3 = KboResults.find({kboNo:'3'}).fetch()
    let ids = []
    _.each(kbo1,(res) => {
        ids.push(res.studentId)
    })
    _.each(kbo2,(res) => {
        ids.push(res.studentId)
    })
    _.each(kbo3,(res) => {
        ids.push(res.studentId)
    })
    ids = _.uniq(ids)
    let results = []
    _.each(ids,(id) => {
        let kbo1 = KboResults.findOne({kboNo:'1',studentId:id})
        let kbo2 = KboResults.findOne({kboNo:'2',studentId:id})
        let kbo3 = KboResults.findOne({kboNo:'3',studentId:id})

        let resultObj = {
            studentId:id
        }
        if (kbo1) {
            resultObj.schoolId = kbo1.schoolId
            resultObj.name = kbo1.studentName
            resultObj.surname = kbo1.studentSurname
            resultObj.grade = kbo1.grade
        }
        if (kbo2) {
            resultObj.schoolId = kbo2.schoolId
            resultObj.name = kbo2.studentName
            resultObj.surname = kbo2.studentSurname
            resultObj.grade = kbo2.grade
        }
        if (kbo3) {
            resultObj.schoolId = kbo3.schoolId
            resultObj.name = kbo3.studentName
            resultObj.surname = kbo3.studentSurname
            resultObj.grade = kbo3.grade
        }
        resultObj.kbo1 = kbo1 ? kbo1.result : 0
        resultObj.kbo2 = kbo2 ? kbo2.result : 0
        resultObj.kbo3 = kbo3 ? kbo3.result : 0

        // kbo weights can be adjusted if needed
        let kboWeights = {
            kbo1:0.15,
            kbo2:0.4,
            kbo3:0.45,
        }
        let kboWeights7 = {
            kbo1:0.1,
            kbo2:0.35,
            kbo3:0.55,
        }


        if (grade == '7') {
            resultObj.total = resultObj.kbo1 * kboWeights7.kbo1 + resultObj.kbo2 * kboWeights7.kbo2 + resultObj.kbo3 * kboWeights7.kbo3
            resultObj.total = resultObj.total;
            results.push(resultObj)
        } else {
            resultObj.total = resultObj.kbo1 * kboWeights.kbo1 + resultObj.kbo2 * kboWeights.kbo2 + resultObj.kbo3 * kboWeights.kbo3
            resultObj.total = resultObj.total;
            results.push(resultObj)
        }
    })

    var s = Template.instance().state.get()
    data2 = _.sortBy(results,s).reverse()
    return data2;
}

Template.kboFinalResults.helpers({
    results() {
        return getResult();
    }
})

Template.kboFinalResults.events({
    'change #subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];

      var selectedGrade = "Жалпы";
      var selectedLesson = "Алгебра";

      let okuJyly = academicYear.get();
      template.subjectId.get()
      template.grade.get()

      // console.log(data2);

      let lessons = [" ","Алгебра", "Физика", "Химия", "Биология", "Ағылшын тілі",
      "География", "Қазақ тілі(қазақ тобы)", " ", "Қазақ тілі(орыс тобы)",
      "Түрік тілі", "Орыс тілі", "Тарих", " ", " ", "Құқық"];

      selectedLesson = lessons[parseInt(template.subjectId.get())];

      if(template.grade.get() != ""){
        let grades = ["7 cынып", "8 cынып", "9 cынып", "10 cынып", "11 cынып"];
        selectedGrade = grades[parseInt(template.grade.get()) - 7];
      }

      // console.log(template.subjectId.get());


      var headers = ["#", "Оқу жылы", "Мектеп", "Аты	Жөні", "Сынып", "КБО-1", "КБО-2","КБО-3", "Нәтиже"];
      data.push(headers);

      var kboStore = data2;
      for(var i = 0; i < kboStore.length; i++){
        let idN = i+1;

        let studentInfo = kboStore[i].surname.trim()+" "+kboStore[i].name.trim();
        let mektepAty  = Schools.findOne({schoolId: kboStore[i].schoolId}) ? Schools.findOne({schoolId: kboStore[i].schoolId}).shortName : undefined;

        let synyp = kboStore[i].grade;
        let kbo1 = kboStore[i].kbo1;
        let kbo2 = kboStore[i].kbo2;
        let kbo3 = kboStore[i].kbo3;

        let total = kboStore[i].total;

        let content = [idN, okuJyly, mektepAty, studentInfo, synyp, kbo1, kbo2, kbo3, total];

        data.push(content);

      }

      console.log(data);

      if(data.length == 1){
          alert("Keep calm, there is no data to export");
      }else{
        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;
          let sName = 'KBO-final '+selectedGrade+' '+selectedLesson+' '+okuJyly+'.xlsx';
          XLSX.writeFile(wb, sName);
        });
      }

    },

    'change #grade'(event,template) {
        template.grade.set(event.target.value)
    },
    'click #sortKbo1'(event,template) {
        Template.instance().state.set('kbo1')
    },
    'click #sortKbo2'(event,template) {
        Template.instance().state.set('kbo2')
    },
    'click #sortKbo3'(event,template) {
        Template.instance().state.set('kbo3')
    },
    'click #sortFinal'(event,template) {
        Template.instance().state.set('total')
    },

})
