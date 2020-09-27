import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './graduatedStudents.html';

Template.graduatedStudents.onCreated(function() {
    let template = this
    document.title = "Түлектер";
    template.name_search = new ReactiveVar("")
    template.surname_search = new ReactiveVar("")

    template.autorun(()=>{
        template.subscribe('graduatedStudentList',academicYear.get())
    })
})

Template.graduatedStudents.helpers({
    students() {
        return Students.find({})
    }
});

Template.graduatedStudents.events({
    "keyup #search"(event,template) {
        template.name_search.set(template.find('[name=name_search]').value)
        template.grade_search.set(template.find('[name=grade_search]').value)
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
    }
})

Template.graduatedStudents.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover", placement:'left'});
});
