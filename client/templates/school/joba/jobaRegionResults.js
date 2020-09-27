import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './jobaRegionResults.html';

Template.jobaRegionResults.onCreated(function() {
    let template = this
    template.subject = new ReactiveVar("")

    template.state = new ReactiveVar('unclicked')
    template.jobaToChoose = new ReactiveVar("")
    template.subjectToChoose = new ReactiveVar("")
    template.studentToChoose = new ReactiveVar("")
    template.grade = new ReactiveVar("")
    
    template.subscribe('students')
    template.subscribe('teachers')
    template.subscribe('schools')
    template.subscribe('subjects')
    template.subscribe('joba')
    template.autorun(()=>{
        template.subscribe("jobaResults",academicYear.get())
    })
})

Template.jobaRegionResults.helpers({
    clickedButton() {
        return "clicked"==Template.instance().state.get()
    },
    subjectsToChoose() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    student() {
        let subjectToChoose = new RegExp(Template.instance().subjectToChoose.get())
        let grade = new RegExp(Template.instance().grade.get())

        return Students.find({grade:grade,joba:subjectToChoose},{sort:{surname:1}})
    },
    jobaStudent() {
        return JobaResults.findOne({_id:this._id})
    },
    teacher() {
        return Teachers.find({},{sort:{surname:1}})
    },
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    joba(){
        return Joba.find({},{sort:{jobaId:1}})
    },
    results() {
        let subject = new RegExp(Template.instance().subject.get())
        
        return JobaResults.find({
            jobaType:'science',
            subjectId:subject,
            jobaRegion:'regional',
        },{sort:{grade:1,subjectId:1}
        })
    },
    selectedState(state,val) {
        let conf = JobaResults.findOne({_id:this._id})
        if (conf)
            return conf[state] == val ? "selected" : ""
    },
    selectedAttended(attendedFor,val) {
        let conf = JobaResults.findOne({_id:this._id})
        if (conf)
            return conf[attendedFor] == val ? "selected" : ""
    },
    selectedMedal(medal,val) {
        let conf = JobaResults.findOne({_id:this._id})
        if (conf)
            return conf[medal] == val ? "selected" : ""
    },
    selectedPlace(place,val) {
        let conf = JobaResults.findOne({_id:this._id})
        if (conf)
            return conf[place] == val ? "selected" : ""
    },
    selected(id,teacherId) {
        let joba_student = JobaResults.findOne({_id:id})
        if (joba_student && parseInt(joba_student.teacherId) == teacherId)
            return 'selected'
    }
})

Template.jobaRegionResults.events({
    "change #select"(event,template) {
        template.subject.set(template.find('[name=subject]').value)
        template.jobaToChoose.set(template.find('[name=jobaToChoose]').value)
        template.subjectToChoose.set(template.find('[name=subjectToChoose]').value)
        template.studentToChoose.set(template.find('[name=studentToChoose]').value)
        template.grade.set(template.find('[name=grade]').value)
        
        let subject = FlowRouter.getParam('_id')
        let jobaToChoose = FlowRouter.getParam('_id')
        let subjectToChoose = FlowRouter.getParam('_id')
        let grade = FlowRouter.getParam('_id')
        let studentToChoose = FlowRouter.getParam('_id')
    },

    "change #state"(event,template) {
        event.preventDefault()
        Meteor.call("Student.editPassedJoba",this._id, event.target.value)
    },

    "change #attendedFor"(event,template) {
        event.preventDefault()
        Meteor.call("Student.editAttendedForJoba",this._id, event.target.value)
    },

    "change #medal"(event,template) {
        event.preventDefault()
        Meteor.call("Student.editMedalJoba",this._id, event.target.value)
    },

    "change #teacher"(event,template) {
        event.preventDefault()
        Meteor.call('Student.editTeacherJoba',this._id,event.target.value)
    },

    "change #place"(event,template) {
        event.preventDefault()
        Meteor.call('Student.editAbsolutePlaceJoba',this._id,event.target.value)
    },

    "click #save"(event,template) {
        event.preventDefault()

        let studentId = template.find('[name=studentToChoose]').value

        let result = {
             jobaRegion: 'regional',
             jobaType: 'science',
             subjectId: template.find('[name=subjectToChoose]').value,
             grade: template.find('[name=grade]').value,
             studentId: studentId,
             jobaId: template.find('[name=jobaToChoose]').value,
        }

        if(result.subjectId && result.grade && studentId) {
            Meteor.call("Student.addJobaResult", academicYear.get(), result, function(err) {
                if (err) {
                    alert(err.reason)
                } else {
                    alert("Сақталды!")
                }
            })
        } else {
            alert("ақпарат таңдалмады")
        }
    },

    "click #delete"(event,template) {
        event.preventDefault()
        if (confirm('Оқушы нәтижесін өшіргіңіз келеді ме?')) {
            Meteor.call('Student.deleteJobaResult',this._id,function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
    },

    "click #window"(event,template) {
        cursor = Template.instance().state.get()
        if (cursor == 'unclicked') {
            Template.instance().state.set("clicked")
        }
        else {
            Template.instance().state.set("unclicked")
        }
    }
})

Template.jobaRegionResults.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});

