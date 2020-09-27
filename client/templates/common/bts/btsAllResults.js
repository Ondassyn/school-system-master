import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsAllResults.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
Template.btsAllResults.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar("7")
    document.title = "БТС Жалпы Нәтижелері";
    template.schoolId_select = new ReactiveVar("")
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("btsAllResults",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})
Template.btsAllResults.helpers({
    grade7(){
        return "7" == Template.instance().grade.get()
    },
    grade10(){
        return "10" == Template.instance().grade.get()
    },
    grade8_or_9(){
        return "8" == Template.instance().grade.get() || "9" == Template.instance().grade.get()
    },
    btsNo1_or_2(){
        return "2" == FlowRouter.getParam("btsNo") || "1" == FlowRouter.getParam("btsNo")
    },
    schools()  {
        return Schools.find({},{sort:{schoolId:1}})
    },
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    results() {
        let schoolId_select = new RegExp(Template.instance().schoolId_select.get())
        return BtsResults.find({schoolId:schoolId_select},{sort:{total:-1}})
    }
})

Template.btsAllResults.events({

    "change #select"(event,template) {
        template.schoolId_select.set(template.find('[name=schoolId_select]').value)
        template.grade.set(template.find('[name=grade]').value)

        let schoolId_select = FlowRouter.getParam('_id')
        let grade = FlowRouter.getParam('_id')
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      let btsNo = FlowRouter.getParam('btsNo');

      var headers = [];
      let schoolId_select = new RegExp(Template.instance().schoolId_select.get())
      var btsStore = BtsResults.find({schoolId:schoolId_select},{sort:{total:-1}}).fetch();
      // console.log(btsStore);

      if(btsStore.length != 0){

        var curGrade = btsStore[0].grade;
        let okuJyly = academicYear.get();
        if(curGrade == '7'){
          headers = ["#", "Оқу жылы","Оқушы ID", "Сынып", "Аты Жөні","Жалпы", "Математика", "Қазақ тілі",
          "Түрік тілі", "Орыс тілі"];

            data.push(headers);
            for(var i = 0; i < btsStore.length; i++){
              let idN = i+1;
              let studentInfo = btsStore[i].surname+" "+btsStore[i].name.trim();
              let classN = btsStore[i].grade+" "+btsStore[i].division;
              let total = btsStore[i].total;
              let studentId = btsStore[i].studentId;
              let mathematic = btsStore[i].mathematic;
              let kazakh_lang = btsStore[i].kazakh_lang;
              let russian_lang = btsStore[i].russian_lang;
              let turkish_lang = btsStore[i].turkish_lang;

              let content = [idN, okuJyly,studentId, classN, studentInfo, total, mathematic, kazakh_lang,
                russian_lang,
                turkish_lang];

              data.push(content);

            }

        }else if (curGrade == '8' || curGrade == '9') {
          headers = ["#", "Оқу жылы","Оқушы ID", "Сынып", "Аты Жөні","Жалпы","Математика", "Қазақ тілі",
            "Түрік тілі", "Қазақстан тарихы",
            "География", "Физика", "Химия", "Биология"];

            data.push(headers);
            for(var i = 0; i < btsStore.length; i++){
              let idN = i+1;
              let studentInfo = btsStore[i].surname+" "+btsStore[i].name.trim();
              let classN = btsStore[i].grade+" "+btsStore[i].division;
              let total = btsStore[i].total;
              let studentId = btsStore[i].studentId;
              let mathematic = btsStore[i].mathematic;
              let kazakh_lang = btsStore[i].kazakh_lang;
              let turkish_lang = btsStore[i].turkish_lang;
              let kazakh_history = btsStore[i].kazakh_history;
              let geography = btsStore[i].geography;
              let physics = btsStore[i].physics;
              let chemistry = btsStore[i].chemistry;
              let biology = btsStore[i].biology;

              let content = [idN, okuJyly,studentId, classN, studentInfo, total, mathematic, kazakh_lang,
                turkish_lang,kazakh_history, geography, physics, chemistry, biology];

              data.push(content);

            }

        }else if (curGrade == '10') {
          headers = ["#", "Оқу жылы", "Оқушы ID","Сынып", "Аты Жөні","Жалпы","Математика", "Қазақ тілі",
            "Қазақстан тарихы", "География",  "Физика",
            "Химия",            "Биология",   "Дүние тарихы"];

            data.push(headers);
            for(var i = 0; i < btsStore.length; i++){
              let idN = i+1;
              let studentInfo = btsStore[i].surname+" "+btsStore[i].name.trim();
              let classN = btsStore[i].grade+" "+btsStore[i].division;
              let total = btsStore[i].total;
              let studentId = btsStore[i].studentId;
              let mathematic = btsStore[i].mathematic;
              let kazakh_lang = btsStore[i].kazakh_lang;
              let kazakh_history = btsStore[i].kazakh_history;

              let geography = btsStore[i].geography?btsStore[i].geography:'-';
              let physics = btsStore[i].physics?btsStore[i].physics:'-';

              let chemistry = btsStore[i].chemistry?btsStore[i].chemistry:'-';
              let biology = btsStore[i].biology?btsStore[i].biology:'-';
              let world_history = btsStore[i].world_history?btsStore[i].world_history:'-';

              let content = [idN, okuJyly, studentId, classN, studentInfo, total, mathematic, kazakh_lang,
                kazakh_history,geography, physics, chemistry, biology, world_history];

              data.push(content);

            }
        }

        let schoolIdSelected = Template.instance().schoolId_select.get()
        console.log("schoolIdSelected: "+schoolIdSelected);

        let schoolName = Schools.findOne({schoolId:schoolIdSelected})?Schools.findOne({schoolId: schoolIdSelected}).fullName:"Жалпы";
        console.log("schoolName: "+schoolName);
        console.log(data);

        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;
          let sName = 'mektep '+schoolName+' BTS-'+btsNo+' all results grade:'+curGrade+' .xlsx';
          XLSX.writeFile(wb, sName);
        });

      }else{
        alert("Keep calm, there is no data to export");

      }
    }
})
