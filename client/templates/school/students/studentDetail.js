import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './studentDetail.html';

Template.studentDetail.onCreated(function() {
    let template = this
    template.subscribe("kboSubjects")
    template.subscribe("student",FlowRouter.getParam("_id"))
})

Template.studentDetail.helpers({
    subjects() {
        return KboCourses.find({},{sort:{subjectId:1}})
    },
    student() {
        return Students.findOne({_id:FlowRouter.getParam("_id")})
    },
    selector(identificator,value) {
        let student = Students.findOne({_id:FlowRouter.getParam("_id")})
        if (student && student[identificator] == value) {
            return "selected"
        }
    }
});

Template.studentDetail.events({
    "click #save"(event,template) {
        event.preventDefault()

        let student_id = FlowRouter.getParam('_id')

        let name = template.find("[name=name]").value
        let surname = template.find("[name=surname]").value
        let grade = template.find("[name=grade]").value
        let division = template.find("[name=division]").value
        let languageGroup = template.find("[name=languageGroup]").value
        // let olympiad = template.find("[name=olympiadSubject]").value
        // let elective1 = template.find("[name=elective1]").value
        // let elective2 = template.find("[name=elective2]").value

        // if (elective1 === elective2) {
        //   alert("You cannot choose same subjects!")
        // }


        if (name && surname && grade && division){ // && (elective1 != elective2)) {
            Meteor.call('Student.update',{
                name:name,
                surname:surname,
                grade:grade,
                division:division,
                languageGroup:languageGroup,
                // olympiad:olympiad,
                // elective1:elective1,
                // elective2:elective2
            },student_id,function(err) {
                if(err) {
                    alert(err.reason)
                } else {
                    alert("Сакталды!")
                    FlowRouter.redirect('/school/students')
                }
            })
        }

    },
    "click #transfer"(event,template) {
        event.preventDefault()

        if (confirm('Оқушыны трансфер тізіміне аударғыңыз келеді ме?')) {
            Meteor.call("Student.transfer", FlowRouter.getParam("_id"), function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    FlowRouter.redirect('/school/students')
                }
            })
        }
    }
})
