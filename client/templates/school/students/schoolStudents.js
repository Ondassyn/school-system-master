import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './schoolStudents.html';
import XLSX from 'xlsx';

Template.schoolStudents.onCreated(function() {
    let template = this
    document.title = "Оқушылар тізімі";
    template.name_search = new ReactiveVar("")
    template.surname_search = new ReactiveVar("")
    template.grade_search = new ReactiveVar("")
    template.division_search = new ReactiveVar("")
    template.subscribe("students")
    template.subscribe("kboSubjects")
    template.subscribe("btsElectiveGroup")
})

Template.schoolStudents.helpers({
    students() {
        let name_search = new RegExp(Template.instance().name_search.get(), 'i')
        let surname_search = new RegExp(Template.instance().surname_search.get(), 'i')
        let grade_search = new RegExp(Template.instance().grade_search.get(), 'i')
        let division_search = new RegExp(Template.instance().division_search.get(), 'i')
        return Students.find({
            name:name_search,
            surname:surname_search,
            grade:grade_search,
            division:division_search
        },{sort:{grade:1,division:1,surname:1,name:1}})
    },
    subjects() {
        return KboCourses.find({},{sort:{subjectId:1}})
    },

    electiveGroups() {
        return BtsElectiveGroup.find({},{sort:{subjectId:1}})
    },

    isOlympiadStudent(studentId, subjectId) {
        let student = Students.findOne({studentId:studentId})
        if (student && student.olympiad == subjectId)
            return 'selected'
    },
    isJobaStudent(studentId,subjectId) {
        let student = Students.findOne({studentId:studentId})
        if (student && student.joba == subjectId)
            return 'selected'
    },

    isSelectedBtsElectiveGroup(studentId, electiveGroupId) {
        let student = Students.findOne({studentId:studentId})

        if (student && student.electiveGroup == electiveGroupId) {
            return "selected"
        }
    }
});

Template.schoolStudents.events({
    "keyup #search"(event,template) {
        template.name_search.set(template.find('[name=name_search]').value)
        template.grade_search.set(template.find('[name=grade_search]').value)
        template.surname_search.set(template.find('[name=surname_search]').value)
        template.division_search.set(template.find('[name=division_search]').value)
    },
    "click #exitFromSchoolStudent"(event,template) {
        event.preventDefault()
        let sFind = Students.findOne({_id:this._id});
        let sInfo = sFind.surname+" "+sFind.name;
        bootbox.confirm("Оқушыны өшіргіңіз келеді ме?\n"+sInfo, function(result){
            if(result){
                Meteor.call('Student.deleteStudent',this._id)
            }
        });
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      var headers = ["#","Оқушы ID","Сыныбы","Аты-жөні","Toбы",
      "Олимпиада пәні","БТС таңдау пәндері"];

      data.push(headers);

      let olympiadSubjectList = KboCourses.find({},{sort:{subjectId:1}}).fetch();
      let btsElectiveList = BtsElectiveGroup.find({},{sort:{subjectId:1}}).fetch();
      let studentList = Students.find({},{sort:{grade:1,division:1,surname:1,name:1}}).fetch();

      // console.log("olympiadSubjectList:");
      // console.log(olympiadSubjectList);
      //
      // console.log("btsElectiveList:");
      // console.log(btsElectiveList);
      //
      // console.log("studentList:");
      // console.log(studentList);

      for(var i = 0; i < studentList.length; i++){
        let idN = i+1;
        let studentId = studentList[i].studentId;
        let studentClass = studentList[i].grade + studentList[i].division;
        let studentInfo = studentList[i].surname+" "+studentList[i].name.trim();
        let studentLanguageGroup = studentList[i].languageGroup;

        let studentBtsElective = btsElectiveList[parseInt(studentList[i].electiveGroup)]?btsElectiveList[parseInt(studentList[i].electiveGroup)-1].name:"---";
        var studentOlympiad = "---";
        for(var j = 0; j < olympiadSubjectList.length; j++){
          if(olympiadSubjectList[j].subjectId == studentList[i].olympiad){
            studentOlympiad = olympiadSubjectList[j].name;
          }
        }


        let content = [idN, studentId, studentClass, studentInfo,
          studentLanguageGroup,
          studentOlympiad,
          studentBtsElective];
          data.push(content);
      }


      Meteor.call('download', data, (err, wb) => {
        if (err) throw err;
        let sName = 'Student list.xlsx';
        XLSX.writeFile(wb, sName);
      });


    },
    "change #electiveGroup"(event,template) {
        Meteor.call('Student.updateBtsElectiveGroup',this._id, event.target.value)
    },

    "change #kboSubject"(event,template) {
        Meteor.call('Student.updateOlympiadSubject',this._id,event.target.value)
    },
    "change #kboSubject1"(event,template) {
        Meteor.call('Student.updateJobaSubject',this._id,event.target.value)
    },
    "click #addUser"(event,template) {
        if (confirm('Жаңа парақша қосуыңыз келеді ме??')) {
            Meteor.call("Student.addUser", this._id, function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    alert("Парақша қосылды")
                }
            })
        }
    },
    "click #addMultipleUsers"(event,template) {
        if (confirm('Барлық окушылардың парақшаларын қосқыңыз келеді ме???')) {
            Meteor.call("Student.addMultipleUsers", function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    alert("Парақшалар қосылды")
                }
            })
        }
    },
    "click #deleteAccount"(event,template) {
        event.preventDefault()

        if (confirm('Оқушының парақшасын жойыңыз келеді ме?')) {
            Meteor.call("Student.deleteAccount", this._id, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
            alert("Оқушының парақшасы жойылды")
        }
    },
    "click #deleteMultipleUsers"(event,template) {
        if (confirm('Барлық окушылардың парақшаларын жойыңыз келеді ме???')) {
            Meteor.call("Student.deleteMultipleUsers", function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    alert("Парақшалар жойылды")
                }
            })
        }
    },
    'click #resetStudentPassword'() {
        if (confirm("Are u sure?"))
            Meteor.call('resetStudentPassword',this.studentId,(err,res) => {
            if (err) {
                alert(err.reason)
            } else {
                alert('Сақталды')
            }
        })
    },
    "click #transfer"(event,template) {
        event.preventDefault()

        if (confirm('Оқушыны трансфер тізіміне аударғыңыз келеді ме?')) {
            Meteor.call("Student.transfer", this._id, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
    }
})

Template.schoolStudents.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover", placement:'left'});
});
