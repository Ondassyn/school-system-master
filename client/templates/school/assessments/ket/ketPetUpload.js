import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './ketPetUpload.html';
import {ReactiveDict} from 'meteor/reactive-dict'
import XLSX from 'xlsx';

Template.ketPetUpload.onCreated(function() {
    let template = this
    document.title = "KET-PET жүктеу";
    template.grade = new ReactiveVar('7')
    template.examPeriod = new ReactiveVar('2')
    template.results = new ReactiveVar([])
    template.subscribe('configs');
    template.subscribe('schools');
    template.subscribe('students');

    // template.autorun(() => {
    //     template.subscribe("opeReports", academicYear.get(), template.reportPeriod.get())
    // })

})

Template.ketPetUpload.helpers({
  students(){
    return Students.find({},{sort:{surname:-1, division:1}})
  },
  clickedYes(){
    return !state.get('directorClickedYes')
  },
  results() {
      return Template.instance().results.get()
  },
  grade7(){
      return "7" == Template.instance().grade.get()
  },
  grade8(){
      return "8" == Template.instance().grade.get()
  }
});

Template.ketPetUpload.events({
  'change #select'(event,template) {
      template.grade.set(event.target.value)
      template.results.set([])
  },

  'change #examPeriod'(event,template) {
      template.examPeriod.set(event.target.value)
  },
  "click #save"(event,template) {
      event.preventDefault()

      if(template.results.get().length > 0) {
          SUIBlock.block('Жүктелуде...');

          Meteor.call("KetPet.Upload", academicYear.get(), template.grade.get(), template.examPeriod.get(), template.results.get(),function (err) {

             if (err) {
                  bootbox.alert(err.reason);
                  SUIBlock.unblock();
              } else {
                  template.results.set([])
                  SUIBlock.unblock();
                  bootbox.alert("Сақталды");

                  FlowRouter.redirect('/school/ketPet/results')
              }
          });

          return
      }

      alert("Файл таңдалмады немесе қателер табылды")
   },

  'click #dnload' () {
      const html = document.getElementById('out').innerHTML;

      var data = [];

      var selectedGrade = Template.instance().grade.get()
      var headers;

      let school = Schools.findOne({userId: Meteor.userId()});
      let students;
      let title = "";
      if(selectedGrade == '7'){
         headers = ['studentId', 'grade', 'studentSurname', 'studentName','ReadingAndWriting','','WritingTask9','','Listening','','Speaking'];
         data.push(headers);
         students = Students.find({schoolId: school.schoolId, grade: '7'}, {sort:{grade: 1, division: 1}}).fetch()
         title = "KET"


         students.forEach(student =>{
            let content = [student.studentId, student.grade+student.division, student.surname, student.name, '', '55 max point', '', '5 max point', '', '25 max point', '', '5 max point' ];
            data.push(content);
         });
         
      }else{
         headers = ['studentId', 'grade', 'studentSurname', 'studentName', 'Reading','','WritingPart1','','WritingPart2','','WritingPart3','','Listening','','Speaking'];
         data.push(headers);
         students = Students.find({schoolId: school.schoolId, grade: '8'}, {sort:{grade: 1, division: 1}}).fetch()
         title = "PET"

         students.forEach(student =>{
            let content = [student.studentId, student.grade+student.division, student.surname, student.name, '', '35 max point', '', '5 max point', '', '5 max point', '', '15 max point', '', '25 max point', '', '5 max point' ];
            data.push(content);
         });
      }

      let splited = school.secondaryName.split(' ');
      let shortN = splited[0];

      Meteor.call('download', data, (err, wb) => {
        if (err) throw err;

        let sName = 'students '+selectedGrade+' grade '+title+' '+shortN+'.xlsx';
        XLSX.writeFile(wb, sName);
      });

  },

  'change #upload' (event, template) {
      let ope = Configs.findOne({
          _id: 'ketPetUpload'
      });

      reportId = template.examPeriod.get();

      if (ope[reportId] == 'disabled'){
          throw alert('KET-PET '+reportId+' тоқсан жүктеу жабық.\nӨтініш, IT Department-ке хабарласыңыз.')
          // FlowRouter.redirect('/school/ope/reportResults/')
      }

      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.onload = function(e) {
          const data = e.target.result;
          const name = file.name;

          Meteor.call('upload', data, name, function(err, wb) {
              if(err) alert(err);
              else {
                  res = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header : 0})
                  var selectedGrade = template.grade.get()
                  var checker = res;
                  // // console.log(checker);
                  // var index = 4;
                  //
                  // var total50 = parseInt(checker[index].ReadingAndWriting) + parseInt(checker[index].WritingTask9);
                  // total50 = (total50 * 5) / 6;
                  //
                  // var totalL25 = parseInt(checker[index].Listening);
                  // var totalS25 = parseInt(checker[index].Speaking) * 5;
                  // var total = total50 + totalL25 + totalS25;
                  // var level;
                  //
                  // if(total >= 90 && total <= 100){
                  //    level = "Pass with Distinction(B1)"
                  //
                  // }else if(total >= 85 && total <= 89){
                  //    level = "Pass with Merit(A2)"
                  //
                  // }else if(total >= 70 && total <= 84){
                  //    level = "Pass(A2)"
                  //
                  // }else if(total >= 45 && total <= 69){
                  //    level = "A1"
                  //
                  // }else{
                  //   level = "Fail"
                  // }
                  //
                  // console.log("level: "+level);

                  if(selectedGrade=='8'){
                    if(checker[0].WritingTask9){
                      throw alert('Файл немесе емтихан түрі дұрыс таңдалмады!')
                    }else{
                      template.results.set(res)
                    }
                  }

                  if(selectedGrade=='7'){
                    if(checker[0].WritingPart1){
                      throw alert('Файл немесе емтихан түрі дұрыс таңдалмады!')
                    }else{
                      template.results.set(res)
                    }
                  }
              }
          });
      };
      reader.readAsBinaryString(file);

  },
})

Template.ketPetUpload.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
